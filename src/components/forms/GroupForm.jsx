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
import { ScreenContext } from "@/Contexts/ScreenContext";
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
  const { userData, userPage } = useContext(ScreenContext);

  const {
    selectedUsers,
    setSelectedUsers,
    selectedUsersNames,
    setSelectedUsersNames,
    setSelectionMenuTitle,

    usersSelectionRef,
    setSomeThingHappen,
    openGroupForm,
    setOpenGroupForm,
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

  const removeTag = (indexToRemove) => {
    setSelectedUsers((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setSelectedUsersNames((prev) =>
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

      if (openGroupForm.type === "edit" && removedImages.length > 0) {
        try {
          await chatService.removeGroupImg(id);
        } catch (err) {
          console.warn(`Failed to delete image:`, err);
        }
      }

      setSomeThingHappen({
        event: openGroupForm.type === "edit" ? "edit" : "create",
        type: "group",
      });

      // Notify
      addNotification({
        type: "success",
        message:
          openGroupForm.type === "edit"
            ? "Post updated successfully."
            : postType === "together"
            ? "Posts created successfully for both user and page."
            : "Your post has been created successfully.",
      });

      // Reset form state
      setOpenPostForm(false);
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
      className={`focusedMsg group FormMenu ${openGroupForm ? "active" : ""}`}
    >
      <div
        className={`body postForm  ${
          loadingContent || openGroupForm.type !== "edit" ? "contentLoaded" : ""
        }`}
        ref={formMenuRef}
      >
        {!loadingContent && openGroupForm.type === "edit" && (
          <div className="lds-dual-ring big-loader"></div>
        )}

        <div className="top">
          <h4>
            {openGroupForm.type === "edit"
              ? translations?.forms?.edit_group
              : translations?.forms?.create_group}
          </h4>
          <div>
            <IoClose
              className="close"
              onClick={() => setOpenGroupForm(false)}
            />
          </div>
        </div>
        <div
          style={{
            overflow:
              !loadingContent && openGroupForm.type === "edit"
                ? "hidden"
                : "auto",
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
              {openGroupForm.type === "edit"
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
