"use client";
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
import ContentLoader from "react-content-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { postService } from "@/services/api/postService";
import { storyService } from "@/services/api/storyService";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Home() {
  const { addNotification } = useNotification();
  const { screenSize, userData, stories, currentUserStory } =
    useContext(ScreenContext);
  const { translations } = useLanguage();
  const {
    someThingHappen,
    setSomeThingHappen,
    setOpenStoryForm,
    singleProvider,
    setSingleProvider,
  } = useContext(MenusContext);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postsloading, setPostsLoading] = useState(false);
  const [storyloading, setStoryLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const swiperRef = useRef(null);

  console.log(stories);

  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    setPostsLoading(true);
    timeoutId = setTimeout(async () => {
      try {
        const { data } = await postService.getPosts(page);
        if (isMounted) {
          setPosts((prev) => {
            const newPosts = [...prev, ...data.data];
            // إذا تجاوزت المنشورات 30، نحتفظ بأحدث 30 فقط
            return newPosts.length > 30 ? newPosts.slice(-25) : newPosts;
          });
          setHasMore(page < data.last_page);
        }
      } catch (err) {
        console.error("Error fetching posts", err);
        addNotification({
          type: "error",
          message: "Failed to load posts. Please try again.",
        });
      } finally {
        if (isMounted) setPostsLoading(false);
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [page]);

  useEffect(() => {
    if (
      someThingHappen?.type === "post" &&
      someThingHappen?.event === "create"
    ) {
      setPosts((prev) => [someThingHappen.post, ...prev]);
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (someThingHappen?.type === "post" && someThingHappen?.event === "edit") {
      setPosts((prev) =>
        prev.map((x) =>
          x._id === someThingHappen.post._id ? someThingHappen.post : x
        )
      );
    }
    setSomeThingHappen("");
  }, [someThingHappen]);

  useEffect(() => {
    const scrollHandler = () => {
      if (!hasMore || postsloading) return;
      if (
        window.innerHeight + document.documentElement.scrollTop + 1200 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [hasMore, postsloading]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="home">
      {userData && (
        <div className="stories-holder">
          {!postsloading && screenSize !== "large" ? (
            <div className="storiesTop">
              <h5>{translations?.story?.stories}</h5>
              {stories?.length > 6 && (
                <div className="navigations-icons forStories">
                  <FaAngleLeft className="custom-prev" />
                  <FaAngleRight className="custom-next" />
                </div>
              )}
            </div>
          ) : stories?.length > 6 ? (
            <div className="navigations-icons forStories">
              <FaAngleLeft className="custom-prev" />
              <FaAngleRight className="custom-next" />
            </div>
          ) : null}
          {storyloading || !mounted ? (
            <div style={{ display: "flex", gap: "5px" }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                >
                  <ContentLoader
                    speed={2}
                    width={"100%"}
                    height={200}
                    viewBox="0 0 80 100"
                    backgroundColor="#E8E8E8"
                    foregroundColor="#D5D5D5"
                  >
                    <circle cx="40" cy="40" r="20" />
                    <rect x="15" y="65" rx="3" ry="3" width="50" height="10" />
                  </ContentLoader>
                </div>
              ))}
            </div>
          ) : (
            <div className="swiper-container">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                key={storyloading ? "storyloading" : "loaded"}
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
                  500: { slidesPerView: 4 },
                  1700: { slidesPerView: 6 },
                }}
              >
                <SwiperSlide key={Date.now()}>
                  {currentUserStory ? (
                    <Story data={currentUserStory} smallView={true} />
                  ) : (
                    <div
                      className="userStory-creation story"
                      onClick={() => setOpenStoryForm(true)}
                    >
                      <Image src={userData?.img?.url} fill />
                      <div className="bottom">
                        <div className="svg-holder">
                          <IoMdAddCircleOutline />
                          <h5>{translations?.header?.createstory}</h5>
                        </div>

                        <h5>
                          {userData?.firstname} {userData?.lastname}
                        </h5>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
                {stories
                  ?.filter((x) => x.author[0]._id !== userData._id)
                  ?.map((story) => (
                    <SwiperSlide key={`${story._id}-${Date.now}`}>
                      <Story
                        data={story}
                        sharing_data={stories}
                        smallView={true}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </div>
      )}
      <div className="posts-holder">
        {postsloading && posts.length === 0
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
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
            ))
          : posts.map((x) => <Post data={x} key={`${x._id}-${Date.now()}`} />)}
        {postsloading && posts.length > 0 && (
          <div className="postsloading-skeleton">
            {Array.from({ length: 1 }).map((_, index) => (
              <div key={index}>
                <ContentLoader
                  className="skeleton skeleton-post"
                  width={"100%"}
                  height={500}
                  speed={10}
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
            ))}
          </div>
        )}
        {!hasMore && !postsloading && (
          <div className="no-more-posts">
            <p>{translations?.post?.You_have_reached_the_end_of_the_feed}</p>
            <img src={"/Svgs/no more posts.png"} alt={`no more posts`} />
          </div>
        )}
      </div>
    </div>
  );
}
