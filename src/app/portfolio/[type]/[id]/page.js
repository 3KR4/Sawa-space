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
import CutText from "@/utils/CutText";
import { messages, users, products } from "@/utils/Data";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import Post from "@/components/post/Post";
import ContentLoader from "react-content-loader";
import { useLanguage } from "@/Contexts/LanguageContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Masonry from "@mui/lab/Masonry";
import PostsHolder from "@/components/post/PostsHolder";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { userService } from "@/services/api/userService";
import { pageService } from "@/services/api/pageService";
import Slider from "@mui/material/Slider";
import Product from "@/components/shop/Product";
import ReactPaginate from "react-paginate";
import { productService } from "@/services/api/productService";
import MarketSideSection from "@/components/shop/MarketSideSection";
import SideSection from "@/components/providers/SideSection";

import { FaAngleRight, FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import {
  MdModeEditOutline,
  MdEdit,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd, IoMdPhotos } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { IoInformationCircleSharp, IoSearch, IoClose } from "react-icons/io5";

export default function Portfolio({ params }) {
  const { fetchUserData, fetchPageData } = useContext(ScreenContext);
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const { translations } = useLanguage();
  const { addNotification } = useNotification();
  const {
    userData,
    userPage,
    setUserData,
    screenSize,
    actionLoading,
    setActionLoading,
  } = useContext(ScreenContext);
  const { setOpenImgForm, someThingHappen, setSomeThingHappen } =
    useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { id, type } = use(params);

  const isMyProfile = type === "user" ? userData?._id === id : null;
  const isMyPage = type === "page" ? userPage?._id === id : null;

  const [currentPortfolio, setCurrentPortfolio] = useState({});
  const [currentSelectedData, setCurrentSelectedData] = useState("posts");
  const [seeAllAbout, setSeeAllAbout] = useState(false);
  const [editType, setEditType] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [userPhotos, setUserPhotos] = useState([]);
  const [userAllPhotos, setUserAllPhotos] = useState([]);
  const [products, setProducts] = useState([]);

  const [userFriends, setUserFriends] = useState([]);
  const [userSendedReqs, setUserSendedReqs] = useState([]);
  const [userReceivedReqs, setUserReceivedReqs] = useState([]);

  const [productsSmallView, setProductsSmallView] = useState([]);

  const isMyFriend = userData?.friends?.includes(currentPortfolio?._id);
  const isSendedFriendRequest = userData?.friendRequests?.sent?.includes(
    currentPortfolio?._id
  );
  const isReceivedFriendRequest = userData?.friendRequests?.received?.includes(
    currentPortfolio?._id
  );

  const sendFriendRequestTop = async () => {
    try {
      setActionLoading((prev) => [...prev, "send-friend-request"]);

      await userService.makeFriendRequest(currentPortfolio?._id);

      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          sent: [...(prev.friendRequests?.sent || []), currentPortfolio?._id],
        },
      }));

      setCurrentPortfolio((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          received: [...(prev.friendRequests?.received || []), userData._id],
        },
      }));

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
  const cancelFriendRequestTop = async () => {
    try {
      setActionLoading((prev) => [...prev, "cancel-friend-request"]);

      await userService.cancelRequest(currentPortfolio?._id);

      setUserData((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          sent: prev.friendRequests?.sent?.filter(
            (x) => x !== currentPortfolio?._id
          ),
        },
      }));

      setCurrentPortfolio((prev) => ({
        ...prev,
        friendRequests: {
          ...prev.friendRequests,
          received: prev.friendRequests?.received?.filter(
            (x) => x !== userData._id
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
  const confirm_remove_friend_requestTop = async (action) => {
    const actionKey = `${action ? "confirm" : "remove"}-friend-request`;
    try {
      setActionLoading((prev) => [...prev, actionKey]);

      await userService.interactWithFriendReq(currentPortfolio?._id, action);

      if (action) {
        // Accepting request
        setUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            received: prev.friendRequests?.received?.filter(
              (x) => x !== currentPortfolio?._id
            ),
          },
          friends: [...(prev.friends || []), currentPortfolio?._id],
        }));

        setCurrentPortfolio((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            sent: prev.friendRequests?.sent?.filter((x) => x !== userData._id),
          },
          friends: [...(prev.friends || []), userData._id],
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
              (x) => x !== selectedDev
            ),
          },
        }));

        setCurrentUserData((prev) => ({
          ...prev,
          friendRequests: {
            ...prev.friendRequests,
            sent: prev.friendRequests?.sent?.filter((x) => x !== userData._id),
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
  const removeFriendTop = async () => {
    try {
      setActionLoading((prev) => [...prev, "remove-friend"]);

      await userService.removeFriend(currentPortfolio?._id);

      setUserData((prev) => ({
        ...prev,
        friends: prev.friends?.filter((x) => x !== currentPortfolio?._id),
      }));

      setCurrentPortfolio((prev) => ({
        ...prev,
        friends: prev.friends?.filter((x) => x !== userData._id),
      }));
    } catch (err) {
      console.error("Remove friend failed", err);
      addNotification({ type: "error", message: "Failed to remove friend." });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== "remove-friend"));
    }
  };

  const fetch_portfolio_photos = async (type, page, limit) => {
    setActionLoading((prev) => [...prev, "profile-photos"]);

    try {
      const { data } = await userService.getUserPhotos(id, page, limit);

      if (type === "side-photos") {
        setUserPhotos(data.data);
      } else {
        const formattedPhotos = data.data.flatMap((post) =>
          post.img.map((image) => ({
            postId: post._id,
            url: image.newpath.url,
          }))
        );

        setUserAllPhotos(formattedPhotos);
      }
    } catch (err) {
      console.error("Error fetching user photos", err);
      addNotification({
        type: "error",
        message: "Failed to load user photos. Please try again later.",
      });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== "profile-photos"));
    }
  };
  const fetch_user_friends = async (id) => {
    setActionLoading((prev) => [...prev, "profile-friends"]);

    try {
      const { data } = await userService.getUserFriends(id);

      setUserFriends(data.data);
    } catch (err) {
      console.error("Error fetching user friends", err);
      addNotification({
        type: "error",
        message: "Failed to load user friends. Please try again later.",
      });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== "profile-friends"));
    }
  };
  const user_sended_Request = async () => {
    setActionLoading((prev) => [...prev, "profile-sended-friends-req"]);

    try {
      const { data } = await userService.getUserSendedRequests();

      setUserSendedReqs(data.data);
    } catch (err) {
      console.error("Error fetching your sended friends requests", err);
      addNotification({
        type: "error",
        message: "Failed to load your sended friends requests",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== "profile-sended-friends-req")
      );
    }
  };
  const user_received_Request = async () => {
    setActionLoading((prev) => [...prev, "profile-received-friends-req"]);

    try {
      const { data } = await userService.getUserReceivedRequests();

      setUserReceivedReqs(data.data);
    } catch (err) {
      console.error("Error fetching your received friends requests", err);
      addNotification({
        type: "error",
        message: "Failed to load your received friends requests",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== "profile-received-friends-req")
      );
    }
  };

  useEffect(() => {
    type === "user" && fetch_user_friends(id);
  }, []);
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setActionLoading((prev) => [...prev, "profile-data"]);
      try {
        let response;

        if (type === "user") {
          response = await userService.getUserData(id);
        } else if (type === "page") {
          response = await pageService.getPageData(id);
        } else if (type === "community") {
          response = await communityService.getCommunityData(id);
        } else {
          console.error("Unknown portfolio type:", type);
          setActionLoading((prev) => prev.filter((x) => x !== "profile-data"));
        }

        setCurrentPortfolio(response.data.data);
      } catch (err) {
        console.error("Error fetching posts", err);
        addNotification({
          type: "error",
          message: "Failed to load user data. Please try again later.",
        });
      } finally {
        setActionLoading((prev) => prev.filter((x) => x !== "profile-data"));
      }
    };

    fetch_portfolio_photos("side-photos", 1, 7);
    fetchPortfolioData();
  }, [id, type]);

  useEffect(() => {
    if (currentSelectedData === "photos") {
      fetch_portfolio_photos("all", 1, 1000000);
    } else if (currentSelectedData === "friends") {
      fetch_user_friends(id);
      if (isMyProfile) {
        user_sended_Request();
        user_received_Request();
      }
    } else if (currentSelectedData === "products") {
      loadProducts();
    }
  }, [currentSelectedData]);

  const activePortfolio =
    type === "page"
      ? isMyPage
        ? userPage
        : currentPortfolio
      : isMyProfile
      ? userData
      : currentPortfolio;

  const [curentOpendSelectHolder, setCurentOpendSelectHolder] = useState();

  const sort = [
    [
      "default",
      "price: low to high",
      "price: high to low",
      "name: a to z",
      "name: z to a",
    ],
    [12, 24, 48, 96],
  ];

  const [sortType, setSortType] = useState("default");
  const [pageSize, setPageSize] = useState(12);
  const [priceRangevalue, setPriceRangevalue] = useState([10, 100000]);

  const sendFriendRequest = async (id) => {
    try {
      setActionLoading((prev) => [...prev, `send-friend-request-${id}`]);

      await userService.makeFriendRequest(id);

      setUserFriends((prev) =>
        prev.map((friend) =>
          friend._id === id
            ? {
                ...friend,
                friendRequests: {
                  ...friend.friendRequests,
                  received: [
                    ...(friend.friendRequests?.received || []),
                    userData?._id,
                  ],
                },
              }
            : friend
        )
      );

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
        prev.filter((x) => x !== `send-friend-request-${id}`)
      );
    }
  };
  const cancelFriendRequest = async (id) => {
    try {
      setActionLoading((prev) => [...prev, `send-friend-request-${id}`]);

      await userService.cancelRequest(id);

      setUserSendedReqs((prev) => prev.filter((x) => x._id !== id));
      setUserFriends((prev) =>
        prev.map((friend) =>
          friend._id === id
            ? {
                ...friend,
                friendRequests: {
                  ...friend.friendRequests,
                  received: [
                    ...(friend.friendRequests?.received.filter(
                      (x) => x !== userData?._id
                    ) || []),
                  ],
                },
              }
            : friend
        )
      );
    } catch (err) {
      console.error("Failed to send friend request", err);
      addNotification({
        type: "error",
        message: "Failed to send friend request.",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter((x) => x !== `send-friend-request-${id}`)
      );
    }
  };
  const confirm_remove_friend_request = async (id, action) => {
    try {
      setActionLoading((prev) => [
        ...prev,
        `${action ? "confirm" : "remove"}-friend-request-${id}`,
      ]);

      await userService.interactWithFriendReq(id, action);

      setUserReceivedReqs((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      console.error("Failed to interact with this friend request", err);
      addNotification({
        type: "error",
        message: "Failed to interact with this friend request.",
      });
    } finally {
      setActionLoading((prev) =>
        prev.filter(
          (x) => x !== `${action ? "confirm" : "remove"}-friend-request-${id}`
        )
      );
    }
  };

  const searchParams = useSearchParams();

  // Initialize filters state from URL params
  const initialFilters = {
    dep: searchParams.get("dep") || null,
    search: searchParams.get("search") || null,
    minP: searchParams.get("minP") || null,
    maxP: searchParams.get("maxP") || null,
    page: parseInt(searchParams.get("page")) || 1,
    category: searchParams.get("category") || null,
    availability: searchParams.get("availability") || null,
  };
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [heighstPrice, setHeighstPrice] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const isFetching = useRef(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  console.log("filters", filters);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          params.set(
            key,
            Array.isArray(value) ? value.join(",") : value.toString()
          );
        }
      });

      router.replace(`?${params.toString()}`);
    },
    [router]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters) => {
      let updated;

      // إذا كان التغيير هو department، نمسح الفلاتر الأخرى
      if (newFilters.dep !== undefined && newFilters.dep !== filters.dep) {
        updated = {
          dep: newFilters.dep,
          search: null,
          minP: null,
          maxP: null,
          page: 1,
        };
        setProductSearch(""); // إفراغ حقل البحث
      } else {
        updated = { ...filters, ...newFilters, page: 1 };
      }

      setFilters(updated);
      updateURL(updated);
      setProducts([]);
    },
    [filters, updateURL]
  );

  // Load products based on current filters
  const loadProducts = useCallback(async () => {
    if (isFetching.current) return;

    isFetching.current = true;
    setLoading(true);

    try {
      const res = await productService.getProducts(
        "page",
        id,
        filters.search,
        null,
        filters.category,
        filters.availability,
        filters.minP,
        filters.maxP,
        filters.page,
        15
      );

      const newProducts = res?.data?.data || [];
      setProducts(newProducts);

      const lastPage = res?.data?.lastPage || 1;
      setHeighstPrice((prev) =>
        filters.minP || filters.maxP ? prev : res?.data?.highestPrice || 5000000
      );
      setTotalCount(res?.data?.totalCount);
      setLastPage(res?.data?.lastPage);
    } catch (err) {
      console.error(err);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [filters]);

  // Load products when filters change
  useEffect(() => {
    loadProducts();
  }, [filters, loadProducts]);
  useEffect(() => {
    if (
      someThingHappen.type === "product" &&
      (someThingHappen.event === "delete" ||
        someThingHappen.event === "edit" ||
        (someThingHappen.event === "create" && filters.page === 1))
    ) {
      loadProducts();
      setSomeThingHappen({});
    }
  }, [someThingHappen, filters.page, loadProducts]);

  const handlePageChange = (e) => {
    const updated = {
      ...filters,
      page: e.selected + 1,
    };
    setFilters(updated);
    setProducts([]);
    updateURL(updated); // 👈 Sync URL with new page
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleFilterChange({ search: productSearch });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [productSearch]);

  const clearFilters = (overrideFilters = {}) => {
    const cleared = {
      dep: null,
      search: null,
      minP: null,
      maxP: null,
      page: 1,
      ...overrideFilters,
    };
    setFilters(cleared);
    setProductSearch("");
    setProducts([]);
    updateURL(cleared);
  };

  return (
    <div
      className={`portfolio ${type} ${isMyProfile ? "myProfile" : ""} ${
        isMyPage ? "myPage" : ""
      }`}
    >
      <div className="top">
        <div className="cover">
          <Image
            src={
              isMyProfile
                ? userData?.cover?.url
                : isMyPage
                ? userPage?.cover?.url
                : currentPortfolio?.cover?.url
            }
            alt="User Cover"
            fill
          />
          {(isMyProfile || isMyPage) && (
            <div
              className="editICo"
              onClick={() => {
                setOpenImgForm({
                  portfolio: type,
                  type: "cover",
                  event: isMyProfile
                    ? userData?.cover?.url
                      ? "edit"
                      : "add"
                    : userPage?.cover?.url
                    ? "edit"
                    : "add",
                  userId: id,
                  image:
                    type === "user"
                      ? userData?.cover?.url
                      : userPage?.cover?.url,
                });
              }}
            >
              <MdModeEditOutline />
            </div>
          )}
        </div>
        <nav>
          <div className="top">
            <div className="leftHolder">
              <div className="userImg rounded">
                <Image
                  className="rounded"
                  src={
                    isMyProfile
                      ? userData?.img?.url || "/users/default.svg"
                      : isMyPage
                      ? userPage?.img?.url || "/users/default.svg"
                      : currentPortfolio?.img?.url || "/users/default.svg"
                  }
                  alt="User Cover"
                  fill
                />
                {(isMyProfile || isMyPage) && (
                  <div
                    className="editICo rounded"
                    onClick={() => {
                      setOpenImgForm({
                        portfolio: type,
                        type: "img",
                        event: isMyProfile
                          ? userData?.img?.url
                            ? "edit"
                            : "add"
                          : userPage?.img?.url
                          ? "edit"
                          : "add",
                        userId: id,
                        image:
                          type === "user"
                            ? userData?.img?.url
                            : userPage?.img?.url,
                      });
                    }}
                  >
                    <MdModeEditOutline />
                  </div>
                )}
              </div>
            </div>
            <div className="right">
              <div className="left-data">
                <h4>
                  {type === "page"
                    ? isMyPage
                      ? userPage?.pagename
                      : currentPortfolio?.pagename
                    : isMyProfile
                    ? `${userData?.firstname || ""} ${userData?.lastname || ""}`
                    : `${currentPortfolio?.firstname || ""} ${
                        currentPortfolio?.lastname || ""
                      }`}
                </h4>
                {(currentPortfolio?.friends?.length ||
                  currentPortfolio?.followers?.length) &&
                  (type === "user" ? (
                    <h5>
                      {currentPortfolio?.friends?.length}{" "}
                      {translations?.portfolio?.friends}
                      {/* - 10{" "}
                    {translations?.portfolio?.mutual} */}
                    </h5>
                  ) : (
                    <h5>46K {translations?.portfolio?.followers}</h5>
                  ))}
              </div>
              <div className="right-btns">
                {isMyPage || isMyProfile ? (
                  <button
                    className="main-button edit-btn"
                    onClick={() => setEditType(type)}
                  >
                    <MdEdit />{" "}
                    {isMyProfile
                      ? translations?.actions?.edit_profile
                      : translations?.actions?.edit_page}
                  </button>
                ) : isMyFriend ? (
                  <button
                    className={`main-button ${
                      actionLoading.includes("remove-friend") ? "loading" : ""
                    }`}
                    onClick={removeFriendTop}
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
                    onClick={cancelFriendRequestTop}
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
                      onClick={() => confirm_remove_friend_requestTop(true)}
                    >
                      <span>
                        <IoMdPersonAdd /> Confirm Request
                      </span>
                      <div className="lds-dual-ring"></div>
                    </button>
                    <button
                      className={`main-button danger ${
                        actionLoading.includes("remove-friend-request")
                          ? "loading"
                          : ""
                      }`}
                      onClick={() => confirm_remove_friend_requestTop(false)}
                    >
                      <span>
                        <IoMdPersonAdd /> Decline Request
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
                    onClick={sendFriendRequestTop}
                  >
                    <span>
                      <IoMdPersonAdd /> Add Friend
                    </span>
                    <div className="lds-dual-ring"></div>
                  </button>
                )}

                {/* Message button shown always if not your own profile */}
                {!isMyPage && !isMyProfile && (
                  <button className="main-button">
                    <AiFillMessage />
                    {translations?.portfolio?.message}
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* {type === "page" && (
            <div className="small-followers">
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <ContentLoader
                      width={15}
                      height={15}
                      speed={4}
                      viewBox="0 0 120 120"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="15" height="15" />
                    </ContentLoader>
                  ))
                : users
                    ?.slice(0, screenSize !== "small" ? 15 : 8)
                    .map((x) => (
                      <Image
                        key={x.id}
                        onClick={(e) => handleMenus(e, "user-Info", x.id)}
                        className="rounded"
                        src={x.img || "/users/default.svg"}
                        width={32}
                        height={32}
                        alt={`user Image`}
                      />
                    ))}
            </div>
          )} */}
          <div className="bottom">
            <div>
              <button
                className={`main-button ${
                  currentSelectedData == "posts" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("posts")}
              >
                <BsFillPostcardFill />
                {translations?.portfolio?.posts}
              </button>

              {type === "user" && (
                <button
                  className={`main-button ${
                    currentSelectedData == "friends" ? "active" : ""
                  }`}
                  onClick={() => setCurrentSelectedData("friends")}
                >
                  <HiUsers />
                  {translations?.sidechats?.friends}
                </button>
              )}
              {type === "page" && (
                <button
                  className={`main-button ${
                    currentSelectedData == "products" ? "active" : ""
                  }`}
                  onClick={() => setCurrentSelectedData("products")}
                >
                  <FaShoppingCart />
                  {translations?.portfolio?.products}
                </button>
              )}
              {type === "user" && (
                <button
                  className={`main-button ${
                    currentSelectedData == "photos" ? "active" : ""
                  }`}
                  onClick={() => setCurrentSelectedData("photos")}
                >
                  <IoMdPhotos />
                  {translations?.portfolio?.photos}
                </button>
              )}

              <button
                className={`main-button ${
                  currentSelectedData == "about" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("about")}
              >
                <IoInformationCircleSharp />
                {translations?.portfolio?.about}
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="bottom-holder">
        <div className="side-menu sideSection">
          {currentSelectedData !== "products" ? (
            <>
              {currentSelectedData !== "about" && (
                <ul className="about">
                  <h4>{translations?.portfolio?.about}</h4>

                  {activePortfolio?.info && (
                    <>
                      {/* BIO */}
                      {activePortfolio?.info?.bio && (
                        <li style={{ display: "block" }}>
                          {seeAllAbout
                            ? activePortfolio.info.bio
                            : activePortfolio.info.bio.length > 165
                            ? `${activePortfolio.info.bio.slice(0, 165)}... `
                            : activePortfolio.info.bio}

                          {activePortfolio.info.bio.length > 165 && (
                            <span
                              onClick={() => setSeeAllAbout(!seeAllAbout)}
                              className="seeMore"
                            >
                              {seeAllAbout ? "see less" : "see more"}
                            </span>
                          )}
                        </li>
                      )}

                      {Object.entries(activePortfolio?.info || {})
                        .filter(([key]) => key !== "bio")
                        .map(([key, value], index) => {
                          const formattedValue =
                            key === "birthdate"
                              ? new Date(value).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                              : value;

                          return (
                            <li key={index}>
                              {key}:{" "}
                              {key === "website" ? (
                                <Link
                                  href={
                                    value.startsWith("http")
                                      ? value
                                      : `https://${value}`
                                  }
                                  target="_blank"
                                >
                                  {value}
                                </Link>
                              ) : (
                                <span>{formattedValue}</span>
                              )}
                            </li>
                          );
                        })}
                    </>
                  )}
                </ul>
              )}
              {type !== "page" &&
                currentSelectedData !== "photos" &&
                (userPhotos?.length ||
                  actionLoading.includes("profile-photos")) && (
                  <div className="images">
                    {userPhotos?.length ? (
                      <div className="top">
                        <h4> {translations?.portfolio?.photos}</h4>
                        {userPhotos?.length > 6 && (
                          <button
                            onClick={() => setCurrentSelectedData("photos")}
                          >
                            {translations?.portfolio?.see_all}{" "}
                            {translations?.portfolio?.photos} <FaAngleRight />
                          </button>
                        )}
                      </div>
                    ) : null}

                    <div className="hold">
                      {actionLoading.includes("profile-photos")
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <ContentLoader
                              width={`100%`}
                              height={`100%`}
                              speed={2}
                              viewBox="0 0 120 110"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              {/* Rounded rectangle for the image placeholder */}
                              <rect
                                x="0"
                                y="0"
                                rx="10"
                                ry="10"
                                width="120"
                                height="110"
                              />
                            </ContentLoader>
                          ))
                        : userPhotos?.slice(0, 6)?.map((post) => (
                            <div
                              className={`post-imgs-hold ${
                                post.img.length === 1
                                  ? "single"
                                  : post.img.length === 2
                                  ? "two"
                                  : ""
                              }`}
                              key={post._id}
                              // onClick={() => {
                              //   const current = new URLSearchParams(
                              //     Array.from(searchParams.entries())
                              //   );
                              //   current.set("post", post._id);
                              //   router.replace(
                              //     `${pathname}?${current.toString()}`,
                              //     undefined,
                              //     { scroll: false }
                              //   );
                              // }}
                            >
                              {post.img?.slice(0, 4)?.map((imgObj) => (
                                <div className="img-and-morecounter-div">
                                  {post.img.length > 4 && (
                                    <span className="hasMoreImgs">
                                      +{post.img.length - 4}
                                    </span>
                                  )}
                                  <Image
                                    key={imgObj.newpath.publicid}
                                    src={imgObj.newpath.url}
                                    alt={imgObj.originalname}
                                    fill
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                    </div>
                  </div>
                )}
              {currentSelectedData !== "products" &&
                type === "page" &&
                (productsSmallView?.length ||
                  actionLoading.includes("page-products")) && (
                  <div className="images">
                    {productsSmallView?.length && (
                      <div className="top">
                        <h4> {translations?.portfolio?.products}</h4>
                        {products?.length > 6 && (
                          <button
                            onClick={() => setCurrentSelectedData("products")}
                          >
                            {translations?.portfolio?.see_all}{" "}
                            {translations?.portfolio?.products} <FaAngleRight />
                          </button>
                        )}
                      </div>
                    )}

                    <div className="hold">
                      {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <ContentLoader
                              width={120}
                              height={120}
                              speed={4}
                              viewBox="0 0 120 120"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              <rect
                                x="160"
                                y="120"
                                rx="3"
                                ry="3"
                                width="100%"
                                height="120"
                              />
                            </ContentLoader>
                          ))
                        : products.slice(0, 6).map((x, index) => (
                            <Image
                              key={index}
                              src={x.images[0]}
                              alt=""
                              fill
                              style={{ objectFit: "contain" }}
                              onClick={() => {
                                handleImageClick(x.id, index);
                              }}
                            />
                          ))}
                    </div>
                  </div>
                )}
              {type !== "page" &&
                currentSelectedData !== "friends" &&
                (userFriends?.length ||
                  actionLoading.includes("profile-friends")) && (
                  <div className="holder friends">
                    {userFriends?.length ? (
                      <div className="top">
                        <h4>
                          {type === "user"
                            ? translations?.sidechats?.friends
                            : translations?.portfolio?.followers}
                        </h4>
                        {userFriends?.length > 6 && (
                          <button
                            onClick={() => setCurrentSelectedData("friends")}
                          >
                            {translations?.portfolio?.see_all}{" "}
                            {translations?.sidechats?.friends} <FaAngleRight />
                          </button>
                        )}
                      </div>
                    ) : null}
                    <div className="hold">
                      {actionLoading.includes("profile-friends")
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <ContentLoader
                              width={`100%`}
                              height={`100%`}
                              speed={2}
                              viewBox="0 0 120 120"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              {/* Rounded rectangle for the image placeholder */}
                              <rect
                                x="0"
                                y="0"
                                rx="10"
                                ry="10"
                                width="120"
                                height="120"
                              />
                            </ContentLoader>
                          ))
                        : userFriends?.slice(0, 6).map((x) => (
                            <div
                              key={x._id}
                              className="chat"
                              onClick={(e) =>
                                handleMenus(e, "user-Info", x?._id, {
                                  type: "user",
                                })
                              }
                            >
                              <Image
                                className="rounded"
                                src={x?.img?.url || "/users/default.svg"}
                                fill
                                alt={`user Image`}
                              />
                              <div className="name-lastmessage">
                                <h4 className="ellipsisText">
                                  {x?.firstname} {""} {x?.lastname}
                                </h4>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                )}
            </>
          ) : (
            <SideSection mobileFilters={mobileFilters}>
              <MarketSideSection
                type={"page"}
                heighstPrice={heighstPrice}
                onFilterChange={handleFilterChange}
                currentFilters={filters}
                clearFilters={clearFilters}
                setMobileFilters={setMobileFilters}
                totalCount={totalCount}
                isMyPage={isMyPage}
                categories={currentPortfolio?.category}
                setCurrentPortfolio={setCurrentPortfolio}
              />
            </SideSection>
          )}
        </div>

        <div className="bigSection">
          {currentSelectedData === "photos" ||
          currentSelectedData === "posts" ? (
            <div className="actions">
              <h4>
                {translations?.portfolio?.all} {``}
                {translations?.portfolio?.[currentSelectedData] || ""}
              </h4>
            </div>
          ) : currentSelectedData === "products" ? (
            <div className="actions">
              <div
                className="search-holderr"
                style={{
                  padding: productSearch.length !== 0 ? "0 0 0 10px" : "0 10px",
                }}
              >
                <IoSearch
                  className="searchIco"
                  onClick={() =>
                    document.getElementById("searchInProductsInput").focus()
                  }
                />
                <div className="middle">
                  <h4
                    style={{
                      opacity: productSearch.length !== 0 ? "0" : "1",
                    }}
                    onClick={() =>
                      document.getElementById("searchInProductsInput").focus()
                    }
                  >
                    {translations?.placeHolders?.search_in_products}
                  </h4>
                  <input
                    id="searchInProductsInput"
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                {productSearch.length > 0 && (
                  <IoClose
                    className="delete"
                    onClick={() => setProductSearch("")}
                  />
                )}
              </div>
              <div className="row sorts-holder">
                {/* <div
                  className="select-holder"
                  onClick={() =>
                    setCurentOpendSelectHolder((prev) => (prev == 1 ? null : 1))
                  }
                >
                  <h4>Sort by:</h4>
                  <span>
                    {sortType}{" "}
                    <MdOutlineKeyboardArrowDown
                      className={curentOpendSelectHolder == 1 && "open"}
                    />
                  </span>
                  <ul
                    className={`list ${
                      curentOpendSelectHolder == 1 ? "active" : ""
                    }`}
                  >
                    {sort[0].map((x) => (
                      <li
                        className={sortType == x ? "active" : ""}
                        key={x}
                        onClick={() => {
                          setSortType(x);
                        }}
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div
                  className="select-holder"
                  onClick={() =>
                    setCurentOpendSelectHolder((prev) => (prev == 2 ? null : 2))
                  }
                >
                  <h4>Show:</h4>
                  <span>
                    {pageSize} Products{" "}
                    <MdOutlineKeyboardArrowDown
                      className={curentOpendSelectHolder == 2 && "open"}
                    />
                  </span>
                  <ul
                    className={`list ${
                      curentOpendSelectHolder == 2 ? "active" : ""
                    }`}
                  >
                    {sort[1].map((x) => (
                      <li
                        className={pageSize == x ? "active" : ""}
                        key={x}
                        onClick={() => {
                          setPageSize(x);
                        }}
                      >
                        {x} Product
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          {currentSelectedData === "posts" ? (
            <PostsHolder type={type} id={id} />
          ) : currentSelectedData === "friends" ? (
            <>
              {isMyProfile &&
                (userReceivedReqs?.length ||
                  actionLoading.includes("profile-received-friends-req")) && (
                  <>
                    {userReceivedReqs?.length ? (
                      <div className="actions">
                        <h4>
                          {translations?.portfolio?.all}
                          {` `}
                          {translations?.auth?.friend_requests}
                        </h4>
                      </div>
                    ) : null}

                    <div className="friends small">
                      {actionLoading.includes("profile-received-friends-req")
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <ContentLoader
                              width={120}
                              height={120}
                              speed={4}
                              viewBox="0 0 120 120"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              <rect
                                x="160"
                                y="120"
                                rx="3"
                                ry="3"
                                width="100%"
                                height="120"
                              />
                            </ContentLoader>
                          ))
                        : userReceivedReqs?.map((x) => (
                            <div key={`${x._id}-${Date.now()}`}>
                              <div>
                                <Image
                                  className="rounded"
                                  src={x?.img?.url || "/users/default.svg"}
                                  fill
                                  alt={`user Image`}
                                  onClick={(e) =>
                                    handleMenus(e, "user-Info", x?._id, {
                                      type: "user",
                                    })
                                  }
                                />
                                <h4>
                                  {x?.firstname} {""} {x?.lastname}
                                </h4>
                              </div>
                              <div className="btns-hold">
                                <button
                                  className={`main-button  ${
                                    actionLoading.includes(
                                      `remove-friend-request-${x._id}`
                                    )
                                      ? "loading"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    confirm_remove_friend_request(x._id, false);
                                  }}
                                >
                                  <span>remove</span>
                                  <div className="lds-dual-ring"></div>
                                </button>
                                <button
                                  className={`main-button  ${
                                    actionLoading.includes(
                                      `confirm-friend-request-${x._id}`
                                    )
                                      ? "loading"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    confirm_remove_friend_request(x._id, true);
                                  }}
                                >
                                  <span>confirm</span>
                                  <div className="lds-dual-ring"></div>
                                </button>
                              </div>
                            </div>
                          ))}
                    </div>
                  </>
                )}
              {isMyProfile &&
                (userSendedReqs?.length ||
                  actionLoading.includes("profile-sended-friends-req")) && (
                  <>
                    {userSendedReqs?.length ? (
                      <div className="actions">
                        <h4>
                          {translations?.portfolio?.all}
                          {` `}
                          {translations?.auth?.sent_requests}
                        </h4>
                      </div>
                    ) : null}

                    <div className="friends small">
                      {actionLoading.includes("profile-sended-friends-req")
                        ? Array.from({ length: 2 }).map((_, index) => (
                            <ContentLoader
                              width={120}
                              height={120}
                              speed={4}
                              viewBox="0 0 120 120"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                            >
                              <rect
                                x="160"
                                y="120"
                                rx="3"
                                ry="3"
                                width="100%"
                                height="120"
                              />
                            </ContentLoader>
                          ))
                        : userSendedReqs?.map((x) => (
                            <div key={`${x._id}-${Date.now()}`}>
                              <div>
                                <Image
                                  className="rounded"
                                  src={x?.img?.url || "/users/default.svg"}
                                  fill
                                  alt={`user Image`}
                                  onClick={(e) =>
                                    handleMenus(e, "user-Info", x?._id, {
                                      type: "user",
                                    })
                                  }
                                />
                                <h4>
                                  {x?.firstname} {""} {x?.lastname}
                                </h4>
                              </div>
                              <div className="btns-hold">
                                <button
                                  className={`main-button  ${
                                    actionLoading.includes(
                                      `send-friend-request-${x._id}`
                                    )
                                      ? "loading"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    const targetId = x?._id;
                                    cancelFriendRequest(targetId);
                                  }}
                                >
                                  <span>{"cancel request"}</span>

                                  <div className="lds-dual-ring"></div>
                                </button>
                              </div>
                            </div>
                          ))}
                    </div>
                  </>
                )}
              {(userFriends?.length ||
                actionLoading.includes("profile-friends")) && (
                <>
                  {userFriends?.length ? (
                    <div className="actions">
                      <h4>
                        {translations?.portfolio?.all}
                        {` `}
                        {translations?.sidechats?.friends}
                      </h4>
                    </div>
                  ) : null}

                  <div className="friends">
                    {actionLoading.includes("profile-friends")
                      ? Array.from({ length: 10 }).map((_, index) => (
                          <ContentLoader
                            width={120}
                            height={120}
                            speed={4}
                            viewBox="0 0 120 120"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect
                              x="160"
                              y="120"
                              rx="3"
                              ry="3"
                              width="100%"
                              height="120"
                            />
                          </ContentLoader>
                        ))
                      : userFriends?.map((x) => (
                          <div key={`${x._id}-${Date.now()}`}>
                            <div>
                              <Image
                                className="rounded"
                                src={x?.img?.url || "/users/default.svg"}
                                fill
                                alt={`user Image`}
                                onClick={(e) =>
                                  handleMenus(e, "user-Info", x?._id, {
                                    type: "user",
                                  })
                                }
                              />
                              <h4>
                                {x?.firstname} {""} {x?.lastname}
                              </h4>
                            </div>
                            <div className="btns-hold">
                              {!isMyProfile &&
                                userData &&
                                userData?._id !== x._id && (
                                  <button
                                    className={`main-button  ${
                                      actionLoading.includes(
                                        `send-friend-request-${x._id}`
                                      )
                                        ? "loading"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      const userId = userData?._id;
                                      const targetId = x?._id;
                                      const receivedRequests =
                                        x?.friendRequests?.received || [];

                                      if (!userId || !targetId) return;

                                      if (!receivedRequests.includes(userId)) {
                                        sendFriendRequest(targetId);
                                      } else {
                                        cancelFriendRequest(targetId);
                                      }
                                    }}
                                  >
                                    {x?.friendRequests?.received?.includes(
                                      userData?._id
                                    ) ? (
                                      <span>{"waiting accept"}</span>
                                    ) : (
                                      <IoMdPersonAdd />
                                    )}

                                    <div className="lds-dual-ring"></div>
                                  </button>
                                )}
                            </div>
                          </div>
                        ))}
                  </div>
                </>
              )}
            </>
          ) : currentSelectedData === "photos" ? (
            actionLoading.includes("profile-photos") ? (
              <div className="hold-photos">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div style={{ backgroundColor: "#ffffff", padding: "10px" }}>
                    <ContentLoader
                      width={`100%`}
                      height={`100%`}
                      speed={2}
                      viewBox="0 0 120 120"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      {/* Rounded rectangle for the image placeholder */}
                      <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="120"
                        height="120"
                      />
                    </ContentLoader>
                  </div>
                ))}
              </div>
            ) : (
              <Masonry
                columns={
                  screenSize === "large" ? 3 : screenSize === "small" ? 1 : 2
                }
                spacing={1}
              >
                {userAllPhotos?.map((photo, index) => (
                  <div
                    className="post-imgs-hold"
                    key={index}
                    onClick={() => {
                      const current = new URLSearchParams(
                        Array.from(searchParams.entries())
                      );
                      current.set("post", photo.postId);
                      router.replace(
                        `${pathname}?${current.toString()}`,
                        undefined,
                        { scroll: false }
                      );
                    }}
                  >
                    <img key={index} src={photo.url} alt="" />
                  </div>
                ))}
              </Masonry>
            )
          ) : currentSelectedData === "products" ? (
            <>
              <div className="grid-products">
                {["dep", "minP", "maxP", "availability", "category"].some(
                  (key) => filters[key]
                ) && (
                  <div className="top">
                    {screenSize === "small" && (
                      <button
                        className="main-button"
                        onClick={() => setMobileFilters(true)}
                      >
                        <IoGrid /> Filters
                      </button>
                    )}

                    <div className="active-filters">
                      <h4 className="filter-chip">Filters:</h4>
                      {filters.dep ? (
                        <div className="filter-chip">
                          {filters.dep}
                          <IoClose
                            onClick={() => handleFilterChange({ dep: null })}
                          />
                        </div>
                      ) : null}

                      {filters.minP ? (
                        <div className="filter-chip">
                          Min: {filters.minP}
                          <IoClose
                            onClick={() => handleFilterChange({ minP: null })}
                          />
                        </div>
                      ) : null}

                      {filters.maxP ? (
                        <div className="filter-chip">
                          Max: {filters.maxP}
                          <IoClose
                            onClick={() => handleFilterChange({ maxP: null })}
                          />
                        </div>
                      ) : null}

                      {filters.availability ? (
                        <div className="filter-chip">
                          {filters.availability === "inStock"
                            ? "In Stock"
                            : "Out of Stock"}
                          <IoClose
                            onClick={() =>
                              handleFilterChange({ availability: null })
                            }
                          />
                        </div>
                      ) : null}

                      {filters.category
                        ? filters.category.split(",").map((cat, index) => (
                            <div className="filter-chip" key={index}>
                              {decodeURIComponent(cat)}
                              <IoClose
                                onClick={() => {
                                  const newCategories = filters.category
                                    .split(",")
                                    .filter((c) => c !== cat);
                                  handleFilterChange({
                                    category:
                                      newCategories.length > 0
                                        ? newCategories.join(",")
                                        : null,
                                  });
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                    <div>
                      <span className="totalProducts">
                        {totalCount} products found
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className="products"
                  style={{
                    background: loading ? "white" : "",
                    padding: loading ? "10px" : "",
                  }}
                >
                  {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <ContentLoader
                          key={index}
                          speed={1}
                          width="100%"
                          height="100%"
                          viewBox="0 0 300 300"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        >
                          {/* Image Placeholder */}
                          <rect
                            x="0"
                            y="0"
                            rx="8"
                            ry="8"
                            width="100%"
                            height="68%"
                          />

                          {/* Name Placeholder */}
                          <rect
                            x="5"
                            y="212"
                            rx="2"
                            ry="2"
                            width="100%"
                            height="15"
                          />

                          {/* Price Placeholder */}
                          <rect
                            x="5"
                            y="235"
                            rx="4"
                            ry="2"
                            width="150"
                            height="10"
                          />
                          <rect
                            x="195"
                            y="235"
                            rx="4"
                            ry="2"
                            width="100"
                            height="10"
                          />

                          {/* User Info Placeholder */}
                          <circle cx="22" cy="280" r="20" />
                          <rect
                            x="50"
                            y="267"
                            rx="2"
                            ry="2"
                            width="100"
                            height="10"
                          />
                          <rect
                            x="50"
                            y="285"
                            rx="2"
                            ry="2"
                            width="50"
                            height="10"
                          />

                          {/* Social Icons Placeholder */}

                          {/* Discount Placeholder */}
                          <rect
                            x="250"
                            y="280"
                            rx="2"
                            ry="2"
                            width="50"
                            height="10"
                          />
                        </ContentLoader>
                      ))
                    : products.map((x) => (
                        <Product key={x._id} data={x} viewOwner={false} />
                      ))}
                </div>
                <ReactPaginate
                  pageCount={lastPage}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  breakLabel="..."
                  nextLabel="next >"
                  previousLabel="< prev"
                  pageLinkClassName="page-num"
                  previousLinkClassName="page-num btns"
                  nextLinkClassName="page-num btns"
                  containerClassName="pagination"
                  activeClassName="active"
                  forcePage={filters.page - 1} // Ensure the current page is shown
                  onPageChange={handlePageChange}
                  renderOnZeroPageCount={null}
                />
              </div>
            </>
          ) : (
            <ul className="about">
              <h4>{translations?.portfolio?.about}</h4>

              {activePortfolio?.info && (
                <>
                  {/* BIO */}
                  {activePortfolio?.info?.bio && (
                    <li style={{ display: "block" }}>
                      {activePortfolio.info.bio}
                    </li>
                  )}

                  {Object.entries(activePortfolio?.info || {})
                    .filter(([key]) => key !== "bio")
                    .map(([key, value], index) => {
                      const formattedValue =
                        key === "birthdate"
                          ? new Date(value).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : value;

                      return (
                        <li key={index}>
                          {key}:{" "}
                          {key === "website" ? (
                            <Link
                              href={
                                value.startsWith("http")
                                  ? value
                                  : `https://${value}`
                              }
                              target="_blank"
                            >
                              {value}
                            </Link>
                          ) : (
                            <span>{formattedValue}</span>
                          )}
                        </li>
                      );
                    })}
                </>
              )}
            </ul>
          )}
        </div>
      </div>
      <EditProfileForm editType={editType} setEditType={setEditType} />
    </div>
  );
}
