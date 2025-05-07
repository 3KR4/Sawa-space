"use client";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import ReactsHolder from "@/components/post/ReactsHolder";
import Image from "next/image";
import { useLanguage } from "@/Contexts/LanguageContext";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { ScreenContext } from "@/Contexts/ScreenContext";
import ConvertTime from "@/utils/ConvertTime";
import { useNotification } from "@/Contexts/NotificationContext";
import { postService } from "@/services/api/postService";
import { MenusContext } from "@/Contexts/MenusContext";
import { InputActionsContext } from "@/Contexts/InputActionsContext";

import { MdOutlineAddReaction } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

function Comment({
  data,
  isMyPost,
  replyTo,
  setReplyTo,
  setEditedComment,
  level = 0,
}) {
  const { userData } = useContext(ScreenContext);
  const { translations, locale } = useLanguage();
  const { addNotification } = useNotification();

  const isMyComment = data && data?.author[0]?._id == userData?._id;
  const { setMessageText } = useContext(InputActionsContext);
  const { someThingHappen, setSomeThingHappen } = useContext(MenusContext);
  const { handleMenus, setOpenUsersReact } = useContext(DynamicMenusContext);

  const [seeReplays, setSeeReplays] = useState(false);
  const [reactsHolder, setReactsHolder] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);

  const fetchingReplyies = async () => {
    try {
      const responce = await postService.getReplys(data?.postid, data?._id);
      setReplies(responce.data.data);
      setRepliesLoaded(true);
    } catch (err) {
      addNotification({
        type: "error",
        message: "cannot load replies",
      });
    }
  };
  const handleToggleReplies = () => {
    setSeeReplays((prev) => !prev);
    setRepliesLoaded((prev) => !prev);
    setReplyTo({});
    if (!repliesLoaded && data?.seeMore) {
      fetchingReplyies();
    }
  };
  useEffect(() => {
    if (someThingHappen?.type === "reply") {
      setReplies((prev) =>
        prev.map((reply) =>
          reply._id === someThingHappen.replyTo
            ? { ...reply, seeMore: true }
            : reply
        )
      );
      setSomeThingHappen("");
    }
  }, [someThingHappen.type]);

  useEffect(() => {
    if (someThingHappen?.type === "nested_comment") {
      setReplies((prev) =>
        prev.map((reply) =>
          reply._id === someThingHappen.data._id ? someThingHappen.data : reply
        )
      );
      setSomeThingHappen("");
    }
  }, [someThingHappen.data]);

  let focused =
    replyTo?.commentId == data?._id ||
    someThingHappen?.comment?.data?._id === data?._id;
  let replyFocused = replyTo?.commentId == data?._id;
  let editFocused = someThingHappen?.comment?.data?._id === data?._id;

  useEffect(() => {
    editFocused && setSeeReplays(false);
  }, [someThingHappen.comment]);

  useEffect(() => {
    if (someThingHappen.nisted) {
      setReplies((prev) =>
        prev.filter((reply) => reply._id !== someThingHappen.id)
      );
      setSomeThingHappen("");
    }
  }, [someThingHappen.nisted]);

  return (
    <div key={data?._id} className={`comment ${focused ? "reply" : ""}`}>
      <div className="image-holder">
        <Image
          className="rounded"
          src={data?.author[0]?.img?.url || "/users/default.svg"}
          alt="Comment Image"
          width={40}
          height={40}
          unoptimized
          onClick={(e) => handleMenus(e, "user-Info", data?.author[0]?._id)}
        />
        <span></span>
      </div>
      <div className="content">
        <div className="holder">
          <div className="top">
            <div className="left">
              <h5>
                {data?.author[0]?.firstname} {``} {data?.author[0]?.lastname}
              </h5>
              <span>{ConvertTime(data?.time, locale, "post")}</span>
            </div>
            {!focused && (isMyPost || isMyComment) && (
              <HiDotsVertical
                className="settingDotsIco"
                onClick={(e) => {
                  handleMenus(e, "settingMenu-comment", data?._id, {
                    isMyPost,
                    isMyComment,
                    comment: isMyComment ? data : null,
                    level,
                  });
                }}
              />
            )}
          </div>
          <p>{data?.paragraph}</p>
          {data?.img?.url && (
            <Image src={data?.img?.url} alt={"comment image"} fill />
          )}

          <div className="react-reply-div">
            {!focused && (
              <div style={{ display: "flex", position: "relative" }}>
                <MdOutlineAddReaction
                  onClick={() => setReactsHolder((prev) => !prev)}
                />
                {reactsHolder && (
                  <ReactsHolder
                    reactsHolder={reactsHolder}
                    setReactsHolder={setReactsHolder}
                    id={data?.id}
                  />
                )}
              </div>
            )}
            {level < 2 && !editFocused && (
              <button
                onClick={() => {
                  setSeeReplays(false);
                  setRepliesLoaded(false);
                  replyFocused
                    ? setReplyTo({})
                    : setReplyTo({
                        name: data?.author[0]?.firstname,
                        commentId: data?._id,
                        isMyComment,
                      });
                }}
              >
                {replyFocused
                  ? translations?.comment?.cancel_reply
                  : translations?.comment?.reply}
              </button>
            )}
            {editFocused && (
              <button
                onClick={() => {
                  setSomeThingHappen("");
                  setMessageText("");
                }}
              >
                {translations?.actions?.cancel_edit}
              </button>
            )}
            {data?.seeMore && data?.replay !== null && !focused && (
              <>
                |
                <div className="bottom forReply">
                  <button onClick={handleToggleReplies}>
                    {seeReplays
                      ? translations?.comment?.hide_replays
                      : `${translations?.comment?.see} ${translations?.comment?.replys}`}
                  </button>
                  <div
                    className="right emojesCounter"
                    onClick={(e) => {
                      setOpenUsersReact("post");
                      handleMenus(e, "usersReact", data.id);
                    }}
                  >
                    {data?.reacts?.topUseage.map((x, index) => (
                      <p key={index}>{x}</p>
                    ))}
                    <p>{data?.reacts?.count}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          {!focused && (
            <div className="bottom">
              {data?.seeMore && data?.replay == null && (
                <button onClick={handleToggleReplies}>
                  {seeReplays
                    ? translations?.comment?.hide_replays
                    : `${translations?.comment?.see} ${translations?.comment?.replys}`}
                </button>
              )}
              <div
                className="right emojesCounter"
                onClick={(e) => {
                  setOpenUsersReact("post");
                  handleMenus(e, "usersReact", data.id);
                }}
              >
                {data?.reacts?.topUseage.map((x, index) => (
                  <p key={index}>{x}</p>
                ))}
                <p>{data?.reacts?.count}</p>
              </div>
            </div>
          )}
        </div>

        {seeReplays &&
          replies &&
          replies.map((replay) => (
            <Comment
              key={replay._id}
              data={replay}
              isMyPost={isMyPost}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              level={level + 1}
            />
          ))}
      </div>
    </div>
  );
}

export default Comment;
