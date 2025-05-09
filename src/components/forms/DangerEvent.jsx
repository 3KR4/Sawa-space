"use client";
import "@/Styles/forms.css";

import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { postService } from "@/services/api/postService";
import { userService } from "@/services/api/userService";
import { pageService } from "@/services/api/pageService";
import { useNotification } from "@/Contexts/NotificationContext";
import { ScreenContext } from "@/Contexts/ScreenContext";

import { IoClose } from "react-icons/io5";
import { storyService } from "@/services/api/storyService";
import { productService } from "@/services/api/productService";

function DangerEvent() {
  const { locale, translations } = useLanguage();
  const { addNotification } = useNotification();
  const { fetchUserData, fetchPageData } = useContext(ScreenContext);

  const {
    dangerEvent,
    setDangerEvent,
    setSomeThingHappen,
    openImgForm,
    setOpenImgForm,
    dangerEventRef,
  } = useContext(MenusContext);
  const { selectedDev } = useContext(DynamicMenusContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dangerEventRef.current &&
        dangerEventRef.current.contains(event.target)
      ) {
        return;
      }
      setDangerEvent(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteComment = async () => {
    setLoading(true);
    try {
      await postService.deleteComments(selectedDev.id);
      addNotification({
        type: "success",
        message: "the comment has been delete successfully",
      });
      setSomeThingHappen({
        event: "delete",
        type: "comment",
        nisted: selectedDev.level > 0,
        id: selectedDev.id,
      });
    } catch (err) {
      addNotification({
        type: "error",
        message: err.response.data,
      });
    } finally {
      setLoading(false);
      setDangerEvent(null);
    }
  };
  const deleteStory = async () => {
    setLoading(true);
    try {
      await storyService.deleteStory(selectedDev.id);
      addNotification({
        type: "success",
        message: "this story has been delete successfully",
      });
      setSomeThingHappen({
        event: "delete",
        type: "stories",
      });
    } catch (err) {
      addNotification({
        type: "error",
        message: err.response.data,
      });
    } finally {
      setLoading(false);
      setDangerEvent(null);
    }
  };
  const deletePost = async () => {
    setLoading(true);
    try {
      await postService.deletePost(selectedDev.id);
      addNotification({
        type: "success",
        message: "your post has been delete successfully",
      });
      setSomeThingHappen({
        event: "delete",
        type: "post",
        postId: selectedDev.id,
      });
    } catch (err) {
      addNotification({
        type: "error",
        message: err.response.data,
      });
    } finally {
      setLoading(false);
      setDangerEvent(null);
    }
  };
  const deleteProduct = async () => {
    setLoading(true);
    try {
      await productService.deleteProduct(dangerEvent.id);
      addNotification({
        type: "success",
        message: "this product has been delete successfully",
      });
      setSomeThingHappen({
        type: "product",
        event: "delete",
      });
    } catch (err) {
      addNotification({
        type: "error",
        message: err.response.data,
      });
    } finally {
      setLoading(false);
      setDangerEvent(null);
    }
  };
  const deleteImg = async () => {
    setLoading(true);
    try {
      if (dangerEvent.for === "user") {
        await userService.delete_img_cover(
          openImgForm.userId,
          openImgForm.type
        );
      } else {
        await pageService.deletePage_img_cover(openImgForm.type);
      }

      addNotification({
        type: "success",
        message: "Image deleted successfully.",
      });
      if (dangerEvent.for === "user") {
        await fetchUserData();
      } else {
        await fetchPageData();
      }
    } catch (err) {
      console.log(err);
      addNotification({ type: "error", message: "Failed to delete image." });
    } finally {
      setLoading(false);
      setDangerEvent(null);
      setOpenImgForm(false);
    }
  };

  const deleteHandlers = {
    delete_comment: deleteComment,
    delete_story: deleteStory,
    remove_post: deletePost,
    delete_product: deleteProduct,
    delete_img: deleteImg,
  };

  const handleDelete = () => {
    const deleteAction = deleteHandlers[dangerEvent.type];
    if (deleteAction) {
      deleteAction();
    } else {
      console.warn("No delete handler found for:", dangerEvent.type);
    }
  };

  return (
    <div className={`focusedMsg FormMenu ${dangerEvent ? "active" : ""}`}>
      <div className="body dangerEvent" ref={dangerEventRef}>
        <div className="top">
          <h4>{translations?.actions?.[dangerEvent.type]}</h4>
          <IoClose className="close" onClick={() => setDangerEvent(null)} />
        </div>
        <div className="the-important-message">{dangerEvent.message}</div>
        <div className="button-area">
          <button className="main-button" onClick={() => setDangerEvent(null)}>
            {translations?.actions?.cancel}
          </button>
          <button
            className={`main-button danger ${loading ? "loading" : ""}`}
            onClick={() => handleDelete()}
          >
            <div className="lds-dual-ring"></div>

            <span>
              {
                translations?.actions?.[
                  dangerEvent.type == "delete_img" ? "delete" : dangerEvent.type
                ]
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DangerEvent;
