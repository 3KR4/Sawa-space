"use client";
import React from "react";
import { useState, useContext } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import EmojesHolder from "@/components/post/EmojesHolder";
import UsersSelection from "@/components/UsersSelection";
import PostForm from "@/components/forms/PostForm";
import SingleDetails from "@/components/SingleDetails";
import UserInfo from "@/components/UserInfo";
import SettingMenu from "@/components/providers/SettingMenu";
import UsersReact from "@/components/UsersReact";
import StoryForm from "@/components/forms/StoryForm";
import Notification from "@/components/Notification";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { NotificationContext } from "@/Contexts/NotificationContext";

function AllComponents() {
  const { imgFocus, openPostForm, openStoryForm } = useContext(MenusContext);
  const { notificationMessages, curentNotficationClosedCount } =
    useContext(NotificationContext);

  const { openUsersSelection, userInfoData, settingMenu, openUsersReact } =
    useContext(DynamicMenusContext);
  const { pathname, screenSize } = useContext(ScreenContext);

  return (
    <>
      <div
        className="notfication-holder"
        style={{
          transform:
            curentNotficationClosedCount > 0 &&
            notificationMessages.length !== 1
              ? `translateY(-${curentNotficationClosedCount * 100}px)`
              : `translateY(0px)`,
        }}
      >
        {notificationMessages.map((x, index) => (
          <Notification key={index} data={x} />
        ))}
      </div>

      {settingMenu && <SettingMenu />}
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
