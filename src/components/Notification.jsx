"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { MdBlock, MdReport, MdContentCopy } from "react-icons/md";
import { IoPersonRemove } from "react-icons/io5";
import { BiSolidHide, BiVolumeMute } from "react-icons/bi";
import { FaBookmark, FaExclamation } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { BsExclamationLg } from "react-icons/bs";

import { FaMessage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { CircleAlert } from "lucide-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineDangerous, MdErrorOutline } from "react-icons/md";

function Notification({ data }) {
  const { translations } = useLanguage();
  const { addNotification } = useNotification();
  return (
    <div
      className={`notification ${data.status}`}
      style={{
        background: `#${
          data.type === "error"
            ? `f64b3c`
            : data.type === "success"
            ? `0c7040`
            : `ef8d32`
        }`,
      }}
    >
      <span
        className="before"
        style={{
          background: `#${
            data.type === "error"
              ? `c81912`
              : data.type === "success"
              ? `004e32`
              : `cc561e`
          }`,
        }}
      ></span>
      <div className="icon-holder">
        <FaMessage
          className="backSvg"
          style={{
            color: `#${
              data.type === "error"
                ? `c81912`
                : data.type === "success"
                ? `004e32`
                : `cc561e`
            }`,
          }}
        />
        {data.type === "success" ? (
          <IoMdCheckmarkCircleOutline />
        ) : data.type === "error" ? (
          <MdErrorOutline />
        ) : (
          <CircleAlert />
        )}
      </div>
      <div className="content">
        <h4>{data.type}</h4>
        <p>{data.message}</p>
      </div>
    </div>
  );
}

export default Notification;
