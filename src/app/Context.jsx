'use client'
import { createContext, useContext, useRef, useState, useEffect } from "react";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {

  // MEDIA QUERY
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

  // Swiper
  const [dataSwiperType, setDataSwiperType] = useState();
  const [dataForSwiper, setDataForSwiper] = useState([]);
  const [imgFocus, setImgFocus] = useState(false);
  const [imgIndex, setImgIndex] = useState(false);
  const closeImgHolderRef = useRef(null);

  // HANDLE COMPONENTS OPEN POSITION

  const [messageText, setMessageText] = useState('');
  const [menuPosition, setMenuPosition] = useState();
  const [selectedDev, setSelectedDev] = useState(false);

  const [emojiHolder, setEmojiHolder] = useState(false);


  const handleMessageActions = (event, type, id) => {
    event.preventDefault();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const cursorY = event.clientY;
    const cursorX = event.clientX;
  
    const menuWidth = type == 'emojiHolder' ? 350 : null
    const menuHeight = type == 'emojiHolder' ? 450 : null
    
    const top = cursorY + menuHeight > windowHeight ? Math.max(cursorY - menuHeight, 50) : cursorY;
    const left = cursorX + menuWidth > windowWidth ? Math.max(cursorX - menuWidth, 10) : cursorX;
    
    if (type === 'emojiHolder') {
      setEmojiHolder(true);
    }
    id && setSelectedDev(id);

    setMenuPosition({ top, left });
  };
  
  const emojiRef = useRef(null);
  const InputRef = useRef(null);
// handleClickOutside

useEffect(() => {
  const handleClickOutside = (event) => {
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      setEmojiHolder(false); 
    }
  };

  if (typeof window !== 'undefined') {
    document.addEventListener('mousedown', handleClickOutside);
  }
  return () => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  };
}, []); 

// handle add emoji 
const handleEmojiClick = (event) => {
  console.log(event);
  const emoji = String.fromCodePoint(
    ...event.unified.split('-').map((code) => parseInt(code, 16))
  );

  const { selectionStart, selectionEnd } = InputRef.current;
  const currentValue = InputRef.current.value;
  const newText = 
    currentValue.slice(0, selectionStart) + 
    emoji + 
    currentValue.slice(selectionEnd);
  setMessageText(newText);

  setTimeout(() => {
    InputRef.current.focus();
    InputRef.current.selectionStart = InputRef.current.selectionEnd = selectionStart + emoji.length;
  }, 0);
};


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
      closeImgHolderRef,
      handleMessageActions,
      menuPosition,
      setMenuPosition,
      selectedDev,
      setSelectedDev,
      emojiHolder,
      setEmojiHolder,
      handleEmojiClick,
      InputRef,
      messageText,
      setMessageText,
      emojiRef,
    }}>
      {children}
    </AllContext.Provider>
  );
};
