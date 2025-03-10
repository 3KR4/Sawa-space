import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/Comment";
import TypeComment from "@/components/TypeComment";
import ReactsHolder from "@/components/ReactsHolder";
import ContentLoader from "react-content-loader";

import { DynamicMenusContext } from "@/app/contexts/DynamicMenus";
import { InputActionsContext } from "@/app/contexts/InputActionsContext";
import { MenusContext } from "@/app/contexts/MenusContext";
import { ScreenContext } from "@/app/contexts/ScreenContext";
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
  const { setDataSwiperType, setDataForSwiper, setImgFocus, setImgIndex } =
    useContext(MenusContext);

  const { handleMenus, setOpenUsersReact } = useContext(DynamicMenusContext);
  const { setMessageText } = useContext(InputActionsContext);
  const { screenSize } = useContext(ScreenContext);

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0); // Adjust as needed
  }, []);

  return (
    <div className={`post`}>
      {!seeComments ? (
        <>
          <div className="top">
            <div className="left">
              <Image
                className="rounded"
                src={data.user.img || "/users/default.png"}
                alt={data.user.name}
                width={40}
                height={40}
                onClick={(e) => handleMenus(e, "userInfo", data.user.id)}
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
                  <div key={index}>
                    {data?.link.length === 1 ? null : `${index + 1} -`}

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
                  <button
                    key={index}
                    onClick={(e) => handleMenus(e, "userInfo", x.userId)}
                  >
                    @{x.userName}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="bottom">
            <div
              className="left emojesCounter"
              onClick={(e) => {
                setOpenUsersReact("post");
                handleMenus(e, "usersReact", data.id);
              }}
            >
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
            {loading ? (
              // Display skeleton loader while loading
              <>
                <ContentLoader
                  className="skeleton skeleton-comment"
                  width="100%"
                  height={120}
                  viewBox="0 0 600 120"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#e0e0e0"
                >
                  {/* Profile Picture */}
                  <circle cx="35" cy="35" r="18" />

                  {/* Comment Text & Timestamp */}
                  <rect x="65" y="15" rx="5" ry="5" width="200" height="12" />
                  <rect x="65" y="35" rx="5" ry="5" width="150" height="10" />
                  <rect x="65" y="55" rx="5" ry="5" width="400" height="10" />
                  <rect x="65" y="75" rx="5" ry="5" width="300" height="10" />

                  {/* Like/Reply Button */}
                  <rect x="540" y="80" rx="5" ry="5" width="60" height="10" />
                </ContentLoader>
                <ContentLoader
                  className="skeleton skeleton-comment"
                  width="100%"
                  height={120}
                  viewBox="0 0 600 120"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#e0e0e0"
                >
                  {/* Profile Picture */}
                  <circle cx="35" cy="35" r="18" />

                  {/* Comment Text & Timestamp */}
                  <rect x="65" y="15" rx="5" ry="5" width="200" height="12" />
                  <rect x="65" y="35" rx="5" ry="5" width="150" height="10" />
                  <rect x="65" y="55" rx="5" ry="5" width="400" height="10" />
                  <rect x="65" y="75" rx="5" ry="5" width="300" height="10" />

                  {/* Like/Reply Button */}
                  <rect x="540" y="80" rx="5" ry="5" width="60" height="10" />
                </ContentLoader>
              </>
            ) : // If not loading, display the comments or the "no comments" message
            data.comments.allComments &&
              Array.isArray(data.comments.allComments) &&
              data.comments.allComments.length > 0 ? (
              data.comments.allComments.map((comment, index) => (
                <Comment key={index} data={comment} />
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
