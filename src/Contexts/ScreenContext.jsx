"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { storyService } from "@/services/api/storyService";
import { useNotification } from "@/Contexts/NotificationContext";

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState("large");
  const { addNotification } = useNotification();

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
  const [currentUserStory, setCurrentUserStory] = useState({});

  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    timeoutId = setTimeout(async () => {
      try {
        const { data } = await storyService.getStories();
        if (isMounted) {
          console.log(data);

          setStories(data.data);
          setCurrentUserStory(
            data.data.find((x) => x.author[0]._id == userData._id)
          );
          // setHasMoreStories(page < data.last_page);
        }
      } catch (err) {
        console.error("Error fetching stories", err);
        addNotification({
          type: "error",
          message: "Failed to load Stories. Please try again later.",
        });
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

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
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
