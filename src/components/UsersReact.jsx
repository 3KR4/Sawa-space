"use client";
import React, { useState, useContext, useEffect } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import { postService } from "@/services/api/postService";

function UsersReact() {
  const { Refs } = useContext(MenusContext);
  const { menuPosition, openUsersReact, setOpenUsersReact, handleMenus2 } =
    useContext(DynamicMenusContext);

  const [emojiFilter, setEmojiFilter] = useState("all");
  const [usersReacts, setUsersReact] = useState([]);

  const filters = openUsersReact?.filters?.map(([emoji]) => emoji) || [];

  // Fetch reacts
  useEffect(() => {
    const fetchReacts = async () => {
      if (!openUsersReact?.postId) return;
      try {
        const emojiQuery = emojiFilter === "all" ? "" : emojiFilter;
        const { data } = await postService.getReacts(
          openUsersReact.postId,
          emojiQuery
        );
        setUsersReact(data?.data || []);
      } catch (err) {
        console.error("Failed to fetch reacts", err);
        setUsersReact([]);
      }
    };
    fetchReacts();
  }, [openUsersReact, emojiFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsideUsersReact =
        Refs.usersReact.current &&
        !Refs.usersReact.current.contains(event.target);

      const isClickOutsideInfoMenu =
        !Refs.info.current || !Refs.info.current.contains(event.target);

      if (isClickOutsideUsersReact && isClickOutsideInfoMenu) {
        setOpenUsersReact(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={Refs.usersReact}
      className={`reactsMenu MenuOfUsers sideMenu ${
        openUsersReact ? "active" : ""
      }`}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      <div className="topFilter">
        <button
          onClick={() => setEmojiFilter("all")}
          className={emojiFilter === "all" ? "active" : ""}
        >
          All
        </button>
        {filters.map((x, index) => (
          <button
            onClick={() => setEmojiFilter(x)}
            className={emojiFilter === x ? "active" : ""}
            key={index}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="holder forPost">
        {usersReacts?.map((x) => (
          <div
            key={x._id}
            className="user"
            onClick={(e) =>
              handleMenus2(e, "user-Info", x?.author[0]?._id, {
                type: "user",
              })
            }
          >
            <div className="info">
              <h4 className="ellipsisText">
                {x?.author[0]?.firstname} {x?.author[0]?.lastname}
              </h4>
              <span>{x?.react}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersReact;
