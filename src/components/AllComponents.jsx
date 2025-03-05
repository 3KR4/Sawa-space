import React from 'react'
import { useState, useContext } from 'react';
import { AllContext } from '@/app/Context';

import EmojesHolder from "@/components/EmojesHolder";
import UsersSelection from "@/components/UsersSelection";
import PostForm from "@/components/forms/PostForm";

function AllComponents() {
  const { emojiHolder, openPostForm, openUsersSelection } = useContext(AllContext);

  return (
    <>
      {emojiHolder && <EmojesHolder />}
      {openPostForm && <PostForm />}
      {openUsersSelection && <UsersSelection />}
    </>
  );
}

export default AllComponents