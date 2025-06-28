"use client";
import "@/Styles/components/actions-holder.css";

import { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import { fetchingContext } from "@/Contexts/fetchingContext";

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
  const { screenSize, userData } = useContext(fetchingContext);
  const { addNotification } = useNotification();
  const { someThingHappen, setSomeThingHappen } = useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { locale, translations } = useLanguage();
  const { messageText, setMessageText, InputRef } =
    useContext(InputActionsContext);

  const inputFileRef = useRef(null);

  const [uploadedImg, setUploadedImg] = useState();
  const [originalImg, setOriginalImg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (someThingHappen?.comment?.data?.img) {
      setUploadedImg(someThingHappen.comment.data.img.url);
      setOriginalImg(someThingHappen.comment.data.img.url);
    }
  }, [someThingHappen?.comment]);

  const handleUploadImg = (e) => {
    const file = e.target.files[0]; // Get the first file only
    if (file && file.type.startsWith("image/")) {
      setUploadedImg(file);
    }
  };

  const handleCreateComment = async () => {
    setLoading(true);

    if (someThingHappen.comment && someThingHappen.comment.event == "edit") {
      const commentId = someThingHappen.comment.data._id;

      const commentBody = {
        paragraph: messageText,
      };

      try {
        await postService.editComment(commentId, commentBody);

        // 🟡 CASE: Remove image if user deleted it during edit
        if (!uploadedImg && originalImg) {
          await postService.deleteCommentImg(commentId);
        }

        // 🟢 CASE: Upload new image if user added or changed it
        if (uploadedImg && uploadedImg instanceof File) {
          const formData = new FormData();
          formData.append("img", uploadedImg);
          await postService.uploadCommentImg(commentId, formData);
        }

        const updatedComment = {
          ...someThingHappen.comment.data,
          paragraph: messageText,
          img: {
            url:
              uploadedImg && !(uploadedImg instanceof File)
                ? uploadedImg
                : uploadedImg instanceof File
                ? URL.createObjectURL(uploadedImg)
                : null,
          },
        };

        addNotification({
          type: "success",
          message: `Your comment has been updated successfully`,
        });

        if (someThingHappen.comment.level == 0) {
          setComments((prev) =>
            prev.map((comment) =>
              comment._id === commentId ? updatedComment : comment
            )
          );
          setSomeThingHappen("");
        } else {
          setSomeThingHappen({
            type: "nested_comment",
            event: "edit",
            data: updatedComment,
          });
        }

        setMessageText("");
        setUploadedImg(null);
        setOriginalImg(null);
      } catch (err) {
        console.error("Error updating comment", err);

        if (userData && userData?._id) {
          addNotification({
            type: "error",
            message: "Failed to update your comment",
          });
        } else {
          addNotification({
            type: "warning",
            message: "You have to log in first",
          });
        }
      } finally {
        setLoading(false);
      }
    } else {
      const commentData = {
        paragraph: messageText,
        replay: replyTo?.commentId || null,
      };

      try {
        const { data } = await postService.createComment(id, commentData);
        const commentId = data.data._id;

        // ✅ Upload image if exists
        if (uploadedImg instanceof File) {
          const formData = new FormData();
          formData.append("img", uploadedImg);
          await postService.uploadCommentImg(commentId, formData);
        }

        const commentBody = {
          ...data.data,
          author: [userData],
          img: {
            url:
              uploadedImg instanceof File
                ? URL.createObjectURL(uploadedImg)
                : uploadedImg || null,
          },
        };

        if (replyTo?.commentId) {
          addNotification({
            type: "success",
            message: `Your reply to ${replyTo?.name} has been posted successfully.`,
          });
          setSomeThingHappen({
            type: "reply",
            replyTo: replyTo?.commentId,
          });
          setComments((prev) =>
            prev.map((comment) =>
              comment._id === replyTo?.commentId
                ? { ...comment, seeMore: true }
                : comment
            )
          );
        } else {
          setComments((prev) => [commentBody, ...prev]);
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
        setUploadedImg(null);
        setOriginalImg(null);
      } catch (err) {
        console.error("Error creating comment", err);

        if (userData && userData?._id) {
          addNotification({
            type: "error",
            message: "Failed to post Your Comment",
          });
        } else {
          addNotification({
            type: "warning",
            message: "You have to log in first",
          });
        }
      } finally {
        setLoading(false);
      }
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
            src={userData?.img?.url || "/users/default.svg"}
            alt={"user"}
            width={40}
            height={40}
          />
          {userData && userData?._id
            ? `${userData?.firstname} ${userData?.lastname}`
            : "no user yet"}
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
              {someThingHappen?.comment?.data
                ? translations?.comment?.update_your_comment
                : replyTo?.commentId
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
