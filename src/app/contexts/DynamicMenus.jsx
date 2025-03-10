"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";

export const DynamicMenusContext = createContext();

export const MenuProvider = ({ children }) => {
  // Dynamic Menus
  const [userInfoData, setUserInfoData] = useState(false);
  const [settingMenu, setSettingMenu] = useState(false);
  const [openUsersSelection, setOpenUsersSelection] = useState(false);
  const [openUsersReact, setOpenUsersReact] = useState(false);
  const [emojiHolder, setEmojiHolder] = useState(false);
  const [selectedDev, setSelectedDev] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuPosition2, setMenuPosition2] = useState({ top: 0, left: 0 });

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

  return (
    <DynamicMenusContext.Provider
      value={{
        handleMenus,
        menuPosition,
        setMenuPosition,
        selectedDev,
        setSelectedDev,
        emojiHolder,
        setEmojiHolder,
        openUsersSelection,
        setOpenUsersSelection,
        userInfoData,
        setUserInfoData,
        settingMenu,
        setSettingMenu,
        openUsersReact,
        setOpenUsersReact,
        handleMenus2,
        menuPosition2,
        setMenuPosition2,
      }}
    >
      {children}
    </DynamicMenusContext.Provider>
  );
};
