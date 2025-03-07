import React from 'react'
import { useState, useContext } from 'react';
import { AllContext } from '@/app/Context';
import EmojiPicker from 'emoji-picker-react';


function EmojesHolder() {

  const {
    menuPosition,
    emojiRef,
    emojiHolder,
    handleEmojiClick,
  } = useContext(AllContext);
  

  return (
    <div ref={emojiRef} className={`emoji-holder ${emojiHolder && 'active'}`} style={{ top: `${menuPosition.top || 0}px`, left: `${menuPosition.left || 0}px`}}>
    <EmojiPicker
      onEmojiClick={handleEmojiClick}
      theme="light"
      emojiStyle="facebook"
      previewConfig={{ showPreview: false }}
      width={350}
    />
  </div>
  )
}

export default EmojesHolder



