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

function Story({ data, smallView, index, storyCount, currentStoryIndex }) {
  const { screenSize } = useContext(ScreenContext);
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
          data?.settings?.background === undefined
            ? "transparent"
            : data?.settings?.background.type === "gradient"
            ? `linear-gradient(${data?.settings?.background.deg}deg, ${data?.settings?.background.first} ${data?.settings?.background.first_Acquisition}%, ${data?.settings?.background.second} ${data?.settings?.background.second_Acquisition}%)`
            : data?.settings?.background?.color,
      }}
      onClick={() => {
        setDataSwiperType("stories");
        setImgFocus(data.id);
        setDataForSwiper(data);
        setImgIndex(index);
      }}
    >
      {data?.body && (
        <div
          id="body"
          className={`storyBody`}
          style={{
            position: "absolute",
            fontSize: `${adjustSize(data?.settings?.body?.size)}px`,
            fontFamily: data?.settings?.body?.family,
            color: `#${data?.settings?.body?.color}`,
            background:
              data?.settings?.body?.background === "transparent"
                ? "transparent"
                : `#${data?.settings?.body?.background}`,
            left: `50%`,
            top: `50%`,
            transform: `translate(calc(-50% + ${adjustSize(
              data?.settings?.body?.x
            )}px), calc(-50% + ${adjustSize(data?.settings?.body?.y)}px))`,
          }}
        >
          {data?.body}
        </div>
      )}
      {smallView && <span className="hiddenContent"></span>}

      {data?.link && (
        <Link
          href={data?.link}
          target="_blank"
          id="link"
          className={`storyBody link`}
          style={{
            position: "absolute",
            fontSize: `${adjustSize(data?.settings.link.size)}px`,
            textDecoration: "underline",
            left: `50%`,
            top: `50%`,
            transform: `translate(calc(-50% + ${adjustSize(
              data?.settings.link.x
            )}px), calc(-50% + ${adjustSize(data?.settings.link.y)}px))`,
          }}
        >
          {data?.link}
        </Link>
      )}

      {data.images &&
        data?.images.map((image, index) => (
          <div
            key={index}
            id={`image-${index}`}
            style={{
              position: "absolute",
              left: `50%`,
              top: `50%`,
              transform: `translate(calc(-50% + ${adjustSize(
                data?.settings.images[index].x
              )}px), calc(-50% + ${adjustSize(
                data?.settings.images[index].y
              )}px))`,
              width: `${data?.settings.images[index].width}%`,
            }}
          >
            <img src={image} width={`100%`} />
          </div>
        ))}
      {smallView && data?.totalStories > 1 && (
        <span className="counter-for-story">{data?.totalStories}</span>
      )}

      <div className="top forUser">
        {!smallView && storyCount > 1 && (
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
        )}
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
              src={data?.avatar}
              alt={data?.username}
              width={smallView ? 48 : 40}
              height={smallView ? 48 : 40}
              onClick={(e) =>
                !smallView && handleMenus(e, "userInfo", data?.id)
              }
            />
            <div className="info">
              <h5 style={{ fontSize: smallView ? "0.8rem" : "14px" }}>
                {data?.username}
              </h5>
              <span>{ConvertTime(data?.timestamp, locale)}</span>
            </div>
          </div>
          {!smallView && (
            <HiDotsVertical
              onClick={(e) => {
                console.log("xxxx");
                handleMenus(e, "settingMenu-story", data?.id);
              }}
            />
          )}
        </div>
      </div>

      {!smallView && data.mentions && data?.mentions.length > 0 && (
        <div className="mentions view">
          <h5>
            {data?.username} {translations?.post?.mention}
          </h5>
          {data?.mentions?.map((x, index) => (
            <button
              key={index}
              onClick={(e) => handleMenus(e, "userInfo", x.id)}
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
