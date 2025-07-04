"use client";
import "@/Styles/forms.css";

import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { chatService } from "@/services/api/chatService";
import { useNotification } from "@/Contexts/NotificationContext";
import { fetchingContext } from "@/Contexts/fetchingContext";
import ImageCropper from "@/components/ImageCropper";

import { FaCloudUploadAlt, FaHashtag, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { VscMention } from "react-icons/vsc";
import { CircleAlert } from "lucide-react";

function GroupForm() {
  const { locale, translations } = useLanguage();
  const { addNotification } = useNotification();
  const { userData, userPage } = useContext(fetchingContext);

  const {
    selectedUsers,
    setSelectedUsers,
    Refs,
    setSomeThingHappen,
    openForm,
    setOpenForm,
  } = useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { messageText, setMessageText, InputRef, emojiHolderRef } =
    useContext(InputActionsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Images
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);

  const pageImageInputRef = useRef();
  const [pageImage, setPageImage] = useState(null);
  const [pageImageURL, setPageImageURL] = useState(null);

  const formMenuRef = useRef(null);

  const isDisabled = !pageImage && messageText.length < 2;

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

  const removeTag = (indexToRemove) => {
    setSelectedUsers((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const onSubmit = async () => {
    setLoading(true);

    const groupData = {
      chatName: messageText,
      members: selectedUsers,
    };

    try {
      const { data } = await chatService.createPost("user", groupData);
      const groupId = data[0]?._id;

      const newImages = images.filter((img) => !img.url);
      if (newImages.length > 0) {
        const formData = new FormData();
        formData.append("img", img);
        await chatService.addGroupImg(groupId, formData);
      }

      if (openForm.type === "edit" && removedImages.length > 0) {
        try {
          await chatService.removeGroupImg(id);
        } catch (err) {
          console.warn(`Failed to delete image:`, err);
        }
      }

      setSomeThingHappen({
        event: openForm.type === "edit" ? "edit" : "create",
        type: "group",
      });

      // Notify
      addNotification({
        type: "success",
        message:
          openForm.type === "edit"
            ? "Post updated successfully."
            : postType === "together"
            ? "Posts created successfully for both user and page."
            : "Your post has been created successfully.",
      });

      // Reset form state
      setOpenForm(false);
      setMessageText("");
      setPageImage();
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
      className={`focusedMsg group FormMenu ${openForm ? "active" : ""}`}
    >
      <div
        className={`body postForm  ${
          loadingContent || openForm.type !== "edit" ? "contentLoaded" : ""
        }`}
        ref={formMenuRef}
      >
        {!loadingContent && openForm.type === "edit" && (
          <div className="lds-dual-ring big-loader"></div>
        )}

        <div className="top">
          <h4>
            {openForm.type === "edit"
              ? translations?.forms?.edit_group
              : translations?.forms?.create_group}
          </h4>
          <div>
            <IoClose className="close" onClick={() => setOpenForm(false)} />
          </div>
        </div>
        <div
          style={{
            overflow:
              !loadingContent && openForm.type === "edit" ? "hidden" : "auto",
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
                placeholder={`enter the grpup name`}
                value={messageText}
                onInput={(e) => setMessageText(e.target.value)}
              />
            </div>
          </div>

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
          <ImageCropper
            type={`img`}
            imageURL={pageImageURL}
            setImageURL={setPageImageURL}
            aspect={1}
            inputRef={pageImageInputRef}
            setState={setPageImage}
          />

          <button
            type="submit"
            className={`main-button ${loading ? "loading" : ""}`}
            disabled={isDisabled || loading}
          >
            <span>
              {openForm.type === "edit"
                ? translations?.forms?.edit_group
                : translations?.forms?.create_group}
            </span>
            <div className="lds-dual-ring"></div>
          </button>
        </div>
      </div>
    </form>
  );
}

export default GroupForm;
