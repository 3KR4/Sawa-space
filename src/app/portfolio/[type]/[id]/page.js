"use client";
import "@/Styles/user.css";
import "@/Styles/forms.css";
import "@/Styles/marketplace.css";
import React, { useState, use, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import CutText from "@/utils/CutText";
import { messages, users, products } from "@/utils/Data";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import Post from "@/components/post/Post";
import ContentLoader from "react-content-loader";
import { useLanguage } from "@/Contexts/LanguageContext";

import PostsHolder from "@/components/post/PostsHolder";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { userService } from "@/services/api/userService";
import { pageService } from "@/services/api/pageService";
import Slider from "@mui/material/Slider";
import Product from "@/components/shop/Product";
import ReactPaginate from "react-paginate";

import { FaAngleRight, FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import {
  MdModeEditOutline,
  MdEdit,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd, IoMdPhotos } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { IoInformationCircleSharp, IoSearch } from "react-icons/io5";

export default function Portfolio({ params }) {
  const { translations } = useLanguage();
  const { addNotification } = useNotification();
  const { userData, userPage, screenSize } = useContext(ScreenContext);
  const { setOpenImgForm } = useContext(MenusContext);

  const { handleMenus } = useContext(DynamicMenusContext);
  const { id, type } = use(params);

  const isMyProfile = type === "user" ? userData?._id === id : null;
  const isMyPage = type === "page" ? userPage?._id === id : null;

  const [currentPortfolio, setCurrentPortfolio] = useState({});
  const [currentSelectedData, setCurrentSelectedData] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [seeAllAbout, setSeeAllAbout] = useState(false);
  const [editType, setEditType] = useState(null);
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    const fetchPortfolioData = async () => {
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
          setLoading(false);
        }

        setCurrentPortfolio(response.data.data);
      } catch (err) {
        console.error("Error fetching posts", err);
        addNotification({
          type: "error",
          message: "Failed to load user data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    const fetchPortfolioPhotos = async () => {
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
          setLoading(false);
        }

        setCurrentPortfolio(response.data.data);
      } catch (err) {
        console.error("Error fetching posts", err);
        addNotification({
          type: "error",
          message: "Failed to load user data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioPhotos();
    fetchPortfolioData();
  }, [id, type]);

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

  const [selectedCat, setSelectedCat] = useState([]);
  const [availability, setAvailability] = useState("");
  const [sortType, setSortType] = useState("default");
  const [pageSize, setPageSize] = useState(12);
  const [priceRangevalue, setPriceRangevalue] = useState([10, 100000]);
  const [startEditCats, setStartEditCats] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [originalCats, setOriginalCats] = useState([]);

  const handleAddMoreCats = () => {
    const allFilled = currentPortfolio.category?.every(
      (cat) => cat.trim() !== ""
    );
    if (allFilled) {
      setCurrentPortfolio((prev) => ({
        ...prev,
        category: [...prev.category, ""],
      }));
    }
  };

  const handleUpdateCategory = async () => {
    try {
      setLoadingCategory(true);

      const cleanedCategories = currentPortfolio.category.filter(
        (cat) => cat.trim() !== ""
      );

      await pageService.updateCategories({
        category: cleanedCategories,
      });

      setCurrentPortfolio((prev) => ({
        ...prev,
        category: cleanedCategories, // update state without empty strings
      }));

      addNotification({
        type: "success",
        message: "Categories updated successfully.",
      });

      setStartEditCats(false);
    } catch (err) {
      console.error("Failed to update categories:", err);
      addNotification({
        type: "error",
        message: "Failed to update categories. Try again.",
      });
    } finally {
      setLoadingCategory(false);
    }
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
                {type === "user" ? (
                  <h5>
                    46 {translations?.portfolio?.friends} - 10{" "}
                    {translations?.portfolio?.mutual}
                  </h5>
                ) : (
                  <h5>46K {translations?.portfolio?.followers}</h5>
                )}
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
                ) : type === "page" ? (
                  <button className="main-button">
                    <IoMdPersonAdd />
                    {translations?.portfolio?.follow}
                  </button>
                ) : (
                  <>
                    <button className="main-button">
                      <IoMdPersonAdd />
                      {translations?.actions?.add_friend}
                    </button>
                    <button className="main-button">
                      <AiFillMessage />
                      {translations?.portfolio?.message}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {type === "page" && (
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
          )}
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

              {type === "page" ? (
                <button
                  className={`main-button ${
                    currentSelectedData == "followers" ? "active" : ""
                  }`}
                  onClick={() => setCurrentSelectedData("followers")}
                >
                  <HiUsers />
                  {translations?.portfolio?.followers}
                </button>
              ) : (
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
              <button
                className={`main-button ${
                  currentSelectedData == "products" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("products")}
              >
                <FaShoppingCart />
                {translations?.portfolio?.products}
              </button>

              <button
                className={`main-button ${
                  currentSelectedData == "photos" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("photos")}
              >
                <IoMdPhotos />
                {translations?.portfolio?.photos}
              </button>
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
            <button
              className={`main-button`}
              onClick={(e) =>
                handleMenus(
                  e,
                  type === "user" ? "settingMenu-user" : "settingMenu-page",
                  id
                )
              }
            >
              <BsThreeDots />
            </button>
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
              {currentSelectedData !== "photos" && (
                <div className="images">
                  {/* <div className="top">
                <h4> {translations?.portfolio?.photos}</h4>
                {mediaMsgs?.length > 6 && (
                  <button onClick={() => setCurrentSelectedData("photos")}>
                    {translations?.portfolio?.see_all}{" "}
                    {translations?.portfolio?.photos} <FaAngleRight />
                  </button>
                )}
              </div>
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
                  : mediaMsgs.slice(0, 6).map((x, index) => (
                      <Image
                        key={index}
                        src={x.img}
                        alt=""
                        fill
                        onClick={() => {
                          handleImageClick(x.id, index);
                        }}
                      />
                    ))}
              </div> */}
                </div>
              )}
              {currentSelectedData !== "products" && type === "page" && (
                <div className="images">
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
              {type !== "page" && currentSelectedData !== "friends" && (
                <div className="holder friends">
                  <div className="top">
                    <h4>
                      {type === "user"
                        ? translations?.sidechats?.friends
                        : translations?.portfolio?.followers}
                    </h4>
                    {users?.length > 6 && (
                      <button onClick={() => setCurrentSelectedData("friends")}>
                        {translations?.portfolio?.see_all}{" "}
                        {translations?.sidechats?.friends} <FaAngleRight />
                      </button>
                    )}
                  </div>
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
                      : users?.slice(0, 6).map((x) => (
                          <div
                            key={x.id}
                            className="chat"
                            onClick={(e) => handleMenus(e, "user-Info", x.id)}
                          >
                            <Image
                              className="rounded"
                              src={x.img || "/users/default.svg"}
                              fill
                              alt={`user Image`}
                            />
                            <div className="name-lastmessage">
                              <h4>{x.name}</h4>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="Filter-Holder forCat">
                <h4 className="filter-title">
                  {translations?.market_place?.availability}
                </h4>
                <ul>
                  <li
                    className={`${availability === "inStock" ? "active" : ""}`}
                    onClick={() => {
                      setAvailability((perv) =>
                        perv === "inStock" ? "" : "inStock"
                      );
                    }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        className="input"
                        checked={availability === "inStock" ? true : false}
                      />
                      <span className="custom-checkbox"></span>
                    </label>
                    {translations?.market_place?.in_stock}
                  </li>
                  <li
                    className={`${
                      availability === "outOfStock" ? "active" : ""
                    }`}
                    onClick={() => {
                      setAvailability((perv) =>
                        perv === "outOfStock" ? "" : "outOfStock"
                      );
                    }}
                  >
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        className="input"
                        checked={availability === "outOfStock" ? true : false}
                      />
                      <span className="custom-checkbox"></span>
                    </label>
                    {translations?.market_place?.out_of_stock}
                  </li>
                </ul>
              </div>
              <div className="Filter-Holder forPrice">
                <h4 className="filter-title">
                  {translations?.market_place?.filter_by_price}
                </h4>
                <p className="filter-paragraph">
                  {translations?.market_place?.enter_min_and_max_price}
                </p>
                <div className="price-input">
                  <div className="field">
                    <span>{translations?.market_place?.min}</span>
                    <h3>{priceRangevalue[0]}</h3>
                  </div>
                  <div className="separator">-</div>
                  <div className="field">
                    <h3>{priceRangevalue[1]}</h3>
                    <span>{translations?.market_place?.max}</span>
                  </div>
                </div>
                <Slider
                  className="priceSlider"
                  getAriaLabel={() => "Minimum distance shift"}
                  value={priceRangevalue}
                  // onChange={handlePriceRangeChange}
                  min={10}
                  max={10000}
                  sx={{
                    "& .MuiSlider-thumb": {
                      width: 15,
                      height: 15,
                    },
                    "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible":
                      {
                        boxShadow: "0px 0px 0px 7px rgb(94 94 94 / 16%)",
                      },
                  }}
                />
              </div>

              <div className="Filter-Holder forCat cats">
                <h4 className="filter-title">
                  {translations?.market_place?.filter_by_categories}
                  {isMyPage &&
                    (startEditCats ? (
                      <button
                        type="button"
                        className="main-button add-btn"
                        onClick={handleAddMoreCats}
                      >
                        <FaPlus />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="main-button add-btn"
                        onClick={() => {
                          setOriginalCats(currentPortfolio.category);
                          setStartEditCats(true);
                        }}
                      >
                        <MdEdit />
                      </button>
                    ))}
                </h4>
                <ul>
                  {currentPortfolio?.category?.map((cat, index) => (
                    <li
                      key={index}
                      className={`ellipsisText ${
                        selectedCat.includes(cat) && !startEditCats
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        if (!startEditCats) {
                          setSelectedCat((prev) =>
                            prev.includes(cat)
                              ? prev.filter((c) => c !== cat)
                              : [...prev, cat]
                          );
                        }
                      }}
                    >
                      {!startEditCats ? (
                        <>
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              className="input"
                              checked={selectedCat.includes(cat)}
                              readOnly
                            />
                            <span className="custom-checkbox"></span>
                          </label>
                          {cat}
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={cat}
                            onChange={(e) => {
                              const newCats = [...currentPortfolio.category];
                              newCats[index] = e.target.value;
                              setCurrentPortfolio((prev) => ({
                                ...prev,
                                category: newCats,
                              }));
                            }}
                          />
                          <FaTrashAlt
                            onClick={() =>
                              setCurrentPortfolio((prev) => ({
                                ...prev,
                                category: prev.category?.filter(
                                  (_, i) => i !== index
                                ),
                              }))
                            }
                          />
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                {startEditCats && (
                  <div className="btns rowHolder actions">
                    <button
                      type="button"
                      className="main-button secondary"
                      onClick={() => {
                        setCurrentPortfolio((prev) => ({
                          ...prev,
                          category: originalCats,
                        }));
                        setStartEditCats(false);
                      }}
                    >
                      <span>{translations?.actions?.cancel}</span>
                    </button>

                    <button
                      className={`main-button ${
                        loadingCategory ? "loading" : ""
                      }`}
                      onClick={handleUpdateCategory}
                    >
                      <div className="lds-dual-ring"></div>
                      <span>{translations?.actions?.save_changes}</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="bigSection">
          {currentSelectedData !== "about" &&
            (currentSelectedData !== "products" ? (
              <div className="actions">
                <h4>
                  {translations?.portfolio?.all}
                  {` `}
                  {currentSelectedData === "friends"
                    ? translations?.sidechats?.[currentSelectedData]
                    : translations?.portfolio?.[currentSelectedData] || ""}
                </h4>
                <button>Sort by Time</button>
              </div>
            ) : (
              <div className="actions">
                <div
                  className="search-holderr"
                  style={{
                    padding:
                      productSearch.length !== 0 ? "0 0 0 10px" : "0 10px",
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
                  <div
                    className="select-holder"
                    onClick={() =>
                      setCurentOpendSelectHolder((prev) =>
                        prev == 1 ? null : 1
                      )
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
                  </div>
                  <div
                    className="select-holder"
                    onClick={() =>
                      setCurentOpendSelectHolder((prev) =>
                        prev == 2 ? null : 2
                      )
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
            ))}

          {currentSelectedData === "posts" ? (
            <PostsHolder type={type} id={id} />
          ) : currentSelectedData === "friends" ||
            currentSelectedData === "followers" ? (
            <div className="friends">
              {loading
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
                : users?.map((x) => (
                    <div
                      key={x.id}
                      onClick={(e) => handleMenus(e, "user-Info", x.id)}
                    >
                      <Image
                        className="rounded"
                        src={x.img || "/users/default.svg"}
                        fill
                        alt={`user Image`}
                      />
                      <div>
                        <h4>{x.name}</h4>
                        <p>{x.bio}</p>
                      </div>
                    </div>
                  ))}
            </div>
          ) : currentSelectedData === "photos" ? (
            <div className="photos">
              {/* {loading
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
                : mediaMsgs.map((x, index) => (
                    <Image
                      key={index}
                      src={x.img}
                      alt=""
                      fill
                      onClick={() => handleImageClick(x.id, index)}
                    />
                  ))} */}
            </div>
          ) : currentSelectedData === "products" ? (
            <>
              <div className="photos grid-products">
                {loading
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
                  : products.map((x, index) => (
                      <Product key={index} data={x} type="in_seller_page" />
                    ))}
              </div>
              <ReactPaginate
                pageCount={pageSize}
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
                onPageChange={(e) => setPage(e.selected + 1)}
                renderOnZeroPageCount={null}
              />
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
