"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";


import { MdBlock, MdReport, MdContentCopy } from "react-icons/md";
import { IoPersonRemove } from "react-icons/io5";
import { BiSolidHide, BiVolumeMute } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";

import { IoPersonRemoveSharp } from "react-icons/io5";

function SettingMenu() {
  const { translations } = useLanguage();

  const { settingsMenuRef } = useContext(MenusContext);
  const { menuPosition, settingMenu, setSettingMenu, settingMenuType } =
    useContext(DynamicMenusContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!settingsMenuRef.current) return;
      if (settingsMenuRef.current.contains(event.target)) {
        return;
      }
      setSettingMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSettingMenu]);

  return (
    <div
      ref={settingsMenuRef}
      className={`${settingMenuType} sideMenu ${settingMenu ? "active" : ""}`}
      style={{
        top: menuPosition?.top ? `${menuPosition.top}px` : "0px",
        left: menuPosition?.left ? `${menuPosition.left}px` : "0px",
      }}
    >
      {settingMenuType === "settingMenu-post" ? (
        <>
          <button>
            <FaBookmark /> {translations?.actions?.save_post}
          </button>
          <button>
            <HiUsers /> {translations?.actions?.add_friend}
          </button>
          <hr />
          <button className="yellow">
            <BiSolidHide /> {translations?.actions?.hide}
          </button>
          <button className="yellow">
            <MdBlock /> {translations?.actions?.block}
          </button>
          <hr />
          <button className="danger">
            <IoPersonRemove /> {translations?.actions?.remove_friend}
          </button>
          <button className="danger">
            <MdReport /> {translations?.actions?.report}
          </button>
        </>
      ) : settingMenuType === "settingMenu-user" ? (
        <>
          <h4>{translations?.actions?.action}</h4>
          <button className="danger">
            <IoPersonRemoveSharp /> {translations?.actions?.remove_friend}
          </button>
          <button className="danger">
            <MdBlock /> {translations?.actions?.block}
          </button>
        </>
      ) : settingMenuType === "settingMenu-story" ? (
        <>
          <button>
            <MdContentCopy />{" "}
            {translations?.story?.copy_link_to_share_this_story}
          </button>
          <button className="danger">
            <BiVolumeMute /> {translations?.story?.mute_stories_from} ahmed
          </button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SettingMenu;
