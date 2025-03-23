"use client"
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { users } from "@/utils/Data";
import CutText from "@/utils/CutText";
import Image from "next/image";

import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";

function UsersSelection() {
  const {
    selectedUsers,
    setSelectedUsers,
    selectedUsersNames,
    setSelectedUsersNames,
    selectionMenuTitle,
    usersSelectionSearch,
    setUsersSelectionSearch,
    usersSelectionRef,
  } = useContext(MenusContext);

  const { menuPosition, openUsersSelection, setOpenUsersSelection } =
    useContext(DynamicMenusContext);

  const curentSearchUser = usersSelectionSearch
    ? users.filter((user) =>
        user.name.toLowerCase().includes(usersSelectionSearch.toLowerCase())
      )
    : users;

  //! handleClickOutside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        usersSelectionRef.current &&
        !usersSelectionRef.current.contains(event.target)
      ) {
        setOpenUsersSelection(false);
        if (selectionMenuTitle !== "Tag People...") {
          setSelectedUsers([]);
          setSelectedUsersNames([]);
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

  console.log(selectionMenuTitle);

  return (
    <div
      ref={usersSelectionRef}
      className={`usersSelection sideMenu ${
        openUsersSelection ? "active" : ""
      }`}
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
    >
      <h1>{selectionMenuTitle}</h1>
      <div className="search-chosen">
        {selectedUsersNames.length > 0 &&
          selectionMenuTitle !== "Tag People..." && (
            <ul className="result">
              {selectedUsersNames.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
        <input
          placeholder="Search by name"
          value={usersSelectionSearch}
          onChange={(e) => setUsersSelectionSearch(e.target.value)}
        />
      </div>
      {selectedUsersNames.length > 0 &&
        selectionMenuTitle !== "Tag People..." && (
          <button className="mainbtn">Forword</button>
        )}
      <div className="holder">
        {curentSearchUser?.map((x) => (
          <div
            key={x.id}
            className="chat"
            onClick={() => {
              setSelectedUsers((prev) =>
                prev.includes(x.id)
                  ? prev.filter((id) => id !== x.id)
                  : [...prev, x.id]
              );
              setSelectedUsersNames((prev) =>
                prev.includes(x.name)
                  ? prev.filter((name) => name !== x.name)
                  : [...prev, x.name]
              );
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
                onChange={() => console.log("x")}
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
