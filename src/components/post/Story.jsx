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

import { HiDotsVertical } from "react-icons/hi";

function Story({ data, smallView, index, storyCount = 0, currentStoryIndex }) {
  const { screenSize, userData } = useContext(ScreenContext);
  const { translations, locale } = useLanguage();
  const { handleMenus } = useContext(DynamicMenusContext);

  const { setDataSwiperType, setDataForSwiper, setImgFocus, setImgIndex } =
    useContext(MenusContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);

  // Helper function to adjust pixel values based on smallView
  const adjustSize = (value) => {
    if (typeof value === "number") {
      return smallView
        ? value / 3
        : screenSize === "small"
        ? value * 0.79
        : value;
    }

    // Handle string values like "10px" or "10%"
    if (typeof value === "string") {
      const num = parseFloat(value);
      const unit = value.replace(num, "");

      if (unit === "px") {
        return smallView
          ? `${num / 3}px`
          : screenSize === "small"
          ? num * 0.79
          : value;
      }
    }

    return value;
  };

  return (
    <div
      className={`story ${smallView ? "smallView" : ""}`}
      style={{
        background:
          data?.info?.settings?.backGround === undefined
            ? "transparent"
            : data?.info?.settings?.backGround.type === "gradient"
            ? `linear-gradient(${data?.info?.settings?.backGround.deg}deg, ${data?.info?.settings?.backGround.first} ${data?.info?.settings?.backGround.first_Acquisition}%, ${data?.info?.settings?.backGround.second} ${data?.info?.settings?.backGround.second_Acquisition}%)`
            : data?.info?.settings?.backGround?.color,
      }}
      onClick={() => {
        setDataSwiperType("stories");
        setImgFocus(data?.id);
        setDataForSwiper(data);
      }}
    >
      {data?.info?.body && (
        <div
          id="body"
          className={`storyBody`}
          style={{
            position: "absolute",
            fontSize: `${adjustSize(data?.info?.settings?.body?.size)}px`,
            fontFamily: data?.info?.settings?.body?.family,
            color: `#${data?.info?.settings?.body?.color}`,
            background:
              data?.info?.settings?.body?.background === "transparent"
                ? "transparent"
                : `#${data?.info?.settings?.body?.background}`,
            left: `50%`,
            top: `50%`,
            transform: `translate(calc(-50% + ${adjustSize(
              data?.info?.settings?.body?.x
            )}px), calc(-50% + ${adjustSize(
              data?.info?.settings?.body?.y
            )}px))`,
          }}
        >
          {data?.info?.body}
        </div>
      )}
      {smallView && <span className="hiddenContent"></span>}

      {data?.info?.link && (
        <Link
          href={data?.info?.link}
          target="_blank"
          id="link"
          className={`storyBody link`}
          style={{
            position: "absolute",
            fontSize: `${adjustSize(data?.info?.settings.link.size)}px`,
            textDecoration: "underline",
            left: `50%`,
            top: `50%`,
            transform: `translate(calc(-50% + ${adjustSize(
              data?.info?.settings.link.x
            )}px), calc(-50% + ${adjustSize(data?.info?.settings.link.y)}px))`,
          }}
        >
          {data?.info?.link}
        </Link>
      )}

      {data?.img &&
        data?.img.map((image, index) => (
          <div
            key={index}
            id={image.newpath.publicid}
            style={{
              position: "absolute",
              left: `50%`,
              top: `50%`,
              transform: `translate(calc(-50% + ${adjustSize(
                data?.info?.settings.images[index].x
              )}px), calc(-50% + ${adjustSize(
                data?.info?.settings.images[index].y
              )}px))`,
              width: `${data?.info?.settings.images[index].width}%`,
            }}
          >
            <img src={image.newpath.url} width={`100%`} />
          </div>
        ))}
      {/* {smallView && data?.info?.totalStories > 1 && (
        <span className="counter-for-story">{data?.info?.totalStories}</span>
      )} */}

      <div className="top forUser">
        {/* {!smallView && storyCount > 1 && (
          <div className="story-progress">
            {Array.from({ length: storyCount }).map((_, i) => (
              <div
                key={i}
                className={`progress-bar ${
                  i <= currentStoryIndex ? "active" : ""
                }`}
              />
            ))}
          </div>
        )} */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "6px 11px",
          }}
        >
          <div className="left">
            <Image
              className="rounded"
              src={data?.author[0]?.img.url}
              alt={`${data?.author[0]?.fristname} img`}
              width={smallView ? 48 : 40}
              height={smallView ? 48 : 40}
              onClick={(e) =>
                !smallView && handleMenus(e, "user-Info", data?.author[0]?._id)
              }
            />
            <div className="info">
              <h5 style={{ fontSize: smallView ? "0.8rem" : "14px" }}>
                {data?.author[0]?._id === userData._id ? (
                  <>
                    {translations?.story?.your_story}
                  </>
                ) : (
                  <>
                    {data?.author[0]?.fristname} {``}
                    {data?.author[0]?.lastname}
                  </>
                )}
              </h5>
              <span>{ConvertTime(data?.date, locale)}</span>
            </div>
          </div>
          {!smallView && (
            <HiDotsVertical
              className="settingDotsIco"
              onClick={(e) => {
                handleMenus(e, "settingMenu-story", data?._id);
              }}
            />
          )}
        </div>
      </div>

      {!smallView && data?.mentions && data?.mentions.length > 0 && (
        <div className="mentions view">
          <h5>
            {data?.author[0]?.fristname} {translations?.post?.mention}
          </h5>
          {data?.mentions?.map((x, index) => (
            <button
              key={index}
              onClick={(e) => handleMenus(e, "user-Info", x.id)}
            >
              @{x.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Story;
