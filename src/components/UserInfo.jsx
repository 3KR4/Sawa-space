import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { AllContext } from "@/app/Context";
import Image from "next/image";
import { users } from "@/Data";
import SettingMenu from "@/components/SettingMenu";

import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function UserInfo() {
  const { selectedDev, userInfoData, setUserInfoData, menuPosition } =
    useContext(AllContext);
  const [settingmenuPosition, setSettingMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [nistedSettingMenu, setNistedSettingMenu] = useState(false);

  const userInfoMenu = useRef(null);
  const nistedSettingMenuRef = useRef(null);

  let currentUserData = users.find((x) => x.id == selectedDev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userInfoMenu.current &&
        !userInfoMenu.current.contains(event.target)
      ) {
        setUserInfoData(null);
      }
      if (
        nistedSettingMenuRef.current &&
        !nistedSettingMenuRef.current.contains(event.target)
      ) {
        setNistedSettingMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={userInfoMenu}
      className={`userInfo sideMenu ${userInfoData ? 'active' : ''}`}
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
    >
      {nistedSettingMenu && (
        <div
          ref={nistedSettingMenuRef}
          className={`sideMenu nistedUserSetting ${
            nistedSettingMenu ? "active" : ""
          }`}
        >
          <h4>Actions</h4>
          <button className="danger">
            <IoPersonRemoveSharp /> Remove Friend
          </button>
          <button className="danger">
            <MdBlock /> Block
          </button>
        </div>
      )}
      <div className="holder">
        <Image
          src={currentUserData?.img || "/user/default.png"}
          alt={currentUserData?.name}
          fill
        />
        <div className="info">
          <div className="top">
            <h4>{currentUserData?.name}</h4>
            <IoClose onClick={() => setUserInfoData(null)} className="close" />
          </div>
          <p>5 mutual Friends</p>
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
        <button className="main-button">
          <IoMdPersonAdd />
          Add Friend
        </button>
        <button className="main-button">See Profile</button>
        <button
          className="main-button"
          onClick={() => setNistedSettingMenu(true)}
        >
          <BsThreeDots />
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
