"use client";
import { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import { ScreenContext } from "@/Contexts/ScreenContext";

import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { postService } from "@/services/api/postService";
import { useNotification } from "@/Contexts/NotificationContext";
import { MenusContext } from "@/Contexts/MenusContext";

import { IoClose } from "react-icons/io5";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";

function TypeComment({
  id,
  replyTo,
  setReplyTo,
  setComments,
  setCommentsCount,
}) {
  const { screenSize, userData } = useContext(ScreenContext);
  const { addNotification } = useNotification();
  const { setSomeThingHappen } = useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { locale, translations } = useLanguage();
  const { messageText, setMessageText, InputRef } =
    useContext(InputActionsContext);

  const inputFileRef = useRef(null);

  const [uploadedImg, setUploadedImg] = useState();
  const [loading, setLoading] = useState(false);

  const handleUploadImg = (e) => {
    const file = e.target.files[0]; // Get the first file only
    if (file && file.type.startsWith("image/")) {
      setUploadedImg(file);
    }
  };

  const handleCreateComment = async () => {
    setLoading(true);
    const commentData = {
      paragraph: messageText,
      replay: replyTo?.commentId || null,
    };
    try {
      await postService.createComment(id, commentData);
      let comentCreated = {
        _id: "",
        time: Date.now(),
        postid: id,
        paragraph: messageText,
        seeMore: false,
        replay: true,
        author: [userData],
      };
      if (replyTo?.commentId) {
        addNotification({
          type: "success",
          message: `Your reply to ${replyTo?.name} has been posted successfully.`,
        });
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === replyTo?.commentId
              ? { ...comment, seeMore: true }
              : comment
          )
        );
      } else {
        setComments((prev) => [comentCreated, ...prev]);
        const container = document.querySelector(".comments-holder");
        if (container) container.scrollTo({ top: 0, behavior: "smooth" });
        addNotification({
          type: "success",
          message: "Your comment has been posted successfully.",
        });
      }
      setCommentsCount((prev) => prev + 1);
      setMessageText("");
      setReplyTo({});
    } catch (err) {
      console.error("Error fetching comments", err);
      addNotification({
        type: "error",
        message: "Failed to post Your Comment",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="action-holder forComments">
      <div className="top">
        <textarea
          placeholder={
            replyTo?.commentId
              ? replyTo?.isMyComment
                ? translations?.comment?.replying_to_yourself
                : `${translations?.comment?.reply_to} ${replyTo?.name}`
              : translations?.comment?.post_a_comment
          }
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
            src={userData?.img?.url || "/users/default.png"}
            alt={"user"}
            width={40}
            height={40}
          />
          {userData?.fristname} {userData?.lastname}
        </div>
        <div className="right">
          {screenSize === "large" && (
            <BsEmojiSmile onClick={(e) => handleMenus(e, "emojiHolder")} />
          )}
          <MdOutlinePhotoSizeSelectActual
            onClick={() => inputFileRef.current.click()}
          />
          <button
            className={`main-button ${loading ? "loading" : ""}`}
            onClick={handleCreateComment}
            disabled={messageText === "" || loading}
          >
            <span>
              {replyTo?.commentId
                ? replyTo?.isMyComment
                  ? translations?.comment?.replying_to_yourself
                  : `${translations?.comment?.reply_to} ${replyTo?.name}`
                : translations?.comment?.post_a_comment}
            </span>
            <div className="lds-dual-ring"></div>
          </button>
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
