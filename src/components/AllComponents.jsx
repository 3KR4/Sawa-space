import React from "react";
import { useState, useContext } from "react";
import { AllContext } from "@/app/Context";

import EmojesHolder from "@/components/EmojesHolder";
import UsersSelection from "@/components/UsersSelection";
import PostForm from "@/components/forms/PostForm";
import ImagesSwiper from "@/components/ImagesSwiper";
import UserInfo from "@/components/UserInfo";
import SettingMenu from "@/components/SettingMenu";
import UsersReact from "@/components/UsersReact";
import { usePathname } from "next/navigation";

import { MdBlock } from "react-icons/md";
import { IoPersonRemove } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";

import { HiUsers } from "react-icons/hi2";

function AllComponents() {
  const {
    imgFocus,
    openPostForm,
    openUsersSelection,
    userInfoData,
    settingMenu,
    openUsersReact,
  } = useContext(AllContext);

  console.log(userInfoData);
  const pathname = usePathname(); // Get the current URL path

  return (
    <>
      {settingMenu &&
        !pathname.includes("user") &&
        !pathname.includes("chat") && (
          <SettingMenu type={"settingMenu-post"}>
            <button>
              <FaBookmark /> Save Post
            </button>
            <button>
              <HiUsers /> Add Friend
            </button>
            <hr />
            <button className="yellow">
              <BiSolidHide /> Hide
            </button>
            <button className="yellow">
              <MdBlock /> Report
            </button>
            <hr />
            <button className="danger">
              <IoPersonRemove /> Remove Friend
            </button>
            <button className="danger">
              <MdReport /> Block
            </button>
          </SettingMenu>
        )}
      {imgFocus && !pathname.includes("chat") && <ImagesSwiper />}
      {userInfoData && <UserInfo />}
      {openPostForm && <PostForm />}
      {openUsersReact && <UsersReact />}
      {openUsersSelection && <UsersSelection />}
      <EmojesHolder />
    </>
  );
}

export default AllComponents;
