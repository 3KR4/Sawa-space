"use client";

import React from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/post/Comment";
import TypeComment from "@/components/post/TypeComment";
import ReactsHolder from "@/components/post/ReactsHolder";
import ContentLoader from "react-content-loader";
import { useLanguage } from "@/Contexts/LanguageContext";
import ConvertTime from "@/utils/ConvertTime";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { emojiMap } from "@/utils/Data";
import { useNotification } from "@/Contexts/NotificationContext";
import { postService } from "@/services/api/postService";

import { IoClose } from "react-icons/io5";
import { IoLink } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { FaRegComment, FaUsers } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import {
  MdOutlineAddReaction,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments, FaPager } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";

function Post({ data }) {
  const { translations, locale } = useLanguage();
  const { addNotification } = useNotification();
  const {
    setDataSwiperType,
    setDataForSwiper,
    setImgFocus,
    setImgIndex,
    someThingHappen,
    setSomeThingHappen,
  } = useContext(MenusContext);
  const { handleMenus, setOpenUsersReact, selectedDev } =
    useContext(DynamicMenusContext);
  const { setMessageText } = useContext(InputActionsContext);
  const { screenSize, userData } = useContext(ScreenContext);

  const postId = data?._id;
  const isMyPost = data?.author[0]?._id == userData?._id;

  const [currentPost, setCurrentPost] = useState(data || {});

  const [seeComments, setSeeComments] = useState(false);
  const [reactsHolder, setReactsHolder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState({});
  const [commentsCount, setCommentsCount] = useState(data?.commentCount);
  const [reloadComments, setReloadComments] = useState(false);

  const handleSeeComments = () => {
    setSeeComments(true);
    setPage(1); // reset to page 1
    setComments([]); // clear old comments
  };

  const fetchComments = async () => {
    if (!seeComments) return;

    setLoading(true);
    try {
      const { data } = await postService.getComments(postId, page);
      setComments((prev) => {
        const existingIds = new Set(prev.map((comment) => comment._id));
        const newUniqueComments = data?.data?.filter(
          (comment) => !existingIds.has(comment._id)
        );
        return [...prev, ...newUniqueComments];
      });
      setHasMore(page < data?.last_page);
    } catch (err) {
      console.error("Error fetching comments", err);
      addNotification({
        type: "error",
        message: "Failed to load comments. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page, seeComments, reloadComments]);

  useEffect(() => {
    if (someThingHappen?.type === "comment") {
      const combinedLimit = page * limit;

      postService.getComments(postId, 1, combinedLimit).then(({ data }) => {
        setComments(data?.data);
        setCommentsCount((prev) => Math.max(prev - 1, 0));
        setHasMore(page < data?.last_page);
        setSomeThingHappen("");
      });
    }
  }, [someThingHappen]);

  // const handleImageClick = useCallback(
  //   (id, index) => {
  //     setDataSwiperType("post");
  //     setImgFocus(id);
  //     setDataForSwiper(data);
  //     if (index !== "") {
  //       setImgIndex(index);
  //     }
  //   },
  //   [data]
  // );

  return (
    <div className={`post`}>
      {!seeComments ? (
        <>
          <div className="top">
            <div className="left">
              <Image
                className="rounded"
                src={currentPost?.author[0]?.img.url || "/users/default.png"}
                alt={`${currentPost?.author[0]?.fristname} ${currentPost?.author[0]?.lastname} img`}
                width={40}
                height={40}
                onClick={(e) =>
                  handleMenus(e, "user-Info", currentPost?.author[0]?._id)
                }
              />
              <div className="info">
                <h5>
                  {currentPost?.author[0]?.fristname} {""}
                  {currentPost?.author[0]?.lastname}
                </h5>
                <span>{ConvertTime(currentPost?.data, locale, "post")}</span>
              </div>
              {/* {currentPost?.creator == "page" ? (
                <FaPager
                  className="creatorType"
                  onClick={(e) => handleMenus(e, "page-Info", currentPost?.user.id)}
                />
              ) : currentPost?.creator == "community" ? (
                <FaUsers
                  className="creatorType"
                  onClick={(e) =>
                    handleMenus(e, "community-Info", currentPost?.user.id)
                  }
                />
              ) : null} */}
            </div>
            <HiDotsVertical
              className="settingDotsIco"
              onClick={(e) => {
                handleMenus(
                  e,
                  currentPost?.creator === "page"
                    ? "settingMenu-page-posts"
                    : "settingMenu-post",
                  currentPost?._id,
                  {
                    isMyPost,
                    isInFavorite: false,
                    isMyFriend: false,
                    isPostPage: false,
                    isFollowedPage: false,
                    isCommunity: false,
                    isMeJoinedThisCommunity: false,
                  }
                );
              }}
            />
          </div>
          <div className="middle">
            {currentPost?.link && (
              <div className="Links">
                {currentPost?.link?.map((x, index) => (
                  <div key={index}>
                    {currentPost?.link.length === 1 ? null : `${index + 1} -`}

                    <Link key={index} href={x}>
                      {x}
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {currentPost?.paragraph && <pre>{currentPost?.paragraph}</pre>}

            {currentPost?.img &&
            Array.isArray(currentPost?.img) &&
            currentPost?.img.length > 0 ? (
              currentPost?.img.length === 1 ? (
                <div className="image">
                  <Image
                    src={currentPost?.img[0].newpath.url}
                    alt="Post Image"
                    fill
                    onClick={() => {
                      handleImageClick(currentPost?._id, "");
                    }}
                  />
                </div>
              ) : (
                <div
                  className={`images ${
                    currentPost?.img.length >= 4
                      ? "big"
                      : currentPost?.img.length === 3
                      ? "mid"
                      : "small"
                  }`}
                >
                  {currentPost?.img.map((img, index) => (
                    <Image
                      key={index}
                      src={img.newpath.url}
                      alt={`Post Image ${index + 1}`}
                      fill
                      onClick={() => {
                        handleImageClick(currentPost?._id, index);
                      }}
                    />
                  ))}
                </div>
              )
            ) : null}
            {currentPost?.mentions?.length > 0 && (
              <div className="mentions view">
                <h5>
                  {currentPost?.author[0]?.fristname} {""}{" "}
                  {translations?.post?.mention}
                </h5>
                {currentPost?.mentions?.map((x, index) => (
                  <button
                    key={index}
                    onClick={(e) =>
                      handleMenus(e, "user-Info", x.author[0]?._id)
                    }
                  >
                    @{data?.author[0]?.fristname}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="bottom">
            {currentPost?.reacts &&
              Object.values(currentPost.reacts).reduce((a, b) => a + b, 0) >
                0 && (
                <div
                  className="left emojesCounter"
                  onClick={(e) => {
                    setOpenUsersReact("post");
                    handleMenus(e, "usersReact", currentPost?._id);
                  }}
                >
                  <>
                    {Object.entries(currentPost.reacts)
                      .filter(([, count]) => count > 0) // ✅ only keep non-zero
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 2)
                      .map(([reaction], index) => (
                        <p key={index}>{emojiMap[reaction]}</p>
                      ))}

                    <p>
                      {Object.values(currentPost.reacts).reduce(
                        (a, b) => a + b,
                        0
                      )}
                    </p>
                  </>
                </div>
              )}

            {screenSize !== "small" && (
              <div className="actions mid">
                <div>
                  <MdOutlineAddReaction
                    onClick={() => setReactsHolder((prev) => !prev)}
                  />
                  {reactsHolder && (
                    <ReactsHolder
                      reactsHolder={reactsHolder}
                      setReactsHolder={setReactsHolder}
                      data={data}
                      setState={setCurrentPost}
                      type={"post"}
                    />
                  )}
                </div>
                <div>
                  <FaRegComment
                    onClick={() => {
                      setSeeComments(true);
                      handleSeeComments();
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
            {currentPost?.commentsCount !== 0 && (
              <div className="right">
                {commentsCount !== 0 && (
                  <div>
                    <FaRegComment />
                    {commentsCount}
                  </div>
                )}
              </div>
            )}
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
                    id={currentPost?._id}
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
            <h3>
              {translations?.comment?.comments} ({commentsCount})
            </h3>
            <IoIosClose onClick={() => setSeeComments(false)} />
          </div>
          <div className="holder comments-holder">
            {loading && !comments.length ? (
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
            comments.length || hasMore ? (
              <>
                {comments.map((comment, index) => (
                  <Comment
                    key={index}
                    data={comment}
                    isMyPost={isMyPost}
                    replyTo={replyTo}
                    setReplyTo={setReplyTo}
                  />
                ))}
                {hasMore ? (
                  <button
                    style={{ padding: loading ? "0px" : "10px" }}
                    className={loading ? "disable view" : "view"}
                    onClick={() => !loading && setPage((prev) => prev + 1)}
                  >
                    {loading ? (
                      <div className="lds-dual-ring"></div>
                    ) : (
                      translations?.comment?.view_more
                    )}
                  </button>
                ) : page > 1 ? (
                  <p className="view">
                    {translations?.comment?.Thats_all_the_comments_or_now}
                  </p>
                ) : null}
              </>
            ) : (
              <div className="noCommentsYet">
                <FaRegComments />
                <h4>{translations?.post?.thereis_nothing_here_yet}</h4>
                <p>{translations?.post?.be_the_first_to_post_a_comment}</p>
              </div>
            )}
          </div>

          <TypeComment
            id={currentPost?._id}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            setComments={setComments}
            setCommentsCount={setCommentsCount}
          />
        </div>
      )}
    </div>
  );
}

export default Post;
