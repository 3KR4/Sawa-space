"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { maxLength } from "@/Methods";
import { messages, users, posts } from "@/Data";
import { use } from "react";
import { AllContext } from "@/app/Context";
import Post from "@/components/Post";

import { MdModeEditOutline } from "react-icons/md";

import "../../Css/user.css";
import UsersSelection from "@/components/UsersSelection";

export default function User({ params }) {
  const {} = useContext(AllContext);
  const { id } = use(params); // Unwrap the Promise

    const mediaMsgs = messages.filter((msg) => msg.img);
  const [curentChat, setCurentChat] = useState({});
  const [currentSelectedData, setCurrentSelectedData] = useState("");

  useEffect(() => {
    let currentChat = users.find((x) => x.id == id);
    setCurentChat(currentChat);
  }, [id]);

  console.log(curentChat);

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
          <div className="leftHolder">
            <div className="userImg">
              <Image src={curentChat?.img} alt="User Cover" fill />
              <div className="editICo">
                <MdModeEditOutline />
              </div>
            </div>
            <h4>{curentChat?.name}</h4>
          </div>
          <ul>
            <li onClick={() => setCurrentSelectedData("about")}>About</li>
            <li onClick={() => setCurrentSelectedData("friends")}>Friends</li>
            <li onClick={() => setCurrentSelectedData("photos")}>Photos</li>
            <li>Actions</li>
          </ul>
        </nav>
      </div>
      <div className="bottom-holder">
        <div className="side-menu">
          {currentSelectedData === "photos" ? (
            <div className="images">
              {mediaMsgs.map((x) => (
                <Image src={x.img} alt="" fill/>
              ))}
            </div>
          ) : currentSelectedData === "friends" ? (
            <UsersSelection />
          ) : (
            <ul className="about">
              <li>
                BirthDate: <span>19-12-2003</span>
              </li>
              <li>
                Education: <span>FrontEnd Developer</span>
              </li>
              <li>
                Region: <span>Egypt</span>
              </li>
              <li>
                Bio:
                <span>في ناس حطناهم فوق راسنا بس طلع المكان عالي عليهم</span>
              </li>
            </ul>
          )}
        </div>
        <div className="posts-list">
          <div className="actions">
            <button>Sort by:</button>
          </div>
          <div className="posts-holder">
            {posts.map((data, index) => (
              <Post data={data} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
