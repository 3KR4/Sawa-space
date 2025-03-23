"use client";
import React from "react";
import { useState } from "react";
import ReactsHolder from "@/components/post/ReactsHolder";

import { IoLink } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { MdOutlineAddReaction } from "react-icons/md";

function ActionsBtns({ id }) {
  const [reactsHolder, setReactsHolder] = useState(false);

  return (
    <div className="actions forImageSwiper">
      <div>
        <MdOutlineAddReaction
          onClick={() => setReactsHolder((prev) => !prev)}
        />
        {reactsHolder && (
          <ReactsHolder
            reactsHolder={reactsHolder}
            setReactsHolder={setReactsHolder}
            id={id}
          />
        )}
      </div>
      <IoLink />
      <PiShareFat />
    </div>
  );
}

export default ActionsBtns;
