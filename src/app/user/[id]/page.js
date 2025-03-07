"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { maxLength } from "@/Methods";
import { messages, users, posts } from "@/Data";
import { use } from "react";
import { AllContext } from "@/app/Context";
import Post from "@/components/Post";

import "../../Css/user.css";
import { FaAngleRight } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

import { IoSearch, IoClose } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";

import { HiUsers } from "react-icons/hi2";
import { IoMdPhotos } from "react-icons/io";

import { IoInformationCircleSharp } from "react-icons/io5";

export default function User({ params }) {
  const { handleMenus } = useContext(AllContext);
  const { id } = use(params); // Unwrap the Promise
  const [postSearch, setPostSearch] = useState("");

  const mediaMsgs = messages.filter((msg) => msg.img);
  const [curentChat, setCurentChat] = useState({});
  const [currentSelectedData, setCurrentSelectedData] = useState("posts");

  useEffect(() => {
    let currentChat = users.find((x) => x.id == id);
    setCurentChat(currentChat);
  }, [id]);

  return (
    <div className={`userPage`}>
      <div className="top">
        <div className="cover">
          <Image src={"/chat4.png"} alt="User Cover" fill />
          <div className="editICo">
            <MdModeEditOutline />
            Edit
          </div>
        </div>
        <nav>
          <div className="top">
            <div className="leftHolder">
              <div className="userImg">
                <Image src={curentChat?.img} alt="User Cover" fill />
                <div className="editICo">
                  <MdModeEditOutline />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="left-data">
                <h4>{curentChat?.name}</h4>
                <h5>46 Friends - 10 mutual</h5>
              </div>
              <div className="right-btns">
                <button className={`main-button`}>
                  <IoMdPersonAdd />
                  Add Friend
                </button>
                <button className={`main-button`}>
                  <AiFillMessage />
                  Message
                </button>
                <div className="search-holder">
                  <IoSearch
                    onClick={() =>
                      document.getElementById("serchpostInput").focus()
                    }
                  />
                  <input
                    id="serchpostInput"
                    type="text"
                    placeholder="Search in posts..."
                    value={postSearch}
                    onChange={(e) => setPostSearch(e.target.value)}
                  />
                  {postSearch !== "" && <IoClose className="delete" />}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <button
                className={`main-button ${
                  currentSelectedData == "posts" && "active"
                }`}
                onClick={() => setCurrentSelectedData("posts")}
              >
                <BsFillPostcardFill />
                Posts
              </button>
              <button
                className={`main-button ${
                  currentSelectedData == "friends" && "active"
                }`}
                onClick={() => setCurrentSelectedData("friends")}
              >
                <HiUsers />
                Friends
              </button>
              <button
                className={`main-button ${
                  currentSelectedData == "photos" && "active"
                }`}
                onClick={() => setCurrentSelectedData("photos")}
              >
                <IoMdPhotos />
                Photos
              </button>
              <button
                className={`main-button ${
                  currentSelectedData == "about" && "active"
                }`}
                onClick={() => setCurrentSelectedData("about")}
              >
                <IoInformationCircleSharp />
                About
              </button>
            </div>
            <button className={`main-button`}>
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
                <h4>About</h4>
              </div>
              <li>
                BirthDate: <span>19-12-2003</span>
              </li>
              <li>
                Region: <span>Egypt</span>
              </li>
              <li>
                Current Location: <span>Cairo</span>
              </li>
              <li>
                Education: <span>FrontEnd Developer</span>
              </li>
            </ul>
          )}
          {currentSelectedData !== "photos" && (
            <div className="images">
              <div className="top">
                <h4>Photos</h4>
                <button>
                  See All Photos <FaAngleRight />
                </button>
              </div>
              <div className="hold">
                {mediaMsgs.slice(0, 6).map((x) => (
                  <Image src={x.img} alt="" fill />
                ))}
              </div>
            </div>
          )}
          {currentSelectedData !== "friends" && (
            <div className="holder friends">
              <div className="top">
                <h4>Friends</h4>
                <button>
                  See All Friends <FaAngleRight />
                </button>
              </div>
              <div className="hold">
                {users?.slice(0, 6).map((x) => (
                  <div
                    key={x.id}
                    className="chat"
                    onClick={(e) => handleMenus(e, "userInfo", x.id)}
                  >
                    <Image
                      src={x.img ? x.img : null}
                      width={40}
                      height={40}
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
          <div className="actions">
            <h4>
              {currentSelectedData !== "about" ? "All" : null}{" "}
              {currentSelectedData}
            </h4>
            {currentSelectedData !== "about" && <button>Sort by Time</button>}
          </div>

          {currentSelectedData === "posts" ? (
            <div className="posts-holder">
              {posts.map((data, index) => (
                <Post data={data} key={index} />
              ))}
            </div>
          ) : currentSelectedData === "friends" ? (
            <div className="friends">
              {users?.map((x) => (
                <div
                  key={x.id}
                  onClick={(e) => handleMenus(e, "userInfo", x.id)}
                >
                  <Image
                    src={x.img ? x.img : null}
                    width={40}
                    height={40}
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
              {mediaMsgs.map((x) => (
                <Image src={x.img} alt="" fill />
              ))}
            </div>
          ) : (
            <ul className="about">
              <li>
                Bio:
                <span>في ناس حطناهم فوق راسنا بس طلع المكان عالي عليهم</span>
              </li>
              <li>
                BirthDate: <span>19-12-2003</span>
              </li>
              <li>
                Region: <span>Egypt</span>
              </li>
              <li>
                Current Location: <span>Cairo</span>
              </li>
              <li>
                Education: <span>FrontEnd Developer</span>
              </li>
              <li>
                College: <span>Cairo University</span>
              </li>
              <li>
                Work: <span>Freelance Web Developer</span>
              </li>
              <li>
                Main Languages: <span>Arabic, English</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
