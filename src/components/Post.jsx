import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/Comment";
import TypeComment from "@/components/TypeComment";
import ReactsHolder from "@/components/ReactsHolder";

import { AllContext } from "@/app/Context";
import { IoClose } from "react-icons/io5";

import { IoLink } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import {
  MdOutlineAddReaction,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";

function Post({ data }) {
  const {
    screenSize,
    setDataSwiperType,
    dataForSwiper,
    setDataForSwiper,
    imgFocus,
    setImgFocus,
    setImgIndex,
    closeImgHolderRef,
    handleMenus,
    InputRef,
    messageText,
    setMessageText,
  } = useContext(AllContext);

  const inputFileRef = useRef(null);

  const [seeComments, setSeeComments] = useState(false);
  const [reactsHolder, setReactsHolder] = useState(false);

  const handleImageClick = (id, index) => {
    setDataSwiperType("post");
    setImgFocus(id);
    setDataForSwiper(data);
    if (index !== "") {
      setImgIndex(index);
    }
  };

  const [uploadedImg, setUploadedImg] = useState();

  const handleUploadImg = (e) => {
    const file = e.target.files[0]; // Get the first file only
    if (file && file.type.startsWith("image/")) {
      setUploadedImg(file);
    }
  };

  return (
    <div className={`post`}>
      {!seeComments ? (
        <>
          <div className="top">
            <div className="left">
              <Image
                src={data.user.img || "/users/default.png"}
                alt={data.user.name}
                width={40}
                height={40}
              />
              <div className="info">
                <h5>{data.user.name}</h5>
                <span>July 19 2018, 19:42pm</span>
              </div>
            </div>
            <HiDotsVertical
              onClick={(e) => {
                handleMenus(e, "postSettings", data.id);
              }}
            />
          </div>
          <div className="middle">
            {data.link && (
              <div className="Links">
                {data?.link?.map((x, index) => (
                  <div>
                    {index + 1} -
                    <Link key={index} href={x}>
                      {x}
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {data.paragraph && <p>{data.paragraph}</p>}

            {data.img && Array.isArray(data.img) && data.img.length > 0 ? (
              data.img.length === 1 ? (
                <div className="image">
                  <Image
                    src={data.img[0]}
                    alt="Post Image"
                    fill
                    onClick={() => {
                      handleImageClick(data.id, "");
                    }}
                  />
                </div>
              ) : (
                <div
                  className={`images ${
                    data.img.length >= 4
                      ? "big"
                      : data.img.length === 3
                      ? "mid"
                      : "small"
                  }`}
                >
                  {data.img.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Post Image ${index + 1}`}
                      fill
                      onClick={() => {
                        handleImageClick(data.id, index);
                      }}
                    />
                  ))}
                </div>
              )
            ) : null}
            {data.mentions.length > 0 && (
              <div className="mentions">
                <h5>{data.user.name} mention</h5>
                {data.mentions?.map((x, index) => (
                  <Link key={index} href={`/user/${x.userId}`}>
                    @{x.userName}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="bottom">
            <div className="left emojesCounter">
              {data.reacts.count !== 0 && (
                <>
                  {data.reacts.topUseage.map((x, index) => (
                    <p key={index}>{x}</p>
                  ))}
                  <p>{data.reacts.count}</p>
                </>
              )}
            </div>
            {screenSize !== "small" && (
              <div className="actions">
                <div>
                  <MdOutlineAddReaction
                    onClick={() => setReactsHolder((prev) => !prev)}
                  />
                  {reactsHolder && (
                    <ReactsHolder
                      reactsHolder={reactsHolder}
                      setReactsHolder={setReactsHolder}
                      id={data.id}
                    />
                  )}
                </div>
                <div>
                  <FaRegComment onClick={() => setSeeComments(true)} />
                </div>
                <div>
                  <IoLink />
                </div>
                <div>
                  <PiShareFat />
                </div>
              </div>
            )}
            <div className="right">
              <div>
                <PiShareFat />
                {data.shareCount}
              </div>
              <div>
                <FaRegComment />
                {data.comments.count}
              </div>
            </div>
          </div>
          {screenSize === "small" && (
            <div className="actions">
              <div>
                <MdOutlineAddReaction
                  onClick={() => setReactsHolder((prev) => !prev)}
                />
                {reactsHolder && (
                  <ReactsHolder
                    reactsHolder={reactsHolder}
                    setReactsHolder={setReactsHolder}
                    id={data.id}
                  />
                )}
              </div>
              <div>
                <FaRegComment
                  onClick={() => {
                    setMessageText("");
                    setSeeComments(true);
                  }}
                />
              </div>
              <div>
                <IoLink />
              </div>
              <div>
                <PiShareFat />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="comments">
          <div className="top">
            <h3>Comments ({data.comments.count})</h3>
            <IoIosClose onClick={() => setSeeComments(false)} />
          </div>
          <div className="holder">
            {data.comments &&
            Array.isArray(data.comments.allComments) &&
            data.comments.allComments.length > 0 ? (
              data.comments.allComments.map((comment) => (
                <Comment data={comment} />
              ))
            ) : (
              <div className="noCommentsYet">
                <FaRegComments />
                <h4>Nothing in here yet</h4>
                <p>Be the first to post a comment.</p>
              </div>
            )}
          </div>
          <TypeComment id={data.id} />
        </div>
      )}
    </div>
  );
}

export default Post;
