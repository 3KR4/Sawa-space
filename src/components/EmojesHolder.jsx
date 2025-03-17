"use client";

import React, { useRef, useEffect } from "react";
import { useState, useContext, useRfef } from "react";
import { DynamicMenusContext } from "@/app/contexts/DynamicMenus";
import { InputActionsContext } from "@/app/contexts/InputActionsContext";
import EmojiPicker from "emoji-picker-react";

function EmojesHolder() {
  const { menuPosition, emojiHolder, setEmojiHolder } =
    useContext(DynamicMenusContext);
  const { handleEmojiClick, emojiHolderRef } = useContext(InputActionsContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiHolderRef.current &&
        !emojiHolderRef.current.contains(event.target)
      ) {
        setEmojiHolder(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={emojiHolderRef}
      className={`emoji-holder ${emojiHolder && "active"}`}
      style={{
        top: `${menuPosition.top || 0}px`,
        left: `${menuPosition.left || 0}px`,
      }}
    >
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        theme="light"
        emojiStyle="facebook"
        previewConfig={{ showPreview: false }}
        width={350}
      />
    </div>
  );
}

export default EmojesHolder;
