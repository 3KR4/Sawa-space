"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { postService } from "@/services/api/postService";
import { InputActionsContext } from "@/Contexts/InputActionsContext";

import { MdBlock, MdReport, MdContentCopy, MdEdit } from "react-icons/md";
import { IoPersonRemove, IoPersonRemoveSharp, IoLogOut } from "react-icons/io5";
import { BiSolidHide, BiVolumeMute } from "react-icons/bi";
import { FaBookmark, FaTrashAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { GoBookmarkSlashFill } from "react-icons/go";

import { RiShareForwardFill } from "react-icons/ri";

function SettingMenu() {
  const { translations } = useLanguage();
  const { userData } = useContext(ScreenContext);

  const {
    settingsMenuRef,
    setDangerEvent,
    setOpenPostForm,
    setOpenStoryForm,
    setSomeThingHappen,
  } = useContext(MenusContext);
  const {
    menuPosition,
    settingMenu,
    setSettingMenu,
    settingMenuType,
    selectedDev,
  } = useContext(DynamicMenusContext);
  const { setMessageText } = useContext(InputActionsContext);

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

  // Delete Comment

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
          {selectedDev.isMyPost && (
            <button
              onClick={() => {
                setSettingMenu(false);
                setOpenPostForm({ type: "edit", postId: selectedDev.id });
              }}
            >
              <MdEdit /> {translations?.forms?.edit_post}
            </button>
          )}
          {!selectedDev.isInFavorite && (
            <button>
              <FaBookmark /> {translations?.actions?.save_post}
            </button>
          )}
          {!selectedDev.isMyPost && !selectedDev.isMyFriend && (
            <button>
              <HiUsers /> {translations?.actions?.add_friend}
            </button>
          )}
          {!selectedDev.isMyPost && (
            <>
              <hr />
              <button className="warning">
                <BiSolidHide /> {translations?.actions?.hide}
              </button>
              <button className="warning">
                <MdReport /> {translations?.actions?.report}
              </button>
              {selectedDev.isInFavorite && (
                <button>
                  <GoBookmarkSlashFill /> {translations?.actions?.un_save_post}
                </button>
              )}
            </>
          )}
          {(!selectedDev.isMyPost ||
            selectedDev.isMyPost ||
            selectedDev.isMyFriend) && <hr />}
          {selectedDev.isMyFriend && (
            <button className="danger">
              <IoPersonRemove /> {translations?.actions?.remove_friend}
            </button>
          )}
          {!selectedDev.isMyPost && (
            <button className="danger">
              <MdBlock /> {translations?.actions?.block}
            </button>
          )}
          {selectedDev.isMyPost && (
            <button
              className="danger"
              onClick={() => {
                setSettingMenu(null);
                setDangerEvent({
                  type: "remove_post",
                  message: "are you sure you want to remove your post",
                });
              }}
            >
              <FaTrashAlt /> {translations?.actions?.remove_post}
            </button>
          )}
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
          {selectedDev.isMyStory && (
            <>
              <button
                onClick={() => {
                  setSettingMenu(false);
                  setOpenStoryForm({ type: "edit", story: selectedDev.story });
                }}
              >
                <MdEdit /> {translations?.story?.edit_story}
              </button>
            </>
          )}
          <button>
            <MdContentCopy />{" "}
            {translations?.story?.copy_link_to_share_this_story}
          </button>
          <hr />
          {selectedDev.isMyStory ? (
            <button
              className="danger"
              onClick={() => {
                setSettingMenu(null);
                setDangerEvent({
                  type: "delete_story",
                  message: "are you sure you want to delete this story?",
                });
              }}
            >
              <FaTrashAlt /> {translations?.actions?.delete_story}
            </button>
          ) : (
            <button className="danger">
              <BiVolumeMute /> {translations?.story?.mute_stories_from} ahmed
            </button>
          )}
        </>
      ) : settingMenuType === "settingMenu-page" ? (
        <>
          <button>
            <RiShareForwardFill /> {translations?.portfolio?.share_page}
          </button>
          <hr />
          <button className="danger">
            <IoLogOut style={{ transform: "rotate(180deg)" }} />{" "}
            {translations?.portfolio?.unfollowing_page}
          </button>
          <button className="danger">
            <MdReport /> {translations?.actions?.report_page}
          </button>
        </>
      ) : settingMenuType === "settingMenu-page-posts" ? (
        <>
          <button>
            <FaBookmark /> {translations?.actions?.save_post}
          </button>
          <button className="warning">
            <BiSolidHide /> {translations?.actions?.hide}
          </button>
          <hr />

          <button className="danger">
            <MdBlock /> {translations?.actions?.block_page}
          </button>
          <button className="danger">
            <MdReport /> {translations?.actions?.report_page}
          </button>
        </>
      ) : settingMenuType === "settingMenu-comment" ? (
        <>
          {selectedDev.isMyComment ? (
            <>
              <button
                onClick={() => {
                  setMessageText(selectedDev?.comment?.paragraph);
                  setSomeThingHappen({
                    comment: {
                      event: "edit",
                      data: selectedDev?.comment,
                      level: selectedDev?.level,
                    },
                  });
                  setSettingMenu(null);
                }}
              >
                <MdEdit /> {translations?.actions?.edit_comment}
              </button>
              <button
                className="danger"
                onClick={() => {
                  setSettingMenu(null);
                  setDangerEvent({
                    type: "delete_comment",
                    message: "are you sure you want to delete this comment",
                  });
                }}
              >
                <FaTrashAlt /> {translations?.actions?.delete_comment}
              </button>
            </>
          ) : selectedDev.isMyPost ? (
            <>
              <button
                className="danger"
                onClick={() => {
                  setSettingMenu(null);
                  setDangerEvent({
                    type: "delete_comment",
                    message: "are you sure you want to delete this comment",
                  });
                }}
              >
                <FaTrashAlt /> {translations?.actions?.delete_comment}
              </button>
            </>
          ) : null}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SettingMenu;
