"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { messages, users, posts, products } from "@/utils/Data";
import { use } from "react";
import { DynamicMenusContext } from "@/Contexts/DynamicMenus";
import { MenusContext } from "@/Contexts/MenusContext";
import Post from "@/components/post/Post";
import Product from "@/components/shop/Product";
import MarketSideSection from "@/components/shop/MarketSideSection";
import ContentLoader from "react-content-loader";
import { useLanguage } from "@/Contexts/LanguageContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { FaCrown } from "react-icons/fa";
import "@/Styles/marketplace.css";
import "@/Styles/user.css";
import Slider from "@mui/material/Slider";

import { FaAngleRight, FaShoppingCart } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoSearch, IoClose } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { IoInformationCircleSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Page({ params }) {
  const { translations } = useLanguage();
  const { screenSize } = useContext(ScreenContext);

  const {
    setDataSwiperType,
    dataForSwiper,
    setDataForSwiper,
    setImgFocus,
    setImgIndex,
  } = useContext(MenusContext);

  const { handleMenus, settingMenu } = useContext(DynamicMenusContext);

  const { id } = use(params); // Unwrap the Promise
  const [productSearch, setProductSearch] = useState("");

  const mediaMsgs = messages.filter((msg) => msg.img);
  const [curentChat, setCurentChat] = useState({});
  const [currentSelectedData, setCurrentSelectedData] = useState("products");

  useEffect(() => {
    let currentChat = users.find((x) => x.id == id);
    setCurentChat(currentChat);
  }, [id]);

  const handleImageClick = (id, index) => {
    setDataSwiperType("msg");
    setImgFocus(id);
    setDataForSwiper(mediaMsgs);

    if (index === "") {
      const mediaIndex = dataForSwiper.findIndex((msg) => msg.id == id);
      setImgIndex(mediaIndex);
    } else {
      setImgIndex(index);
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0); // Adjust as needed
  }, []);

  let owner = {
    id: 1,
    name: "Ahmed mouhamed",
    img: "/users/user1.png",
  };
  let paragraph = `جروب "مليون مبرمج مصري" 👨‍💻

لكل طالب في مجال الحاسبات أو مهتم بعلم الكمبيوتر ساينس 💻، أو حتى مجرد متابع لكل جديد في عالم تكنولوجيا المعلومات والبرمجيات ✅

📌 هدفنا:
نساعد بعض من خلال نشر بوستات تحتوي على:
- كورسات مفيدة
- أساسيات البرمجة
- أساسيات لكل مجال تقني
- آخر أخبار التكنولوجيا
- أفضل البرامج والمواقع التعليمية

خليك متابع وشاركنا اللي تعرفه علشان كلنا نستفيد! 💡`;

  const [seeAllAbout, setSeeAllAbout] = useState(false);
  const [curentOpendSelectHolder, setCurentOpendSelectHolder] = useState();
  const Sections = [
    { id: 1, name: "men" }, // رجالي
    { id: 2, name: "women" }, // نسائي
    { id: 3, name: "kids" }, // أطفال
    { id: 4, name: "shoes" }, // أحذية
    { id: 5, name: "bags and accessories" }, // شنط واكسسوارات
    { id: 6, name: "watches" }, // ساعات
    { id: 7, name: "sunglasses" }, // نظارات
    { id: 8, name: "sportswear" }, // ملابس رياضية
    { id: 9, name: "underwear" }, // ملابس داخلية
    { id: 10, name: "jeans" }, // جينز
    { id: 11, name: "tshirts" }, // تيشيرتات
    { id: 12, name: "dresses" }, // فساتين
    { id: 13, name: "abayas" }, // عبايات
    { id: 14, name: "winter collection" }, // ملابس شتوية
  ];

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      setCurentOpendSelectHolder();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`portfolio marketPage`}>
      <div className="top">
        <div className="cover">
          <Image src={"/pagePaner.jpg"} alt="User Cover" fill />
          <div className="editICo">
            <MdModeEditOutline />
            {translations?.actions?.edit}
          </div>
        </div>
        <nav>
          <div className="top">
            <div className="leftHolder">
              <div className="userImg rounded">
                <Image
                  className="rounded"
                  src={curentChat?.img || "/users/default.png"}
                  alt="User Cover"
                  fill
                />
                <div className="editICo rounded">
                  <MdModeEditOutline />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="left-data">
                <h4>{curentChat?.name}</h4>
                {screenSize !== "small" && `-`}
                <h5>46K {translations?.portfolio?.followers}</h5>
              </div>
              <div className="right-btns">
                <button className={`main-button`}>
                  <IoMdPersonAdd />
                  {translations?.portfolio?.follow}
                </button>
                <button className={`main-button`}>
                  <AiFillMessage />
                  {translations?.portfolio?.message}
                </button>
              </div>
            </div>
          </div>
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
                      src={x.img || "/users/default.png"}
                      width={32}
                      height={32}
                      alt={`user Image`}
                    />
                  ))}
          </div>
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
              <button
                className={`main-button ${
                  currentSelectedData == "followers" ? "active" : ""
                }`}
                onClick={() => setCurrentSelectedData("followers")}
              >
                <HiUsers />
                {translations?.portfolio?.followers}
              </button>
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
              onClick={(e) => handleMenus(e, "settingMenu-page", id)}
            >
              <BsThreeDots />
            </button>
          </div>
        </nav>
      </div>

      <div className="bottom-holder">
        <div className="side-menu sideSection">
          {currentSelectedData !== "about" &&
            currentSelectedData !== "products" && (
              <ul className="about">
                <div className="top">
                  <h4>{translations?.portfolio?.about}</h4>
                </div>
                <li style={{ display: "block" }}>
                  {seeAllAbout ? paragraph : `${paragraph.slice(0, 165)}... `}
                  {paragraph.length > 165 && (
                    <span
                      onClick={() => setSeeAllAbout(!seeAllAbout)}
                      className={`seeMore`}
                    >
                      {seeAllAbout ? "see less" : "see more"}
                    </span>
                  )}
                </li>
                <hr style={{ margin: "5px 0" }} />
                <li>
                  {translations?.portfolio?.page_created_at}:{" "}
                  <span>19-12-2003</span>
                </li>
                <li>
                  {translations?.portfolio?.status}:{" "}
                  <span>
                    {false
                      ? translations?.portfolio?.private_page
                      : translations?.portfolio?.public_page}
                  </span>
                </li>
              </ul>
            )}
          {currentSelectedData !== "products" && (
            <div className="images">
              <div className="top">
                <h4> {translations?.portfolio?.products}</h4>
                {mediaMsgs?.length > 6 && (
                  <button onClick={() => setCurrentSelectedData("products")}>
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
          {currentSelectedData === "products" && (
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

              <div className="Filter-Holder forCat">
                <h4 className="filter-title">
                  {translations?.market_place?.filter_by_categories}
                </h4>
                <ul>
                  {Sections.map((x, index) => {
                    return (
                      <li
                        className={`${
                          selectedCat.includes(x.id) ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => {
                          setSelectedCat((prev) =>
                            prev.includes(x.id)
                              ? prev.filter((id) => id !== x.id)
                              : [...prev, x.id]
                          );
                        }}
                      >
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            className="input"
                            checked={selectedCat.includes(x.id) ? true : false}
                          />
                          <span className="custom-checkbox"></span>
                        </label>
                        {x.name}
                      </li>
                    );
                  })}
                </ul>
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
            <div className="posts-holder">
              {loading
                ? Array.from({ length: 2 }).map((_, index) => (
                    <div style={{ maxWidth: "700px" }}>
                      <ContentLoader
                        className="skeleton skeleton-post"
                        width={600}
                        height={350}
                        speed={5}
                        viewBox="0 0 600 350"
                        backgroundColor="#E8E8E8"
                        foregroundColor="#D5D5D5"
                      >
                        {/* Profile Picture */}
                        <circle cx="35" cy="35" r="20" />
                        {/* Name & Timestamp */}
                        <rect
                          x="65"
                          y="20"
                          rx="5"
                          ry="5"
                          width="120"
                          height="12"
                        />
                        <rect
                          x="65"
                          y="38"
                          rx="5"
                          ry="5"
                          width="100"
                          height="10"
                        />
                        {/* Post Text */}
                        <rect
                          x="20"
                          y="70"
                          rx="5"
                          ry="5"
                          width="93%"
                          height="10"
                        />
                        <rect
                          x="20"
                          y="90"
                          rx="5"
                          ry="5"
                          width="500"
                          height="10"
                        />
                        <rect
                          x="20"
                          y="110"
                          rx="5"
                          ry="5"
                          width="520"
                          height="10"
                        />
                        {/* Image Placeholder */}
                        <rect
                          x="20"
                          y="140"
                          rx="5"
                          ry="5"
                          width="93%"
                          height="150"
                        />
                        {/* Footer (Likes, Comments, Shares) */}
                        <rect
                          x="20"
                          y="310"
                          rx="5"
                          ry="5"
                          width="30"
                          height="10"
                        />{" "}
                        {/* Like Icon */}
                        <rect
                          x="60"
                          y="310"
                          rx="5"
                          ry="5"
                          width="20"
                          height="10"
                        />{" "}
                        {/* Like Count */}
                        <rect
                          x="515"
                          y="310"
                          rx="5"
                          ry="5"
                          width="30"
                          height="10"
                        />{" "}
                        {/* Comment Icon */}
                        <rect
                          x="555"
                          y="310"
                          rx="5"
                          ry="5"
                          width="20"
                          height="10"
                        />{" "}
                        {/* Comment Count */}
                      </ContentLoader>
                    </div>
                  ))
                : posts.map((data, index) => <Post data={data} key={index} />)}
            </div>
          ) : currentSelectedData === "followers" ? (
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
                        src={x.img || "/users/default.png"}
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
            <div className="about">
              <div className="holder">
                <h4>{translations?.portfolio?.about}</h4>
                <ul>
                  <li style={{ display: "block", marginBottom: "10px" }}>
                    {paragraph}
                  </li>
                  <li>
                    {translations?.portfolio?.page_created_at}:{" "}
                    <span>19-12-2003</span>
                  </li>
                  <li>
                    {translations?.portfolio?.status}:{" "}
                    <span>
                      {false
                        ? translations?.portfolio?.private_page
                        : translations?.portfolio?.public_page}
                    </span>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="holder friends">
                <h4>{translations?.portfolio?.creator_and_admins}</h4>
                <div className="hold">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <ContentLoader
                        key={index}
                        width={120}
                        height={120}
                        speed={4}
                        viewBox="0 0 120 120"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="3"
                          ry="3"
                          width="100%"
                          height="120"
                        />
                      </ContentLoader>
                    ))
                  ) : (
                    <>
                      <div
                        className="chat owner"
                        onClick={(e) => handleMenus(e, "user-Info", owner.id)}
                      >
                        <Image
                          className="rounded"
                          src={owner.img || "/users/default.png"}
                          fill
                          alt="user Image"
                        />
                        <div className="name-lastmessage">
                          <h4>{owner.name}</h4>
                          <FaCrown />
                        </div>
                      </div>

                      {users?.slice(0, 5).map((x) => (
                        <div
                          key={x.id}
                          className="chat"
                          onClick={(e) => handleMenus(e, "user-Info", x.id)}
                        >
                          <Image
                            className="rounded"
                            src={x.img || "/users/default.png"}
                            fill
                            alt="user Image"
                          />
                          <div className="name-lastmessage">
                            <h4>{x.name}</h4>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
