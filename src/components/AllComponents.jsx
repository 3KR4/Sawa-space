import React from 'react'
import { useState, useContext } from 'react';
import { AllContext } from '@/app/Context';

import EmojesHolder from "@/components/EmojesHolder";

function AllComponents() {
  const {
    reactsHolder,
    emojiHolder,
  } = useContext(AllContext);

  return (
    <>
      {emojiHolder && <EmojesHolder/>}
    </>
  )
}

export default AllComponents