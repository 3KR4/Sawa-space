"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { storyService } from "@/services/api/storyService";
import { useNotification } from "@/Contexts/NotificationContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { userService } from "@/services/api/userService";
import { pageService } from "@/services/api/pageService";

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState("large");
  const [screenSizeWidth, setScreenSizeWidth] = useState("large");
  const { addNotification } = useNotification();
  const {
    someThingHappen,
    setSomeThingHappen,
    singleProvider,
    setSingleProvider,
  } = useContext(MenusContext);

  const pathname = usePathname();

  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [userPage, setUserPage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("page");
      return storedPage ? JSON.parse(storedPage) : null;
    }
    return null;
  });
  const [stories, setStories] = useState([]);
  const [storyloading, setStoryloading] = useState(false);
  const [currentUserStory, setCurrentUserStory] = useState({});
  const [actionLoading, setActionLoading] = useState([]);

  // Set screen size
  useEffect(() => {
    function getScreenSize() {
      const width = window.innerWidth;
      setScreenSizeWidth(width);
      if (width < 768) return "small";
      if (width < 992) return "med";
      return "large";
    }

    setScreenSize(getScreenSize());

    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const { data } = await userService.getUserData(userData._id);
      setUserData(data.data);
    } catch (err) {
      console.error("Error fetching userData", err);
      addNotification({
        type: "error",
        message: "Failed to load user data",
      });
    } finally {
      setSomeThingHappen({});
    }
  };

  // Fetch page data
  const fetchPageData = async () => {
    try {
      const { data } = await pageService.getPageData(userPage._id);
      setUserPage(data.data);
    } catch (err) {
      console.error("Error fetching pageData", err);
      addNotification({
        type: "error",
        message: "Failed to load page data",
      });
    } finally {
      setSomeThingHappen({});
    }
  };

  // Initialize user and page from localStorage (if available)
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const localPage = JSON.parse(localStorage.getItem("page"));

    if (localUser?._id) fetchUserData();
    if (localPage?._id) fetchPageData();
  }, []);

  // Fetch stories
  useEffect(() => {
    if (
      userData?._id ||
      (someThingHappen.type === "stories" && someThingHappen.event === "delete")
    ) {
      setStoryloading(true);
      let timeoutId;
      let isMounted = true;

      timeoutId = setTimeout(async () => {
        try {
          const { data } = await storyService.getStories();
          if (isMounted) {
            setStories(data.data);
            setCurrentUserStory(
              data?.data?.find((x) => x?.author[0]?._id === userData?._id) || {}
            );
          }
        } catch (err) {
          console.error("Error fetching stories", err);
          addNotification({
            type: "error",
            message: "Failed to load Stories. Please try again later.",
          });
        } finally {
          setStoryloading(false);
          setSomeThingHappen({});
        }
      }, 1500);

      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
    }
  }, [someThingHappen.stories, someThingHappen.type, userData?._id]);

  // const searchParams = useSearchParams();
  // const type = searchParams.get("type");
  // const postId = searchParams.get("post");

  // useEffect(() => {
  //   const getSinglePost = async () => {
  //     try {
  //       const { data } = await postService.getSinglePost(type, postId);

  //       const post = data?.data?.[0];
  //       if (post) {
  //         if (post.img.length > 0) {
  //           setSingleProvider({
  //             type: "post",
  //             sharing_data: post,
  //           });
  //         } else {
  //           setSomeThingHappen({
  //             type: "post",
  //             event: "shared",
  //             post: { ...post, isShared: true },
  //           });
  //         }
  //       } else {
  //         addNotification({
  //           type: "warning",
  //           message: "Post not found",
  //         });
  //       }
  //     } catch (error) {
  //       addNotification({
  //         type: "error",
  //         message: "something went wrong while fetching post",
  //       });
  //     }
  //   };

  //   if (postId) {
  //     getSinglePost();
  //   }
  // }, [postId, type]);

  return (
    <ScreenContext.Provider
      value={{
        pathname,
        screenSize,
        screenSizeWidth,
        userData,
        setUserData,
        stories,
        setStories,
        currentUserStory,
        setCurrentUserStory,
        storyloading,
        setStoryloading,
        fetchUserData,
        userPage,
        setUserPage,
        fetchPageData,
        actionLoading,
        setActionLoading,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
