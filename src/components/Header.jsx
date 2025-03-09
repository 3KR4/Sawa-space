"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IoSearch,
  IoClose,
  IoGrid,
  IoChatbubbleEllipsesOutline,
  IoCartOutline,
  IoMenu,
} from "react-icons/io5";
import {
  FaCaretDown,
  FaUser,
  FaSearch,
  FaUsers,
  FaPager,
  FaHistory,
} from "react-icons/fa";
import { MdNotificationsActive, MdOutlineExplore } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { RiUserCommunityLine } from "react-icons/ri";
import { RiColorFilterAiFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { LiaPagerSolid } from "react-icons/lia";
import { AllContext } from "@/app/Context";
import { BsFillPostcardFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";

export default function Header() {
  const pathname = usePathname();
  const { screenSize, setOpenPostForm } =
    useContext(AllContext);
  const [userMenu, setUserMenu] = useState(false);
  const [createMenu, setCreateMenu] = useState(false);
  const [phoneMenu, setPhoneMenu] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState(false);

  const phoneMenuRef = useRef(null);
  const phoneSearchRef = useRef(null);
  const menuBtnRef = useRef(null);
  const searchBtnRef = useRef(null);
  const userMenuRef = useRef(null);
  const createMenuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenu(false);
      }

      if (
        createMenuRef.current &&
        !createMenuRef.current.contains(event.target)
      ) {
        setCreateMenu(false);
      }

      if (phoneMenuRef.current && phoneMenuRef.current.contains(event.target)) {
        return;
      }

      if (menuBtnRef.current && menuBtnRef.current.contains(event.target)) {
        return;
      }

      setPhoneMenu(false);

      if (
        phoneSearchRef.current &&
        phoneSearchRef.current.contains(event.target)
      ) {
        return;
      }

      if (searchBtnRef.current && searchBtnRef.current.contains(event.target)) {
        return;
      }

      setPhoneSearch(false); // Close search when clicking outside
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (screenSize !== "small") return; // Stop if not a small screen

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsVisible(false); // Hide header when scrolling down
      } else {
        setIsVisible(true); // Show header when scrolling up
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, screenSize]);

  return (
    <header
      className={`${
        screenSize === "small" && !isVisible ? "hidden" : "active"
      }`}
    >
      <div className="logo">
        <Link href="/" style={{ display: "flex" }}>
          <Image src={"/logo.png"} width={80} height={80} alt={`logo`} />
        </Link>
        {screenSize === "small" && (
          <div className="icons">
            <FaSearch
              ref={searchBtnRef}
              className={`search-btn ${phoneSearch ? "active" : ""}`}
              onClick={() => {
                setPhoneMenu(false); // Close menu first
                setPhoneSearch((prev) => !prev); // Then toggle search
              }}
            />
            <IoMenu
              ref={menuBtnRef}
              className={phoneMenu ? "active" : ""}
              onClick={() => {
                setPhoneSearch(false); // Close search menu first
                setPhoneMenu((prev) => !prev); // Then toggle menu
              }}
            />
          </div>
        )}
        <div
          ref={phoneSearchRef}
          className={`search-holder ${phoneSearch ? "active" : ""}`}
        >
          <div className="theInput">
            <IoSearch />
            <input type="text" placeholder="Search anything..." />
            <IoClose className="delete" />
          </div>
          <div className="result">
            <ul>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
              <li>wwwwwwwwwww</li>
            </ul>
          </div>
        </div>
      </div>
      <nav ref={phoneMenuRef} className={phoneMenu ? "active" : ""}>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          <MdOutlineExplore /> <span>Explore</span>
        </Link>
        <Link href="/chat" className={pathname === "/chat" ? "active" : ""}>
          <IoChatbubbleEllipsesOutline /> <span>Chat</span>
        </Link>
        <Link href="/pages" className={pathname === "/pages" ? "active" : ""}>
          <LiaPagerSolid /> <span>Pages</span>
        </Link>
        <Link
          href="/communities"
          className={pathname === "/communities" ? "active" : ""}
        >
          <RiUserCommunityLine /> <span>Communities</span>
        </Link>
        <Link
          href="/marketplace"
          className={pathname === "/marketplace" ? "active" : ""}
        >
          <IoCartOutline /> <span>Market Place</span>
        </Link>
      </nav>

      <div className="events">
        {screenSize === "small" ? (
          <>
            <li
              ref={createMenuRef}
              className="use-case"
              onClick={() => setCreateMenu((prev) => !prev)}
            >
              <IoGrid />
              <div className={`menu createMenu ${createMenu ? "active" : ""}`}>
                <h4 className="title">Creation Menu</h4>
                <ul>
                  <button onClick={() => setOpenPostForm(true)}>
                    <BsFillPostcardFill /> Create Post
                  </button>
                  <button>
                    <FaHistory /> Create Story
                  </button>
                  <button>
                    <HiUsers /> Create Group
                  </button>
                  <button>
                    <FaPager /> Create Page
                  </button>
                  <button>
                    <FaUsers /> Create Community
                  </button>
                </ul>
              </div>
            </li>
            <li
              ref={userMenuRef}
              className="user"
              onClick={() => setUserMenu((prev) => !prev)}
            >
              <Image
                className="rounded"
                src={"/avatar.png"}
                width={45}
                height={45}
                alt={`user Image`}
              />
              <FaUser className="x" /> <FaCaretDown className="angle" />
              <div className={`menu userMenu ${userMenu ? "active" : ""}`}>
                <Link href={`/user/4`} className="title">
                  <FaUser style={{ fontSize: "22px" }} /> Mahmoud Elshazly
                </Link>
                <ul>
                  <button>
                    <IoMdSettings /> Setting & Privacy
                  </button>
                  <button>
                    <BiSupport /> Help & Support
                  </button>
                  <button>
                    <RiColorFilterAiFill /> Display & Accessibility
                  </button>
                  <button className="logOut">
                    <TbLogout2 /> Log Out
                  </button>
                </ul>
              </div>
            </li>
            <li className="notifications">
              <MdNotificationsActive />
              <span className="length">20</span>
            </li>
          </>
        ) : (
          <>
            <li
              ref={createMenuRef}
              className="use-case"
              onClick={() => setCreateMenu((prev) => !prev)}
            >
              <IoGrid />
              <div className={`menu createMenu ${createMenu ? "active" : ""}`}>
                <h4 className="title">Creation Menu</h4>
                <ul>
                  <button onClick={() => setOpenPostForm(true)}>
                    <BsFillPostcardFill /> Create Post
                  </button>
                  <button>
                    <FaHistory /> Create Story
                  </button>
                  <button>
                    <HiUsers /> Create Group
                  </button>
                  <button>
                    <FaPager /> Create Page
                  </button>
                  <button>
                    <FaUsers /> Create Community
                  </button>
                </ul>
              </div>
            </li>
            <li className="notifications">
              <MdNotificationsActive />
              <span className="length">20</span>
            </li>
            <li
              ref={userMenuRef}
              className="user"
              onClick={() => setUserMenu((prev) => !prev)}
            >
              <Image
                className="rounded"
                src={"/avatar.png"}
                width={45}
                height={45}
                alt={`user Image`}
              />
              <FaUser className="x" /> <FaCaretDown className="angle" />
              <div className={`menu userMenu ${userMenu ? "active" : ""}`}>
                <Link href={`/user/4`} className="title">
                  <FaUser style={{ fontSize: "22px" }} /> Mahmoud Elshazly
                </Link>
                <ul>
                  <button>
                    <IoMdSettings /> Setting & Privacy
                  </button>
                  <button>
                    <BiSupport /> Help & Support
                  </button>
                  <button>
                    <RiColorFilterAiFill /> Display & Accessibility
                  </button>
                  <button className="logOut">
                    <TbLogout2 /> Log Out
                  </button>
                </ul>
              </div>
            </li>
          </>
        )}
      </div>
    </header>
  );
}


