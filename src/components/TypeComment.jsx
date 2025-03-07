import React from "react";
import { useState, useContext, useRef } from "react";
import Image from "next/image";

import { AllContext } from "@/app/Context";
import { IoClose } from "react-icons/io5";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";

function TypeComment({id}) {
  const { handleMenus, InputRef, messageText, setMessageText } =
    useContext(AllContext);

  const inputFileRef = useRef(null);

  const [uploadedImg, setUploadedImg] = useState();

  const handleUploadImg = (e) => {
    const file = e.target.files[0]; // Get the first file only
    if (file && file.type.startsWith("image/")) {
      setUploadedImg(file);
    }
  };
  
  return (
    <div className="action-holder">
      <div className="top">
        <textarea
          placeholder="Write a comment.."
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
          <Image src={"/avatar.png"} alt={"user"} width={40} height={40} />
          Mahmoud Elshazly
        </div>
        <div className="right">
          <BsEmojiSmile onClick={(e) => handleMenus(e, "emojiHolder")} />
          <MdOutlinePhotoSizeSelectActual
            onClick={() => inputFileRef.current.click()}
          />
          <button>Post a Comment</button>
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
