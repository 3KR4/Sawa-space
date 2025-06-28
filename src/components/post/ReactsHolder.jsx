"use client";

import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { fetchingContext } from "@/Contexts/fetchingContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { postService } from "@/services/api/postService";

import { FaPlus } from "react-icons/fa6";

function ReactsHolder({ reactsHolder, setReactsHolder, data, setState, type }) {
  const { userData } = useContext(fetchingContext);
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

    const alreadyReacted = data?.userreact === react;
    const previousReact = data?.userreact;

    try {
      await postService.makeReact(data._id, {
        islike: !alreadyReacted,
        react,
      });

      setState((prev) => {
        let updatedReacts = { ...prev.reacts };
        let newReactCount = prev.reactCount || 0;

        if (alreadyReacted) {
          // Remove the existing reaction
          updatedReacts[react] = Math.max((updatedReacts[react] || 1) - 1, 0);
          newReactCount = Math.max(newReactCount - 1, 0);

          return {
            ...prev,
            reacts: updatedReacts,
            userreact: "",
            reactCount: newReactCount,
          };
        }

        if (previousReact && previousReact !== react) {
          // Switching reactions: decrement old, increment new
          updatedReacts[previousReact] = Math.max(
            (updatedReacts[previousReact] || 1) - 1,
            0
          );
          // reactCount stays the same
        } else {
          // New reaction
          newReactCount += 1;
        }

        updatedReacts[react] = (updatedReacts[react] || 0) + 1;

        return {
          ...prev,
          reacts: updatedReacts,
          userreact: react,
          reactCount: newReactCount,
        };
      });
    } catch (err) {
      console.error(err);
      if (userData && userData?._id) {
        addNotification({
          type: "error",
          message: "Cannot react right now, please try again later.",
        });
      } else {
        addNotification({
          type: "warning",
          message: "You have to log in first",
        });
      }
    } finally {
      setReactsHolder(false);
      setLoading(false);
    }
  };

  const emojes = [
    {
      emoji: "👍",
      url: "https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f44d.png",
    },
    {
      emoji: "❤️",
      url: "https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/2764-fe0f.png",
    },
    {
      emoji: "😂",
      url: "https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f602.png",
    },
    {
      emoji: "😠",
      url: "https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f62e.png",
    },
    {
      emoji: "😢",
      url: "https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f625.png",
    },
    {
      emoji: "🙏",
      url: "https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/1f64f.png",
    },
  ];

  return (
    <div
      ref={reactsRef}
      className={`reactsHolder sideMenu ${reactsHolder && "active"}`}
    >
      <div className={`reacts ${loading ? "loading" : ""}`}>
        {data?.userreact &&
          !emojes.some((e) => e.emoji === data?.userreact) && (
            <div
              key={data?.userreact}
              onClick={() => !loading && handleReact(data?.userreact)}
              className="active"
              style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              {data?.userreact}
            </div>
          )}

        {emojes.map(({ emoji, url }) => (
          <div
            key={emoji}
            onClick={() => !loading && handleReact(emoji)}
            className={data?.userreact === emoji ? "active" : ""}
          >
            <img src={url} alt={emoji} />
          </div>
        ))}

        <FaPlus
          onClick={(e) =>
            handleMenus(e, "emojiHolder", data._id, {
              type: "react_for_post",
              function: (emojiObject) => handleReact(emojiObject.emoji),
            })
          }
        />
      </div>
    </div>
  );
}

export default ReactsHolder;
