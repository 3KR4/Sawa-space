import React from 'react'
import { useState, useContext } from 'react';
import { AllContext } from '@/app/Context';
import EmojiPicker from 'emoji-picker-react';


function EmojesHolder() {

  const {
    menuPosition,
    emojiRef,
    emojiHolder,
    handleMenus,
  } = useContext(AllContext);
  

  return (
    <div ref={emojiRef} className={`emoji-holder ${emojiHolder && 'active'}`} style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px`}}>
    <EmojiPicker
      onEmojiClick={handleMenus}
      theme="light"
      emojiStyle="facebook"
      previewConfig={{ showPreview: false }}
      width={350}
    />
  </div>
  )
}

export default EmojesHolder



