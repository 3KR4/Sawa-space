"use client";

import React from "react";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { messages, stories, processStories } from "@/utils/Data";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "@/Styles/chat.css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { storyService } from "@/services/api/storyService";
import { useNotification } from "@/Contexts/NotificationContext";
import Post from "@/components/post/Post";
import ImageCropper from "@/components/ImageCropper";
import { useForm } from "react-hook-form";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import { getCroppedImg } from "@/utils/cropImage";

import { IoMdResize } from "react-icons/io";

import ContentLoader from "react-content-loader";
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
import { PiShareFat } from "react-icons/pi";
import { FaPause, FaPlus, FaRotate } from "react-icons/fa6";
import {
  FaPlay,
  FaAngleRight,
  FaAngleLeft,
  FaTrashAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { pageService } from "@/services/api/pageService";

function SingleDetails() {
  const { addNotification } = useNotification();

  const { translations, locale } = useLanguage();
  const direction = locale === "ar" ? "rtl" : "ltr";

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
    setImgIndex,
    usersreactMenuRef,
    usersSelectionRef,
    setOpenStoryForm,
    settingsMenuRef,
    closeImgHolderRef,
    singleProvider,
    setSingleProvider,
    setsomeThingHappen,
    someThingHappen,
  } = useContext(MenusContext);

  const { handleMenus, setOpenUsersReact } = useContext(DynamicMenusContext);
  const { setMessageText, emojiHolderRef } = useContext(InputActionsContext);
  const { pathname, screenSize, stories, userData, currentUserStory } =
    useContext(ScreenContext);

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
    "page category": "your_page_category",
    "Contact number": "your_contact_number",
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

  const [imageURL, setImageURL] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const inputFileRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImageURL(reader.result);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCroppedImage = async () => {
    try {
      const croppedBlob = await getCroppedImg(
        imageURL,
        croppedAreaPixels,
        rotation
      );
      const croppedUrl = URL.createObjectURL(croppedBlob);
      // Do something with the cropped image (upload it, preview it, save it)
      console.log("Cropped Image URL:", croppedUrl);
    } catch (e) {
      console.error(e);
    }
  };

const createPage = async (e) => {
  e.preventDefault();
  setPageLoading(true);

  try {
    // Prepare data for creating the page
    const Data = {
      pagename: pageName,
      info: infoObject,
    };

    // Create the page
    const createPageRes = await pageService.createPage(Data);
    const pageId = createPageRes.data.pageid;

    // If user uploaded an image, upload it as the page cover
    if (imageURL && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(
        imageURL,
        croppedAreaPixels,
        rotation
      );
      const formDataImage = new FormData();
      formDataImage.append("img", croppedBlob, "page-cover.jpeg");

      await pageService.page_img_cover("cover", formDataImage);
    }

    // Fetch the updated page data
    const getPageRes = await pageService.getPage(pageId);
    const updatedPage = getPageRes.data.data;

    // Save updated page in state and localStorage
    setUserPage(updatedPage);
    localStorage.setItem("userPage", JSON.stringify(updatedPage));

    // Success notification
    addNotification({
      type: "success",
      message: "Your page has been created successfully!",
    });

    // Close the create page modal
    setSingleProvider(null);
  } catch (err) {
    console.error("Page creation failed:", err);
    addNotification({
      type: "warning",
      message: err?.response?.data?.message || "Something went wrong.",
    });
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
                            currentUserStory?.author[0]
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
                              handleMenus(e, "user-Info", xAuthor)
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
                                  currentUserStory?.author[0]?._id
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
                                  handleMenus(e, "user-Info", xAuthor?._id)
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
              <h3>create page</h3>
            </div>
            {currentPagePosition === 0 && (
              <div className="hold ">
                <p>
                  Your Page is where people go to learn more about you. Make
                  sure yours has all the information they may need.
                </p>
              </div>
            )}
            {currentPagePosition === 1 && (
              <div className="hold">
                <h4>Finish setting up your Page</h4>
                <p>Now add more details to help people connect with you.</p>
              </div>
            )}
            {currentPagePosition === 2 && (
              <div className="hold " style={{ gap: "7px" }}>
                <h4>Customize your Page</h4>
                <p>
                  Your profile picture is one of the first things people see.
                  Try using your logo or an image people can easily associate
                  with you.
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
                    Use the name of your business, brand or organization, or a
                    name that helps explain your Page
                  </p>
                </div>

                <div className="inputHolder">
                  <div className="holder">
                    <textarea
                      placeholder={
                        translations?.placeHolders?.your_page_bio ||
                        "your page bio"
                      }
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
                    Tell people a little about your business.
                  </p>
                </div>
              </div>
            )}
            {currentPagePosition === 1 && (
              <div className="hold adding-info">
                <div className="top">
                  <h4>Page details</h4>
                  <button onClick={addInfo}>
                    <FaPlus />
                    Add
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
                    please fill all other info before adding more
                  </span>
                )}
              </div>
            )}
            {currentPagePosition === 2 && (
              <div className="hold adding-imgs">
                <div className="top">
                  <h4>add page img</h4>
                </div>
                <ImageCropper
                  imageURL={imageURL}
                  setImageURL={setImageURL}
                  aspect={1} // or 16/6
                  inputRef={inputFileRef}
                  onCropDone={handleCropDone}
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
                  next
                </button>
              ) : currentPagePosition === 1 ? (
                <div className="row row-btns">
                  <button
                    className="main-button"
                    onClick={() => setCurrentPagePosition(0)}
                  >
                    back
                  </button>{" "}
                  <button
                    className="main-button"
                    onClick={() => setCurrentPagePosition(2)}
                    disabled={pageInfo.some(
                      (info) => !info.key.trim() || !info.value.trim()
                    )}
                  >
                    next
                  </button>
                </div>
              ) : currentPagePosition === 2 ? (
                <div className="row row-btns">
                  <button
                    className="main-button"
                    onClick={() => setCurrentPagePosition(1)}
                  >
                    back
                  </button>{" "}
                  <button type="submit" className="main-button">
                    Finish
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="storySection swiper-container"></div>
        </div>
      ) : null}
    </div>
  );
}
export default SingleDetails;
