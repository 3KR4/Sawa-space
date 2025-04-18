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

import { MdOutlineAddReaction } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

function Comment({ data, isMyPost, replyTo, setReplyTo, level = 0 }) {
  const { userData } = useContext(ScreenContext);
  const { translations, locale } = useLanguage();
  const { addNotification } = useNotification();

  const isMyComment = data?.author[0]?._id == userData?._id;

  const { someThingHappen, setSomeThingHappen } = useContext(MenusContext);
  const { handleMenus, setOpenUsersReact } = useContext(DynamicMenusContext);

  const [seeReplays, setSeeReplays] = useState(false);
  const [reactsHolder, setReactsHolder] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);

  // const handleImageClick = (id, index) => {
  //   setDataSwiperType("comment");
  //   setImgFocus(id);
  //   setDataForSwiper(data);
  //   if (index !== "") {
  //     setImgIndex(index);
  //   }
  // };

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
    setReplyTo({});
    if (!repliesLoaded && data?.seeMore) {
      fetchingReplyies();
    }
  };
  useEffect(() => {
    if (
      someThingHappen?.type === "comment" &&
      someThingHappen?.type === "reply"
    ) {
      fetchingReplyies();
      setSomeThingHappen("");
    }
  }, [someThingHappen]);
  return (
    <div
      key={data?._id}
      className={`comment ${replyTo?.commentId == data?._id ? "reply" : ""}`}
    >
      <div className="image-holder">
        <Image
          className="rounded"
          src={data?.author[0]?.img?.url || "/users/default.png"}
          alt="Comment Image"
          width={40}
          height={40}
          unoptimized
          onClick={(e) => handleMenus(e, "user-Info", data?.author[0]._id)}
        />
        <span></span>
      </div>
      <div className="content">
        <div className="holder">
          <div className="top">
            <div className="left">
              <h5>
                {data?.author[0]?.fristname} {``} {data?.author[0]?.lastname}
              </h5>
              <span>{ConvertTime(data?.time, locale, "post")}</span>
            </div>
            {replyTo?.commentId !== data?._id && (isMyPost || isMyComment) && (
              <HiDotsVertical
                className="settingDotsIco"
                onClick={(e) => {
                  handleMenus(e, "settingMenu-comment", data?._id, {
                    isMyPost,
                    isMyComment,
                  });
                }}
              />
            )}
          </div>
          <p>{data?.paragraph}</p>
          {/* <Image
            src={data?.img || "/chat7.png"}
            alt={"comment image"}
            fill
            onClick={() => handleImageClick(data)}
          /> */}
          <div className="react-reply-div">
            {replyTo?.commentId !== data?._id && (
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
            {level < 2 && (
              <button
                onClick={() => {
                  setSeeReplays(false);
                  replyTo?.commentId == data?._id
                    ? setReplyTo({})
                    : setReplyTo({
                        name: data?.author[0]?.fristname,
                        commentId: data?._id,
                        isMyComment,
                      });
                }}
              >
                {replyTo?.commentId == data?._id
                  ? translations?.comment?.cancel_reply
                  : translations?.comment?.reply}
              </button>
            )}
            {data?.seeMore &&
              data?.replay !== null &&
              replyTo?.commentId !== data?._id && (
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
          {replyTo?.commentId !== data?._id && (
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
