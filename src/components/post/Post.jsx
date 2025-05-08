"use client";

import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
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
import { useNotification } from "@/Contexts/NotificationContext";
import { postService } from "@/services/api/postService";
import { useRouter } from "next/navigation";
import ColorThief from "color-thief-browser";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/Styles/chat.css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import { IoClose } from "react-icons/io5";
import { IoLink } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { FaRegComment, FaUsers } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineAddReaction } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments, FaPager } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";

function Post({ data = {}, focused = false }) {
  const normalizedData = {
    ...data,
    userreact: data?.userreact ?? null,
  };
  //! post
  const router = useRouter();
  const { translations, locale } = useLanguage();
  const { addNotification } = useNotification();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const postRef = useRef(null);
  const {
    singleProvider,
    setSingleProvider,
    someThingHappen,
    setSomeThingHappen,
  } = useContext(MenusContext);
  const { handleMenus, setOpenUsersReact, selectedDev } =
    useContext(DynamicMenusContext);
  const { setMessageText } = useContext(InputActionsContext);
  const { screenSize, userData, userPage } = useContext(ScreenContext);

  const postId = normalizedData?._id;
  const isAuthorArray = Array.isArray(normalizedData?.author);
  const author =
    isAuthorArray && normalizedData?.author[0]
      ? normalizedData.author[0]
      : null;
  const isPageArray = Array.isArray(normalizedData?.page);
  const pagee =
    isPageArray && normalizedData.page[0] ? normalizedData.page[0] : null;

  const isMyPost = author && author._id === userData?._id;
  const isMyPage = pagee && pagee._id === userPage?._id;

  // Determine post owner data (prioritize page over author)
  const postOwnerData = pagee || author;

  const [currentPost, setCurrentPost] = useState(normalizedData);
  const [swiperRef, setSwiperRef] = useState(null);

  const [seeComments, setSeeComments] = useState(false);
  const [reactsHolder, setReactsHolder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState({});
  const [editedComment, setEditedComment] = useState({});
  const [commentsCount, setCommentsCount] = useState(data?.commentCount);
  const [activeImg, setActiveImg] = useState(() => {
    const index = singleProvider?.focused_img_index || 0;
    return data?.img?.[index]?.newpath?.url || "";
  });

  const handleSeeComments = () => {
    setSeeComments(true);
    setPage(1); // reset to page 1
    setComments([]); // clear old comments
  };
  const fetchComments = async () => {
    if (!focused && !seeComments) return;

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
  }, [page, seeComments]);
  useEffect(() => {
    if (focused) {
      fetchComments();
    }
  }, []);

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

  const bottomAction = () => (
    <div className="bottom">
      <div className="left emojesCounter">
        {currentPost?.reacts && currentPost?.reactCount > 0 && (
          <>
            {Object.entries(currentPost.reacts)
              .filter(([, count]) => count > 0)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 2)
              .map(([emoji], index) => (
                <p key={index}>{emoji}</p>
              ))}

            <p>{currentPost?.reactCount}</p>
          </>
        )}
      </div>

      {screenSize !== "small" && (
        <div className="actions mid">
          <div>
            {currentPost.userreact ? (
              <span
                className="curentUserReact"
                onClick={() => setReactsHolder((prev) => !prev)}
              >
                {currentPost.userreact}
              </span>
            ) : (
              <MdOutlineAddReaction
                onClick={() => setReactsHolder((prev) => !prev)}
              />
            )}

            {reactsHolder && (
              <ReactsHolder
                reactsHolder={reactsHolder}
                setReactsHolder={setReactsHolder}
                data={currentPost}
                setState={setCurrentPost}
                type={"post"}
              />
            )}
          </div>
          {!focused && (
            <div>
              <FaRegComment
                onClick={() => {
                  setSeeComments(true);
                  handleSeeComments();
                  setTimeout(() => {
                    const element = postRef.current;
                    if (element) {
                      const headerHeight = 80; // Replace with your actual header height
                      const y =
                        element.getBoundingClientRect().top +
                        window.pageYOffset -
                        headerHeight;

                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }, 100);
                }}
              />
            </div>
          )}
          <div>
            <IoLink />
          </div>
          <div>
            <PiShareFat
              onClick={() => {
                const postUrl = `${window.location.origin}?type=${
                  author ? "user" : "page"
                }&&post=${currentPost._id}`;
                navigator.clipboard.writeText(postUrl);
              }}
            />
          </div>
        </div>
      )}
      <div className="right">
        {commentsCount !== 0 && (
          <div>
            <FaRegComment />
            {commentsCount}
          </div>
        )}
      </div>
    </div>
  );
  const renderComments = () => (
    <div className="comments">
      <div className="top">
        <h3>
          {translations?.comment?.comments} ({commentsCount})
        </h3>
        {!focused && <IoIosClose onClick={() => setSeeComments(false)} />}
      </div>
      <div className="holder comments-holder">
        {loading && !comments.length ? (
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
              <circle cx="35" cy="35" r="18" />

              <rect x="65" y="15" rx="5" ry="5" width="200" height="12" />
              <rect x="65" y="35" rx="5" ry="5" width="150" height="10" />
              <rect x="65" y="55" rx="5" ry="5" width="400" height="10" />
              <rect x="65" y="75" rx="5" ry="5" width="300" height="10" />

              <rect x="540" y="80" rx="5" ry="5" width="60" height="10" />
            </ContentLoader>
          </>
        ) : comments.length || hasMore ? (
          <>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                data={comment}
                isMyPost={isMyPost}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
                setEditedComment={setEditedComment}
              />
            ))}
            {hasMore ? (
              <button
                style={{ padding: loading ? "0px" : "10px" }}
                className={`main-button view ${loading ? "loading" : ""}`}
                onClick={() => !loading && setPage((prev) => prev + 1)}
              >
                <div className="lds-dual-ring"></div>
                <span>{translations?.comment?.view_more}</span>
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
        editedComment={editedComment}
        setComments={setComments}
        setCommentsCount={setCommentsCount}
      />
    </div>
  );

  const imgRef = useRef(null);

  const [bgColor, setBgColor] = useState("#000");
  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const handleLoad = () => {
      const colorThief = new ColorThief();
      try {
        const result = colorThief.getColor(img);
        if (result && result.length === 3) {
          setBgColor(`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
        }
      } catch (err) {
        console.warn("ColorThief error:", err);
      }
    };

    if (img.complete) {
      handleLoad(); // image already loaded
    } else {
      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }
  }, [currentPost]);

  return (
    <div
      className={`post ${
        currentPost?.isShared ? "focused-from-link post-highlight" : ""
      }`}
      ref={postRef}
    >
      {!focused ? (
        !seeComments ? (
          <>
            <div className="top">
              <div className="left">
                <Image
                  className="rounded"
                  src={
                    isMyPost
                      ? userData?.img?.url || "/users/default.svg"
                      : isMyPage
                      ? userPage?.img?.url || "/users/default.svg"
                      : postOwnerData?.img.url || "/users/default.svg"
                  }
                  alt={`${
                    postOwnerData?.firstname || postOwnerData?.pagename
                  } ${postOwnerData?.lastname} img`}
                  width={40}
                  height={40}
                  style={{
                    cursor: isMyPost ? "default" : "pointer",
                  }}
                  onClick={(e) => {
                    !isMyPost &&
                      handleMenus(e, "user-Info", postOwnerData?._id, {
                        type: currentPost?.pageId ? "page" : "user",
                      });
                  }}
                />
                <div className="info">
                  <h5>
                    {isMyPost
                      ? `${userData?.firstname} ${userData?.lastname}`
                      : isMyPage
                      ? userPage?.pagename
                      : author
                      ? `${postOwnerData?.firstname} ${postOwnerData?.lastname}`
                      : postOwnerData?.pagename}
                  </h5>
                  <span>{ConvertTime(currentPost?.data, locale, "post")}</span>
                </div>
                {pagee && <FaPager className="creatorType" />}

                {/* // currentPost?.creator == "community" ? (
                //   <FaUsers
                //     className="creatorType"
                //     onClick={(e) =>
                //       handleMenus(e, "community-Info", postOwnerData)
                //     }
                //   />
                // ) : null} */}
              </div>
              {userData && userData._id && (
                <HiDotsVertical
                  className="settingDotsIco"
                  onClick={(e) => {
                    handleMenus(e, "settingMenu-post", currentPost?._id, {
                      isMyPost,
                      isMyPage,
                      isInFavorite: false,
                      postOwner: postOwnerData?._id,
                      isMyFriend: userData?.friends?.includes(
                        currentPost?.author[0]?._id
                      ),
                      isSendedFriendRequest:
                        userData?.friendRequests?.sent?.includes(
                          currentPost?.author[0]?._id
                        ),
                      isReceivedFriendRequest:
                        userData?.friendRequests?.received?.includes(
                          currentPost?.author[0]?._id
                        ),
                      isPostPage: currentPost.pageId ? true : false,
                      isFollowedPage: false,
                      isCommunity: false,
                      isMeJoinedThisCommunity: false,
                      setCurrentPost,
                    });
                  }}
                />
              )}
            </div>
            <div className="middle">
              {currentPost?.link && (
                <div className="Links">
                  {currentPost?.link?.map((x, index) => (
                    <div key={index}>
                      {currentPost?.link.length === 1 ? null : `${index + 1} -`}

                      <a
                        key={index}
                        href={x}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {x}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {currentPost?.paragraph && <pre>{currentPost?.paragraph}</pre>}

              {currentPost?.img &&
              Array.isArray(currentPost?.img) &&
              currentPost?.img.length > 0 ? (
                currentPost?.img.length === 1 ? (
                  <div
                    className="image"
                    style={{
                      backgroundColor: bgColor,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      ref={imgRef}
                      src={currentPost?.img[0].newpath.url}
                      alt="Post Image"
                      fill
                      onClick={() => {
                        setSingleProvider({
                          type: "post",
                          sharing_data: currentPost,
                        });
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
                          setSingleProvider({
                            type: "post",
                            sharing_data: currentPost,
                            focused_img_index: index,
                          });
                        }}
                      />
                    ))}
                  </div>
                )
              ) : null}
              {/* {currentPost?.mentions?.length > 0 && (
                <div className="mentions view">
                  <h5>
                    {postOwnerData?.firstname} {""}{" "}
                    {translations?.post?.mention}
                  </h5>
                  {currentPost?.mentions?.map((x, index) => (
                    <button
                      key={index}
                      onClick={(e) =>
                        handleMenus(e, "user-Info", x.author[0]?._id)
                      }
                    >
                      @{data?.author[0]?.firstname || data?.page[0]?.pagename}
                    </button>
                  ))}
                </div>
              )} */}
            </div>
            {bottomAction()}
            {screenSize === "small" && (
              <div className="actions">
                <div>
                  {currentPost.userreact ? (
                    <span
                      className="curentUserReact"
                      onClick={() => setReactsHolder((prev) => !prev)}
                    >
                      {currentPost.userreact}
                    </span>
                  ) : (
                    <MdOutlineAddReaction
                      onClick={() => setReactsHolder((prev) => !prev)}
                    />
                  )}
                  {reactsHolder && (
                    <ReactsHolder
                      reactsHolder={reactsHolder}
                      setReactsHolder={setReactsHolder}
                      data={currentPost}
                      setState={setCurrentPost}
                      type={"post"}
                    />
                  )}
                </div>
                <div>
                  <FaRegComment
                    onClick={() => {
                      setMessageText("");
                      setSeeComments(true);
                      setTimeout(() => {
                        const element = postRef.current;
                        if (element) {
                          const headerHeight = 80; // Replace with your actual header height
                          const y =
                            element.getBoundingClientRect().top +
                            window.pageYOffset -
                            headerHeight;

                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }, 100);
                    }}
                  />
                </div>
                <div>
                  <IoLink />
                </div>
                <div>
                  <PiShareFat
                    onClick={() => {
                      const postUrl = `${window.location.origin}?post=${currentPost._id}`;
                      navigator.clipboard.writeText(postUrl);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          renderComments()
        )
      ) : (
        <>
          {screenSize === "large" && (
            <div className="left-img">
              <div className="hold">
                {currentPost?.img && (
                  <img
                    src={activeImg}
                    alt={
                      postOwnerData
                        ? `${postOwnerData?.firstname}'s image`
                        : "User image"
                    }
                  />
                )}
              </div>
              {currentPost?.img?.length > 1 && (
                <Swiper
                  ref={swiperRef}
                  onSwiper={setSwiperRef}
                  className={`previewSmallImages`}
                  dir={direction}
                  spaceBetween={5}
                  slidesPerView={"auto"}
                  loop={false}
                  centeredSlides={true}
                >
                  {currentPost.img.map((x, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => {
                        swiperRef.slideTo(index);
                        setActiveImg(x?.newpath?.url);
                      }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={x.newpath.url}
                        alt={`Slide ${index}`}
                        className={`${
                          activeImg == x.newpath.url ? "active" : ""
                        }`}
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}
          {!currentPost ? (
            <ContentLoader
              className="skeleton skeleton-SingleDetails"
              width={600}
              height={600}
              viewBox="0 0 600 600"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              {/* ... skeleton loader content ... */}
            </ContentLoader>
          ) : (
            <div className="right-info">
              <div className="top">
                <div className="left">
                  <Image
                    src={
                      isMyPost
                        ? userData?.img?.url || "/users/default.svg"
                        : postOwnerData?.img.url || "/users/default.svg"
                    }
                    style={{
                      cursor: isMyPost ? "default" : "pointer",
                    }}
                    alt={`${postOwnerData?.firstname} ${postOwnerData?.lastname}`}
                    width={40}
                    height={40}
                    className={`rounded`}
                    onClick={(e) =>
                      !isMyPost &&
                      handleMenus(e, "user-Info", postOwnerData?._id, {
                        type: currentPost?.pageId ? "page" : "user",
                      })
                    }
                  />
                  <div className="info">
                    <h5>
                      {postOwnerData?.firstname} {postOwnerData?.lastname}
                    </h5>
                    <span>{ConvertTime(currentPost?.data, locale)}</span>
                  </div>
                </div>
                <div className="icons-holder">
                  {userData && userData._id && (
                    <HiDotsVertical
                      className="settingDotsIco"
                      onClick={(e) => {
                        handleMenus(e, "settingMenu-post", currentPost?._id, {
                          isMyPost,
                          isMyPage,
                          isInFavorite: false,
                          postOwner: postOwnerData?._id,
                          isMyFriend: userData?.friends?.includes(
                            currentPost?.author[0]?._id
                          ),
                          isSendedFriendRequest:
                            userData?.friendRequests?.sent?.includes(
                              currentPost?.author[0]?._id
                            ),
                          isReceivedFriendRequest:
                            userData?.friendRequests?.received?.includes(
                              currentPost?.author[0]?._id
                            ),
                          isPostPage: currentPost.pageId ? true : false,
                          isFollowedPage: false,
                          isCommunity: false,
                          isMeJoinedThisCommunity: false,
                          setCurrentPost,
                        });
                      }}
                    />
                  )}
                  <IoClose
                    className="close closeMenu"
                    onClick={() => {
                      const baseUrl =
                        window.location.origin + window.location.pathname;
                      window.history.pushState({}, "", baseUrl);
                      setSingleProvider(null);
                      setMessageText("");
                    }}
                  />
                </div>
              </div>
              {screenSize !== "small" && bottomAction()}
              {screenSize !== "large" && (
                <div className="left-img">
                  <div className="hold">
                    {currentPost?.img && (
                      <img
                        src={activeImg}
                        alt={
                          postOwnerData
                            ? `${postOwnerData?.firstname}'s image`
                            : "User image"
                        }
                      />
                    )}
                  </div>
                  {currentPost?.img?.length > 1 && (
                    <Swiper
                      ref={swiperRef}
                      onSwiper={setSwiperRef}
                      className={`previewSmallImages`}
                      dir={direction}
                      spaceBetween={5}
                      slidesPerView={"auto"}
                      loop={false}
                      centeredSlides={screenSize === "small" ? false : true}
                    >
                      {currentPost.img.map((x, index) => (
                        <SwiperSlide
                          key={index}
                          onClick={() => {
                            swiperRef.slideTo(index);
                            setActiveImg(x?.newpath?.url);
                          }}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={x.newpath.url}
                            alt={`Slide ${index}`}
                            className={`${
                              activeImg == x.newpath.url ? "active" : ""
                            }`}
                            style={{
                              maxWidth: "90%",
                              maxHeight: "90%",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              )}
              <div className="middle">
                {currentPost?.link && (
                  <div className="Links">
                    {currentPost?.link?.map((x, index) => (
                      <div key={index}>
                        {currentPost?.link.length === 1
                          ? null
                          : `${index + 1} -`}
                        <a
                          key={index}
                          href={x}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {x}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                {currentPost?.paragraph && <p>{currentPost?.paragraph}</p>}
                {/* 
                {currentPost?.mentions?.length > 0 && (
                  <div className="mentions view">
                    <h5>
                      {postOwnerData?.firstname} {translations?.post?.mention}
                    </h5>
                    {currentPost?.mentions?.map((x, index) => (
                      <button
                        key={index}
                        onClick={(e) =>
                          handleMenus(e, "user-Info", x.author[0]?._id)
                        }
                      >
                        @{currentPost.author[0]?.firstname}
                      </button>
                    ))}
                  </div>
                )} */}
                {screenSize === "small" && bottomAction()}

                {screenSize === "small" && (
                  <div className="actions">
                    <div>
                      {currentPost.userreact ? (
                        <span
                          className="curentUserReact"
                          onClick={() => setReactsHolder((prev) => !prev)}
                        >
                          {currentPost.userreact}
                        </span>
                      ) : (
                        <MdOutlineAddReaction
                          onClick={() => setReactsHolder((prev) => !prev)}
                        />
                      )}
                      {reactsHolder && (
                        <ReactsHolder
                          reactsHolder={reactsHolder}
                          setReactsHolder={setReactsHolder}
                          data={currentPost}
                          setState={setCurrentPost}
                          type={"post"}
                        />
                      )}
                    </div>
                    {!focused && (
                      <div>
                        <FaRegComment
                          onClick={() => {
                            setSeeComments(true);
                            handleSeeComments();
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <IoLink />
                    </div>
                    <div>
                      <PiShareFat
                        onClick={() => {
                          const postUrl = `${window.location.origin}?post=${currentPost._id}`;
                          navigator.clipboard.writeText(postUrl);
                        }}
                      />
                    </div>
                  </div>
                )}

                {renderComments()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Post;
