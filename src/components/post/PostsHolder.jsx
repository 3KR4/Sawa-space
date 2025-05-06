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

function PostsHolder(param) {
  const { addNotification } = useNotification();
  const { screenSize, userData, stories, currentUserStory, storyloading } =
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
  const [hasMore, setHasMore] = useState(true);

useEffect(() => {
  let timeoutId;
  let isMounted = true;

  const fetchPosts = async (retry = false) => {
    setPostsLoading(true);
    timeoutId = setTimeout(async () => {
      try {
        const res = await postService.getPosts(page, param.type, param.id);
        if (isMounted) {
          setPosts((prev) => {
            const newPosts = [...prev, ...res.data.data];
            return newPosts.length > 30 ? newPosts.slice(-25) : newPosts;
          });
          setHasMore(page < res.data.last_page);
        }
      } catch (err) {
        const errorMessage = err?.response?.data || err.message;

        if (
          errorMessage.includes(
            "Cannot set property 'userreact' of undefined"
          ) &&
          !retry
        ) {
          // Try again once
          console.warn("Retrying post fetch due to userreact error...");
          fetchPosts(true);
        } else {
          console.error("Error fetching posts", err);
          addNotification({
            type: "error",
            message: "Failed to load posts. Please try again.",
          });
        }
      } finally {
        if (isMounted) setPostsLoading(false);
      }
    }, 1500);
  };

  fetchPosts();

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
      setSomeThingHappen("");
    }
    if (
      someThingHappen?.type === "post" &&
      someThingHappen?.event === "shared"
    ) {
      setPosts((prev) => {
        const filteredPosts = prev.filter(
          (post) => post._id !== someThingHappen?.post?._id
        );

        return [someThingHappen.post, ...filteredPosts];
      });

      setSomeThingHappen("");
    }
    if (someThingHappen?.type === "post" && someThingHappen?.event === "edit") {
      setPosts((prev) =>
        prev.map((x) =>
          x._id === someThingHappen.post._id
            ? { ...someThingHappen.post, updated: Date.now() }
            : x
        )
      );
      setSomeThingHappen("");
    }
  }, [someThingHappen.type]);

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

  return (
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
        : posts.map((x) => (
            <Post data={x} key={`${x._id}-${x.updated || ""}`} />
          ))}
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
      {!hasMore && (
        <div className="no-more-posts">
          <p>{translations?.post?.You_have_reached_the_end_of_the_feed}</p>
          <img src={"/Svgs/no more posts.png"} alt={`no more posts`} />
        </div>
      )}
    </div>
  );
}

export default PostsHolder;
