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
import { storyService } from "@/services/api/storyService";
import { useNotification } from "@/Contexts/NotificationContext";

import { HiDotsVertical } from "react-icons/hi";

function Story({ data, smallView }) {
  const { screenSize, userData, stories } = useContext(ScreenContext);
  const { translations, locale } = useLanguage();
  const { handleMenus } = useContext(DynamicMenusContext);

  const { setSingleProvider, singleProvider } = useContext(MenusContext);
  const { addNotification } = useNotification();

  const [loading, setLoading] = useState(false);

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

  const author =
    Array.isArray(data?.author) && data.author.length > 0
      ? data.author[0]
      : null;

  const fetchUserStories = async () => {
    setLoading(true);
    try {
      const { data } = await storyService.getUserStories(author._id);
      setSingleProvider({
        type: "stories",
        shared_data: data.data,
        id: data?._id,
      });
    } catch (err) {
      console.error("Error fetching user stories", err);
      addNotification({
        type: "error",
        message: "Failed to load user Stories. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => {
        smallView && fetchUserStories();
      }}
      className={`story ${smallView ? "smallView" : ""} ${
        loading ? "loading" : ""
      }`}
      style={{
        background:
          data?.info?.settings?.backGround === undefined
            ? "transparent"
            : data?.info?.settings?.backGround.type === "gradient"
            ? `linear-gradient(${data?.info?.settings?.backGround.deg}deg, ${data?.info?.settings?.backGround.first} ${data?.info?.settings?.backGround.first_Acquisition}%, ${data?.info?.settings?.backGround.second} ${data?.info?.settings?.backGround.second_Acquisition}%)`
            : data?.info?.settings?.backGround?.color,
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
            alignItems: "center",
            width: "100%",
            padding: "6px 11px",
            minHeight: smallView ? "74px" : "unset",
          }}
        >
          {author && (
            <div className="left">
              {smallView && <div className="lds-dual-ring"></div>}

              <Image
                className="rounded"
                src={author.img?.url || "/users/default.png"}
                alt={`${author.firstname} img`}
                width={smallView ? 48 : 40}
                height={smallView ? 48 : 40}
                onClick={(e) =>
                  !smallView && handleMenus(e, "user-Info", author._id)
                }
              />
              <div className="info">
                <h5 style={{ fontSize: smallView ? "0.8rem" : "14px" }}>
                  {author._id === userData._id ? (
                    <>{translations?.story?.your_story}</>
                  ) : (
                    <>
                      {author.firstname} {``}
                      {author.lastname}
                    </>
                  )}
                </h5>
                <span>{ConvertTime(data?.date, locale)}</span>
              </div>
            </div>
          )}

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

      {/* {!smallView && data?.mentions && data?.mentions.length > 0 && (
        <div className="mentions view">
          <h5>
            {author.firstname} {translations?.post?.mention}
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
      )} */}
    </div>
  );
}

export default Story;
