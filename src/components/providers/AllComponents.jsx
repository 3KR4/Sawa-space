"use client";
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
import { ScreenContext } from "@/Contexts/ScreenContext";
import { NotificationContext } from "@/Contexts/NotificationContext";

function AllComponents() {
  const {
    openPostForm,
    openStoryForm,
    openProductForm,
    openImgForm,
    dangerEvent,
    singleProvider,
    openShare,
    openGroupForm,
  } = useContext(MenusContext);
  const { notificationMessages, curentNotficationClosedCount } =
    useContext(NotificationContext);

  const {
    openUsersSelection,
    infoMenu,
    settingMenu,
    openUsersReact,
    emojiHolder,
  } = useContext(DynamicMenusContext);
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
      {singleProvider?.type && !pathname.includes("chat") && <SingleDetails />}
      {infoMenu && <UserInfo />}
      {openPostForm && <PostForm />}
      {openStoryForm && <StoryForm />}
      {openProductForm && <ProductForm />}
      {openGroupForm && <GroupForm />}
      {openImgForm && <ImgForm />}
      {dangerEvent && <DangerEvent />}
      {openUsersReact && <UsersReact />}
      {openUsersSelection && <UsersSelection />}
      {emojiHolder && <EmojesHolder />}
      {openShare && <ShareForm />}
    </>
  );
}

export default AllComponents;
