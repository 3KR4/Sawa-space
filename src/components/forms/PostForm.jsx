"use client";
import "@/Styles/forms.css";

import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";

import { FaCloudUploadAlt, FaHashtag, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GoMention } from "react-icons/go";
import { IoMdImages } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { VscMention } from "react-icons/vsc";
import { CircleAlert } from "lucide-react";

function PostForm() {
  const { locale, translations } = useLanguage();

  const {
    setSelectedUsers,
    selectedUsersNames,
    setSelectedUsersNames,
    setSelectionMenuTitle,
    openPostForm,
    setOpenPostForm,
    usersSelectionRef,
  } = useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
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

  const formMenuRef = useRef(null);
  const inputFileRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);

  const [addHashtag, setAddHashtag] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [addImages, setAddImages] = useState(false);

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
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  // Tags & Links
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");

  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState("");

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
        console.log("a7a");
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
      setSelectedUsersNames((prev) =>
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
        usersSelectionRef.current &&
        usersSelectionRef.current.contains(event.target)
      ) {
        return;
      }
      if (
        emojiHolderRef.current &&
        emojiHolderRef.current.contains(event.target)
      ) {
        return;
      }
      setOpenPostForm(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (editProductId) {
  //     const productToEdit = allProducts.find(
  //       (product) => product.id === +editProductId
  //     );

  //     if (productToEdit) {
  //       setValue("name", productToEdit.name);
  //       setValue("stock", productToEdit.stock);
  //       setValue("price", productToEdit.price);
  //       setValue("sale", productToEdit.sale);
  //       setValue("details", productToEdit.details);
  //       setValue("aboutInfo", productToEdit.about);
  //       setTags(productToEdit.tags || []);
  //       setImages(productToEdit.Images || []);
  //       setSelectedDate(
  //         productToEdit.endTime ? new Date(productToEdit.endTime) : null
  //       );
  //       setFlashSale(productToEdit.flashSale || false);
  //       setSelectChange({
  //         brand: productToEdit.brand || "Choose",
  //         category: productToEdit.category || "Choose",
  //         type: productToEdit.type || "Choose",
  //       });
  //       setSpecifications(
  //         Object.entries(productToEdit.specifications || {}).map(
  //           ([key, value]) => ({ key, value })
  //         )
  //       );
  //     }
  //   }
  // }, [editProductId, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`focusedMsg FormMenu ${openPostForm ? "active" : ""}`}
    >
      <div className="body postForm" ref={formMenuRef}>
        <div className="top">
          <h4>{translations?.forms?.create_post}</h4>
          <IoClose className="close" onClick={() => setOpenPostForm(false)} />
        </div>
        <div>
          <div className={`inputHolder`}>
            <div className="holder">
              <MdOutlineAddReaction
                className="reactBtn"
                onClick={(e) => handleMenus(e, "emojiHolder")}
              />

              <textarea
                ref={InputRef}
                placeholder={`mahmoud ${translations?.placeHolders?.whats_on_your_mind}`}
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
                    required: {
                      value: true,
                      message: translations?.errors?.please_enter_a_URL,
                    },
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

          {selectedUsersNames.length > 0 && (
            <div className="inputHolder mentionsHolder">
              <h4>{translations?.forms?.Mentiond_People}</h4>
              <div className="tagsHolder">
                {selectedUsersNames.map((name, index) => (
                  <div key={index} className="tag">
                    <span>@{name}</span>
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
                    {false ? (
                      typeof image === "string" ? (
                        <img src={image} alt="Blog" width="150" />
                      ) : (
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          width="150"
                        />
                      )
                    ) : (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        width="150"
                      />
                    )}
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
                  {...register("postTags", {
                    required: {
                      value: true,
                      message: translations?.errors?.please_enter_a_URL,
                    },
                  })}
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
                  handleMenus(e, "usersSelection");
                  setSelectionMenuTitle("Tag People...");
                }}
                className={`${selectedUsersNames.length ? "active" : ""}`}
              />
              <FaHashtag
                onClick={() => setAddHashtag((prev) => !prev)}
                className={`${addHashtag ? "active" : ""} hashtag`}
              />
            </div>
          </div>
          <button
            type="submit"
            className="main-button"
            onClick={() => {
              setisSubmited(true);
            }}
          >
            {false
              ? translations?.forms?.edit_post
              : translations?.forms?.create_post}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
