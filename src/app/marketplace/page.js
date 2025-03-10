"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { maxLength } from "@/Methods";
import { messages, users, posts } from "@/Data";
import { use } from "react";
import Post from "@/components/Post";
import SettingMenu from "@/components/SettingMenu";

import "../Css/user.css";
import { FaAngleRight } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

import { IoSearch, IoClose } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";

import { HiUsers } from "react-icons/hi2";
import { IoMdPhotos } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";

import { IoInformationCircleSharp } from "react-icons/io5";

export default function MarketPlace({ params }) {

  const { id } = use(params); // Unwrap the Promise

  return <div className={`marketplace`}>marketplace</div>;
}
