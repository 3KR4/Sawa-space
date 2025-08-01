"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/Styles/components/header.css";

import { userService } from "@/services/api/userService";
import { useNotification } from "@/Contexts/NotificationContext";

import {
  IoSearch,
  IoClose,
  IoGrid,
  IoChatbubbleEllipsesOutline,
  IoCartOutline,
  IoMenu,
  IoLanguage,
} from "react-icons/io5";
import {
  FaCaretDown,
  FaUser,
  FaSearch,
  FaUsers,
  FaPager,
  FaHistory,
  FaStar,
  FaShoppingBasket,
} from "react-icons/fa";
import { MdNotificationsActive, MdOutlineExplore } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { RiColorFilterAiFill, RiUserCommunityLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { LiaPagerSolid } from "react-icons/lia";
import { MenusContext } from "@/Contexts/MenusContext";
import { fetchingContext } from "@/Contexts/fetchingContext";
import { useLanguage } from "../Contexts/LanguageContext";
import { BsFillPostcardFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { useDefaultReduceAnimations } from "@mui/x-date-pickers/internals";

export default function Header() {
  const { setOpenForm, setSingleProvider } = useContext(MenusContext);
  const { translations, locale, changeLanguage } = useLanguage();
  const {
    pathname,
    screenSize,
    userData,
    userPage,
    setUserData,
    fetchUserData,
  } = useContext(fetchingContext);
  const { addNotification } = useNotification();

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

      setPhoneSearch(false);
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

  const handleUserSettings = async (type, value) => {
    const payload = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      brithdate: userData.brithdate,
      bio: userData.bio,
      info: userData.info,
      Settings: {
        ...userData.Settings,
        [type]: value,
      },
    };

    try {
      await userService.editUserData(userData?._id, payload);
      await fetchUserData();
    } catch (err) {
      console.error("Error fetching userData", err);
      addNotification({
        type: "error",
        message: "Failed to load user data",
      });
    }
  };

  const Notfication = () => (
    <li className="notifications">
      <MdNotificationsActive />
      <span className="length">20</span>
    </li>
  );
  const creation = () => (
    <li
      ref={createMenuRef}
      className="use-case"
      onClick={() => setCreateMenu((prev) => !prev)}
    >
      <IoGrid />
      <div className={`menu createMenu ${createMenu ? "active" : ""}`}>
        <h4 className="title">{translations?.header?.create}</h4>
        <ul>
          <button onClick={() => setOpenForm({ for: "post" })}>
            <BsFillPostcardFill /> {translations?.header?.createpost}
          </button>
          <button onClick={() => setOpenForm({ for: "story" })}>
            <FaHistory /> {translations?.header?.createstory}
          </button>
          {userPage && (
            <button onClick={() => setOpenForm({ for: "product" })}>
              <FaShoppingBasket /> {translations?.header?.createProduct}
            </button>
          )}

          <button onClick={() => setOpenForm({ for: "group" })}>
            <FaUsers /> {translations?.header?.creategroup}
          </button>
          {!userPage && (
            <button
              onClick={() => {
                setSingleProvider({
                  type: "page",
                });
              }}
            >
              <FaPager /> {translations?.header?.createpage}
            </button>
          )}

          {/* <button>
            <HiUsers /> {translations?.header?.createcommunity}
          </button> */}
        </ul>
      </div>
    </li>
  );
  const user = () => (
    <li
      ref={userMenuRef}
      className="user"
      onClick={() => setUserMenu((prev) => !prev)}
    >
      <Image
        className="rounded"
        src={userData?.img?.url || "/users/default.svg"}
        width={45}
        height={45}
        alt={`user Image`}
      />
      <FaUser className="x" /> <FaCaretDown className="angle" />
      <div className={`menu userMenu ${userMenu ? "active" : ""}`}>
        <Link href={`/portfolio/user/${userData?._id}`} className="title">
          <FaUser style={{ fontSize: "22px" }} />
          <span className="ellipsisText">
            {userData?.firstname} {""} {userData?.lastname}
          </span>
        </Link>

        <ul>
          {userPage && (
            <button>
              <Link href={`/portfolio/page/${userPage?._id}`} className="title">
                <FaPager style={{ fontSize: "22px" }} />{" "}
                <span className="ellipsisText">{userPage?.pagename}</span>
              </Link>
            </button>
          )}

          <button>
            <IoMdSettings /> {translations?.header?.settings_and_privacy}
          </button>
          <button>
            <BiSupport /> {translations?.header?.help_and_support}
          </button>
          <button>
            <RiColorFilterAiFill />
            {translations?.header?.display_and_accessibility}
          </button>
          <button
            onClick={() =>
              handleUserSettings(
                "lang",
                userData?.Settings?.lang === "en" ? "ar" : "en"
              )
            }
          >
            <IoLanguage /> {translations?.header?.swithlang}
          </button>
          <button
            className="logOut"
            onClick={() => {
              setUserData(null);
              localStorage.removeItem("user");
              localStorage.removeItem("page");
              localStorage.removeItem("authToken");
            }}
          >
            <TbLogout2 /> {translations?.header?.logout}
          </button>
        </ul>
      </div>
    </li>
  );

  return (
    <header
      className={`${
        screenSize === "small" && !isVisible ? "hidden" : "active"
      }`}
    >
      <div className="logo">
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <Link href="/" style={{ display: "flex" }}>
            <Image src={"/logo.png"} width={80} height={80} alt={`logo`} />
          </Link>
          {screenSize === "small" && (
            <IoMenu
              ref={menuBtnRef}
              className={phoneMenu ? "active" : ""}
              onClick={() => {
                setPhoneSearch(false); // Close search menu first
                setPhoneMenu((prev) => !prev); // Then toggle menu
              }}
            />
          )}
        </div>

        {screenSize === "small" && (
          <>
            <div className="icons">
              <FaSearch
                ref={searchBtnRef}
                className={`search-btn ${phoneSearch ? "active" : ""}`}
                onClick={() => {
                  setPhoneMenu(false); // Close menu first
                  setPhoneSearch((prev) => !prev); // Then toggle search
                }}
              />
              {userData && userData?._id && (
                <div className="events">
                  <>
                    {creation()}
                    {Notfication()}
                    {user()}
                  </>
                </div>
              )}
            </div>

            <div
              ref={phoneSearchRef}
              className={`search-holder ${phoneSearch ? "active" : ""}`}
            >
              <div className="theInput">
                <IoSearch />
                <input
                  type="text"
                  placeholder={translations?.placeHolders?.search_anything}
                />
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
          </>
        )}
      </div>
      <nav ref={phoneMenuRef} className={phoneMenu ? "active" : ""}>
        <div className="hold">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            <MdOutlineExplore /> <span>{translations?.header?.explore}</span>
          </Link>
          <Link
            href="/chat"
            className={pathname.includes("/chat") ? "active" : ""}
          >
            <IoChatbubbleEllipsesOutline />{" "}
            <span>{translations?.header?.chats}</span>
          </Link>
          <Link
            href="/discover/pages"
            className={pathname.includes("/pages") ? "active" : ""}
          >
            <LiaPagerSolid /> <span>{translations?.header?.pages}</span>
          </Link>
          {/* <Link
            href="/communities"
            className={pathname.includes("/communities") ? "active" : ""}
          >
            <RiUserCommunityLine />{" "}
            <span>{translations?.header?.communities}</span>
          </Link> */}
          <Link
            href="/marketplace"
            className={pathname.includes("/marketplace") ? "active" : ""}
          >
            <IoCartOutline /> <span>{translations?.header?.marketplace}</span>
          </Link>
        </div>
        {screenSize === "small" && !userData && (
          <Link className="letsPegin" href="/auth">
            {translations?.header?.lets_begin}
            <FaStar />
          </Link>
        )}
      </nav>

      {userData && userData?._id && screenSize !== "small" && (
        <div className="events">
          <>
            {creation()}
            {Notfication()}
            {user()}
          </>
        </div>
      )}

      {!userData && !userData?._id ? (
        <Link className="letsPegin" href="/auth">
          {translations?.header?.lets_begin}
          <FaStar />
        </Link>
      ) : null}
    </header>
  );
}
