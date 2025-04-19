"use client";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import Image from "next/image";
import { users } from "@/utils/Data";
import SettingMenu from "@/components/providers/SettingMenu";

import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd, IoMdCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

function UserInfo() {
  const { selectedDev, infoMenu, setInfoMenu, menuPosition, setMenuPosition2 } =
    useContext(DynamicMenusContext);
  const { infoMenuRef } = useContext(MenusContext);

  let currentUserData = users.find((x) => x.id == selectedDev);

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
          src={currentUserData?.img || "/user/default.svg"}
          alt={currentUserData?.name}
          fill
        />
        <div className="info">
          <div className="top">
            <h4>{currentUserData?.name}</h4>
            <IoClose
              onClick={() => {
                setInfoMenu(null);
                setMenuPosition2({ top: 0, left: 0 });
              }}
              className="close"
            />
          </div>
          <p>150 Friends - 5 mutual</p>
          <h5>About</h5>
          <ul>
            <li>
              Work: <span>FrontEnd Developer</span>
            </li>
            <li>
              Study: <span>Mci Academy</span>
            </li>
            <li>
              Location: <span>Nasr CIty</span>
            </li>
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

        {true ? (
          <button className="main-button">
            <FaEye /> See Profile
          </button>
        ) : (
          <button className="main-button">
            <FaEye /> visit Page
          </button>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
