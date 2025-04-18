"use client";

import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { messages, stories, processStories } from "@/utils/Data";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "@/Styles/chat.css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import ContentLoader from "react-content-loader";
import { useLanguage } from "@/Contexts/LanguageContext";
import ConvertTime from "@/utils/ConvertTime";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import Comment from "@/components/post/Comment";
import Story from "@/components/post/Story";
import ActionsBtns from "@/components/post/ActionsBtns";
import TypeComment from "@/components/post/TypeComment";

import { PiShareFat } from "react-icons/pi";
import { FaRegComments, FaPlus } from "react-icons/fa6";
import { FaRegComment, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

function SingleDetails() {
  const { translations, locale } = useLanguage();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const {
    dataSwiperType,
    dataForSwiper,
    imgFocus,
    setImgFocus,
    imgIndex,
    setImgIndex,
    usersreactMenuRef,
    usersSelectionRef,
    setOpenStoryForm,
    settingsMenuRef,
    closeImgHolderRef,
  } = useContext(MenusContext);

  const { handleMenus, setOpenUsersReact } = useContext(DynamicMenusContext);
  const { setMessageText, emojiHolderRef } = useContext(InputActionsContext);
  const { pathname, screenSize } = useContext(ScreenContext);

  const [swiperRef, setSwiperRef] = useState(null);
  const data =
    dataSwiperType === "msg" && messages.find((msg) => msg.id === imgFocus);

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(imgIndex);
    }
  }, [imgIndex, swiperRef]);

  const handleImageClick = (id, index) => {
    setImgFocus(id);
    if (index === "") {
      const mediaIndex = mediaMsgs.findIndex((msg) => msg.id == id);
      swiperRef.slideTo(mediaIndex, 500);
      setImgIndex(mediaIndex);
    } else {
      swiperRef.slideTo(index, 500);
      setImgIndex(index);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0); // Adjust as needed
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const allowedRefs = [
        settingsMenuRef,
        usersreactMenuRef,
        usersSelectionRef,
        emojiHolderRef,
      ];

      // Check if the click was inside an element with class .reactsHolder.sideMenu
      const reactsHolderElement = document.querySelector(
        ".reactsHolder.sideMenu"
      );
      const isInsideReactsHolder = reactsHolderElement?.contains(event.target);

      const isInsideAllowedRef = allowedRefs.some(
        (ref) => ref.current && ref.current.contains(event.target)
      );

      if (
        closeImgHolderRef.current &&
        !closeImgHolderRef.current.contains(event.target) &&
        !isInsideAllowedRef &&
        !isInsideReactsHolder
      ) {
        setImgFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const storySwiperRef = useRef(null);
  const userOrder = useRef([]);

  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [processedStories, setProcessedStories] = useState({});
  const [activeUserId, setActiveUserId] = useState(null);

  let latestStories = processStories(stories);

  // Process and group stories
  useEffect(() => {
    const grouped = stories.reduce((acc, story) => {
      if (!acc[story.userId]) {
        acc[story.userId] = [];
      }
      acc[story.userId].push(story);
      return acc;
    }, {});

    // Sort stories by timestamp (newest first)
    Object.keys(grouped).forEach((userId) => {
      grouped[userId].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    });

    setProcessedStories(grouped);
    userOrder.current = Object.keys(grouped);
    setActiveUserId(userOrder.current[0] || null);

    // Create latest stories array for sidebar
    const latest = Object.values(grouped).map((userStories) => ({
      ...userStories[0],
      totalStories: userStories.length,
    }));
    latestStories = latest;
  }, []);


  // Get current user's stories
  const currentUserId = userOrder.current[currentUserIndex] || null;
  const currentUserStories = currentUserId
    ? processedStories[currentUserId]
    : [];

  // Handle slide change
  const handleSlideChange = () => {
    if (!userOrder.current.length || !currentUserStories.length) return;

    if (currentStoryIndex < currentUserStories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      const nextUserIndex = (currentUserIndex + 1) % userOrder.current.length;
      setCurrentUserIndex(nextUserIndex);
      setCurrentStoryIndex(0);
      setActiveUserId(userOrder.current[nextUserIndex]);

      if (storySwiperRef.current) {
        storySwiperRef.current.slideTo(0);
      }
    }
  };

  // Get slides to display in Swiper
  const getCurrentSlides = () => {
    if (!currentUserId || !currentUserStories.length) return [];

    const slides = [currentUserStories[currentStoryIndex]];

    if (currentStoryIndex < currentUserStories.length - 1) {
      slides.push(currentUserStories[currentStoryIndex + 1]);
    } else {
      const nextUserIndex = (currentUserIndex + 1) % userOrder.current.length;
      const nextUserId = userOrder.current[nextUserIndex];
      if (nextUserId && processedStories[nextUserId]?.[0]) {
        slides.push(processedStories[nextUserId][0]);
      }
    }

    return slides;
  };

  // Handle story selection from sidebar
  const handleStorySelect = (userId) => {

    const userIdx = userOrder.current.indexOf(userId);
    if (userIdx !== -1) {
      setCurrentUserIndex(userIdx);
      setCurrentStoryIndex(0);
      setActiveUserId(userId);
      if (storySwiperRef.current) {
        storySwiperRef.current.slideTo(0);
      }
    }
  };

  return (
    <div
      ref={closeImgHolderRef}
      className={`focusedMsg ${!pathname.includes("chat") ? "forPosts" : ""} ${
        imgFocus ? "active" : ""
      } ${dataSwiperType}`}
    >
      {dataSwiperType === "post" ? (
        <div className={`post`}>
          {screenSize === "large" && (
            <div className="left-img">
              <div className="hold">
                {dataForSwiper?.img && (
                  <img
                    src={
                      dataForSwiper?.img[
                        dataForSwiper?.img.length === 1 ? 0 : imgIndex
                      ]
                    }
                    alt={
                      dataForSwiper?.user
                        ? `${dataForSwiper?.user.name}'s image`
                        : "User image"
                    }
                  />
                )}
              </div>
              {dataForSwiper?.img?.length > 1 && (
                <Swiper
                  className={`previewSmallImages`}
                  dir={direction}
                  onSwiper={setSwiperRef}
                  spaceBetween={5}
                  slidesPerView={"auto"}
                  loop={false}
                  centeredSlides={true}
                >
                  {dataForSwiper.img.map((x, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => {
                        handleImageClick(dataForSwiper.id, index);
                        console.log(index);
                      }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={x}
                        alt={`Slide ${index}`}
                        className={`${imgIndex == index ? "active" : ""}`}
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
          {loading ? (
            <ContentLoader
              className="skeleton skeleton-SingleDetails"
              width={600}
              height={600}
              viewBox="0 0 600 600"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              {/* Profile Picture */}
              <circle cx="35" cy="45" r="25" />

              {/* User Name and Timestamp */}
              <rect x="65" y="30" rx="5" ry="5" width="150" height="12" />
              <rect x="65" y="50" rx="5" ry="5" width="100" height="10" />

              <rect x="30" y="90" rx="5" ry="5" width="80" height="34" />

              <rect x="160" y="90" rx="5" ry="5" width="80" height="34" />
              <rect x="250" y="90" rx="5" ry="5" width="80" height="34" />
              <rect x="340" y="90" rx="5" ry="5" width="80" height="34" />

              <rect x="470" y="90" rx="5" ry="5" width="80" height="34" />

              {/* Post Content */}
              <rect x="35" y="145" rx="5" ry="5" width="500" height="10" />
              <rect x="35" y="165" rx="5" ry="5" width="500" height="10" />
              <rect x="35" y="185" rx="5" ry="5" width="300" height="10" />

              {/* Links */}
              <rect x="35" y="210" rx="5" ry="5" width="200" height="10" />
              <rect x="35" y="230" rx="5" ry="5" width="200" height="10" />

              {screenSize !== "large" && (
                <rect x="20" y="260" rx="5" ry="5" width="94%" height="150" />
              )}

              {/* Comments Section */}
              <circle cx="70" cy="460" r="20" />
              <rect x="100" y="445" rx="5" ry="5" width="150" height="12" />
              <rect x="100" y="470" rx="5" ry="5" width="400" height="10" />

              <circle cx="70" cy="515" r="20" />
              <rect x="100" y="500" rx="5" ry="5" width="150" height="12" />
              <rect x="100" y="525" rx="5" ry="5" width="400" height="10" />

              <circle cx="70" cy="572" r="20" />
              <rect x="100" y="555" rx="5" ry="5" width="150" height="12" />
              <rect x="100" y="580" rx="5" ry="5" width="400" height="10" />
            </ContentLoader>
          ) : (
            <div className="right-info">
              <div className="top">
                <div className="left">
                  <Image
                    src={dataForSwiper?.user?.img || "/users/default.png"}
                    alt={dataForSwiper?.user?.name}
                    width={40}
                    height={40}
                    className={`rounded`}
                    onClick={(e) => handleMenus(e, "user-Info", data?.id)}
                  />
                  <div className="info">
                    <h5>{dataForSwiper?.user?.name}</h5>
                    <span>{ConvertTime(dataForSwiper?.time, locale)}</span>
                  </div>
                </div>
                <div className="icons-holder">
                  <HiDotsVertical
                    className="settingDotsIco"
                    onClick={(e) => {
                      handleMenus(e, "settingMenu-post", dataForSwiper.id);
                    }}
                  />
                  <IoClose
                    className="close closeMenu"
                    onClick={() => {
                      setImgFocus(null);
                      setMessageText("");
                    }}
                  />
                </div>
              </div>
              <div className="bottom">
                {dataForSwiper?.reacts?.count !== 0 && (
                  <div
                    className="left emojesCounter"
                    onClick={(e) => {
                      setOpenUsersReact("post");
                      handleMenus(e, "usersReact", dataForSwiper.id);
                    }}
                  >
                    {dataForSwiper?.reacts?.topUseage.map((x, index) => (
                      <p key={index}>{x}</p>
                    ))}
                    <p>{dataForSwiper?.reacts?.count}</p>
                  </div>
                )}

                {screenSize !== "small" && (
                  <ActionsBtns id={dataForSwiper.id} />
                )}

                <div className="right">
                  <div>
                    <PiShareFat />
                    {dataForSwiper?.shareCount}
                  </div>
                  <div>
                    <FaRegComment />
                    {dataForSwiper?.comments?.count}
                  </div>
                </div>
              </div>
              {screenSize !== "large" && (
                <div className="left-img">
                  <div className="hold">
                    {dataForSwiper?.img && (
                      <img
                        src={
                          dataForSwiper?.img[
                            dataForSwiper?.img.length === 1 ? 0 : imgIndex
                          ]
                        }
                        alt={
                          dataForSwiper?.user
                            ? `${dataForSwiper?.user?.name}'s image`
                            : "User image"
                        }
                      />
                    )}
                  </div>
                  {dataForSwiper?.img?.length > 1 && (
                    <Swiper
                      className={`previewSmallImages`}
                      dir={direction}
                      onSwiper={setSwiperRef}
                      spaceBetween={5}
                      slidesPerView={"auto"}
                      loop={false}
                      centeredSlides={true}
                    >
                      {dataForSwiper.img.map((x, index) => (
                        <SwiperSlide
                          key={index}
                          onClick={() => {
                            handleImageClick(dataForSwiper.id, index);
                          }}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={x}
                            alt={`Slide ${index}`}
                            className={`${imgIndex == index ? "active" : ""}`}
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
                {dataForSwiper.link && (
                  <div className="Links">
                    {dataForSwiper?.link?.map((x, index) => (
                      <div key={index}>
                        {dataForSwiper?.link.length === 1
                          ? null
                          : `${index + 1} -`}
                        <Link key={index} href={x}>
                          {x}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                {dataForSwiper?.paragraph && <p>{dataForSwiper?.paragraph}</p>}

                {dataForSwiper?.mentions?.length > 0 && (
                  <div className="mentions view">
                    <h5>
                      {dataForSwiper.user.name} {translations?.post?.mention}
                    </h5>
                    {dataForSwiper.mentions?.map((x, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleMenus(e, "user-Info", x.userId)}
                      >
                        @{x.userName}
                      </button>
                    ))}
                  </div>
                )}

                {screenSize === "small" && (
                  <ActionsBtns id={dataForSwiper.id} />
                )}

                <div className="comments">
                  <div className="topHolderComments">
                    <div className="top">
                      <h3>
                        {translations?.comment?.comments} (
                        {dataForSwiper?.comments?.count})
                      </h3>
                    </div>
                    <div className="holder">
                      {dataForSwiper?.comments &&
                      Array.isArray(dataForSwiper?.comments?.allComments) &&
                      dataForSwiper?.comments?.allComments?.length > 0 ? (
                        dataForSwiper?.comments?.allComments.map(
                          (comment, index) => (
                            <Comment key={index} data={comment} />
                          )
                        )
                      ) : (
                        <div className="noCommentsYet">
                          <FaRegComments />
                          <h4>
                            {translations?.post?.thereis_nothing_here_yet}
                          </h4>
                          <p>
                            {translations?.post?.be_the_first_to_post_a_comment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <TypeComment id={dataForSwiper.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : dataSwiperType === "msg" ? (
        <>
          <div className="hold">
            {imgFocus && (
              <IoClose
                className="close closeMenu"
                onClick={() => setImgFocus(null)}
              />
            )}
            {data?.user !== "Bob" && <h5>{data?.user}</h5>}
            {data?.img && (
              <img
                src={data?.img}
                alt={data?.user ? `${data?.user}'s image` : "User image"}
              />
            )}
            {data?.message && <p>{data?.message}</p>}
          </div>
          {dataForSwiper?.length > 1 && (
            <Swiper
              className={`previewSmallImages`}
              dir={direction}
              onSwiper={setSwiperRef}
              spaceBetween={5}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={false}
            >
              {dataForSwiper.map((x, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => handleImageClick(x.id, index)}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={x.img}
                    alt={`Slide ${index}`}
                    className={`${imgFocus == x.id ? "active" : ""}`}
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
        </>
      ) : dataSwiperType === "comment" ? (
        <div className="hold OneImg">
          {imgFocus && (
            <IoClose
              className="close closeMenu"
              onClick={() => setImgFocus(null)}
            />
          )}
          {imgFocus?.name !== "Bob" && <h5>{imgFocus?.name}</h5>}
          {imgFocus?.img && (
            <img
              src={imgFocus?.img}
              alt={imgFocus?.name ? `${imgFocus?.name}'s image` : "User image"}
            />
          )}
          {imgFocus?.paragraph && <p>{imgFocus?.paragraph}</p>}
        </div>
      ) : (
        <div className="stories">
          {screenSize !== "small" && (
            <div className="sideStoriesSection">
              <div className="top">
                <IoClose
                  className="close"
                  onClick={() => {
                    setImgFocus(null);
                    setImgIndex(null);
                  }}
                />
                <h3>{translations?.story?.stories}</h3>
              </div>
              <div className="hold">
                <h4>{translations?.story?.your_story}</h4>
                <div
                  className="createStory"
                  onClick={() => {
                    setOpenStoryForm(true);
                    setImgFocus(null);
                    setImgIndex(null);
                  }}
                >
                  <FaPlus />
                  <div className="right">
                    <h5>{translations?.story?.create_story}</h5>
                    <p>
                      {translations?.story?.share_a_photo_or_write_something}
                    </p>
                  </div>
                </div>
              </div>
              <div className="hold">
                <h4>{translations?.story?.friends_stories}</h4>
                <div className="usersStories">
                  {latestStories.map((data, index) => (
                    <div
                      className={`singleStory ${
                        data.userId == activeUserId ? "active" : ""
                      }`}
                      key={index}
                      onClick={() => handleStorySelect(data.userId)}
                    >
                      <Image
                        className="rounded"
                        src={data?.avatar}
                        alt={data?.username}
                        width={50}
                        height={50}
                        onClick={(e) => handleMenus(e, "user-Info", data?.id)}
                      />
                      <div className="info">
                        <h5>{data?.username}</h5>
                        <span>{ConvertTime(data?.timestamp, locale)}</span>
                      </div>
                      {data?.totalStories > 1 && (
                        <span className="counter-for-story">
                          {data?.totalStories}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="storySection swiper-container">
            <div className="holder">
              <div className="navigations-icons forStories">
                {screenSize !== "small" ? (
                  <>
                    <FaAngleLeft className="custom-prev" />
                    <FaAngleRight className="custom-next" />
                  </>
                ) : (
                  <>
                    <h4>{translations?.story?.stories}</h4>
                    <div className="svg-holder">
                      <FaAngleLeft className="custom-prev" />
                      <FaAngleRight className="custom-next" />
                    </div>
                  </>
                )}
              </div>
              {loading ? (
                <ContentLoader
                  speed={2}
                  width="100%"
                  height={200}
                  viewBox="0 0 80 100"
                  backgroundColor="#E8E8E8"
                  foregroundColor="#D5D5D5"
                >
                  <circle cx="40" cy="40" r="20" />
                  <rect x="15" y="65" rx="3" ry="3" width="50" height="10" />
                </ContentLoader>
              ) : (
                <Swiper
                  onSwiper={setSwiperRef}
                  onSlideChange={handleSlideChange}
                  key={`${currentUserIndex}-${currentStoryIndex}`}
                  modules={[Navigation]}
                  speed={1000}
                  spaceBetween={10}
                  navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                  }}
                  slidesPerView={1}
                >
                  {getCurrentSlides().map((story, index) => (
                    <SwiperSlide key={`${story.userId}-${story.id}-${index}`}>
                      <Story
                        data={story}
                        storyCount={processedStories[story.userId]?.length || 0}
                        currentStoryIndex={currentStoryIndex}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <TypeComment id={currentUserStories[currentStoryIndex]?.id} />
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleDetails;
