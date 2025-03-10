"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { maxLength } from "../Methods";
import { users } from "@/Data";
import ContentLoader from "react-content-loader";

import { ScreenContext } from "@/app/contexts/ScreenContext";

import {
  FaUnlink,
  FaUsers,
  FaEyeSlash,
  FaRegHeart,
  FaUserFriends,
  FaImage,
} from "react-icons/fa";
import {
  MdMarkUnreadChatAlt,
  MdFavorite,
  MdBlockFlipped,
  MdOutlinePushPin,
} from "react-icons/md";
import { IoSearch, IoClose, IoImageOutline } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TbLogout2, TbArchiveOff } from "react-icons/tb";
import { PiStickerDuotone } from "react-icons/pi";

export default function Chats() {
  const { pathname } = useContext(ScreenContext);

  const [hideChats, setHideChats] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [curentUserId, setCurentUserId] = useState();

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const actionMenu = useRef(null);

  const handleMessageActions = (event) => {
    event.preventDefault();
    const chatContainer = document.querySelector(".chats");
    if (!chatContainer) return;

    const { top, left, width, height } = chatContainer.getBoundingClientRect();
    const menuWidth = 167;
    const menuHeight = 270;
    const cursorY = event.clientY - top;
    const cursorX = event.clientX - left;

    const topPosition =
      cursorY + menuHeight > height
        ? Math.max(cursorY - menuHeight + 15, 10)
        : cursorY + 15;
    const leftPosition =
      cursorX + menuWidth > width
        ? Math.max(cursorX - menuWidth + 15, 10)
        : cursorX + 15;

    setUserMenu(true);
    setMenuPosition({ top: topPosition, left: leftPosition });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenu.current && !actionMenu.current.contains(event.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0); // Adjust as needed
  }, []);

  return (
    <div className={`chats ${hideChats ? "hide" : "active"}`}>
      <div
        className="open-close"
        onClick={() => {
          setHideChats((prev) => !prev);
        }}
      >
        <FaAngleLeft />
      </div>
      <div className="top">
        <h4>Friends</h4>
        <FaUserFriends className="chatico" />
        <div className="search-holder">
          <IoSearch />
          <input type="text" placeholder="Search Here..." />
          <IoClose className="delete" />
        </div>
      </div>
      <hr />
      <ul className="filters">
        <li className="active">
          <MdMarkUnreadChatAlt /> AllChat
        </li>
        <li>
          <FaUsers /> groups
        </li>
        <li>
          <MdFavorite /> favorites
        </li>
        <li>
          <FaEyeSlash /> unread
        </li>
        <li>
          <FaUnlink /> drafts
        </li>
      </ul>
      <div
        ref={actionMenu}
        className={`menu userMenu ${userMenu && "active"}`}
        style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
      >
        <div className="top">Actions</div>
        <ul>
          <li>
            <MdOutlinePushPin /> pin to top
          </li>
          <li>
            <FaRegHeart style={{ fontSize: "16px" }} /> add to favorite
          </li>
          <li className="logOut">
            <TbArchiveOff /> archive chat
          </li>
          <li className="danger">
            <MdBlockFlipped /> block
          </li>
          <li className="danger">
            <TbLogout2 /> Exit Group
          </li>
        </ul>
      </div>
      <div className="holder">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div style={{ minWidth: "230px", width: "100%" }}>
                <ContentLoader
                  viewBox="0 0 320 55"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="30" cy="30" r="25" />
                  <rect x="70" y="10" rx="5" ry="5" width="240" height="15" />
                  <rect x="70" y="35" rx="5" ry="5" width="180" height="15" />
                </ContentLoader>
              </div>
            ))
          : users?.map((x) => (
              <Link
                key={x.id}
                href={`/chat/${x.id}`}
                className={`chat ${curentUserId == x.id && "active"}`}
                onClick={() => setCurentUserId(x.id)}
                onContextMenu={(e) => {
                  handleMessageActions(e);
                  setCurentUserId(x.id);
                }}
              >
                <Image
                  className={`${x.newStatus && "status"} rounded`}
                  src={x.img}
                  width={45}
                  height={45}
                  alt={`user Image`}
                />
                <div className="name-lastmessage">
                  <h4>{x.name}</h4>
                  <p>
                    {x.lastMessage.type == "img" ? (
                      <>
                        <IoImageOutline /> Image
                      </>
                    ) : x.lastMessage.type == "sticker" ? (
                      <>
                        <PiStickerDuotone /> sticker
                      </>
                    ) : (
                      maxLength(x.lastMessage.content, 25)
                    )}
                  </p>
                </div>
                <div className="details">
                  <span>{x.lastMsgTime}</span>
                  {x.unReadCounter > 0 && (
                    <span className="count">{x.unReadCounter}</span>
                  )}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
