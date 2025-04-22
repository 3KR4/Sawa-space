"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { storyService } from "@/services/api/storyService";
import { useNotification } from "@/Contexts/NotificationContext";
import { MenusContext } from "@/Contexts/MenusContext";
import { useSearchParams } from "next/navigation";
import { postService } from "@/services/api/postService";

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState("large");
  const { addNotification } = useNotification();
  const { someThingHappen, setSomeThingHappen, singleProvider, setSingleProvider } =
    useContext(MenusContext);
  const [screenSizeWidth, setScreenSizeWidth] = useState("large");
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
  const pathname = usePathname();

  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [userData]);

  const [stories, setStories] = useState([]);
  const [storyloading, setStoryloading] = useState(false);
  const [currentUserStory, setCurrentUserStory] = useState({});

  useEffect(() => {
    if (userData) {
      setStoryloading(true);
      let timeoutId;
      let isMounted = true;

      timeoutId = setTimeout(async () => {
        try {
          const { data } = await storyService.getStories();
          if (isMounted) {
            setStories(data.data);
            setCurrentUserStory(
              data.data.find((x) => x.author[0]._id == userData._id) || {}
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
  }, [someThingHappen.stories, someThingHappen.deleteAllUserStories, userData]);

  const searchParams = useSearchParams();
  const postId = searchParams.get("post");
  const index = parseInt(searchParams.get("index") || "0", 10);

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await postService.getSinglePost(postId);

        const post = data?.data?.[0];
        if (post) {
          setSingleProvider({
            type: "post",
            sharing_data: post,
            focused_img_index: index,
          });
        } else {
          addNotification({
            type: "warning",
            message: "Post not found",
          });
        }
      } catch (error) {
        addNotification({
          type: "error",
          message: "something went wrong while fetching post",
        });
      }
    };

    if (postId) {
      getSingleProduct();
    }
  }, [postId, index]);

  console.log(singleProvider);
  

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
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
