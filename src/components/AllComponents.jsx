import React from "react";
import { useState, useContext } from "react";
import { AllContext } from "@/app/Context";

import EmojesHolder from "@/components/EmojesHolder";
import UsersSelection from "@/components/UsersSelection";
import PostForm from "@/components/forms/PostForm";
import ImagesSwiper from "@/components/ImagesSwiper";
import UserInfo from "@/components/UserInfo";
import SettingMenu from "@/components/SettingMenu";
import { usePathname } from "next/navigation"; // Import usePathname

import { MdBlock } from "react-icons/md";

import { IoPersonRemove } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { FaTags } from "react-icons/fa6";

import { HiUsers } from "react-icons/hi2";

function AllComponents() {
  const {
    imgFocus,
    openPostForm,
    openUsersSelection,
    userInfoData,
    settingMenu,
  } = useContext(AllContext);

  console.log(userInfoData);
  const pathname = usePathname(); // Get the current URL path

  return (
    <>
      {settingMenu && !pathname.includes("user") && (
        <SettingMenu type={"settingMenu-post"}>
          <button>
            <FaTags /> Save Post
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
      {imgFocus && <ImagesSwiper />}
      {userInfoData && <UserInfo />}
      {openPostForm && <PostForm />}
      <EmojesHolder />
      {openUsersSelection && <UsersSelection />}
    </>
  );
}

export default AllComponents;
