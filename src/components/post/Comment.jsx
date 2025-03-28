"use client";

import React from "react";
import { useState, useContext } from "react";
import ReactsHolder from "@/components/post/ReactsHolder";
import Image from "next/image";
import { useLanguage } from "@/Contexts/LanguageContext";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import ConvertTime from "@/utils/ConvertTime";

import { MdOutlineAddReaction } from "react-icons/md";

function Comment({ data }) {
  const { translations, locale } = useLanguage();

  const { setDataSwiperType, setDataForSwiper, setImgFocus, setImgIndex } =
    useContext(MenusContext);

  const { handleMenus, setOpenUsersReact } = useContext(DynamicMenusContext);

  const [seeReplays, setSeeReplays] = useState(false);
  const [reactsHolder, setReactsHolder] = useState(false);

  const handleImageClick = (id, index) => {
    setDataSwiperType("comment");
    setImgFocus(id);
    setDataForSwiper(data);
    if (index !== "") {
      setImgIndex(index);
    }
  };

  return (
    <div key={data?.id} className="comment">
      <div className="image-holder">
        <Image
          className="rounded"
          src={data?.image || "/users/default.png"}
          alt="Comment Image"
          width={40}
          height={40}
          unoptimized
          onClick={(e) => handleMenus(e, "userInfo", data?.id)}
        />
        <span></span>
      </div>
      <div className="content">
        <div className="holder">
          <div className="top">
            <div className="left">
              <h5>{data?.name}</h5>
              <span>{ConvertTime(data?.time, locale)}</span>
            </div>
            {data?.reacts?.count !== 0 && (
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
            )}
          </div>
          <p>{data?.paragraph}</p>
          {data?.img && (
            <Image
              src={data?.img}
              alt={"comment image"}
              fill
              onClick={() => handleImageClick(data)}
            />
          )}
          <div className="bottom">
            <div className="left">
              {data?.replays &&
                Array.isArray(data?.replays) &&
                data?.replays.length > 0 && (
                  <button onClick={() => setSeeReplays((prev) => !prev)}>
                    {seeReplays
                      ? `${translations?.comment?.hide_replays}`
                      : `${translations?.comment?.see} ${data?.replays.length} ${translations?.comment?.replys}`}
                  </button>
                )}
            </div>
            <div className="right">
              <div>
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
              <button>{translations?.comment?.reply}</button>
            </div>
          </div>
        </div>

        {seeReplays &&
          data?.replays.map((replay) => (
            <Comment key={replay.id} data={replay} />
          ))}
      </div>
    </div>
  );
}

export default Comment;
