import React, { useState, useContext, useEffect, useRef } from "react";
import { DynamicMenusContext } from "@/app/contexts/DynamicMenus";

function SettingMenu({ children, type }) {

  const {
    menuPosition,
    settingMenu,
    setSettingMenu,
  } = useContext(DynamicMenusContext);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current) return; // Ensure menuRef is not null

      // Prevent closing if clicking inside the menu
      if (menuRef.current.contains(event.target)) {
        return;
      }
      setSettingMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSettingMenu]);

  return (
    <div
      ref={menuRef}
      className={`${type} sideMenu ${settingMenu ? "active" : ""}`}
      style={{
        top: menuPosition?.top ? `${menuPosition.top}px` : "0px",
        left: menuPosition?.left ? `${menuPosition.left}px` : "0px",
      }}
    >
      {children}
    </div>
  );
}

export default SettingMenu;
