"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { posts, stories, processStories } from "@/utils/Data";
import Story from "@/components/post/Story";
import Post from "@/components/post/Post";
import ContentLoader from "react-content-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useNotification } from "@/Contexts/NotificationContext";

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

export default function Home() {
  const { hideChats } = useContext(MenusContext);

  const { screenSize } = useContext(ScreenContext);

  const { translations, locale } = useLanguage();

  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0); // Adjust as needed
  }, []);

  useEffect(() => {
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  const { addNotification } = useNotification();

  // Usage
  const latestStories = processStories(stories);

  console.log(latestStories);

  // Then in your render:
  {
    latestStories.map((story) => (
      <SwiperSlide key={story.id}>
        <Story
          data={story}
          smallView={true}
          storyCount={story.totalStories > 1 ? story.totalStories : null}
        />
      </SwiperSlide>
    ));
  }

  return (
    <div className="home">
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          onClick={() =>
            addNotification({
              type: "success",
              message:
                "this is a this is a good message this is a good message this is a good message good message",
            })
          }
        >
          success Message
        </div>
        <div
          onClick={() =>
            addNotification({
              type: "warning",
              message: "this is a warning message",
            })
          }
        >
          warning Message
        </div>
        <div
          onClick={() =>
            addNotification({
              type: "error",
              message: "this is a very pad message",
            })
          }
        >
          error Message
        </div>
      </div>

      <div className="stories-holder">
        {!loading && screenSize !== "large" ? (
          <div className="storiesTop">
            <h5>{translations?.story?.stories}</h5>
            {stories.length > 6 && (
              <div className="navigations-icons forStories">
                <FaAngleLeft className="custom-prev" />
                <FaAngleRight className="custom-next" />
              </div>
            )}
          </div>
        ) : stories.length > 6 ? (
          <div className="navigations-icons forStories">
            <FaAngleLeft className="custom-prev" />
            <FaAngleRight className="custom-next" />
          </div>
        ) : null}
        {loading ? (
          <div style={{ display: "flex", gap: "5px" }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                style={{ backgroundColor: "white", borderRadius: "10px" }}
              >
                <ContentLoader
                  speed={2}
                  width={`100%`}
                  height={200}
                  viewBox="0 0 80 100"
                  backgroundColor="#E8E8E8"
                  foregroundColor="#D5D5D5"
                >
                  {/* Avatar placeholder (circle) */}
                  <circle cx="40" cy="40" r="20" />
                  {/* Name placeholder (single line) */}
                  <rect x="15" y="65" rx="3" ry="3" width="50" height="10" />
                </ContentLoader>
              </div>
            ))}
          </div>
        ) : (
          <div className="swiper-container">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              key={loading ? "loading" : "loaded"}
              modules={[Navigation]}
              spaceBetween={6}
              speed={1000}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              slidesPerView={6}
              breakpoints={{
                320: { slidesPerView: 3 },
                500: { slidesPerView: 4 }, // Use hideChats directly
                1700: { slidesPerView: 6 },
              }}
            >
              {latestStories.map((story, index) => (
                <SwiperSlide key={story.id}>
                  <Story
                    data={story}
                    smallView={true}
                    index={index}
                    storyCount={
                      story.totalStories > 1 ? story.totalStories : null
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      <div className="posts-holder">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <ContentLoader
                  className="skeleton skeleton-post"
                  width={600}
                  height={350}
                  speed={5}
                  viewBox="0 0 600 350"
                  backgroundColor="#E8E8E8"
                  foregroundColor="#D5D5D5"
                >
                  {/* Profile Picture */}
                  <circle cx="35" cy="35" r="20" />
                  {/* Name & Timestamp */}
                  <rect x="65" y="20" rx="5" ry="5" width="120" height="12" />
                  <rect x="65" y="38" rx="5" ry="5" width="100" height="10" />
                  {/* Post Text */}
                  <rect x="20" y="70" rx="5" ry="5" width="93%" height="10" />
                  <rect x="20" y="90" rx="5" ry="5" width="500" height="10" />
                  <rect x="20" y="110" rx="5" ry="5" width="520" height="10" />
                  {/* Image Placeholder */}
                  <rect x="20" y="140" rx="5" ry="5" width="93%" height="150" />
                  {/* Footer (Likes, Comments, Shares) */}
                  <rect
                    x="20"
                    y="310"
                    rx="5"
                    ry="5"
                    width="30"
                    height="10"
                  />{" "}
                  {/* Like Icon */}
                  <rect
                    x="60"
                    y="310"
                    rx="5"
                    ry="5"
                    width="20"
                    height="10"
                  />{" "}
                  {/* Like Count */}
                  <rect
                    x="515"
                    y="310"
                    rx="5"
                    ry="5"
                    width="30"
                    height="10"
                  />{" "}
                  {/* Comment Icon */}
                  <rect
                    x="555"
                    y="310"
                    rx="5"
                    ry="5"
                    width="20"
                    height="10"
                  />{" "}
                  {/* Comment Count */}
                </ContentLoader>
              </div>
            ))
          : posts.map((x, index) => {
              return <Post key={index} data={x} />;
            })}
      </div>
    </div>
  );
}
