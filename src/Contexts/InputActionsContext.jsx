"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";

export const InputActionsContext = createContext();

export const InputActionsProvider = ({ children }) => {
  // Emojes && IN+nput
  const InputRef = useRef(null);
  const emojiHolderRef = useRef(null);
  const [messageText, setMessageText] = useState("");

  const handleEmojiClick = (event) => {
    const emoji = String.fromCodePoint(
      ...event.unified.split("-").map((code) => parseInt(code, 16))
    );

    if (!InputRef.current) return;

    const { selectionStart, selectionEnd } = InputRef.current;
    const currentValue = InputRef.current.value;
    const newText =
      currentValue.slice(0, selectionStart) +
      emoji +
      currentValue.slice(selectionEnd);

    setMessageText(newText);

    // Use a timeout to ensure the state updates first before adjusting the cursor
    setTimeout(() => {
      if (InputRef.current) {
        InputRef.current.selectionStart = InputRef.current.selectionEnd =
          selectionStart + emoji.length;
        InputRef.current.focus();
      }
    }, 0);
  };

  return (
    <InputActionsContext.Provider
      value={{
        messageText,
        setMessageText,
        InputRef,
        emojiHolderRef,
        handleEmojiClick,
      }}
    >
      {children}
    </InputActionsContext.Provider>
  );
};
