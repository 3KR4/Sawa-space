"use client";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import Image from "next/image";
import Link from "next/link";

import { users } from "@/utils/Data";
import SettingMenu from "@/components/providers/SettingMenu";
import { useRouter } from "next/navigation";

import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd, IoMdCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

function UserInfo() {
  const router = useRouter();
  const { selectedDev, infoMenu, setInfoMenu, menuPosition, setMenuPosition2 } =
    useContext(DynamicMenusContext);
  const { infoMenuRef } = useContext(MenusContext);

  let currentUserData = selectedDev;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoMenuRef.current && !infoMenuRef.current.contains(event.target)) {
        setInfoMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const skipKeys = ["birthDate", "languages", "current_location"];

  return (
    <div
      ref={infoMenuRef}
      className={`info-menu sideMenu ${infoMenu ? "active" : ""}`}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      <div className="holder">
        <Image
          className={`rounded`}
          src={currentUserData?.img?.url || "/user/default.svg"}
          alt={currentUserData?.firstname || currentUserData?.pagename}
          fill
        />
        <div className="info">
          <div className="top">
            <h4>
              {currentUserData?.pagename
                ? currentUserData?.pagename
                : `${currentUserData?.firstname} ${currentUserData?.lastname}`}
            </h4>
            <IoClose
              onClick={() => {
                setInfoMenu(null);
                setMenuPosition2({ top: 0, left: 0 });
              }}
              className="close"
            />
          </div>
          <p>no friends yet</p>
          <h5>About</h5>
          <ul>
            {Object.entries(currentUserData?.info || {}).map(([key, value]) => {
              if (skipKeys.includes(key)) return null;

              return (
                <li key={key} className="ellipsisText">
                  {key.replace(/_/g, " ")}: <span>{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="actions">
        {true ? (
          <button className="main-button">
            <IoMdPersonAdd />
            Add Friend
          </button>
        ) : (
          <button className="main-button">
            <IoMdPersonAdd />
            remove Friend
          </button>
        )}

        {/* {true ? (
          <button className="main-button">
            <IoMdPersonAdd />
            follow
          </button>
        ) : (
          <button className="main-button">
            <IoMdCloseCircle />
            unfollow
          </button>
        )} */}

        <Link
          href={`/portfolio/${currentUserData?.pagename ? "page" : "user"}/${
            currentUserData?._id
          }`}
          className="main-button"
        >
          <FaEye /> {currentUserData?.pagename ? "see profile" : "visit Page"}
        </Link>
      </div>
    </div>
  );
}

export default UserInfo;
