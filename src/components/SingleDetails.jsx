"use client";

import React from "react";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { messages, stories, processStories } from "@/utils/Data";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "@/Styles/chat.css";
import "@/Styles/user.css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { storyService } from "@/services/api/storyService";
import { useNotification } from "@/Contexts/NotificationContext";
import Post from "@/components/post/Post";
import Product from "@/components/shop/Product";
import ImageCropper from "@/components/ImageCropper";
import { useForm } from "react-hook-form";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import ContentLoader from "react-content-loader";

import { IoMdResize } from "react-icons/io";
import { useLanguage } from "@/Contexts/LanguageContext";
import ConvertTime from "@/utils/ConvertTime";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import Comment from "@/components/post/Comment";
import Story from "@/components/post/Story";
import ActionsBtns from "@/components/post/ActionsBtns";
import TypeComment from "@/components/post/TypeComment";
import { pageService } from "@/services/api/pageService";

import { PiShareFat } from "react-icons/pi";
import { FaPause, FaPlus, FaRotate } from "react-icons/fa6";
import {
  FaPlay,
  FaAngleRight,
  FaAngleLeft,
  FaTrashAlt,
  FaShoppingCart,
} from "react-icons/fa";

import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { BsFillPostcardFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";

import { IoInformationCircleSharp } from "react-icons/io5";

function SingleDetails() {
  const { addNotification } = useNotification();

  const { translations, locale } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const {
    dataSwiperType,
    dataForSwiper,
    imgIndex,
    usersreactMenuRef,
    usersSelectionRef,
    setOpenStoryForm,
    settingsMenuRef,
    closeImgHolderRef,
    singleProvider,
    setSingleProvider,
    someThingHappen,
    infoMenuRef,
    shareFomrRef,
    dangerEventRef,
  } = useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { emojiHolderRef } = useContext(InputActionsContext);
  const {
    pathname,
    screenSize,
    stories,
    userData,
    userPage,
    currentUserStory,
    setUserPage,
  } = useContext(ScreenContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const allowedRefs = [
        settingsMenuRef,
        usersreactMenuRef,
        usersSelectionRef,
        emojiHolderRef,
        infoMenuRef,
        shareFomrRef,
        dangerEventRef,
      ];

      // Check if the click was inside an element with class .reactsHolder.sideMenu
      const reactsHolderElement = document.querySelector(
        ".reactsHolder.sideMenu"
      );
      const storyFormBody = document.querySelector(
        ".focusedMsg.FormMenu.story-form"
      );
      const shareFormBody = document.querySelector(".focusedMsg.share");
      const dangerEventBody = document.querySelector(
        ".focusedMsg.danger-event"
      );

      const isInsideReactsHolder = reactsHolderElement?.contains(event.target);
      const isInsideStoryForm = storyFormBody?.contains(event.target);
      const isInsideShareForm = shareFormBody?.contains(event.target);
      const isInsideDangerEvent = dangerEventBody?.contains(event.target);

      const isInsideAllowedRef = allowedRefs.some(
        (ref) => ref.current && ref.current.contains(event.target)
      );

      if (
        closeImgHolderRef.current &&
        !closeImgHolderRef.current.contains(event.target) &&
        !isInsideAllowedRef &&
        !isInsideReactsHolder &&
        !isInsideStoryForm &&
        !isInsideShareForm &&
        !isInsideDangerEvent
      ) {
        setSingleProvider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //! msg
  const [swiperRef, setSwiperRef] = useState(null);
  const data =
    dataSwiperType === "msg" && messages.find((msg) => msg.id === imgFocus);

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(imgIndex);
    }
  }, [imgIndex, swiperRef]);

  //! stories
  const storySwiperRef = useRef(null);
  const intervalRef = useRef(null);

  const [userStories, setUserStories] = useState(
    singleProvider?.shared_data || []
  );
  const [loadingStories, setLoadingStories] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(-1);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  const currentUserIndex = stories.findIndex(
    (s) => s.author?.[0]?._id === singleProvider.id
  );
  const hasPrevUser = currentUserIndex > 0;
  const hasNextUser = currentUserIndex < stories.length - 1;

  const goToPrev = () => {
    if (!storySwiperRef.current) return;

    const swiper = storySwiperRef.current;
    if (swiper.activeIndex > 0) {
      swiper.slidePrev();
    } else if (hasPrevUser) {
      const prevUser = stories[currentUserIndex - 1]?.author?.[0];
      if (prevUser) {
        setSingleProvider((prev) => ({ ...prev, id: prevUser._id }));
      }
    }
    // Reset timer when manually navigating
    startAutoAdvance();
  };

  const goToNext = () => {
    if (!storySwiperRef.current) return;

    const swiper = storySwiperRef.current;
    if (swiper.activeIndex < userStories.length - 1) {
      swiper.slideNext();
    } else if (hasNextUser) {
      const nextUser = stories[currentUserIndex + 1]?.author?.[0];
      if (nextUser) {
        setSingleProvider((prev) => ({ ...prev, id: nextUser._id }));
      }
    }
    // Reset timer when manually navigating
    startAutoAdvance();
  };

  const startAutoAdvance = () => {
    clearInterval(intervalRef.current);

    if (!storySwiperRef.current || isPaused || !userStories.length) return;

    // Reset the active index to trigger fresh animation
    if (storySwiperRef.current.activeIndex === 0) {
      setActiveStoryIndex(-1);
      setTimeout(() => setActiveStoryIndex(0), 50);
    }

    intervalRef.current = setInterval(() => {
      const swiper = storySwiperRef.current;
      if (!swiper) return;

      if (swiper.activeIndex < userStories.length - 1) {
        swiper.slideNext();
      } else if (hasNextUser) {
        clearInterval(intervalRef.current);
        const nextUser = stories[currentUserIndex + 1]?.author?.[0];
        if (nextUser) {
          setSingleProvider((prev) => ({ ...prev, id: nextUser._id }));
        }
      } else {
        clearInterval(intervalRef.current);
      }
    }, 5000);
  };

  const handlePausePlay = () => {
    setIsPaused((prev) => {
      const newPaused = !prev;
      if (!newPaused && storySwiperRef.current?.activeIndex === 0) {
        // Special handling for first slide when resuming
        setActiveStoryIndex(-1);
        setTimeout(() => setActiveStoryIndex(0), 50);
      }
      return newPaused;
    });
  };

  const fetchStoriesBerUser = async () => {
    setLoadingStories(singleProvider.id);
    try {
      const { data } = await storyService.getUserStories(singleProvider.id);
      setUserStories(data.data);
    } catch (err) {
      console.error("Error fetching stories", err);
      addNotification({
        type: "error",
        message:
          translations?.story?.failed_to_load || "Failed to load stories",
      });
    } finally {
      setLoadingStories(null);
    }
  };

  useEffect(() => {
    const shouldFetch =
      (singleProvider?.id && singleProvider?.type === "stories") ||
      (someThingHappen.type === "stories" &&
        someThingHappen.event === "delete");

    if (shouldFetch) {
      fetchStoriesBerUser();
    }
  }, [singleProvider?.id, singleProvider?.type, someThingHappen]);

  useEffect(() => {
    startAutoAdvance();
    return () => clearInterval(intervalRef.current);
  }, [storySwiperRef.current, userStories, isPaused, currentUserIndex]);

  useEffect(() => {
    if (storySwiperRef.current && userStories.length) {
      storySwiperRef.current.slideTo(0);
      setActiveStoryIndex(0); // Reset active index
      startAutoAdvance();
    }
  }, [userStories]);

  useEffect(() => {
    if (userStories.length === 0 && singleProvider?.id) {
      // find next user with stories
      const otherUsersWithStories = stories.filter(
        (story) => story.author[0]._id !== singleProvider.id
      );

      if (otherUsersWithStories.length > 0) {
        const nextUser = otherUsersWithStories[0].author[0];
        setSingleProvider((prev) => ({
          ...prev,
          id: nextUser?._id,
        }));
      } else {
        setSingleProvider({});
      }
    }
  }, [userStories]);

  //! Page
  const [currentPagePosition, setCurrentPagePosition] = useState(0);
  const [pageImage, setPageImage] = useState(null);
  const [pageCover, setPageCover] = useState(null);
  const [seeAllAbout, setSeeAllAbout] = useState(false);

  const [pageImageURL, setPageImageURL] = useState(null);
  const [pageCoverURL, setPageCoverURL] = useState(null);
  const [pageName, setPageName] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  const [pageInfo, setPageInfo] = useState([
    { key: "bio", value: "" },
    { key: "page category", value: "" },
    { key: "Contact number", value: "" },
    { key: "address", value: "" },
    { key: "website", value: "" },
  ]);
  const [pageInfoError, setPageInfoError] = useState(false);

  const infoObject = Object.fromEntries(
    pageInfo.map((item) => [item.key, item.value])
  );

  const placeHolders = {
    page_category: "your_page_category",
    contact_number: "your_contact_number",
    address: "your_company_address",
    website: "your_website_link",
  };

  useEffect(() => {
    setPageInfoError(false);
  }, [pageInfo]);

  const addInfo = () => {
    const hasEmptyField = pageInfo.some(
      (info) => !info.key.trim() || !info.value.trim()
    );

    if (hasEmptyField) {
      setPageInfoError(true);
      return;
    }

    setPageInfoError(false);
    setPageInfo([...pageInfo, { key: "", value: "" }]);
  };

  const removeInfo = (index) => {
    const updatedInfo = [...pageInfo];
    updatedInfo.splice(index, 1);
    setPageInfo(updatedInfo);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInfo = [...pageInfo];
    updatedInfo[index][field] = value;
    setPageInfo(updatedInfo);
  };

  const isFirstStepDisable =
    !pageName.trim() ||
    !pageInfo.find((info) => info.key === "bio")?.value.trim();

  const pageImageInputRef = useRef();
  const pageCoverInputRef = useRef();

  const createPage = async (e) => {
    e.preventDefault();
    setPageLoading(true);

    try {
      const Data = {
        pagename: pageName,
        info: infoObject,
      };

      const createPageRes = await pageService.createPage(Data);
      const pageId = createPageRes.data.pageid;

      if (pageImage) {
        const formData = new FormData();
        formData.append("img", pageImage);
        await pageService.page_img_cover("img", formData);
      }
      if (pageCover) {
        const formData = new FormData();
        formData.append("img", pageCover);
        await pageService.page_img_cover("cover", formData);
      }

      const getPageRes = await pageService.getPageData(pageId);
      const updatedPage = getPageRes.data.data;

      setUserPage(updatedPage);
      localStorage.setItem("page", JSON.stringify(updatedPage));

      addNotification({
        type: "success",
        message: "Your page has been created successfully!",
      });

      setSingleProvider(null);
    } catch (err) {
      console.error("Page creation failed:", err);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <div
      ref={closeImgHolderRef}
      className={`focusedMsg ${!pathname.includes("chat") ? "forPosts" : ""} ${
        singleProvider.type ? "active" : ""
      } ${singleProvider.type}`}
    >
      {singleProvider.type === "post" ? (
        <Post data={singleProvider?.sharing_data} focused={true} />
      ) : singleProvider.type === "product" ? (
        <Product
          data={singleProvider?.sharing_data}
          viewOwner={singleProvider?.sharing_data?.pageid === userPage?._id}
          focused={true}
        />
      ) : dataSwiperType === "comment" ? (
        <div className="hold OneImg">
          {imgFocus && (
            <IoClose
              className="close closeMenu"
              onClick={() => setSingleProvider(null)}
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
      ) : singleProvider.type === "stories" ? (
        <div className="stories">
          {screenSize !== "small" && (
            <div className="sideSection">
              <div className="top">
                <IoClose
                  className="close"
                  onClick={() => {
                    setSingleProvider({});
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
                {currentUserStory &&
                  Object.keys(currentUserStory).length > 0 && (
                    <div
                      className={`singleStory ${
                        currentUserStory?.author[0]?._id == singleProvider?.id
                          ? "active"
                          : ""
                      } ${
                        currentUserStory?.author[0]?._id == loadingStories
                          ? "loading"
                          : ""
                      }`}
                      onClick={() => {
                        setSingleProvider((prev) => ({
                          ...prev,
                          id: currentUserStory?.author[0]?._id,
                        }));
                      }}
                    >
                      <Image
                        className="rounded"
                        src={
                          currentUserStory?.author[0]?.img?.url ||
                          "/users/default.svg"
                        }
                        alt={`${currentUserStory?.firstname}-img`}
                        width={50}
                        height={50}
                        onClick={(e) =>
                          handleMenus(
                            e,
                            "user-Info",
                            currentUserStory?.author[0]?._id,
                            {
                              type: "user",
                            }
                          )
                        }
                      />
                      <div className="info">
                        <h5>{translations?.actions?.you}</h5>
                        <span>
                          {ConvertTime(currentUserStory?.date, locale, "chat")}
                        </span>
                      </div>
                      <div className="lds-dual-ring"></div>

                      {currentUserStory?.totalStories > 1 && (
                        <span className="counter-for-story">
                          {currentUserStory?.totalStories}
                        </span>
                      )}
                    </div>
                  )}
              </div>
              <div className="hold">
                <h4>{translations?.story?.friends_stories}</h4>
                <div className="usersStories">
                  {stories
                    ?.filter((x) => x?.author[0]?._id !== userData._id)
                    ?.map((x) => {
                      const xAuthor = Array.isArray(x?.author)
                        ? x.author[0]
                        : null;

                      return (
                        <div
                          className={`singleStory ${
                            xAuthor?._id == singleProvider?.id ? "active" : ""
                          } ${xAuthor?._id == loadingStories ? "loading" : ""}`}
                          key={`${xAuthor?._id}-${Date.now()}`}
                          onClick={() => {
                            setSingleProvider((prev) => ({
                              ...prev,
                              id: xAuthor?._id,
                            }));
                          }}
                        >
                          <Image
                            className="rounded"
                            src={xAuthor?.img?.url || "/users/default.svg"}
                            alt={`${xAuthor?.firstname}-img`}
                            width={50}
                            height={50}
                            onClick={(e) =>
                              handleMenus(e, "user-Info", xAuthor?._id, {
                                type: "user",
                              })
                            }
                          />
                          <div className="info">
                            <h5>
                              {xAuthor?.firstname} {xAuthor?.lastname}
                            </h5>
                            <span>{ConvertTime(x?.date, locale, "chat")}</span>
                          </div>
                          <div className="lds-dual-ring"></div>

                          {x?.totalStories > 1 && (
                            <span className="counter-for-story">
                              {x?.totalStories}
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          <div className="storySection swiper-container">
            {screenSize === "small" && (
              <div className="hold">
                <div className="top small">
                  <h4>{translations?.story?.friends_stories}</h4>
                  <IoClose
                    className="close"
                    onClick={() => {
                      setSingleProvider({});
                    }}
                  />
                </div>
                <div className="usersStories">
                  <Swiper speed={1000} spaceBetween={8} slidesPerView={3}>
                    {currentUserStory &&
                      Object.keys(currentUserStory).length > 0 && (
                        <SwiperSlide>
                          <div
                            className={`singleStory ${
                              currentUserStory?.author[0]?._id ==
                              singleProvider?.id
                                ? "active"
                                : ""
                            } ${
                              currentUserStory?.author[0]?._id == loadingStories
                                ? "loading"
                                : ""
                            }`}
                            onClick={() => {
                              setSingleProvider((prev) => ({
                                ...prev,
                                id: currentUserStory?.author[0]?._id,
                              }));
                            }}
                          >
                            <Image
                              className="rounded"
                              src={
                                currentUserStory?.author[0]?.img?.url ||
                                "/users/default.svg"
                              }
                              alt={`${currentUserStory?.author[0]?.firstname}-img`}
                              width={50}
                              height={50}
                              onClick={(e) =>
                                handleMenus(
                                  e,
                                  "user-Info",
                                  currentUserStory?.author[0]?._id,
                                  {
                                    type: "user",
                                  }
                                )
                              }
                            />
                            <div className="info">
                              <span>
                                {ConvertTime(
                                  currentUserStory?.date,
                                  locale,
                                  "chat"
                                )}
                              </span>
                              <h5 className="ellipsisText">
                                {currentUserStory?.author[0]?.firstname}{" "}
                                {currentUserStory?.author[0]?.lastname}
                              </h5>
                            </div>
                            <div className="lds-dual-ring"></div>

                            {currentUserStory?.totalStories > 1 && (
                              <span className="counter-for-story">
                                {currentUserStory?.totalStories}
                              </span>
                            )}
                          </div>
                        </SwiperSlide>
                      )}
                    {stories
                      ?.filter((x) => x?.author[0]?._id !== userData?._id)
                      ?.map((x) => {
                        const xAuthor = Array.isArray(x?.author)
                          ? x.author[0]
                          : null;

                        return (
                          <SwiperSlide key={`${xAuthor?._id}-${Date.now()}`}>
                            <div
                              className={`singleStory ${
                                xAuthor?._id == singleProvider?.id
                                  ? "active"
                                  : ""
                              } ${
                                xAuthor?._id == loadingStories ? "loading" : ""
                              }`}
                              onClick={() => {
                                setSingleProvider((prev) => ({
                                  ...prev,
                                  id: xAuthor?._id,
                                }));
                              }}
                            >
                              <Image
                                className="rounded"
                                src={xAuthor?.img?.url || "/users/default.svg"}
                                alt={`${xAuthor?.firstname}-img`}
                                width={50}
                                height={50}
                                onClick={(e) =>
                                  handleMenus(e, "user-Info", xAuthor?._id, {
                                    type: "user",
                                  })
                                }
                              />
                              <div className="info">
                                <span>
                                  {ConvertTime(x?.date, locale, "chat")}
                                </span>
                                <h5 className="ellipsisText">
                                  {xAuthor?.firstname} {xAuthor?.lastname}
                                </h5>
                              </div>
                              <div className="lds-dual-ring"></div>

                              {x?.totalStories > 1 && (
                                <span className="counter-for-story">
                                  {x?.totalStories}
                                </span>
                              )}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </div>
            )}
            <div className="holder">
              {!loadingStories && screenSize === "large" && (
                <button onClick={handlePausePlay} className="pausePlayBtn">
                  {isPaused ? <FaPlay className="play" /> : <FaPause />}
                  {isPaused
                    ? translations?.story?.auto_play_stories
                    : translations?.story?.stop_playing_stories}
                </button>
              )}

              <div className="navigations-icons forStories">
                <button
                  className="custom-prev"
                  onClick={goToPrev}
                  disabled={
                    storySwiperRef.current?.activeIndex === 0 && !hasPrevUser
                  }
                >
                  <FaAngleLeft />
                </button>
                {screenSize !== "large" && (
                  <button onClick={handlePausePlay} className="pausePlayBtn">
                    {isPaused ? <FaPlay className="play" /> : <FaPause />}
                    {isPaused
                      ? translations?.story?.auto_play_stories
                      : translations?.story?.stop_playing_stories}
                  </button>
                )}

                <button
                  className="custom-next"
                  onClick={goToNext}
                  disabled={
                    storySwiperRef.current?.activeIndex ===
                      userStories.length - 1 && !hasNextUser
                  }
                >
                  <FaAngleRight />
                </button>
              </div>
              {!loadingStories && (
                <div className="stories-length">
                  {userStories.map((_, index) => (
                    <div className="back-light" key={index}>
                      <span
                        style={{
                          width:
                            activeStoryIndex > index
                              ? "100%"
                              : activeStoryIndex === index
                              ? isPaused
                                ? "0%"
                                : "100%"
                              : "0%",
                          transition:
                            activeStoryIndex === index && !isPaused && isMounted
                              ? "width 5s linear"
                              : "none",
                        }}
                      ></span>
                    </div>
                  ))}
                </div>
              )}

              {loadingStories ? (
                <div className="loading-stories">
                  <ContentLoader
                    width={"100%"}
                    height={"100%"}
                    viewBox="0 0 480 820"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#e0e0e0"
                  >
                    {/* Header with avatar */}
                    <circle cx="30" cy="40" r="24" />
                    <rect x="70" y="25" rx="4" ry="4" width="180" height="16" />
                    <rect x="70" y="50" rx="4" ry="4" width="120" height="12" />

                    {/* Main content area (taller rectangle) */}
                    <rect
                      x="0"
                      y="80"
                      rx="4"
                      ry="4"
                      width="100%"
                      height="620"
                    />

                    {/* Footer */}
                    <rect
                      x="15"
                      y="720"
                      rx="4"
                      ry="4"
                      width="350"
                      height="16"
                    />
                    <rect
                      x="15"
                      y="750"
                      rx="4"
                      ry="4"
                      width="250"
                      height="14"
                    />
                  </ContentLoader>
                </div>
              ) : (
                <Swiper
                  onSwiper={(swiper) => {
                    storySwiperRef.current = swiper;
                    // Set initial active index after mount
                    setTimeout(() => setActiveStoryIndex(0), 100);
                  }}
                  onSlideChange={(swiper) =>
                    setActiveStoryIndex(swiper.activeIndex)
                  }
                  speed={1000}
                  spaceBetween={10}
                  slidesPerView={1}
                >
                  {userStories.map((story) => (
                    <SwiperSlide key={`${story._id}-${Date.now()}`}>
                      <Story data={story} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      ) : singleProvider.type === "page" ? (
        <div className="create-page">
          <div className="sideSection">
            <div className="top">
              <IoClose
                className="close"
                onClick={() => {
                  setSingleProvider({});
                }}
              />
              <h3>{translations?.header?.createpage}</h3>
            </div>
            {currentPagePosition === 0 && (
              <div className="hold ">
                <p>
                  {
                    translations?.forms
                      ?.your_page_is_where_people_go_to_learn_more_about_you_make_sure_yours_has_all_the_information_they_may_need
                  }
                </p>
              </div>
            )}
            {currentPagePosition === 1 && (
              <div className="hold">
                <h4>{translations?.forms?.finish_setting_up_your_page}</h4>
                <p>
                  {
                    translations?.forms
                      ?.now_add_more_details_to_help_people_connect_with_you
                  }
                </p>
              </div>
            )}
            {currentPagePosition === 2 && (
              <div className="hold " style={{ gap: "7px" }}>
                <h4>{translations?.forms?.customize_your_page}</h4>
                <p>
                  {
                    translations?.forms
                      ?.your_profile_picture_is_one_of_the_first_things_people_see_try_using_your_logo_or_an_image_people_can_easily_associate_with_you
                  }
                </p>
              </div>
            )}
            {currentPagePosition === 0 && (
              <div className="hold last-child">
                <div className="inputHolder">
                  <div className="holder">
                    <input
                      type="text"
                      placeholder={
                        translations?.auth?.enter_your_pagename ||
                        "enter your page name"
                      }
                      value={pageName}
                      onInput={(e) => {
                        setPageName(e.target.value);
                      }}
                    />
                  </div>
                  <p className="small-text">
                    {
                      translations?.forms
                        ?.use_the_name_of_your_business_brand_or_organization_or_a_name_that_helps_explain_your_page
                    }
                  </p>
                </div>

                <div className="inputHolder">
                  <div className="holder">
                    <textarea
                      placeholder={translations?.portfolio?.your_page_bio}
                      value={
                        pageInfo.find((item) => item.key === "bio")?.value || ""
                      }
                      onInput={(e) => {
                        const updatedPageInfo = pageInfo.map((item) => {
                          if (item.key === "bio") {
                            return { ...item, value: e.target.value };
                          }
                          return item;
                        });
                        setPageInfo(updatedPageInfo);
                      }}
                    />
                  </div>
                  <p className="small-text">
                    {
                      translations?.forms
                        ?.tell_people_a_little_about_your_business
                    }
                  </p>
                </div>
              </div>
            )}
            {currentPagePosition === 1 && (
              <div className="hold adding-info">
                <div className="top">
                  <h4>{translations?.forms?.page_details}</h4>
                  <button onClick={addInfo}>
                    <FaPlus />
                    {translations?.actions?.add}
                  </button>
                </div>

                {pageInfo
                  ?.filter((x) => x.key !== "bio")
                  ?.map((info, index) => (
                    <div className="row" key={index}>
                      <div className="holder top">
                        <input
                          type="text"
                          value={info.key}
                          placeholder="Field Name"
                          className="key"
                          onChange={(e) =>
                            handleInputChange(index + 1, "key", e.target.value)
                          }
                        />
                        <FaTrashAlt onClick={() => removeInfo(index + 1)} />
                      </div>
                      <div className="holder">
                        <input
                          type="text"
                          value={info.value}
                          placeholder={
                            placeHolders[info.key] || "Enter details"
                          }
                          onChange={(e) =>
                            handleInputChange(
                              index + 1,
                              "value",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                {pageInfoError && (
                  <span className="error">
                    {
                      translations?.forms
                        ?.please_fill_all_other_info_before_adding_more
                    }
                  </span>
                )}
              </div>
            )}
            {currentPagePosition === 2 && (
              <div className="hold adding-imgs">
                <h4 style={{ margin: "10px 0" }}>
                  {translations?.forms?.add_page_img_and_cover}
                </h4>
                <ImageCropper
                  type={`img`}
                  imageURL={pageImageURL}
                  setImageURL={setPageImageURL}
                  aspect={1}
                  inputRef={pageImageInputRef}
                  setState={setPageImage}
                />

                <hr />

                <ImageCropper
                  type={`cover`}
                  imageURL={pageCoverURL}
                  setImageURL={setPageCoverURL}
                  aspect={16 / 6}
                  inputRef={pageCoverInputRef}
                  setState={setPageCover}
                />
              </div>
            )}
            <div className="bottom">
              <p>
                {currentPagePosition === 0
                  ? "first step"
                  : currentPagePosition === 1
                  ? "second step"
                  : "third step"}
              </p>
              <div className="steps-slider">
                {[0, 1, 2].map((index) => (
                  <div className="step" key={index}>
                    <span
                      style={{
                        width: currentPagePosition > index ? "100%" : "0%",
                      }}
                    ></span>
                  </div>
                ))}
              </div>
              {currentPagePosition === 0 ? (
                <button
                  className="main-button"
                  onClick={() => setCurrentPagePosition(1)}
                  disabled={isFirstStepDisable}
                >
                  {translations?.actions?.next}
                </button>
              ) : currentPagePosition === 1 ? (
                <div className="row row-btns">
                  <button
                    className="main-button"
                    onClick={() => setCurrentPagePosition(0)}
                  >
                    {translations?.actions?.perv}
                  </button>{" "}
                  <button
                    className="main-button"
                    onClick={() => setCurrentPagePosition(2)}
                    disabled={pageInfo.some(
                      (info) => !info.key.trim() || !info.value.trim()
                    )}
                  >
                    {translations?.actions?.next}
                  </button>
                </div>
              ) : currentPagePosition === 2 ? (
                <div className="row row-btns">
                  <button
                    className="main-button"
                    onClick={() => setCurrentPagePosition(1)}
                  >
                    {translations?.actions?.perv}
                  </button>{" "}
                  <button
                    className={`main-button ${pageLoading ? "loading" : ""}`}
                    onClick={createPage}
                  >
                    <div className="lds-dual-ring"></div>

                    <span>{translations?.auth?.finish}</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className={`portfolio userPage`}>
            <div className="top">
              {/* Cover Image */}
              <div className="cover">
                {(pageCoverURL || pageCover) && (
                  <Image
                    src={pageCover && URL.createObjectURL(pageCover)}
                    alt="Page Cover"
                    fill
                  />
                )}
              </div>

              {/* Profile Image */}
              <nav>
                <div className="top">
                  <div className="leftHolder">
                    <div className="userImg rounded">
                      <Image
                        className="rounded"
                        src={
                          (pageImage && URL.createObjectURL(pageImage)) ||
                          "/users/default.svg"
                        }
                        alt="User Image"
                        fill
                      />
                    </div>
                  </div>

                  <div className="right">
                    <div className="left-data">
                      <h4>
                        {pageName ||
                          translations?.portfolio?.["your_page_name"]}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div>
                    <button className={`main-button active`}>
                      <BsFillPostcardFill />
                      {translations?.portfolio?.posts}
                    </button>
                    <button className={`main-button `}>
                      <HiUsers />
                      {translations?.portfolio?.followers}
                    </button>
                    <button className={`main-button `}>
                      <FaShoppingCart />
                      {translations?.portfolio?.products}
                    </button>
                    <button className={`main-button `}>
                      <IoInformationCircleSharp />
                      {translations?.portfolio?.about}
                    </button>
                  </div>
                  <button className={`main-button `}>
                    <BsThreeDots />
                  </button>
                </div>
              </nav>
            </div>

            {/* Page Info Section */}
            <div className="bottom-holder">
              <div className="side-menu">
                <ul className="about">
                  <h4>{translations?.portfolio?.about}</h4>

                  <pre style={{ overflowWrap: "anywhere" }}>
                    {pageInfo?.find((x) => x.key === "bio")?.value
                      ? seeAllAbout
                        ? pageInfo?.find((x) => x.key === "bio")?.value
                        : pageInfo?.find((x) => x.key === "bio")?.value.length >
                          165
                        ? `${pageInfo
                            ?.find((x) => x.key === "bio")
                            ?.value.slice(0, 165)}... `
                        : pageInfo?.find((x) => x.key === "bio")?.value
                      : "your page details: ...................."}
                    {pageInfo?.find((x) => x.key === "bio")?.value.length >
                      165 && (
                      <span
                        onClick={() => setSeeAllAbout(!seeAllAbout)}
                        className={`seeMore`}
                      >
                        {seeAllAbout ? "see less" : "see more"}
                      </span>
                    )}
                  </pre>

                  {pageInfo
                    .filter((x) => x.key !== "bio")
                    .map((info) => {
                      return (
                        <li
                          key={info.key}
                          className={info.key === "bio" ? "bio" : ""}
                        >
                          <strong>{info.key || "field name"}:</strong>{" "}
                          <span>
                            {info.value || "..............................."}
                          </span>
                          {info.key === "bio" && <hr />}
                        </li>
                      );
                    })}
                </ul>
              </div>

              {/* Posts Section */}
              <div className="bigSection">
                <div className="actions">
                  <h4>
                    {translations?.portfolio?.all}{" "}
                    {translations?.portfolio?.posts}
                  </h4>
                </div>
                <ContentLoader
                  className="skeleton skeleton-post"
                  width={"100%"}
                  height={500}
                  speed={100}
                  viewBox="0 0 600 350"
                  backgroundColor="#E8E8E8"
                  foregroundColor="#D5D5D5"
                >
                  <circle cx="35" cy="35" r="20" />
                  <rect x="65" y="20" rx="5" ry="5" width="120" height="12" />
                  <rect x="65" y="38" rx="5" ry="5" width="100" height="10" />
                  <rect x="20" y="70" rx="5" ry="5" width="93%" height="10" />
                  <rect x="20" y="90" rx="5" ry="5" width="500" height="10" />
                  <rect x="20" y="110" rx="5" ry="5" width="520" height="10" />
                  <rect x="20" y="140" rx="5" ry="5" width="93%" height="150" />
                  <rect x="20" y="310" rx="5" ry="5" width="30" height="10" />
                  <rect x="60" y="310" rx="5" ry="5" width="20" height="10" />
                  <rect x="515" y="310" rx="5" ry="5" width="30" height="10" />
                  <rect x="555" y="310" rx="5" ry="5" width="20" height="10" />
                </ContentLoader>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default SingleDetails;
