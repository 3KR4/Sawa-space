"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";

export const DynamicMenusContext = createContext();

export const MenuProvider = ({ children }) => {
  // Dynamic Menus
  const [infoMenu, setInfoMenu] = useState(false);
  const [settingMenu, setSettingMenu] = useState(false);
  const [openUsersSelection, setOpenUsersSelection] = useState(false);
  const [openUsersReact, setOpenUsersReact] = useState(false);
  const [emojiHolder, setEmojiHolder] = useState(false);
  const [selectedDev, setSelectedDev] = useState(false);
  const [settingMenuType, setSettingMenuType] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuPosition2, setMenuPosition2] = useState({ top: 0, left: 0 });

  const handleMenus = (event, type, id, info) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const cursorY = event.clientY;
    const cursorX = event.clientX;

    const menuWidth =
      type.includes("Info") || type == "usersSelection" || type == "emojiHolder"
        ? 340
        : 255;

    const menuHeight =
      type == "emojiHolder" || type === "usersSelection"
        ? 450
        : type.includes("Info")
        ? 198
        : type == "settingMenu-msg"
        ? 340
        : type == "settingMenu-user"
        ? 130
        : type == "settingMenu-story"
        ? 98
        : type == "settingMenu-post"
        ? info.isMyPost
          ? 152
          : 286
        : type == "settingMenu-page" || type == "settingMenu-page-posts"
        ? 140
        : type == "usersReact"
        ? 220
        : null;

    const top =
      cursorY + menuHeight > windowHeight
        ? Math.max(cursorY - menuHeight - 5, 50)
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
    if (type.includes("Info")) {
      setInfoMenu(true);
    }
    if (type.includes("settingMenu")) {
      setSettingMenu(true);
      setSettingMenuType(type);
      info && setSelectedDev({ id, ...info });
    }
    id && !info && setSelectedDev(id);
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

    const menuWidth = type.includes("Info") ? 340 : null;

    const menuHeight = type.includes("Info") ? 198 : null;

    const top =
      cursorY + menuHeight > windowHeight
        ? Math.max(cursorY - menuHeight + 15, 50)
        : cursorY + 15;
    const left =
      cursorX + menuWidth > windowWidth
        ? Math.max(cursorX - menuWidth + 15, 10)
        : cursorX + 15;

    if (type.includes("Info")) {
      setInfoMenu(true);
    }

    id && setSelectedDev(id);
    setMenuPosition2({ top, left });
  };

  return (
    <DynamicMenusContext.Provider
      value={{
        handleMenus,
        handleMenus2,
        menuPosition,
        setMenuPosition,
        selectedDev,
        setSelectedDev,
        emojiHolder,
        setEmojiHolder,
        openUsersSelection,
        setOpenUsersSelection,
        infoMenu,
        setInfoMenu,
        settingMenu,
        setSettingMenu,
        openUsersReact,
        setOpenUsersReact,
        menuPosition2,
        setMenuPosition2,
        settingMenuType,
      }}
    >
      {children}
    </DynamicMenusContext.Provider>
  );
};
