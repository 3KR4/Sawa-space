"use client";

import React from "react";
import { useEffect, useContext, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { ScreenContext } from "@/Contexts/ScreenContext";


import { FaPlus } from "react-icons/fa6";

function ReactsHolder({ reactsHolder, setReactsHolder, id }) {
    const {screenSize } = useContext(ScreenContext);

  const reactsRef = useRef(null);

  const { handleMenus } = useContext(DynamicMenusContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reactsRef.current && !reactsRef.current.contains(event.target)) {
        setReactsHolder(false);
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
      ref={reactsRef}
      className={`reactsHolder sideMenu ${reactsHolder && "active"}`}
    >
      <div className="reacts">
        <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f44d.png" />
        <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/2764-fe0f.png" />
        <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f602.png" />
        <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f62e.png" />
        <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f625.png" />
        <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f64f.png" />
          <FaPlus onClick={(e) => handleMenus(e, "emojiHolder", id)} />
      </div>
    </div>
  );
}

export default ReactsHolder;
