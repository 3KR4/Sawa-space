"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useLanguage } from "@/Contexts/LanguageContext";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { postService } from "@/services/api/postService";
import { InputActionsContext } from "@/Contexts/InputActionsContext";
import { userService } from "@/services/api/userService";
import { useNotification } from "@/Contexts/NotificationContext";
import { MdBlock, MdReport, MdContentCopy, MdEdit } from "react-icons/md";
import { IoPersonRemove, IoPersonRemoveSharp, IoLogOut } from "react-icons/io5";
import { BiSolidHide, BiVolumeMute } from "react-icons/bi";
import { FaBookmark, FaTrashAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { GoBookmarkSlashFill } from "react-icons/go";

import { RiShareForwardFill } from "react-icons/ri";
import { FaHeartPulse } from "react-icons/fa6";

function SettingMenu() {
  const { translations } = useLanguage();
  const { addNotification } = useNotification();
  const { userData, actionLoading, setActionLoading, setUserData } =
    useContext(ScreenContext);

  const {
    settingsMenuRef,
    setDangerEvent,
    setOpenPostForm,
    setOpenStoryForm,
    setSomeThingHappen,
  } = useContext(MenusContext);
  const {
    menuPosition,
    settingMenu,
    setSettingMenu,
    settingMenuType,
    selectedDev,
  } = useContext(DynamicMenusContext);
  const { setMessageText } = useContext(InputActionsContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!settingsMenuRef.current) return;
      if (settingsMenuRef.current.contains(event.target)) {
        return;
      }
      setSettingMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSettingMenu]);

  const sendFriendRequest = async () => {
    try {
      setActionLoading((prev) => [...prev, `send-friend-request`]);

      await userService.makeFriendRequest(selectedDev?.postOwner);
      setSettingMenu(false);

      // Update current user data
      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev?.friendRequests,
          sent: [...(prev?.friendRequests?.sent || []), selectedDev?.postOwner],
        },
      }));

      // Update post author's data (author is array)
      selectedDev.setCurrentPost((prev) => ({
        ...prev,
        author: [
          {
            ...prev.author[0],
            friendRequests: {
              ...prev.author[0]?.friendRequests,
              received: [
                ...(prev.author[0]?.friendRequests?.received || []),
                userData?._id,
              ],
            },
          },
        ],
      }));

      addNotification({
        type: "success",
        message: "Friend request sent successfully.",
      });
    } catch (err) {
      console.error("Failed to send friend request", err);
      addNotification({
        type: "error",
        message: "Failed to send friend request.",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== `send-friend-request`)
      );
    }
  };

  const cancelFriendRequest = async () => {
    try {
      setActionLoading((prev) => [...prev, `cancel-friend-request`]);

      await userService.cancelRequest(selectedDev?.postOwner);
      setSettingMenu(false);

      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev?.friendRequests,
          sent: prev.friendRequests?.sent.filter(
            (x) => x !== selectedDev?.postOwner
          ),
        },
      }));

      selectedDev.setCurrentPost((prev) => ({
        ...prev,
        author: [
          {
            ...prev.author[0],
            friendRequests: {
              ...prev.author[0]?.friendRequests,
              received: prev.author[0]?.friendRequests?.received?.filter(
                (x) => x !== userData?._id
              ),
            },
          },
        ],
      }));
    } catch (err) {
      console.error("Failed to cancel friend request", err);
      addNotification({
        type: "error",
        message: "Failed to cancel friend request.",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== `cancel-friend-request`)
      );
    }
  };

  const confirm_remove_friend_request = async (action) => {
    try {
      setActionLoading((prev) => [
        ...prev,
        `${action ? "confirm" : "remove"}-friend-request`,
      ]);
      await userService.interactWithFriendReq(selectedDev?.postOwner, action);
      setSettingMenu(false);

      if (action) {
        // Accept friend request
        setUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            received: prev.friendRequests?.received.filter(
              (x) => x !== selectedDev?.postOwner
            ),
          },
          friends: [...(prev.friends || []), selectedDev?.postOwner],
        }));

        selectedDev.setCurrentPost((prev) => ({
          ...prev,
          author: [
            {
              ...prev.author[0],
              friendRequests: {
                ...prev.author[0].friendRequests,
                sent: prev.author[0].friendRequests?.sent?.filter(
                  (x) => x !== userData?._id
                ),
              },
              friends: [...(prev.author[0].friends || []), userData?._id],
            },
          ],
        }));
      } else {
        // Decline or remove request
        setUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            received: prev.friendRequests?.received.filter(
              (x) => x !== selectedDev?.postOwner
            ),
          },
        }));

        selectedDev.setCurrentPost((prev) => ({
          ...prev,
          author: [
            {
              ...prev.author[0],
              friendRequests: {
                ...prev.author[0]?.friendRequests,
                sent: prev.author[0]?.friendRequests?.sent?.filter(
                  (x) => x !== userData?._id
                ),
              },
            },
          ],
        }));
      }
    } catch (err) {
      console.error("Failed to interact with this friend request", err);
      addNotification({
        type: "error",
        message: "Failed to interact with this friend request.",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter(
          (x) => x !== `${action ? "confirm" : "remove"}-friend-request`
        )
      );
    }
  };

  const removeFriend = async () => {
    try {
      setActionLoading((prev) => [...prev, "danger remove-friend"]);

      await userService.removeFriend(selectedDev?.postOwner);
      setSettingMenu(false);

      setUserData((prev) => ({
        ...prev,
        friends:
          prev?.friends?.filter((x) => x !== selectedDev?.postOwner) || [],
      }));

      selectedDev.setCurrentPost((prev) => ({
        ...prev,
        author: [
          {
            ...prev.author[0],
            friends:
              prev.author[0]?.friends?.filter((x) => x !== userData?._id) || [],
          },
        ],
      }));
    } catch (err) {
      console.error("Failed to remove friend", err);
      addNotification({
        type: "error",
        message: "Failed to remove friend.",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== "danger remove-friend")
      );
    }
  };

  const postActions = [
    {
      show: selectedDev.isMyPost || selectedDev.isMyPage,
      label: translations?.forms?.edit_post,
      icon: <MdEdit />,
      onClick: () => {
        setSettingMenu(false);
        setOpenPostForm({
          for: selectedDev.isMyPost ? "user" : "page",
          type: "edit",
          postId: selectedDev.id,
        });
      },
    },
    {
      show: !selectedDev.isInFavorite,
      label: translations?.actions?.save_post,
      icon: <FaBookmark />,
      onClick: () => {
        // handle save
      },
    },
    {
      show:
        !selectedDev.isPostPage &&
        !selectedDev.isMyPost &&
        !selectedDev.isSendedFriendRequest &&
        !selectedDev.isReceivedFriendRequest &&
        !selectedDev.isMyFriend,
      label: translations?.actions?.add_friend,
      className: "send-friend-request",
      icon: <HiUsers />,
      onClick: sendFriendRequest,
    },
    {
      show:
        !selectedDev.isPostPage &&
        !selectedDev.isMyPost &&
        selectedDev.isSendedFriendRequest,
      label:
        translations?.actions?.cancel_friend_request || "cancel friend request",
      className: "cancel-friend-request",
      icon: <HiUsers />,
      onClick: cancelFriendRequest,
    },
    {
      show:
        !selectedDev.isPostPage &&
        !selectedDev.isMyPost &&
        selectedDev.isReceivedFriendRequest,
      label:
        translations?.actions?.accept_friend_request || "accept friend request",
      className: "confirm-friend-request",
      icon: <HiUsers />,
      onClick: () => confirm_remove_friend_request(true), // ✅ FIXED
    },
    {
      show:
        !selectedDev.isPostPage &&
        !selectedDev.isMyPost &&
        selectedDev.isReceivedFriendRequest,
      label:
        translations?.actions?.remove_friend_request || "remove friend request",
      className: "remove-friend-request",
      icon: <HiUsers />,
      onClick: () => confirm_remove_friend_request(false), // ✅ FIXED
    },
    {
      show: !selectedDev.isMyPost,
      isSeparator: true,
    },
    // {
    //   show: !selectedDev.isMyPost,
    //   label: translations?.actions?.hide,
    //   icon: <BiSolidHide />,
    //   className: "warning",
    //   onClick: () => {
    //     // handle hide
    //   },
    // },
    {
      show: !selectedDev.isMyPost && !selectedDev.isMyPage,
      label: translations?.actions?.report,
      icon: <MdReport />,
      className: "warning",
      onClick: () => {
        // handle report
      },
    },
    {
      show: selectedDev.isInFavorite,
      label: translations?.actions?.un_save_post,
      icon: <GoBookmarkSlashFill />,
      onClick: () => {
        // handle unsave
      },
    },
    {
      show:
        selectedDev.isMyPost ||
        (!selectedDev.isMyPost && selectedDev.isMyFriend),
      isSeparator: true,
    },
    {
      show: selectedDev.isMyFriend,
      label: translations?.actions?.remove_friend,
      icon: <IoPersonRemove />,
      className: "danger remove-friend",
      onClick: removeFriend,
    },
    // {
    //   show: !selectedDev.isMyPost,
    //   label: translations?.actions?.block,
    //   icon: <MdBlock />,
    //   className: "danger",
    //   onClick: () => {
    //     // handle block
    //   },
    // },
    {
      show: selectedDev.isMyPost || selectedDev.isMyPage,
      label: translations?.actions?.remove_post,
      icon: <FaTrashAlt />,
      className: "danger",
      onClick: () => {
        setSettingMenu(null);
        setDangerEvent({
          type: "remove_post",
          message: "are you sure you want to remove your post",
        });
      },
    },
  ];

  return (
    <div
      ref={settingsMenuRef}
      className={`${settingMenuType} sideMenu ${settingMenu ? "active" : ""}`}
      style={{
        top: menuPosition?.top ? `${menuPosition.top}px` : "0px",
        left: menuPosition?.left ? `${menuPosition.left}px` : "0px",
      }}
    >
      {settingMenuType === "settingMenu-post" ? (
        <>
          {postActions.map((action, idx) =>
            action.show ? (
              action.isSeparator ? (
                <hr key={`sep-${idx}`} />
              ) : (
                <button
                  key={action.label || idx}
                  className={`main-button ${
                    actionLoading.includes(action?.className) ? "loading" : ""
                  } ${action?.className}`}
                  onClick={action.onClick}
                >
                  <div className="lds-dual-ring"></div>

                  <span>
                    {action.icon} {action.label}
                  </span>
                </button>
              )
            ) : null
          )}
        </>
      ) : settingMenuType === "settingMenu-user" ? (
        <>
          <h4>{translations?.actions?.action}</h4>
          <button className="danger">
            <IoPersonRemoveSharp /> {translations?.actions?.remove_friend}
          </button>
          <button className="danger">
            <MdBlock /> {translations?.actions?.block}
          </button>
        </>
      ) : settingMenuType === "settingMenu-story" ? (
        <>
          {selectedDev.isMyStory && (
            <>
              <button
                onClick={() => {
                  setSettingMenu(false);
                  setOpenStoryForm({ type: "edit", story: selectedDev.story });
                }}
              >
                <MdEdit /> {translations?.story?.edit_story}
              </button>
            </>
          )}
          <button>
            <MdContentCopy />{" "}
            {translations?.story?.copy_link_to_share_this_story}
          </button>
          <hr />
          {selectedDev.isMyStory ? (
            <button
              className="danger"
              onClick={() => {
                setSettingMenu(null);
                setDangerEvent({
                  type: "delete_story",
                  message: "are you sure you want to delete this story?",
                });
              }}
            >
              <FaTrashAlt /> {translations?.actions?.delete_story}
            </button>
          ) : (
            <button className="danger">
              <BiVolumeMute /> {translations?.story?.mute_stories_from} ahmed
            </button>
          )}
        </>
      ) : settingMenuType === "settingMenu-page-posts" ? (
        <>
          <button>
            <FaBookmark /> {translations?.actions?.save_post}
          </button>
          <button className="warning">
            <BiSolidHide /> {translations?.actions?.hide}
          </button>
          <hr />

          <button className="danger">
            <MdBlock /> {translations?.actions?.block_page}
          </button>
          <button className="danger">
            <MdReport /> {translations?.actions?.report_page}
          </button>
        </>
      ) : settingMenuType === "settingMenu-comment" ? (
        <>
          {selectedDev.isMyComment ? (
            <>
              <button
                onClick={() => {
                  setMessageText(selectedDev?.comment?.paragraph);
                  setSomeThingHappen({
                    comment: {
                      event: "edit",
                      data: selectedDev?.comment,
                      level: selectedDev?.level,
                    },
                  });
                  setSettingMenu(null);
                }}
              >
                <MdEdit /> {translations?.actions?.edit_comment}
              </button>
              <button
                className="danger"
                onClick={() => {
                  setSettingMenu(null);
                  setDangerEvent({
                    type: "delete_comment",
                    message: "are you sure you want to delete this comment",
                  });
                }}
              >
                <FaTrashAlt /> {translations?.actions?.delete_comment}
              </button>
            </>
          ) : selectedDev.isMyPost ? (
            <>
              <button
                className="danger"
                onClick={() => {
                  setSettingMenu(null);
                  setDangerEvent({
                    type: "delete_comment",
                    message: "are you sure you want to delete this comment",
                  });
                }}
              >
                <FaTrashAlt /> {translations?.actions?.delete_comment}
              </button>
            </>
          ) : null}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SettingMenu;
