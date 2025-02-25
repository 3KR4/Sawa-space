'use client'
import { createContext, useContext, useRef, useState, useEffect } from "react";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState("large");

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

  const [dataSwiperType, setDataSwiperType] = useState();
  const [dataForSwiper, setDataForSwiper] = useState([]);
  const [imgFocus, setImgFocus] = useState(false);
  const [imgIndex, setImgIndex] = useState(false);
  const closeImgHolderRef = useRef(null);

  return (
    <AllContext.Provider value={{
      screenSize,
      dataSwiperType,
      setDataSwiperType,
      dataForSwiper, 
      setDataForSwiper, 
      imgFocus, 
      setImgFocus, 
      imgIndex, 
      setImgIndex,
      closeImgHolderRef
    }}>
      {children}
    </AllContext.Provider>
  );
};
