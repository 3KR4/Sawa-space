"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import CutText from "@/utils/CutText";
import { messages, users, posts } from "@/utils/Data";
import { use } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import Post from "@/components/post/Post";
import ContentLoader from "react-content-loader";
import { useLanguage } from "@/Contexts/LanguageContext";
import "@/Styles/user.css";

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

export default function User({ params }) {
  const { translations } = useLanguage();

  const {
    setDataSwiperType,
    dataForSwiper,
    setDataForSwiper,
    setImgFocus,
    setImgIndex,
  } = useContext(MenusContext);

  const { handleMenus, settingMenu } = useContext(DynamicMenusContext);

  const { id } = use(params); // Unwrap the Promise
  const [postSearch, setPostSearch] = useState("");

  const mediaMsgs = messages.filter((msg) => msg.img);
  const [curentChat, setCurentChat] = useState({});
  const [currentSelectedData, setCurrentSelectedData] = useState("posts");

  useEffect(() => {
    let currentChat = users.find((x) => x.id == id);
    setCurentChat(currentChat);
  }, [id]);

  const handleImageClick = (id, index) => {
    setDataSwiperType("msg");
    setImgFocus(id);
    setDataForSwiper(mediaMsgs);

    if (index === "") {
      const mediaIndex = dataForSwiper.findIndex((msg) => msg.id == id);
      setImgIndex(mediaIndex);
    } else {
      setImgIndex(index);
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0); // Adjust as needed
  }, []);

  return (
    <div className={`portfolio userPage`}>
      <div className="top">
        <div className="cover">
          <Image src={"/chat4.png"} alt="User Cover" fill />
          <div className="editICo">
            <MdModeEditOutline />
            {translations?.actions?.edit}
          </div>
        </div>
        <nav>
          <div className="top">
            <div className="leftHolder">
              <div className="userImg rounded">
                <Image
                  className="rounded"
                  src={curentChat?.img || "/users/default.png"}
                  alt="User Cover"
                  fill
                />
                <div className="editICo rounded">
                  <MdModeEditOutline />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="left-data">
                <h4>{curentChat?.name}</h4>
                <h5>
                  46 {translations?.portfolio?.friends} - 10{" "}
                  {translations?.portfolio?.mutual}
                </h5>
              </div>
              <div className="right-btns">
                <button className={`main-button`}>
                  <IoMdPersonAdd />
                  {translations?.actions?.add_friend}
                </button>
                <button className={`main-button`}>
                  <AiFillMessage />
                  {translations?.portfolio?.message}
                </button>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <button
                className={`main-button ${
                  currentSelectedData == "posts" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("posts")}
              >
                <BsFillPostcardFill />
                {translations?.portfolio?.posts}
              </button>
              <button
                className={`main-button ${
                  currentSelectedData == "friends" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("friends")}
              >
                <HiUsers />
                {translations?.sidechats?.friends}
              </button>
              <button
                className={`main-button ${
                  currentSelectedData == "photos" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("photos")}
              >
                <IoMdPhotos />
                {translations?.portfolio?.photos}
              </button>
              <button
                className={`main-button ${
                  currentSelectedData == "about" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("about")}
              >
                <IoInformationCircleSharp />
                {translations?.portfolio?.about}
              </button>
            </div>
            <button
              className={`main-button`}
              onClick={(e) => handleMenus(e, "settingMenu-user", id)}
            >
              <BsThreeDots />
            </button>
          </div>
        </nav>
      </div>
      <div className="bottom-holder">
        <div className="side-menu">
          {currentSelectedData !== "about" && (
            <ul className="about">
              <div className="top">
                <h4>{translations?.portfolio?.about}</h4>
              </div>
              <li>
                {translations?.portfolio?.birthdate}: <span>19-12-2003</span>
              </li>
              <li>
                {translations?.portfolio?.region}: <span>Egypt</span>
              </li>
              <li>
                {translations?.portfolio?.current_location}:<span>Cairo</span>
              </li>
              <li>
                {translations?.portfolio?.work}: <span>FrontEnd Developer</span>
              </li>
            </ul>
          )}
          {currentSelectedData !== "photos" && (
            <div className="images">
              <div className="top">
                <h4> {translations?.portfolio?.photos}</h4>
                {mediaMsgs?.length > 6 && (
                  <button onClick={() => setCurrentSelectedData("photos")}>
                    {translations?.portfolio?.see_all}{" "}
                    {translations?.portfolio?.photos} <FaAngleRight />
                  </button>
                )}
              </div>
              <div className="hold">
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <ContentLoader
                        width={120}
                        height={120}
                        speed={4}
                        viewBox="0 0 120 120"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="160"
                          y="120"
                          rx="3"
                          ry="3"
                          width="100%"
                          height="120"
                        />
                      </ContentLoader>
                    ))
                  : mediaMsgs.slice(0, 6).map((x, index) => (
                      <Image
                        key={index}
                        src={x.img}
                        alt=""
                        fill
                        onClick={() => {
                          handleImageClick(x.id, index);
                        }}
                      />
                    ))}
              </div>
            </div>
          )}
          {currentSelectedData !== "friends" && (
            <div className="holder friends">
              <div className="top">
                <h4>{translations?.sidechats?.friends}</h4>
                {users?.length > 6 && (
                  <button onClick={() => setCurrentSelectedData("friends")}>
                    {translations?.portfolio?.see_all}{" "}
                    {translations?.sidechats?.friends} <FaAngleRight />
                  </button>
                )}
              </div>
              <div className="hold">
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <ContentLoader
                        width={120}
                        height={120}
                        speed={4}
                        viewBox="0 0 120 120"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="160"
                          y="120"
                          rx="3"
                          ry="3"
                          width="100%"
                          height="120"
                        />
                      </ContentLoader>
                    ))
                  : users?.slice(0, 6).map((x) => (
                      <div
                        key={x.id}
                        className="chat"
                        onClick={(e) => handleMenus(e, "user-Info", x.id)}
                      >
                        <Image
                          className="rounded"
                          src={x.img || "/users/default.png"}
                          fill
                          alt={`user Image`}
                        />
                        <div className="name-lastmessage">
                          <h4>{x.name}</h4>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
        <div className="bigSection">
          {currentSelectedData !== "about" && (
            <div className="actions">
              <h4>
                {translations?.portfolio?.all}{" "}
                {currentSelectedData === "friends"
                  ? translations?.sidechats?.[currentSelectedData]
                  : translations?.portfolio?.[currentSelectedData] || ""}
              </h4>
              <button>Sort by Time</button>
            </div>
          )}

          {currentSelectedData === "posts" ? (
            <div className="posts-holder">
              {loading
                ? Array.from({ length: 2 }).map((_, index) => (
                    <div style={{ maxWidth: "700px" }}>
                      <ContentLoader
                        className="skeleton skeleton-post"
                        width={600}
                        height={350}
                        speed={5}
                        viewBox="0 0 600 350"
                        backgroundColor="#E8E8E8"
                        foregroundColor="#D5D5D5"
                      >
                        {/* Profile Picture */}
                        <circle cx="35" cy="35" r="20" />
                        {/* Name & Timestamp */}
                        <rect
                          x="65"
                          y="20"
                          rx="5"
                          ry="5"
                          width="120"
                          height="12"
                        />
                        <rect
                          x="65"
                          y="38"
                          rx="5"
                          ry="5"
                          width="100"
                          height="10"
                        />
                        {/* Post Text */}
                        <rect
                          x="20"
                          y="70"
                          rx="5"
                          ry="5"
                          width="93%"
                          height="10"
                        />
                        <rect
                          x="20"
                          y="90"
                          rx="5"
                          ry="5"
                          width="500"
                          height="10"
                        />
                        <rect
                          x="20"
                          y="110"
                          rx="5"
                          ry="5"
                          width="520"
                          height="10"
                        />
                        {/* Image Placeholder */}
                        <rect
                          x="20"
                          y="140"
                          rx="5"
                          ry="5"
                          width="93%"
                          height="150"
                        />
                        {/* Footer (Likes, Comments, Shares) */}
                        <rect
                          x="20"
                          y="310"
                          rx="5"
                          ry="5"
                          width="30"
                          height="10"
                        />{" "}
                        {/* Like Icon */}
                        <rect
                          x="60"
                          y="310"
                          rx="5"
                          ry="5"
                          width="20"
                          height="10"
                        />{" "}
                        {/* Like Count */}
                        <rect
                          x="515"
                          y="310"
                          rx="5"
                          ry="5"
                          width="30"
                          height="10"
                        />{" "}
                        {/* Comment Icon */}
                        <rect
                          x="555"
                          y="310"
                          rx="5"
                          ry="5"
                          width="20"
                          height="10"
                        />{" "}
                        {/* Comment Count */}
                      </ContentLoader>
                    </div>
                  ))
                : posts.map((data, index) => <Post data={data} key={index} />)}
            </div>
          ) : currentSelectedData === "friends" ? (
            <div className="friends">
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <ContentLoader
                      width={120}
                      height={120}
                      speed={4}
                      viewBox="0 0 120 120"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect
                        x="160"
                        y="120"
                        rx="3"
                        ry="3"
                        width="100%"
                        height="120"
                      />
                    </ContentLoader>
                  ))
                : users?.map((x) => (
                    <div
                      key={x.id}
                      onClick={(e) => handleMenus(e, "user-Info", x.id)}
                    >
                      <Image
                        className="rounded"
                        src={x.img || "/users/default.png"}
                        fill
                        alt={`user Image`}
                      />
                      <div>
                        <h4>{x.name}</h4>
                        <p>{x.bio}</p>
                      </div>
                    </div>
                  ))}
            </div>
          ) : currentSelectedData === "photos" ? (
            <div className="photos">
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <ContentLoader
                      width={120}
                      height={120}
                      speed={4}
                      viewBox="0 0 120 120"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect
                        x="160"
                        y="120"
                        rx="3"
                        ry="3"
                        width="100%"
                        height="120"
                      />
                    </ContentLoader>
                  ))
                : mediaMsgs.map((x, index) => (
                    <Image
                      key={index}
                      src={x.img}
                      alt=""
                      fill
                      onClick={() => handleImageClick(x.id, index)}
                    />
                  ))}
            </div>
          ) : (
            <ul className="about">
              <h4>{translations?.portfolio?.about}</h4>

              <li>
                Bio:
                <span>في ناس حطناهم فوق راسنا بس طلع المكان عالي عليهم</span>
              </li>
              <li>
                {translations?.portfolio?.birthdate}: <span>19-12-2003</span>
              </li>
              <li>
                {translations?.portfolio?.region}: <span>Egypt</span>
              </li>
              <li>
                {translations?.portfolio?.current_location}: <span>Cairo</span>
              </li>
              <li>
                {translations?.portfolio?.work}: <span>FrontEnd Developer</span>
              </li>
              <li>
                {translations?.portfolio?.college}:{" "}
                <span>Cairo University</span>
              </li>
              <li>
                {translations?.portfolio?.speaking_languages}:{" "}
                <span>Arabic, English</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
