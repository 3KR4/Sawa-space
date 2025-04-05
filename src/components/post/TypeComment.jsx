"use client";

import React from "react";
import { useState, useContext, useRef } from "react";
import Image from "next/image";
import { ScreenContext } from "@/Contexts/ScreenContext";

import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { useLanguage } from "@/Contexts/LanguageContext";

import { IoClose } from "react-icons/io5";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";

function TypeComment({ id }) {
  const { screenSize } = useContext(ScreenContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { locale, translations } = useLanguage();
  const { messageText, setMessageText, InputRef } =
    useContext(InputActionsContext);

  const inputFileRef = useRef(null);

  const [uploadedImg, setUploadedImg] = useState();

  const handleUploadImg = (e) => {
    const file = e.target.files[0]; // Get the first file only
    if (file && file.type.startsWith("image/")) {
      setUploadedImg(file);
    }
  };

  return (
    <div className="action-holder forComments">
      <div className="top">
        <textarea
          placeholder={translations?.comment?.wright_a_comment}
          ref={InputRef}
          value={messageText}
          onInput={(e) => setMessageText(e.target.value)}
        ></textarea>
        {uploadedImg && (
          <div className="uploaded">
            <img
              src={
                uploadedImg instanceof File
                  ? URL.createObjectURL(uploadedImg)
                  : uploadedImg
              }
              alt={
                uploadedImg instanceof File
                  ? uploadedImg.name
                  : "Uploaded Image"
              }
              width="150"
            />
            <IoClose onClick={() => setUploadedImg(null)} />
          </div>
        )}
      </div>
      <div className="actions">
        <div className="left">
          <Image
            className="rounded"
            src={"/avatar.png"}
            alt={"user"}
            width={40}
            height={40}
          />
          Mahmoud Elshazly
        </div>
        <div className="right">
          {screenSize === "large" && (
            <BsEmojiSmile onClick={(e) => handleMenus(e, "emojiHolder")} />
          )}
          <MdOutlinePhotoSizeSelectActual
            onClick={() => inputFileRef.current.click()}
          />
          <button>{translations?.comment?.post_a_comment}</button>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputFileRef}
        onChange={handleUploadImg}
      />
    </div>
  );
}

export default TypeComment;
