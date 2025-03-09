"use client";
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

  const emojiRef = useRef(null);
  const InputRef = useRef(null);
  const closeImgHolderRef = useRef(null);
  const usersreactMenuRef = useRef(null);
  const usersSelectionRef = useRef(null);

  const [dataSwiperType, setDataSwiperType] = useState();
  const [dataForSwiper, setDataForSwiper] = useState([]);
  const [imgFocus, setImgFocus] = useState(false);
  const [imgIndex, setImgIndex] = useState(false);

  const [openPostForm, setOpenPostForm] = useState(false);
  const [messageText, setMessageText] = useState("");

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuPosition2, setMenuPosition2] = useState({ top: 0, left: 0 });

  const [emojiHolder, setEmojiHolder] = useState(false);
  const [selectedDev, setSelectedDev] = useState(false);

  const [openUsersSelection, setOpenUsersSelection] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersNames, setSelectedUsersNames] = useState([]);
  const [selectionMenuTitle, setSelectionMenuTitle] = useState("");
  const [usersSelectionSearch, setUsersSelectionSearch] = useState("");
  const [userInfoData, setUserInfoData] = useState(null);
  const [settingMenu, setSettingMenu] = useState(false);
  const [openUsersReact, setOpenUsersReact] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);

  const handleMenus = (event, type, id) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const cursorY = event.clientY;
    const cursorX = event.clientX;

    const menuWidth =
      type == "emojiHolder"
        ? 350
        : type == "usersSelection"
        ? 340
        : type == "userInfo"
        ? 340
        : type == "settingMenu-msg"
        ? 255
        : type == "settingMenu-user"
        ? 255
        : type == "postSettings"
        ? 255
        : type == "usersReact"
        ? 255
        : null;

    const menuHeight =
      type == "emojiHolder"
        ? 450
        : type === "usersSelection"
        ? 450
        : type == "userInfo"
        ? 198
        : type == "settingMenu-msg"
        ? 340
        : type == "settingMenu-user"
        ? 130
        : type == "postSettings"
        ? 286
        : type == "usersReact"
        ? 220
        : null;

    const top =
      cursorY + menuHeight > windowHeight
        ? Math.max(cursorY - menuHeight + 15, 50)
        : cursorY + 15;
    const left =
      cursorX + menuWidth > windowWidth
        ? Math.max(cursorX - menuWidth + 15, 10)
        : cursorX + 15;

    if (type === "emojiHolder") {
      setEmojiHolder(true);
    }
    if (type == "usersSelection") {
      setOpenUsersSelection(true);
    }
    if (type == "userInfo") {
      setUserInfoData(true);
    }
    if (
      type == "settingMenu-msg" ||
      type == "settingMenu-user" ||
      type == "postSettings"
    ) {
      setSettingMenu(true);
    }

    id && setSelectedDev(id);
    setMenuPosition({ top, left });
  };

  const handleMenus2 = (event, type, id) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const cursorY = event.clientY;
    const cursorX = event.clientX;

    const menuWidth = type == "userInfo" ? 340 : null;

    const menuHeight = type == "userInfo" ? 198 : null;

    const top =
      cursorY + menuHeight > windowHeight
        ? Math.max(cursorY - menuHeight + 15, 50)
        : cursorY + 15;
    const left =
      cursorX + menuWidth > windowWidth
        ? Math.max(cursorX - menuWidth + 15, 10)
        : cursorX + 15;

    if (type == "userInfo") {
      setUserInfoData(true);
    }

    id && setSelectedDev(id);
    setMenuPosition2({ top, left });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiHolder(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

const handleEmojiClick = (event) => {
  const emoji = String.fromCodePoint(
    ...event.unified.split("-").map((code) => parseInt(code, 16))
  );

  if (!InputRef.current) return;

  const { selectionStart, selectionEnd } = InputRef.current;
  const currentValue = InputRef.current.value;
  const newText =
    currentValue.slice(0, selectionStart) +
    emoji +
    currentValue.slice(selectionEnd);

  setMessageText(newText);

  // Use a timeout to ensure the state updates first before adjusting the cursor
  setTimeout(() => {
    if (InputRef.current) {
      InputRef.current.selectionStart = InputRef.current.selectionEnd =
        selectionStart + emoji.length;
      InputRef.current.focus();
    }
  }, 0);
};


  return (
    <AllContext.Provider
      value={{
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
        handleMenus,
        menuPosition,
        setMenuPosition,
        selectedDev,
        setSelectedDev,
        emojiHolder,
        setEmojiHolder,
        handleEmojiClick,
        InputRef,
        InputRef,
        messageText,
        setMessageText,
        emojiRef,
        openPostForm,
        setOpenPostForm,
        openUsersSelection,
        setOpenUsersSelection,
        selectedUsers,
        setSelectedUsers,
        selectedUsersNames,
        setSelectedUsersNames,
        selectionMenuTitle,
        setSelectionMenuTitle,
        usersSelectionSearch,
        setUsersSelectionSearch,
        usersSelectionRef,
        userInfoData,
        setUserInfoData,
        settingMenu,
        setSettingMenu,
        openUsersReact,
        setOpenUsersReact,
        usersreactMenuRef,
        handleMenus2,
        menuPosition2,
        setMenuPosition2,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
