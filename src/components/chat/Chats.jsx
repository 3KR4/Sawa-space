"use client";
import "@/Styles/components/side-chats.css";

import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import CutText from "@/utils/CutText";
import ContentLoader from "react-content-loader";
import { MenusContext } from "@/Contexts/MenusContext";
import { chatService } from "@/services/api/chatService";
import {} from "@/Contexts/LanguageContext";

import { useLanguage } from "@/Contexts/LanguageContext";
import { fetchingContext } from "@/Contexts/fetchingContext";
import ConvertTime from "@/utils/ConvertTime";

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
import { FaAngleLeft, FaPlus, FaArrowLeft } from "react-icons/fa6";
import { TbLogout2, TbArchiveOff } from "react-icons/tb";
import { PiStickerDuotone } from "react-icons/pi";

export default function Chats() {
  const [hideChats, setHideChats] = useState(false);
  const { screenSize, userData } = useContext(fetchingContext);
  const { translations, locale } = useLanguage();

  const [chatsCurrentFilter, setChatsCurrentFilter] = useState("allchats");
  const [userMenu, setUserMenu] = useState(false);
  const [curentUserId, setCurentUserId] = useState();

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const actionMenu = useRef(null);

  const handleMessageActions = (event) => {
    event.preventDefault();
    const chatContainer = document.querySelector(".chats");
    if (!chatContainer) return;

    const { top, left, width, height } = chatContainer.getBoundingClientRect();
    const menuWidth = 190;
    const menuHeight = 225;
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

  const [userChats, setUserChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserChats = async () => {
      setLoading(true);
      try {
        const { data } = await chatService.getUserChats();

        setUserChats(data.data);
      } catch (err) {
        console.error("Error fetching userChats", err);
        addNotification({
          type: "error",
          message: "Failed to load user chats",
        });
      } finally {
        setLoading(false);
      }
    };
    if (userData && userData?._id) fetchUserChats();
  }, [userData]);

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
        <div>
          {screenSize === "small" && (
            <Link href={"/"}>
              <FaArrowLeft className="goBackSvg" />
            </Link>
          )}

          {translations?.sidechats?.friends}
        </div>
        <FaUserFriends className="chatico" />
        <div className="no-friend-yet-svg">
          <Link className="main-button" href={"/discover/people"}>
            <FaPlus /> <span>{translations?.chats?.discover_people}</span>
          </Link>
        </div>
      </div>
      <hr />
      {userChats.length || loading ? (
        <>
          <ul className="filters">
            <li
              onClick={() => setChatsCurrentFilter("allchats")}
              className={chatsCurrentFilter === "allchats" ? "active" : ""}
            >
              <MdMarkUnreadChatAlt /> {translations?.sidechats?.allchats}
            </li>
            <li
              className={chatsCurrentFilter === "groups" ? "active" : ""}
              onClick={() => setChatsCurrentFilter("groups")}
            >
              <FaUsers /> {translations?.sidechats?.groups}
            </li>
            <li
              className={chatsCurrentFilter === "favorites" ? "active" : ""}
              onClick={() => setChatsCurrentFilter("favorites")}
            >
              <MdFavorite /> {translations?.sidechats?.favorites}
            </li>
            <li
              className={chatsCurrentFilter === "unread" ? "active" : ""}
              onClick={() => setChatsCurrentFilter("unread")}
            >
              <FaEyeSlash /> {translations?.sidechats?.unread}
            </li>
            <li
              className={chatsCurrentFilter === "drafts" ? "active" : ""}
              onClick={() => setChatsCurrentFilter("drafts")}
            >
              <FaUnlink /> {translations?.sidechats?.drafts}
            </li>
          </ul>
          <div
            ref={actionMenu}
            className={`menu userMenu ${userMenu && "active"}`}
            style={{
              top: `${menuPosition.top}px`,
              left: locale === "ar" ? "unset" : `${menuPosition.left}px`,
              right: locale === "ar" ? `${menuPosition.left}px` : "unset",
            }}
          >
            <div className="top">{translations?.actions?.actions}</div>
            <ul>
              <li>
                <MdOutlinePushPin /> {translations?.actions?.pintotop}
              </li>
              <li>
                <FaRegHeart style={{ fontSize: "16px" }} />{" "}
                {translations?.actions?.addtofavorite}
              </li>
              <li className="logOut">
                <TbArchiveOff /> {translations?.actions?.archivechat}
              </li>
              <li className="danger">
                <MdBlockFlipped /> {translations?.actions?.block}
              </li>
              <li className="danger">
                <TbLogout2 /> {translations?.actions?.exitgroup}
              </li>
            </ul>
          </div>
          <div className="holder">
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} style={{ minWidth: "230px", width: "100%" }}>
                    <ContentLoader
                      viewBox="0 0 320 55"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <circle cx="30" cy="30" r="25" />
                      <rect
                        x="70"
                        y="10"
                        rx="5"
                        ry="5"
                        width="240"
                        height="15"
                      />
                      <rect
                        x="70"
                        y="35"
                        rx="5"
                        ry="5"
                        width="180"
                        height="15"
                      />
                    </ContentLoader>
                  </div>
                ))
              : userChats?.map((x) => {
                  const friend = x.userDetails.find(
                    (x) => x._id !== userData?._id
                  );
                  return (
                    <Link
                      key={x._id}
                      href={`/chat/${x?._id}`}
                      className={`chat ${curentUserId == x?._id && "active"}`}
                      onClick={() => setCurentUserId(x?._id)}
                      onContextMenu={(e) => {
                        handleMessageActions(e);
                        setCurentUserId(x?._id);
                      }}
                    >
                      <Image
                        className={`${
                          friend?.newStatus ? "status" : ""
                        } rounded`}
                        src={
                          x?.isgroup
                            ? x?.img?.url
                              ? x?.img?.url
                              : "/users/group.svg"
                            : friend?.img?.url
                        }
                        width={45}
                        height={45}
                        alt={`user Image`}
                      />
                      <div className="content">
                        <div className="top">
                          <h4>
                            {x?.isgroup
                              ? x?.chatName
                              : `${friend?.firstname} ${friend?.lastname}`}
                          </h4>
                          <span>
                            {ConvertTime(x?.createdAt, locale, "chat")}
                          </span>
                        </div>
                        <div className="bottom">
                          <p>
                            {x?.lastMessage?.type == "img" ? (
                              <>
                                <IoImageOutline /> {translations?.chats?.image}
                              </>
                            ) : x?.lastMessage?.type == "sticker" ? (
                              <>
                                <PiStickerDuotone />{" "}
                                {translations?.chats?.sticker}
                              </>
                            ) : (
                              x?.lastMessage
                            )}
                          </p>
                          {x?.unReadCounter > 0 && (
                            <span className="count">{x?.unReadCounter}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </>
      ) : (
        <div className="no-friend-yet-svg">
          <p>{translations?.chats?.find_friends_and_start_chatting}</p>
          <img
            src={"/Svgs/dont Has Friends Yet.svg"}
            alt={`dont Has Friends Yet`}
          />
        </div>
      )}
    </div>
  );
}
