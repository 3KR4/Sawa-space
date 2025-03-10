import React, { useRef } from "react";
import { useState, useContext, useRfef } from "react";
import { DynamicMenusContext } from "@/app/contexts/DynamicMenus";
import { InputActionsContext } from "@/app/contexts/InputActionsContext";
import EmojiPicker from "emoji-picker-react";

function EmojesHolder() {
  const {
    menuPosition,
    emojiHolder,
  } = useContext(DynamicMenusContext);
  const { handleEmojiClick } = useContext(InputActionsContext);

  const emojiRef = useRef(null)

  return (
    <div
      ref={emojiRef}
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
