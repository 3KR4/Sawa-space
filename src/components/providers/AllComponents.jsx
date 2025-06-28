"use client";
import "@/Styles/components/notification.css";
import "@/Styles/components/side-menus.css";
import "@/Styles/components/providers.css";

import React from "react";
import { useContext } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import EmojesHolder from "@/components/post/EmojesHolder";
import UsersSelection from "@/components/UsersSelection";
import PostForm from "@/components/forms/PostForm";
import ImgForm from "@/components/forms/ImgForm";
import DangerEvent from "@/components/forms/DangerEvent";
import GroupForm from "@/components/forms/GroupForm";
import SingleDetails from "@/components/SingleDetails";
import UserInfo from "@/components/UserInfo";
import SettingMenu from "@/components/providers/SettingMenu";
import UsersReact from "@/components/UsersReact";
import StoryForm from "@/components/forms/StoryForm";
import ProductForm from "@/components/forms/ProductForm";
import Notification from "@/components/Notification";
import ShareForm from "@/components/ShareForm";
import { fetchingContext } from "@/Contexts/fetchingContext";
import { NotificationContext } from "@/Contexts/NotificationContext";

function AllComponents() {
  const { openForm, dangerEvent, singleProvider, shareLink } =
    useContext(MenusContext);
  const { notificationMessages, curentNotficationClosedCount } =
    useContext(NotificationContext);

  const {
    openUsersSelection,
    infoMenu,
    settingMenu,
    openUsersReact,
    emojiHolder,
  } = useContext(DynamicMenusContext);
  const { pathname, screenSize } = useContext(fetchingContext);

  return (
    <>
      <div
        className="notification-holder"
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

      {openForm?.for === "post" && <PostForm />}
      {openForm?.for === "story" && <StoryForm />}
      {openForm?.for === "product" && <ProductForm />}
      {openForm?.for === "group" && <GroupForm />}
      {openForm?.for === "image" && <ImgForm />}
      {settingMenu && <SettingMenu />}
      {singleProvider?.type && !pathname.includes("chat") && <SingleDetails />}
      {infoMenu && <UserInfo />}
      {dangerEvent?.type && <DangerEvent />}
      {openUsersReact && <UsersReact />}
      {openUsersSelection && <UsersSelection />}
      {emojiHolder && <EmojesHolder />}
      {shareLink && <ShareForm />}
    </>
  );
}

export default AllComponents;
