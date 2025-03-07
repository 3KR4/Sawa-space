import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { AllContext } from "@/app/Context";
import Image from "next/image";

import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { users } from "@/Data";

function UserInfo() {
  const { selectedDev, userInfoData, setUserInfoData, menuPosition } =
    useContext(AllContext);

  const userInfoMenu = useRef(null);

  console.log(userInfoData);

  let currentUserData = users.find((x) => x.id == selectedDev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userInfoMenu.current &&
        !userInfoMenu.current.contains(event.target)
      ) {
        setUserInfoData(null);
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
      className={`userInfo sideMenu ${userInfoData && "active"}`}
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
    >
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
        <button className="main-button">
          <BsThreeDots />
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
