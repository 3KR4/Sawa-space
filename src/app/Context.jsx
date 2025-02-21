'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState("large"); // Default value (SSR safe)

  useEffect(() => {
    function getScreenSize() {
      const width = window.innerWidth;
      if (width < 768) return "small";
      if (width < 992) return "med";
      return "large";
    }

    setScreenSize(getScreenSize()); // Set the correct screen size after mounting

    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AllContext.Provider value={{ screenSize }}>
      {children}
    </AllContext.Provider>
  );
};
