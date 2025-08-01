"use client";
import "@/Styles/forms.css";

import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { postService } from "@/services/api/postService";
import { useNotification } from "@/Contexts/NotificationContext";
import { fetchingContext } from "@/Contexts/fetchingContext";

import { FaCloudUploadAlt, FaHashtag, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GoMention } from "react-icons/go";
import { IoMdImages } from "react-icons/io";
import {
  MdOutlineAddReaction,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { VscMention } from "react-icons/vsc";
import { CircleAlert } from "lucide-react";

function PostForm() {
  const { locale, translations } = useLanguage();
  const { addNotification } = useNotification();
  const { userData, userPage } = useContext(fetchingContext);

  const {
    selectedUsers,
    setSelectedUsers,
    openForm,
    setOpenForm,
    Refs,
    setSomeThingHappen,
  } = useContext(MenusContext);

  const { handleMenus, selectedDev } = useContext(DynamicMenusContext);
  const { messageText, setMessageText, InputRef, emojiHolderRef } =
    useContext(InputActionsContext);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  // Images
  const [images, setImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  const formMenuRef = useRef(null);
  const inputFileRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);

  const [addHashtag, setAddHashtag] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [addImages, setAddImages] = useState(false);

  // Tags & Links
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");

  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState("");

  const [curentOpendSelectHolder, setCurentOpendSelectHolder] = useState();

  const [postType, setPostType] = useState(openForm?.type || "user");

  const isDisabled = !images.length && !links.length && messageText.length < 3;

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const removed = prevImages[index];

      // Filter out the image at the given index
      const updatedImages = prevImages.filter((_, i) => i !== index);

      // If it's a previously uploaded image and we're editing the post
      if (removed?.publicid && openForm.mode === "edit") {
        setRemovedImages((prev) => [...prev, removed.publicid]);
      }

      // If no images left after removal, hide the image section
      if (updatedImages.length === 0) {
        setAddImages(false);
      }

      return updatedImages;
    });
  };

  const add_Tag_Link = async (e, type) => {
    e.preventDefault();

    if (type === "hashtags") {
      const trimmedTag = tagInput.trim();

      // Clear previous error messages
      setTagError("");

      // Validate the input field (required rule)
      const isValid = await trigger("postTags");

      if (!isValid) {
        return; // Stop if the input is invalid (e.g., empty)
      }

      // Check for duplicate hashtags
      if (tags.includes(trimmedTag)) {
        setTagError(translations?.errors?.this_tag_has_already_been_added);
        return; // Stop if the hashtag already exists
      }

      // Add the hashtag
      setTags([...tags, trimmedTag]);
      setTagInput(""); // Clear the input field
    }

    if (type === "links") {
      const trimmedLink = linkInput.trim();

      // Clear previous error messages
      setLinkError("");

      // Validate the input field (required rule)
      const isValid = await trigger("postLinks");

      if (!isValid) {
        return; // Stop if the input is invalid (e.g., empty)
      }

      // Check for duplicate links
      if (links.includes(trimmedLink)) {
        setLinkError(translations?.errors?.this_link_has_already_been_added);
        return; // Stop if the link already exists
      }

      // Add the link
      setLinks([...links, trimmedLink]);
      setLinkInput(""); // Clear the input field
    }
  };

  const removeTag = (indexToRemove, type) => {
    type == "hashtags" &&
      setTags(tags.filter((_, index) => index !== indexToRemove));
    type == "links" &&
      setLinks(links.filter((_, index) => index !== indexToRemove));
    if (type == "mentions") {
      setSelectedUsers((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formMenuRef.current && formMenuRef.current.contains(event.target)) {
        return;
      }
      if (
        Refs.usersSelection.current &&
        Refs.usersSelection.current.contains(event.target)
      ) {
        return;
      }
      if (
        emojiHolderRef.current &&
        emojiHolderRef.current.contains(event.target)
      ) {
        return;
      }
      setOpenForm(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openForm.mode === "edit") {
      setLoadingContent(false);
      const fetchPost = async () => {
        try {
          const response = await postService.getSinglePost(
            postType,
            openForm.postId
          );
          const post = response?.data?.data?.[0];

          if (post) {
            setMessageText(post.paragraph);
            setLinks(post.link || []);
            setTags(post.hastags || []);
            setSelectedUsers(post.mentions || []);

            setAddImages((post.img || []).length > 0);
            setAddLink((post.link || []).length > 0);
            setAddHashtag((post.hastags || []).length > 0);

            const formattedImages = (post.img || []).map((imgObj) => ({
              url: imgObj.newpath.url,
              publicid: imgObj.newpath.publicid,
              originalname: imgObj.originalname,
            }));

            setImages(formattedImages);
            setLoadingContent(true);
          }
        } catch (err) {
          console.error("Error fetching post:", err);
        }
      };

      fetchPost(); // call it
    } else {
      setMessageText("");
      setLinks([]);
      setTags([]);
      setSelectedUsers([]);
      setImages([]);
    }
  }, [openForm]);

  const onSubmit = async () => {
    setLoading(true);

    const fallbackMentions = [
      "67f6387225982aee32da9c68",
      "67cfd61617bff9683742fdd9",
      "67cfa8b8e0b8a8ebeff2f875",
    ];

    const postData = {
      paragraph: messageText,
      link: links,
      mentions: fallbackMentions || selectedUsers,
      hastags: tags,
    };

    try {
      const postIds = [];

      if (openForm.mode === "edit") {
        // Editing a single post
        const postId = openForm.postId;
        await postService.editPost(postType, postId, postData);
        postIds.push({ type: postType, id: postId });
      } else {
        // Creating new posts
        if (postType === "user" || postType === "together") {
          const userRes = await postService.createPost("user", postData);
          const userPostId = userRes?.data?.postId;
          if (!userPostId) throw new Error("User post ID not returned");
          postIds.push({ type: "user", id: userPostId });
        }

        if (postType === "page" || postType === "together") {
          const pageRes = await postService.createPost("page", postData);
          const pagePostId = pageRes?.data?.postId;
          if (!pagePostId) throw new Error("Page post ID not returned");
          postIds.push({ type: "page", id: pagePostId });
        }
      }

      // Handle images for each created/edited post
      for (const { type, id } of postIds) {
        // Upload new images
        const newImages = images.filter((img) => !img.url);
        if (newImages.length > 0) {
          const formData = new FormData();
          newImages.forEach((img) => formData.append("imgs", img));
          await postService.uploadPostImages(type, id, formData);
        }

        // Delete removed images (only when editing)
        if (openForm.mode === "edit" && removedImages.length > 0) {
          for (const publicid of removedImages) {
            try {
              await postService.deleteImg(type, id, publicid);
            } catch (err) {
              console.warn(`Failed to delete image ${publicid}:`, err);
            }
          }
        }

        // Fetch post and emit it
        const post = await postService.getSinglePost(type, id);
        if (post?.data?.data?.[0]) {
          setSomeThingHappen({
            event: openForm.mode === "edit" ? "edit" : "create",
            type: "post",
            post: post.data.data[0],
          });
        }
      }

      // Notify
      addNotification({
        type: "success",
        message:
          openForm.mode === "edit"
            ? "Post updated successfully."
            : postType === "together"
            ? "Posts created successfully for both user and page."
            : "Your post has been created successfully.",
      });

      // Reset form state
      setOpenForm(false);
      setMessageText("");
      setLinks([]);
      setTags([]);
      setImages([]);
      setSelectedUsers([]);
      setRemovedImages([]);
    } catch (err) {
      addNotification({
        type: "error",
        message: err?.response?.data?.messege || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`focusedMsg FormMenu ${openForm ? "active" : ""} `}
    >
      <div
        className={`body postForm ${
          loadingContent || openForm.mode !== "edit" ? "contentLoaded" : ""
        }`}
        ref={formMenuRef}
      >
        {!loadingContent && openForm.mode === "edit" && (
          <div className="lds-dual-ring big-loader"></div>
        )}

        <div className="top">
          <h4>
            {openForm.mode === "edit"
              ? translations?.forms?.edit_post
              : translations?.forms?.create_post}
          </h4>
          <div>
            <IoClose className="close" onClick={() => setOpenForm(false)} />
          </div>
        </div>
        <div
          style={{
            overflow:
              !loadingContent && openForm.mode === "edit" ? "hidden" : "auto",
          }}
        >
          <div className={`inputHolder`}>
            <div className="holder">
              <MdOutlineAddReaction
                className="reactBtn"
                onClick={(e) => handleMenus(e, "emojiHolder")}
              />

              <textarea
                ref={InputRef}
                placeholder={`${userData.firstname} ${translations?.placeHolders?.whats_on_your_mind}`}
                value={messageText}
                onInput={(e) => setMessageText(e.target.value)}
              />
            </div>
          </div>

          {addLink && (
            <div className="inputHolder tags link">
              <h6
                className="placeHolder"
                onClick={() => document.getElementById("postLinks").focus()}
              >
                {translations?.forms?.add_links}
              </h6>
              <div className="holder">
                <input
                  type="text"
                  id="postLinks"
                  value={linkInput}
                  {...register("postLinks", {
                    pattern: {
                      value:
                        /^(https?:\/\/)?(www\.)?([\da-z\.-]+)\.com(\/[\/\w \.-]*)*\/?$/,
                      message: translations?.errors?.please_enter_a_valid_URL,
                    },
                  })}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder={``}
                />

                <button onClick={(e) => add_Tag_Link(e, "links")}>
                  {translations?.actions?.add}
                </button>
              </div>

              {/* Display error message if the input is invalid */}
              {errors.postLinks && (
                <span className="error">
                  <CircleAlert />
                  {errors.postLinks.message}
                </span>
              )}

              {linkError && (
                <span className="error">
                  <CircleAlert />
                  {linkError}
                </span>
              )}

              <div className="tagsHolder">
                {links.length === 0 && (
                  <pre className="placeHolder">https://www.google.com</pre>
                )}
                {links.map((link, index) => (
                  <div key={index} className="tag">
                    <span>{link}</span>
                    <button
                      type="button"
                      className="remove"
                      onClick={() => removeTag(index, "links")}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedUsers.length > 0 && (
            <div className="inputHolder mentionsHolder">
              <h4>{translations?.forms?.Mentiond_People}</h4>
              <div className="tagsHolder">
                {selectedUsers.map((x, index) => (
                  <div key={index} className="tag">
                    <span>@{x?.name}</span>
                    <button
                      type="button"
                      className="remove"
                      onClick={() => removeTag(index, "mentions")}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {addImages && (
            <div className="productImages">
              <div
                className={`uploadlabel ${isDrag ? "active" : null}`}
                style={{
                  height: images.length ? "140px" : "225px",
                  border: `3px dashed ${
                    images.length === 0 && isSubmited ? "#f43521" : "#ff8e31"
                  }`,
                }}
                onClick={() => inputFileRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDrag(true);
                }}
              >
                <FaCloudUploadAlt
                  style={{
                    color:
                      images.length === 0 && isSubmited
                        ? "#F43621E6"
                        : "#ff8e31",
                  }}
                />
                <p
                  style={{
                    color:
                      images.length === 0 && isSubmited ? "#df3a3a" : "#ff8e31",
                  }}
                >
                  {translations?.forms?.click_or_drop_images_her}
                </p>
                <h1
                  style={{
                    color:
                      images.length === 0 && isSubmited ? "#df3a3a" : "#ff8e31",
                  }}
                >
                  {isDrag
                    ? translations?.forms?.drop_her
                    : translations?.forms?.click_her}
                </h1>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                ref={inputFileRef}
                onChange={handleInputChange}
              />
              <div className="imgHolder">
                {images.map((image, index) => (
                  <div className="uploaded" key={index}>
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : image?.url
                          ? image.url
                          : URL.createObjectURL(image)
                      }
                      alt={image.originalname || image.name || `Image-${index}`}
                      width="150"
                    />
                    <p>{index + 1}</p>
                    <IoClose onClick={() => handleRemoveImage(index)} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {addHashtag && (
            <div className="inputHolder tags">
              <h6
                className="placeHolder"
                onClick={() => document.getElementById("postTags").focus()}
              >
                {translations?.forms?.add_hashtags}
              </h6>
              <div className="holder">
                <input
                  type="text"
                  value={tagInput}
                  placeholder=""
                  id="postTags"
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <button onClick={(e) => add_Tag_Link(e, "hashtags")}>
                  {translations?.actions?.add}
                </button>
              </div>

              {/* Display validation errors */}
              {errors.postTags && (
                <span className="error">
                  <CircleAlert />
                  {errors.postTags.message}
                </span>
              )}

              {/* Display duplicate hashtag error */}
              {tagError && (
                <span className="error">
                  <CircleAlert />
                  {tagError}
                </span>
              )}

              <div className="tagsHolder">
                {tags.length === 0 && (
                  <pre className="placeHolder">
                    #gaming #sport #دراسة# كوميدي{" "}
                  </pre>
                )}
                {tags.map((tag, index) => (
                  <div key={index} className="tag">
                    <span>#{tag}</span>
                    <button
                      type="button"
                      className="remove"
                      onClick={() => removeTag(index, "hashtags")}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bottom">
            <h4>{translations?.forms?.add_to_your_post}</h4>
            <div className="right">
              <IoMdImages
                onClick={() => setAddImages((prev) => !prev)}
                className={`${addImages ? "active" : ""}`}
              />
              <FaLink
                onClick={() => setAddLink((prev) => !prev)}
                className={`${addLink ? "active" : ""} link`}
              />
              <VscMention
                onClick={(e) => {
                  handleMenus(e, "usersSelection", null, {
                    type: "Tag People...",
                  });
                }}
                className={`${selectedUsers.length ? "active" : ""}`}
              />
              <FaHashtag
                onClick={() => setAddHashtag((prev) => !prev)}
                className={`${addHashtag ? "active" : ""} hashtag`}
              />
            </div>
          </div>
          {userPage && openForm.mode !== "edit" && (
            <div
              className="select-holder"
              onClick={() => setCurentOpendSelectHolder((prev) => !prev)}
            >
              <h4>create as:</h4>

              <span
                style={{ justifyContent: "unset" }}
                className={
                  postType === "user" || postType === "together" ? "active" : ""
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setPostType((prev) => {
                    if (prev === "user") return "";
                    if (prev === "page") return "together";
                    if (prev === "together") return "page";
                    return "user";
                  });
                }}
              >
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={postType === "user" || postType === "together"}
                  />
                  <span className="custom-checkbox"></span>
                </label>
                {userData?.firstname} {userData?.lastname}
              </span>

              <span
                style={{ justifyContent: "unset" }}
                className={
                  postType === "page" || postType === "together" ? "active" : ""
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setPostType((prev) => {
                    if (prev === "page") return "";
                    if (prev === "user") return "together";
                    if (prev === "together") return "user";
                    return "page";
                  });
                }}
              >
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={postType === "page" || postType === "together"}
                  />
                  <span className="custom-checkbox"></span>
                </label>
                {userPage?.pagename}
              </span>
            </div>
          )}
          <button
            type="submit"
            className={`main-button ${loading ? "loading" : ""}`}
            onClick={() => {
              setisSubmited(true);
            }}
            disabled={isDisabled || loading}
          >
            <span>
              {openForm.mode === "edit"
                ? translations?.forms?.edit_post
                : translations?.forms?.create_post}
            </span>
            <div className="lds-dual-ring"></div>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
