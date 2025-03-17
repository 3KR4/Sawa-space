"use client";
import React, { useState } from "react";
import Link from "next/link";

// Icons
import { FaRegImages } from "react-icons/fa6";
import { GoPin } from "react-icons/go";
import { TiMicrophoneOutline } from "react-icons/ti";
import { useLanguage } from "@/app/contexts/LanguageContext";

function PinHolder({ data }) {
  const { translations } = useLanguage();

  const [curentMsgIndex, setCurentMsgIndex] = useState(0);

  const handlePinClick = () => {
    const element = document.getElementById(
      `message-${data[curentMsgIndex].id}`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setCurentMsgIndex((prev) => (prev + 1) % data.length);
  };

  return (
    <div className="pin-holder" onClick={handlePinClick}>
      <div className="left">
        <div className="pagin">
          {data.map((_, index) => (
            <span
              key={index}
              className={index === curentMsgIndex ? "active" : ""}
            />
          ))}
        </div>

        <GoPin />
        <h3>{data[curentMsgIndex].user}:</h3>
        <p>
          {data[curentMsgIndex].message ? (
            data[curentMsgIndex].message
          ) : data[curentMsgIndex].img ? (
            <>
              <FaRegImages /> {translations?.chats?.image}
            </>
          ) : (
            <>
              <TiMicrophoneOutline /> {translations?.chats?.record}
            </>
          )}
        </p>
      </div>
      <button className="right">{translations?.actions?.unpin}</button>
    </div>
  );
}

export default PinHolder;
