"use client";
import "@/Styles/forms.css";

import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { postService } from "@/services/api/postService";
import { useNotification } from "@/Contexts/NotificationContext";

import { IoClose } from "react-icons/io5";

function DangerEvent() {
  const { locale, translations } = useLanguage();
  const { addNotification } = useNotification();

  const { dangerEvent, setDangerEvent, setSomeThingHappen } =
    useContext(MenusContext);
  const { selectedDev } = useContext(DynamicMenusContext);
  const [loading, setLoading] = useState(false);

  const dangerEventRef = useRef(null);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dangerEventRef.current &&
        !dangerEventRef.current.contains(event.target)
      ) {
        setMentionHolder(false);
      }
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
        id: selectedDev.id,
      });
    } catch (err) {
      console.log(err);
      addNotification({
        type: "error",
        message: err.response.data,
      });
    } finally {
      setLoading(false);
      setDangerEvent(null);
    }
  };

  const deleteHandlers = {
    delete_comment: deleteComment,
    // Add more as needed
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
          <button className="main-button">
            {translations?.actions?.cancel}
          </button>
          <button
            className={`main-button danger ${loading ? "loading" : ""}`}
            onClick={() => handleDelete()}
          >
            <div className="lds-dual-ring"></div>

            <span>{translations?.actions?.[dangerEvent.type]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DangerEvent;
