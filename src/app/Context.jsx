'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {

  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  function getScreenSize() {
    const width = window.innerWidth;
    if (width < 768) return "small";
    if (width < 992) return "med";
    return "large";
  }
  

  return (
    <AllContext.Provider value={{screenSize}}>
      {children}
    </AllContext.Provider>
  );
};