import React from "react";
import { useState, useContext } from "react";
import { AllContext } from "@/app/Context";

import EmojesHolder from "@/components/EmojesHolder";
import UsersSelection from "@/components/UsersSelection";
import PostForm from "@/components/forms/PostForm";
import ImagesSwiper from "@/components/ImagesSwiper";
import UserInfo from "@/components/UserInfo";

function AllComponents() {
  const { imgFocus, openPostForm, openUsersSelection, userInfoData } =
    useContext(AllContext);


console.log(userInfoData);

  return (
    <>
      {imgFocus && <ImagesSwiper />}
      {userInfoData && <UserInfo />}
      {openPostForm && <PostForm />}
      <EmojesHolder />
      {openUsersSelection && <UsersSelection />}
    </>
  );
}

export default AllComponents;
