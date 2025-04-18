"use client";

import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { postService } from "@/services/api/postService";

import { FaPlus } from "react-icons/fa6";

function ReactsHolder({ reactsHolder, setReactsHolder, data, setState, type }) {
  const { screenSize } = useContext(ScreenContext);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

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

  const handleReact = async (react) => {
    setLoading(true);

    const alreadyReacted = data.userreact === react;
    const isSwitchingReact = data.userreact && data.userreact !== react;

    try {
      // If switching, remove the old react first
      if (isSwitchingReact) {
        await postService.makeReact(data._id, {
          islike: false,
          react: data.userreact,
        });
      }

      // Then toggle or add the new one
      await postService.makeReact(data._id, {
        islike: !alreadyReacted,
        react,
      });

      setState((prev) => {
        let updatedReacts = { ...prev.reacts };

        if (alreadyReacted) {
          // Remove the react
          updatedReacts[react] = Math.max((updatedReacts[react] || 1) - 1, 0);
        } else {
          if (isSwitchingReact) {
            const prevReact = data.userreact;
            updatedReacts[prevReact] = Math.max(
              (updatedReacts[prevReact] || 1) - 1,
              0
            );
          }

          updatedReacts[react] = (updatedReacts[react] || 0) + 1;
        }

        return {
          ...prev,
          reacts: updatedReacts,
          userreact: alreadyReacted ? "" : react,
        };
      });
    } catch (err) {
      console.error(err);
      addNotification({
        type: "error",
        message: "Cannot make react right now, please try again later.",
      });
    } finally {
      setReactsHolder(false);
      setLoading(false);
    }
  };
  return (
    <div
      ref={reactsRef}
      className={`reactsHolder sideMenu ${reactsHolder && "active"}`}
    >
      <div className={`reacts ${loading ? "loading" : ""}`}>
        <img
          onClick={() => handleReact("like")}
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f44d.png"
        />
        <img
          onClick={() => handleReact("love")}
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/2764-fe0f.png"
        />
        <img
          onClick={() => handleReact("haha")}
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f602.png"
        />
        <img
          onClick={() => handleReact("angry")}
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f62e.png"
        />
        <img
          onClick={() => handleReact("sad")}
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f625.png"
        />
        <img
          onClick={() => handleReact("prayer")}
          src="https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f64f.png"
        />
        {type == "chat" && (
          <FaPlus onClick={(e) => handleMenus(e, "emojiHolder", id)} />
        )}
      </div>
    </div>
  );
}

export default ReactsHolder;
