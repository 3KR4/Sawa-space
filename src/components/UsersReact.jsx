"use client";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { messages, posts } from "@/utils/Data";

import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";

function UsersReact() {
  const { usersreactMenuRef } = useContext(MenusContext);

  const {
    menuPosition,
    selectedDev,
    openUsersReact,
    setOpenUsersReact,
    handleMenus2,
  } = useContext(DynamicMenusContext);

  const [emojiFilter, setEmojiFilter] = useState("all");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        usersreactMenuRef.current &&
        !usersreactMenuRef.current.contains(event.target)
      ) {
        setOpenUsersReact(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentUserReacts =
    openUsersReact === "message"
      ? messages.find((msg) => msg.id === selectedDev)
      : openUsersReact === "post"
      ? posts.find((post) => post.id === selectedDev)
      : null;

  const msgsEmojis =
    openUsersReact === "message"
      ? currentUserReacts?.emojis
      : currentUserReacts?.reacts;

  return (
    <div
      ref={usersreactMenuRef}
      className={`reactsMenu MenuOfUsers sideMenu ${
        openUsersReact ? "active" : ""
      }`}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      <div className="topFilter">
        {openUsersReact === "message" ? (
          <h1>All Emojis</h1>
        ) : (
          <>
            <button
              onClick={() => setEmojiFilter("all")}
              className={`${emojiFilter == "all" ? "active" : ""}`}
            >
              All
            </button>
            {msgsEmojis?.topUseage.map((x, index) => (
              <button
                onClick={() => setEmojiFilter(x)}
                className={`${emojiFilter == x ? "active" : ""}`}
                key={index}
              >
                {x}
              </button>
            ))}
          </>
        )}
      </div>

      {openUsersReact === "message" ? (
        <div className="holder">
          {msgsEmojis?.map((x) => (
            <div key={x} className="user">
              <div className="info">
                <Image
                  className={`rounded`}
                  src={x?.user?.img ? x?.user?.img : null}
                  width={40}
                  height={40}
                  alt={`user Image`}
                />
                <h4>{x?.user?.name}</h4>
              </div>
              <span>{x?.emoji}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="holder forPost">
          {msgsEmojis?.users
            ?.filter((x) => emojiFilter === "all" || x.emoji === emojiFilter)
            .map((x) => (
              <div
                key={x.id}
                className="user"
                onClick={(e) => handleMenus2(e, "user-Info", x.id)}
              >
                <div className="info">
                  <h4>{x?.name}</h4>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default UsersReact;
