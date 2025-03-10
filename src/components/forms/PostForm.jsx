import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DynamicMenusContext } from "@/app/contexts/DynamicMenus";
import { InputActionsContext } from "@/app/contexts/InputActionsContext";
import { MenusContext } from "@/app/contexts/MenusContext";

import { FaCloudUploadAlt, FaHashtag, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GoMention } from "react-icons/go";
import { IoMdImages } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";

import { VscMention } from "react-icons/vsc";

function PostForm() {
  const {
    setSelectedUsers,
    selectedUsersNames,
    setSelectedUsersNames,
    setSelectionMenuTitle,
    openPostForm,
    setOpenPostForm,
    usersSelectionRef,
  } = useContext(MenusContext);

  const {
    handleMenus,
  } = useContext(DynamicMenusContext);
  const {
    messageText,
    setMessageText,
    InputRef,
  } = useContext(InputActionsContext);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // Images
  const [images, setImages] = useState([]);

  const formMenuRef = useRef(null);
  const inputFileRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [isSubmited, setisSubmited] = useState(false);

  const [addHashtag, setAddHashtag] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [addMentions, setAddMentions] = useState(false);
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

  // Tags
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");

  const addTag = (e, type) => {
    e.preventDefault();
    if (
      type == "hashtags" &&
      tagInput.trim() &&
      !tags.includes(tagInput.trim())
    ) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
    if (
      type == "links" &&
      linkInput.trim() &&
      !links.includes(linkInput.trim())
    ) {
      setLinks([...links, linkInput.trim()]);
      setLinkInput("");
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
      <div className="postForm" ref={formMenuRef}>
        <div className="top">
          <h4>Create Post</h4>
          <IoClose className="close" onClick={() => setOpenPostForm(false)} />
        </div>
        <div>
          <div className={`inputHolder`}>
            <div className="holder">
              <MdOutlineAddReaction
                onClick={(e) => handleMenus(e, "emojiHolder")}
              />

              <textarea
                ref={InputRef}
                placeholder="Whats on your mind mahmoud?"
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
                Post Links
              </h6>
              <div className="holder">
                <input
                  type="text"
                  id="postLinks"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder=""
                />
                <button onClick={(e) => addTag(e, "links")}>Add</button>
              </div>
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
              <h4>Mentiond People</h4>
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
                  Click Or Drop Images Here
                </p>
                <h1
                  style={{
                    color:
                      images.length === 0 && isSubmited ? "#df3a3a" : "#ff8e31",
                  }}
                >
                  {isDrag ? "Drop Here!!" : "Click Here!!"}
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
                onClick={() => document.getElementById("productTags").focus()}
              >
                post hashtags
              </h6>
              <div className="holder">
                <input
                  type="text"
                  id="productTags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder=""
                />
                <button onClick={(e) => addTag(e, "hashtags")}>Add</button>
              </div>
              <div className="tagsHolder">
                {tags.length === 0 && (
                  <pre className="placeHolder">#gaming #sport #study</pre>
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
            <h4>add to your post</h4>
            <div className="right">
              <IoMdImages
                onClick={() => setAddImages((prev) => !prev)}
                className={`${addImages ? "active" : ""}`}
              />
              <FaLink
                onClick={() => setAddLink((prev) => !prev)}
                className={`${addLink ? "active" : ""}`}
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
                className={`${addHashtag ? "active" : ""}`}
              />
            </div>
          </div>
          <button
            type="submit"
            className="main-buttom"
            onClick={() => {
              setisSubmited(true);
            }}
          >
            {false ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
