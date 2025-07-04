"use client";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import Image from "next/image";
import Link from "next/link";
import { userService } from "@/services/api/userService";
import { users } from "@/utils/Data";
import SettingMenu from "@/components/providers/SettingMenu";
import { fetchingContext } from "@/Contexts/fetchingContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { pageService } from "@/services/api/pageService";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd, IoMdCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

function UserInfo() {
  const { addNotification } = useNotification();
  const { selectedDev, infoMenu, setInfoMenu, menuPosition } =
    useContext(DynamicMenusContext);
  const { userData, setUserData, actionLoading, setActionLoading } =
    useContext(fetchingContext);
  const { Refs } = useContext(MenusContext);
  const [currentUserData, setCurrentUserData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      let res;
      try {
        if (selectedDev.type === "user") {
          res = await userService.getUserData(selectedDev.id);
        } else {
          res = await pageService.getPageData(selectedDev.id);
        }
        setCurrentUserData(res.data.data);
      } catch (err) {
        console.error("Error fetching userData", err);
        addNotification({
          type: "error",
          message:
            selectedDev.type === "user"
              ? "Failed to load user data"
              : "Failed to load page data",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [selectedDev]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (Refs.info.current && !Refs.info.current.contains(event.target)) {
        setInfoMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine relationship status
  const isMyFriend = userData?.friends?.includes(currentUserData?._id);
  const isSendedFriendRequest = userData?.friendRequests?.sent?.includes(
    currentUserData?._id
  );
  const isReceivedFriendRequest = userData?.friendRequests?.received?.includes(
    currentUserData?._id
  );

  // Send friend request
  const sendFriendRequest = async () => {
    try {
      setActionLoading((prev) => [...prev, "send-friend-request"]);

      await userService.makeFriendRequest(selectedDev.id);

      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          sent: [...(prev.friendRequests?.sent || []), selectedDev.id],
        },
      }));

      setCurrentUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          received: [...(prev.friendRequests?.received || []), userData?._id],
        },
      }));

      addNotification({ type: "success", message: "Friend request sent." });
    } catch (err) {
      console.error("Send friend request failed", err);

      if (userData && userData?._id) {
        addNotification({
          type: "error",
          message: "Failed to send friend request.",
        });
      } else {
        addNotification({
          type: "warning",
          message: "You have to log in first",
        });
      }
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== "send-friend-request")
      );
    }
  };

  // Cancel sent request
  const cancelFriendRequest = async () => {
    try {
      setActionLoading((prev) => [...prev, "cancel-friend-request"]);

      await userService.cancelRequest(selectedDev.id);

      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          sent: prev.friendRequests?.sent?.filter((x) => x !== selectedDev.id),
        },
      }));

      setCurrentUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          received: prev.friendRequests?.received?.filter(
            (x) => x !== userData?._id
          ),
        },
      }));

      addNotification({ type: "info", message: "Friend request canceled." });
    } catch (err) {
      console.error("Cancel friend request failed", err);
      addNotification({
        type: "error",
        message: "Failed to cancel friend request.",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== "cancel-friend-request")
      );
    }
  };

  // Confirm or remove received friend request
  const confirm_remove_friend_request = async (action) => {
    const actionKey = `${action ? "confirm" : "remove"}-friend-request`;
    try {
      setActionLoading((prev) => [...prev, actionKey]);

      await userService.interactWithFriendReq(selectedDev.id, action);

      if (action) {
        // Accepting request
        setUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            received: prev.friendRequests?.received?.filter(
              (x) => x !== selectedDev.id
            ),
          },
          friends: [...(prev.friends || []), selectedDev.id],
        }));

        setCurrentUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            sent: prev.friendRequests?.sent?.filter((x) => x !== userData?._id),
          },
          friends: [...(prev.friends || []), userData?._id],
        }));

        addNotification({
          type: "success",
          message: "Friend request accepted.",
        });
      } else {
        // Decline/remove request
        setUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            received: prev.friendRequests?.received?.filter(
              (x) => x !== selectedDev.id
            ),
          },
        }));

        setCurrentUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            sent: prev.friendRequests?.sent?.filter((x) => x !== userData?._id),
          },
        }));

        addNotification({ type: "info", message: "Friend request removed." });
      }
    } catch (err) {
      console.error("Failed to interact with friend request", err);
      addNotification({
        type: "error",
        message: "Friend request interaction failed.",
      });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== actionKey));
    }
  };

  // Remove friend
  const removeFriend = async () => {
    try {
      setActionLoading((prev) => [...prev, "remove-friend"]);

      await userService.removeFriend(selectedDev.id);

      setUserData((prev) => ({
        ...prev,
        friends: prev.friends?.filter((x) => x !== selectedDev.id),
      }));

      setCurrentUserData((prev) => ({
        ...prev,
        friends: prev.friends?.filter((x) => x !== userData?._id),
      }));

      addNotification({ type: "info", message: "Friend removed." });
    } catch (err) {
      console.error("Remove friend failed", err);
      addNotification({ type: "error", message: "Failed to remove friend." });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== "remove-friend"));
    }
  };

  return (
    <div
      ref={Refs.info}
      className={`info-menu ${loading ? "loading" : ""} sideMenu ${
        infoMenu ? "active" : ""
      }`}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <>
          <div className="holder">
            <Image
              className={`rounded`}
              src={currentUserData?.img?.url || "/users/default.svg"}
              alt={currentUserData?.firstname || currentUserData?.pagename}
              fill
            />
            <div className="info">
              <div className="top">
                <h4>
                  {selectedDev.type === "page"
                    ? `${currentUserData?.pagename}`
                    : `${currentUserData?.firstname} ${currentUserData?.lastname}`}
                </h4>
                <IoClose
                  onClick={() => {
                    setInfoMenu(null);
                  }}
                  className="close"
                />
              </div>
              {selectedDev.type === "user" && (
                <p>
                  {currentUserData?.friends?.length === 0
                    ? "no friends yet"
                    : `${currentUserData?.friends?.length} friends`}
                </p>
              )}

              {Object.values(currentUserData?.info || {}).some(
                (value) => value !== "" && value !== null && value !== undefined
              ) && (
                <>
                  <h5>About</h5>
                  <ul>
                    {Object.entries(currentUserData.info)
                      .filter(
                        ([_, value]) =>
                          value !== "" && value !== null && value !== undefined
                      )
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <li key={key} className="ellipsisText">
                          {key.replace(/_/g, " ")}: <span>{value}</span>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          <div className="actions">
            {selectedDev.type === "user" &&
              (isMyFriend ? (
                <button
                  className={`main-button ${
                    actionLoading.includes("remove-friend") ? "loading" : ""
                  }`}
                  onClick={removeFriend}
                >
                  <span>
                    <IoMdPersonAdd /> Remove Friend
                  </span>
                  <div className="lds-dual-ring"></div>
                </button>
              ) : isSendedFriendRequest ? (
                <button
                  className={`main-button ${
                    actionLoading.includes("cancel-friend-request")
                      ? "loading"
                      : ""
                  }`}
                  onClick={cancelFriendRequest}
                >
                  <span>
                    <IoMdPersonAdd /> Cancel Request
                  </span>
                  <div className="lds-dual-ring"></div>
                </button>
              ) : isReceivedFriendRequest ? (
                <>
                  <button
                    className={`main-button ${
                      actionLoading.includes("confirm-friend-request")
                        ? "loading"
                        : ""
                    }`}
                    onClick={() => confirm_remove_friend_request(true)}
                  >
                    <span>
                      <IoMdPersonAdd /> Confirm request
                    </span>
                    <div className="lds-dual-ring"></div>
                  </button>
                  <button
                    className={`main-button danger ${
                      actionLoading.includes("remove-friend-request")
                        ? "loading"
                        : ""
                    }`}
                    onClick={() => confirm_remove_friend_request(false)}
                  >
                    <span>
                      <IoMdPersonAdd /> Decline request
                    </span>
                    <div className="lds-dual-ring"></div>
                  </button>
                </>
              ) : (
                <button
                  className={`main-button ${
                    actionLoading.includes("send-friend-request")
                      ? "loading"
                      : ""
                  }`}
                  onClick={sendFriendRequest}
                >
                  <span>
                    <IoMdPersonAdd /> Add Friend
                  </span>
                  <div className="lds-dual-ring"></div>
                </button>
              ))}
            <Link
              style={{
                width: selectedDev.type === "page" ? "100%" : "fit-content",
              }}
              href={`/portfolio/${
                selectedDev.type === "user" ? "user" : "page"
              }/${currentUserData?._id}`}
              className="main-button"
            >
              <span>
                <FaEye />{" "}
                {selectedDev.type === "user" ? "see profile" : "view page"}
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default UserInfo;
