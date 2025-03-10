"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { posts } from "@/Data";

import Post from "@/components/Post";

export default function Home() {
  // const [postMenu, setPostMenu] = useState()
  // const [curentUserId, setCurentUserId] = useState()
  // const [menuPosition, setMenuPosition] = useState(0);

  // const handleMessageActions = (event) => {
  //   event.preventDefault();
  //   const windowHeight = window.innerHeight;
  //   const cursorY = event.clientY;

  //   const menuHeight = 270;
  //   const top = cursorY + menuHeight > windowHeight ? Math.max(cursorY - menuHeight, 10) : cursorY;
  //   setPostMenu(true)
  //   setMenuPosition(top - 10);
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (actionMenu.current && !actionMenu.current.contains(event.target)) {
  //       setPostMenu(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  return (
    <div className="home">
      <div className="posts-holder">
        {posts.map((x, index) => {
          return <Post key={index} data={x} />;
        })}
      </div>
    </div>
  );
}
