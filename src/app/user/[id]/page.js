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
import PostsHolder from "@/components/post/PostsHolder";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { userService } from "@/services/api/userService";

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
  const { addNotification } = useNotification();
  const { userData } = useContext(ScreenContext);
  const { openImgForm, setOpenImgForm } = useContext(MenusContext);

  const { handleMenus, settingMenu } = useContext(DynamicMenusContext);

  const { id } = use(params);

  const isMyPage = userData?._id === id;

  const [currentUser, setCurrentUser] = useState({});
  const [currentSelectedData, setCurrentSelectedData] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [postSearch, setPostSearch] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await userService.getUserData(id);
        setCurrentUser(data.data);
      } catch (err) {
        console.error("Error fetching posts", err);
        addNotification({
          type: "error",
          message: "Failed to load user data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className={`portfolio userPage ${isMyPage ? "myPage" : ""}`}>
      <div className="top">
        <div className="cover">
          {(currentUser?.cover?.url || (isMyPage && userData?.cover?.url)) && (
            <Image
              src={isMyPage ? userData?.cover?.url : currentUser?.cover?.url}
              alt="User Cover"
              fill
            />
          )}
          {isMyPage && (
            <div
              className="editICo"
              onClick={() => {
                setOpenImgForm({
                  type: "cover",
                  event: isMyPage
                    ? userData?.cover?.url
                      ? "edit"
                      : "add"
                    : currentUser?.cover?.url
                    ? "edit"
                    : "add",
                  userId: id,
                  image: userData?.cover?.url,
                });
              }}
            >
              <MdModeEditOutline />
            </div>
          )}
        </div>
        <nav>
          <div className="top">
            <div className="leftHolder">
              <div className="userImg rounded">
                <Image
                  className="rounded"
                  src={
                    isMyPage
                      ? userData?.img?.url || "/users/default.svg"
                      : currentUser?.img?.url || "/users/default.svg"
                  }
                  alt="User Cover"
                  fill
                />
                {isMyPage && (
                  <div
                    className="editICo rounded"
                    onClick={() => {
                      setOpenImgForm({
                        type: "img",
                        event: isMyPage
                          ? userData?.img?.url
                            ? "edit"
                            : "add"
                          : currentUser?.img?.url
                          ? "edit"
                          : "add",
                        userId: id,
                        image: userData?.img?.url,
                      });
                    }}
                  >
                    <MdModeEditOutline />
                  </div>
                )}
              </div>
            </div>
            <div className="right">
              <div className="left-data">
                <h4>
                  {isMyPage ? userData?.firstname : currentUser?.firstname}{" "}
                  {isMyPage ? userData?.lastname : currentUser?.lastname}
                </h4>
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
              <h4>{translations?.portfolio?.about}</h4>

              {currentUser?.bio && (
                <li>
                  Bio: <span>{currentUser.bio}</span>
                </li>
              )}

              {currentUser?.info?.birthDate && (
                <li>
                  {translations?.portfolio?.birthdate}:{" "}
                  <span>
                    {new Date(currentUser.info.birthDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </li>
              )}

              {currentUser?.info?.region && (
                <li>
                  {translations?.portfolio?.region}:{" "}
                  <span>{currentUser.info.region}</span>
                </li>
              )}

              {currentUser?.info?.current_location && (
                <li>
                  {translations?.portfolio?.current_location}:{" "}
                  <span>{currentUser.info.current_location}</span>
                </li>
              )}

              {currentUser?.info?.work && (
                <li>
                  {translations?.portfolio?.work}:{" "}
                  <span>{currentUser.info.work}</span>
                </li>
              )}

              {currentUser?.info?.college && (
                <li>
                  {translations?.portfolio?.college}:{" "}
                  <span>{currentUser.info.college}</span>
                </li>
              )}

              {currentUser?.info?.languages && (
                <li>
                  {translations?.portfolio?.speaking_languages}:{" "}
                  <span>{currentUser.info.languages}</span>
                </li>
              )}
            </ul>
          )}
          {currentSelectedData !== "photos" && (
            <div className="images">
              {/* <div className="top">
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
              </div> */}
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
                          src={x.img || "/users/default.svg"}
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
            <PostsHolder type="user" id={id} />
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
                        src={x.img || "/users/default.svg"}
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
              {/* {loading
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
                  ))} */}
            </div>
          ) : (
            <ul className="about">
              <h4>{translations?.portfolio?.about}</h4>

              {currentUser?.bio && (
                <li>
                  Bio: <span>{currentUser.bio}</span>
                </li>
              )}

              {currentUser?.info?.birthDate && (
                <li>
                  {translations?.portfolio?.birthdate}:{" "}
                  <span>
                    {new Date(currentUser.info.birthDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </li>
              )}

              {currentUser?.info?.region && (
                <li>
                  {translations?.portfolio?.region}:{" "}
                  <span>{currentUser.info.region}</span>
                </li>
              )}

              {currentUser?.info?.current_location && (
                <li>
                  {translations?.portfolio?.current_location}:{" "}
                  <span>{currentUser.info.current_location}</span>
                </li>
              )}

              {currentUser?.info?.work && (
                <li>
                  {translations?.portfolio?.work}:{" "}
                  <span>{currentUser.info.work}</span>
                </li>
              )}

              {currentUser?.info?.college && (
                <li>
                  {translations?.portfolio?.college}:{" "}
                  <span>{currentUser.info.college}</span>
                </li>
              )}

              {currentUser?.info?.languages && (
                <li>
                  {translations?.portfolio?.speaking_languages}:{" "}
                  <span>{currentUser.info.languages}</span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
