"use client";
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { users } from "@/utils/Data";
import CutText from "@/utils/CutText";
import Image from "next/image";

import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";

function UsersSelection() {
  const { selectedUsers, setSelectedUsers, Refs } = useContext(MenusContext);

  const {
    selectedDev,
    menuPosition,
    openUsersSelection,
    setOpenUsersSelection,
  } = useContext(DynamicMenusContext);

  const [usersSelectionSearch, setUsersSelectionSearch] = useState("");

  const curentSearchUser = usersSelectionSearch
    ? users.filter((user) =>
        user.name.toLowerCase().includes(usersSelectionSearch.toLowerCase())
      )
    : users;

  //! handleClickOutside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        Refs.usersSelection.current &&
        !Refs.usersSelection.current.contains(event.target)
      ) {
        setOpenUsersSelection(false);
        if (selectedDev.type !== "Tag People...") {
          setSelectedUsers([]);
        }
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  return (
    <div
      ref={Refs.usersSelection}
      className={`usersSelection sideMenu ${
        openUsersSelection ? "active" : ""
      }`}
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
    >
      <h1>{selectedDev.type}</h1>
      <div className="search-chosen">
        {selectedUsers.length > 0 && selectedDev.type !== "Tag People..." && (
          <ul className="result">
            {selectedUsers.map((x) => (
              <li key={x.name}>{x.name}</li>
            ))}
          </ul>
        )}
        <input
          placeholder="Search by name"
          value={usersSelectionSearch}
          onChange={(e) => setUsersSelectionSearch(e.target.value)}
        />
      </div>
      {selectedUsers.length > 0 && selectedDev.type !== "Tag People..." && (
        <button className="mainbtn">Forword</button>
      )}
      <div className="holder">
        {curentSearchUser?.map((x) => (
          <div
            key={x.id}
            className="chat"
            onClick={() => {
              setSelectedUsers((prev) => {
                const exists = prev.some((user) => user.id === x.id);

                if (exists) {
                  return prev.filter((user) => user.id !== x.id);
                } else {
                  return [...prev, x];
                }
              });
            }}
          >
            <Image
              src={x.img ? x.img : null}
              width={40}
              height={40}
              alt={`user Image`}
              className={`rounded`}
            />
            <div className="name-lastmessage">
              <h4>{x.name}</h4>
              <p>
                {CutText(x.isGroup ? x.groupMembers.slice(0, 5) : x.bio, 25)}
              </p>
            </div>
            <label>
              <input
                type="checkbox"
                className="input"
                checked={selectedUsers.includes(x.id) ? true : false}
              />
              <span className="custom-checkbox"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersSelection;
