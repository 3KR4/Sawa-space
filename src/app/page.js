"use client";
import "@/Styles/components/story.css";

import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import Image from "next/image";

import Story from "@/components/post/Story";
import Post from "@/components/post/Post";
import PostsHolder from "@/components/post/PostsHolder";
import ContentLoader from "react-content-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { fetchingContext } from "@/Contexts/fetchingContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { storyService } from "@/services/api/storyService";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Home() {
  const { addNotification } = useNotification();
  const { userData, stories, currentUserStory, actionLoading } =
    useContext(fetchingContext);
  const { translations } = useLanguage();
  const { setOpenForm, setSingleProvider } = useContext(MenusContext);

  const [smallStoryLoad, setSmallStoryLoad] = useState(true);
  const fetchUserStories = async (id) => {
    setSmallStoryLoad(id);
    try {
      const { data } = await storyService.getUserStories(id);
      setSingleProvider({
        type: "stories",
        shared_data: data.data,
        id: id,
      });
    } catch (err) {
      console.error("Error fetching user stories", err);
      addNotification({
        type: "error",
        message: "Failed to load user Stories. Please try again later.",
      });
    } finally {
      setSmallStoryLoad(null);
    }
  };

  return (
    <div className="home">
      {userData && userData?._id && (
        <div
          className="stories-holder"
          style={{
            minWidth: `calc(34px + ${
              actionLoading.includes(`storyloading`)
                ? `116`
                : (Object.keys(currentUserStory || {}).length > 0 ? 0 : 1) +
                    stories.length <
                  3
                ? ((Object.keys(currentUserStory || {}).length > 0 ? 0 : 1) +
                    stories.length) *
                  116
                : 365
            }px)`,
          }}
        >
          <div className="storiesTop">
            <h5>{translations?.story?.stories}</h5>
            {((window.innerWidth < 768 && stories.length > 3) ||
              (window.innerWidth < 992 && stories.length > 4) ||
              (window.innerWidth < 1100 && stories.length > 5) ||
              (window.innerWidth < 1300 && stories.length > 6) ||
              (window.innerWidth >= 1300 && stories.length > 8)) && (
              <h5
                onClick={() => {
                  fetchUserStories(stories[0]?.author[0]?._id);
                }}
                className={`btn`}
              >
                {translations?.story?.see_all_stories}
              </h5>
            )}
          </div>
          <div
            className="stories-grid"
            style={{
              gridTemplateColumns: `repeat(${
                actionLoading.includes(`storyloading`)
                  ? 1
                  : Math.min(
                      (Object.keys(currentUserStory || {}).length > 0 ? 0 : 1) +
                        stories.length,
                      3
                    )
              }, 1fr)`,
            }}
          >
            {actionLoading.includes(`storyloading`) ? (
              <ContentLoader
                speed={2}
                width={"100%"}
                height={100}
                viewBox="0 0 80 100"
                backgroundColor="#E8E8E8"
                foregroundColor="#D5D5D5"
              >
                <circle cx="40" cy="40" r="20" />
                <rect x="15" y="65" rx="3" ry="3" width="50" height="10" />
              </ContentLoader>
            ) : (
              <>
                {/* User Story Creation / Preview */}
                {currentUserStory &&
                Object.keys(currentUserStory).length > 0 ? (
                  <Story
                    data={currentUserStory}
                    smallView={true}
                    fetchUserStories={fetchUserStories}
                    smallStoryLoad={smallStoryLoad}
                  />
                ) : (
                  <div
                    className="userStory-creation story"
                    onClick={() => setOpenForm({ for: "story" })}
                  >
                    <Image
                      src={userData?.img?.url || `/users/default.svg`}
                      fill
                      alt="userImg"
                    />
                    <div className="bottom">
                      <div className="svg-holder">
                        <IoMdAddCircleOutline />
                        <h5>{translations?.header?.createstory}</h5>
                      </div>
                      <h5 className="ellipsisText">
                        {userData?.firstname} {userData?.lastname}
                      </h5>
                    </div>
                  </div>
                )}

                {stories
                  ?.filter((x) => x.author?.[0]?._id !== userData?._id)
                  .slice(
                    0,
                    window.innerWidth < 768
                      ? 3
                      : window.innerWidth < 992
                      ? 4
                      : window.innerWidth < 1100
                      ? 5
                      : window.innerWidth < 1300
                      ? 6
                      : 8
                  )
                  .map((story) => (
                    <Story
                      key={story._id}
                      data={story}
                      smallView={true}
                      fetchUserStories={fetchUserStories}
                      smallStoryLoad={smallStoryLoad}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      )}
      <PostsHolder />
    </div>
  );
}
