"use client";
import "@/Styles/user.css";
import "@/Styles/forms.css";
import "@/Styles/marketplace.css";
import React, {
  useState,
  use,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { MenusContext } from "@/Contexts/MenusContext";
import ContentLoader from "react-content-loader";

import { useLanguage } from "@/Contexts/LanguageContext";
import { useRouter, usePathname } from "next/navigation";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { userService } from "@/services/api/userService";
import { pageService } from "@/services/api/pageService";

import { FaEye } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { IoPersonRemove, IoSearch, IoClose } from "react-icons/io5";

export default function Discover({ params }) {
  const { fetchUserData, fetchPageData } = useContext(ScreenContext);
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const { translations } = useLanguage();
  const { addNotification } = useNotification();
  const { userData, setUserData, actionLoading, setActionLoading } =
    useContext(ScreenContext);
  const { setOpenImgForm, someThingHappen, setSomeThingHappen } =
    useContext(MenusContext);

  const { type } = use(params);

  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      let res;
      try {
        if (type === "people") {
          res = await userService.getAllUsers(search);
        } else {
          res = await pageService.getAllPages(search);
        }
        setAllData(res.data.data);
      } catch (err) {
        console.error("Error fetching userData", err);
        addNotification({
          type: "error",
          message:
            type === "people" ? "Failed to load users" : "Failed to load pages",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [search]);

  const sendFriendRequest = async (id) => {
    const key = `send-friend-request-${id}`;

    try {
      setActionLoading((prev) => [...prev, key]);

      await userService.makeFriendRequest(id);

      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          sent: [...(prev.friendRequests?.sent || []), id],
        },
      }));

      setAllData((prevUsers) =>
        prevUsers.map((u) =>
          u._id === id
            ? {
                ...u,
                friendRequests: {
                  ...u.friendRequests,
                  received: [
                    ...(u.friendRequests?.received || []),
                    userData._id,
                  ],
                },
              }
            : u
        )
      );

      addNotification({ type: "success", message: "Friend request sent." });
    } catch (err) {
      console.error("Send friend request failed", err);

      if (userData && userData._id) {
        addNotification({
          type: "error",
          message: "Failed to send friend request.",
        });
      } else {
        addNotification({
          type: "warning",
          message: "You have to log in first.",
        });
      }
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== key));
    }
  };

  const cancelFriendRequest = async (id) => {
    const key = `cancel-friend-request-${id}`;

    try {
      setActionLoading((prev) => [...prev, key]);

      await userService.cancelRequest(id);

      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          sent: prev.friendRequests?.sent?.filter((x) => x !== id),
        },
      }));

      setAllData((prevUsers) =>
        prevUsers.map((u) =>
          u._id === id
            ? {
                ...u,
                friendRequests: {
                  ...u.friendRequests,
                  received: u.friendRequests?.received?.filter(
                    (x) => x !== userData._id
                  ),
                },
              }
            : u
        )
      );

      addNotification({ type: "info", message: "Friend request canceled." });
    } catch (err) {
      console.error("Cancel friend request failed", err);
      addNotification({
        type: "error",
        message: "Failed to cancel friend request.",
      });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== key));
    }
  };

  const confirm_remove_friend_request = async (accept, user) => {
    const id = user._id;
    const key = `${accept ? "confirm" : "remove"}-friend-request-${id}`;

    try {
      setActionLoading((prev) => [...prev, key]);

      await userService.interactWithFriendReq(id, accept);

      if (accept) {
        // Accept friend request
        setUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            received: prev.friendRequests?.received?.filter((x) => x !== id),
          },
          friends: [...(prev.friends || []), id],
        }));
        setAllData((prevUsers) =>
          prevUsers.map((u) =>
            u._id === id
              ? {
                  ...u,
                  friendRequests: {
                    ...u.friendRequests,
                    sent: u.friendRequests?.sent?.filter(
                      (x) => x !== userData._id
                    ),
                  },
                  friends: [...(u.friends || []), userData._id],
                }
              : u
          )
        );

        addNotification({
          type: "success",
          message: "Friend request accepted.",
        });
      } else {
        // Remove/Decline
        setUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            received: prev.friendRequests?.received?.filter((x) => x !== id),
          },
        }));

        setAllData((prevUsers) =>
          prevUsers.map((u) =>
            u._id === id
              ? {
                  ...u,
                  friendRequests: {
                    ...u.friendRequests,
                    sent: u.friendRequests?.sent?.filter(
                      (x) => x !== userData._id
                    ),
                  },
                }
              : u
          )
        );

        addNotification({ type: "info", message: "Friend request declined." });
      }
    } catch (err) {
      console.error("Friend request interaction failed", err);
      addNotification({
        type: "error",
        message: "Failed to process friend request.",
      });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== key));
    }
  };

  const removeFriend = async (user) => {
    const id = user._id;
    const key = `remove-friend-${id}`;

    try {
      setActionLoading((prev) => [...prev, key]);

      await userService.removeFriend(id);

      setUserData((prev) => ({
        ...prev,
        friends: prev.friends?.filter((x) => x !== id),
      }));

      setAllData((prevUsers) =>
        prevUsers.map((u) =>
          u._id === id
            ? {
                ...u,
                friends: u.friends?.filter((x) => x !== userData._id),
              }
            : u
        )
      );

      addNotification({ type: "info", message: "Friend removed." });
    } catch (err) {
      console.error("Remove friend failed", err);
      addNotification({ type: "error", message: "Failed to remove friend." });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== key));
    }
  };

  return (
    <div className={`discover ${type} `}>
      <div className="top">
        <h3>{`Discover ${type}`}</h3>
        <div
          className="search-holderr"
          style={{
            padding: search.length !== 0 ? "0 0 0 10px" : "0 10px",
          }}
        >
          <IoSearch
            className="searchIco"
            onClick={() => document.getElementById("searchinusers").focus()}
          />
          <div className="middle">
            <h4
              style={{
                opacity: search.length !== 0 ? "0" : "1",
              }}
              onClick={() => document.getElementById("searchinusers").focus()}
            >
              {`search in ${type}`}
            </h4>
            <input
              id="searchinusers"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {search.length > 0 && (
            <IoClose className="delete" onClick={() => setSearch("")} />
          )}
        </div>
      </div>
      <div className="peaple">
        {loading
          ? Array.from({ length: 18 }).map((_, index) => (
              <ContentLoader
                speed={2}
                width="100%" // يأخذ عرض الحاوية
                height={214}
                viewBox="0 0 320 214"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ background: "white" }}
              >
                {/* الخلفية العلوية (البانر) */}
                <rect x="0" y="0" rx="8" ry="0" width="100%" height="120" />

                {/* الصورة الشخصية (دائرة) */}
                <circle cx="55" cy="130" r="40" />

                {/* الاسم */}
                <rect x="108" y="130" rx="4" ry="4" width="50%" height="16" />

                {/* عدد الأصدقاء */}
                <rect x="108" y="152" rx="4" ry="4" width="40%" height="12" />

                {/* زر 1 */}
                <rect x="12" y="180" rx="6" ry="6" width="60%" height="28" />

                {/* زر 2 */}
                <rect x="210" y="180" rx="6" ry="6" width="30%" height="28" />
              </ContentLoader>
            ))
          : allData
              ?.filter((x) => x._id !== userData?._id)
              ?.map((user) => {
                const isMyFriend = userData?.friends?.includes(user._id);
                const isSendedFriendRequest =
                  userData?.friendRequests?.sent?.includes(user._id);
                const isReceivedFriendRequest =
                  userData?.friendRequests?.received?.includes(user._id);

                return (
                  <div className="user" key={user?._id}>
                    <div className="holder">
                      <div className="cover">
                        {user?.cover?.url ? (
                          <Image
                            src={user?.cover?.url || ""}
                            alt={user?.firstname || user?.pagename}
                            fill
                          />
                        ) : null}
                      </div>

                      <div className="info">
                        <Image
                          className={`rounded profile-img`}
                          src={user?.img?.url || "/users/default.svg"}
                          alt={user?.firstname || user?.pagename}
                          fill
                        />
                        <div className="hold">
                          <h4 className="ellipsisText">
                            {type === "pages"
                              ? `${user?.pagename}`
                              : `${user?.firstname} ${user?.lastname}`}
                          </h4>
                          {type === "people" && (
                            <p className="ellipsisText">
                              {user?.friends?.length === 0
                                ? "no friends yet"
                                : `${user?.friends?.length} friends`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {type === "people" ? (
                      <div className="actions">
                        {isMyFriend ? (
                          <button
                            className={`main-button ${
                              actionLoading.includes(
                                `remove-friend-request-${user?._id}`
                              )
                                ? "loading"
                                : ""
                            }`}
                            onClick={() => removeFriend(user)}
                          >
                            <span>
                              <IoPersonRemove /> Remove Friend
                            </span>
                            <div className="lds-dual-ring"></div>
                          </button>
                        ) : isSendedFriendRequest ? (
                          <button
                            className={`main-button ${
                              actionLoading.includes(
                                `cancel-friend-request-${user?._id}`
                              )
                                ? "loading"
                                : ""
                            }`}
                            onClick={() => cancelFriendRequest(user?._id)}
                          >
                            <span>
                              <IoMdPersonAdd /> Cancel Request
                            </span>
                            <div className="lds-dual-ring"></div>
                          </button>
                        ) : isReceivedFriendRequest ? (
                          <>
                            <button
                              className={`main-button active ${
                                actionLoading.includes(
                                  `confirm-friend-request-${user?._id}`
                                )
                                  ? "loading"
                                  : ""
                              }`}
                              onClick={() =>
                                confirm_remove_friend_request(true, user?._id)
                              }
                            >
                              <span>Confirm request</span>
                              <div className="lds-dual-ring"></div>
                            </button>
                            <button
                              className={`main-button ${
                                actionLoading.includes(
                                  `remove-friend-request-${user?._id}`
                                )
                                  ? "loading"
                                  : ""
                              }`}
                              onClick={() =>
                                confirm_remove_friend_request(false, user?._id)
                              }
                            >
                              <span>Decline request</span>
                              <div className="lds-dual-ring"></div>
                            </button>
                          </>
                        ) : (
                          <button
                            className={`main-button active ${
                              actionLoading.includes(
                                `send-friend-request-${user?._id}`
                              )
                                ? "loading"
                                : ""
                            }`}
                            onClick={() => sendFriendRequest(user?._id)}
                          >
                            <span>
                              <IoMdPersonAdd /> Add Friend
                            </span>
                            <div className="lds-dual-ring"></div>
                          </button>
                        )}

                        <Link
                          href={`/portfolio/${
                            type === "people" ? "user" : "page"
                          }/${user?._id}`}
                          className="main-button"
                        >
                          <span>
                            <FaEye />{" "}
                          </span>
                        </Link>
                      </div>
                    ) : (
                      <Link
                        style={{
                          width: type === "pages" ? "94%" : "fit-content",
                          margin: "auto",
                        }}
                        href={`/portfolio/page/${user?._id}`}
                        className="main-button"
                      >
                        <span>
                          <FaEye /> view page
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}
      </div>
    </div>
  );
}
