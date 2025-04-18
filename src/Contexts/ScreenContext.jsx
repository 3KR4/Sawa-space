"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState("large");

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

  return (
    <ScreenContext.Provider
      value={{
        pathname,
        screenSize,
        screenSizeWidth,
        userData,
        setUserData,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
