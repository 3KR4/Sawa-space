"use client";
import React from "react";
import { useContext } from "react";
import dynamic from "next/dynamic";
import Chats from "@/components/chat/Chats";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import "@/Styles/chat.css";
import "@/Styles/components/side-chats.css";

export default function ChatHomePage() {
  const { translations, locale } = useLanguage();

  const { screenSize } = useContext(ScreenContext);

  return (
    <div className="chat-page">
      {screenSize !== "small" ? (
        <>
          <img src={"/Svgs/Group Chat-pana.svg"} alt={`Group Chat-pana.svg`} />
          <h1>{translations?.chats?.Explore_your_chats}</h1>
        </>
      ) : (
        <Chats />
      )}
    </div>
  );
}
