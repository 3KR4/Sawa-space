"use client";
import React from "react";
import { useState, useContext } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import EmojesHolder from "@/components/post/EmojesHolder";
import UsersSelection from "@/components/UsersSelection";
import PostForm from "@/components/forms/PostForm";
import SingleDetails from "@/components/SingleDetails";
import UserInfo from "@/components/UserInfo";
import SettingMenu from "@/components/providers/SettingMenu";
import UsersReact from "@/components/UsersReact";
import { useLanguage } from "@/Contexts/LanguageContext";
import StoryForm from "@/components/forms/StoryForm";

import { MdBlock } from "react-icons/md";
import { IoPersonRemove } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";

import { HiUsers } from "react-icons/hi2";
function AllComponents() {
  const { translations } = useLanguage();

  const { imgFocus, openPostForm, openStoryForm } = useContext(MenusContext);

  const { openUsersSelection, userInfoData, settingMenu, openUsersReact } =
    useContext(DynamicMenusContext);
  const { pathname } = useContext(ScreenContext);

  return (
    <>
      {settingMenu &&
        !pathname.includes("user") &&
        !pathname.includes("chat") && (
          <SettingMenu type={"settingMenu-post"}>
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
          </SettingMenu>
        )}
      {imgFocus && !pathname.includes("chat") && <SingleDetails />}
      {userInfoData && <UserInfo />}
      {openPostForm && <PostForm />}
      {openStoryForm && <StoryForm />}
      {openUsersReact && <UsersReact />}
      {openUsersSelection && <UsersSelection />}
      <EmojesHolder />
    </>
  );
}

export default AllComponents;
