"use client";
import React from "react";
import { useContext } from "react";
import dynamic from "next/dynamic";
import Chats from "@/components/Chats";
import { ScreenContext } from "@/app/contexts/ScreenContext";

import { AllContext } from "@/app/contexts/InputActionsContext";

export default function ChatHomePage() {
  const {
    screenSize,
  } = useContext(ScreenContext);

  return (
    <div className="chat-page">
      {screenSize !== "small" ? (
        <>
          <img src={"/Svgs/Group Chat-pana.svg"} alt={`Group Chat-pana.svg`} />
          <h1>Explore your chats and choose one to start.</h1>
        </>
      ) : (
        <Chats />
      )}
    </div>
  );
}
