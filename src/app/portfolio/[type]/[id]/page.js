"use client";
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
import "@/Styles/user.css";
import "@/Styles/forms.css";
import PostsHolder from "@/components/post/PostsHolder";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useNotification } from "@/Contexts/NotificationContext";
import { userService } from "@/services/api/userService";
import { pageService } from "@/services/api/pageService";

import { FaAngleRight, FaShoppingCart } from "react-icons/fa";
import { MdModeEditOutline, MdEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { IoMdPhotos } from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";

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
    fetchPortfolioData();
  }, [id, type]);

  console.log(currentPortfolio);

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
        {currentSelectedData !== "products" && (
          <div className="side-menu sideSection">
            {currentSelectedData !== "about" && (
              <ul className="about">
                <h4>{translations?.portfolio?.about}</h4>

                {currentPortfolio?.info && (
                  <>
                    {type === "page"
                      ? () => {
                          const bioItem = currentPortfolio?.info?.bio;
                          if (!bioItem) return null;

                          return (
                            <li style={{ display: "block" }}>
                              {seeAllAbout
                                ? bioItem
                                : bioItem.length > 165
                                ? `${bioItem.slice(0, 165)}... `
                                : bioItem}

                              {bioItem.length > 165 && (
                                <span
                                  onClick={() => setSeeAllAbout(!seeAllAbout)}
                                  className="seeMore"
                                >
                                  {seeAllAbout ? "see less" : "see more"}
                                </span>
                              )}
                            </li>
                          );
                        }
                      : currentPortfolio?.info?.bio && (
                          <li style={{ display: "block" }}>
                            {seeAllAbout
                              ? currentPortfolio?.info?.bio
                              : `${currentPortfolio?.info?.bio.slice(
                                  0,
                                  165
                                )}... `}

                            {currentPortfolio?.info?.bio.length > 165 && (
                              <span
                                onClick={() => setSeeAllAbout(!seeAllAbout)}
                                className="seeMore"
                              >
                                {seeAllAbout ? "see less" : "see more"}
                              </span>
                            )}
                          </li>
                        )}
                    {/* OTHER INFO */}
                    {type === "user" && (
                      <>
                        {currentPortfolio?.info?.birthDate && (
                          <li>
                            {translations?.portfolio?.birthdate}:{" "}
                            <span>
                              {new Date(
                                currentPortfolio?.info?.birthDate
                              ).toLocaleDateString("en-GB")}
                            </span>
                          </li>
                        )}

                        {currentPortfolio?.info?.region && (
                          <li>
                            {translations?.portfolio?.region}:{" "}
                            <span>{currentPortfolio?.info?.region}</span>
                          </li>
                        )}

                        {currentPortfolio?.info?.current_location && (
                          <li>
                            {translations?.portfolio?.current_location}:{" "}
                            <span>
                              {currentPortfolio?.info?.current_location}
                            </span>
                          </li>
                        )}

                        {currentPortfolio?.info?.work && (
                          <li>
                            {translations?.portfolio?.work}:{" "}
                            <span>{currentPortfolio?.info?.work}</span>
                          </li>
                        )}

                        {currentPortfolio?.info?.college && (
                          <li>
                            {translations?.portfolio?.college}:{" "}
                            <span>{currentPortfolio?.info?.college}</span>
                          </li>
                        )}

                        {currentPortfolio?.info?.languages && (
                          <li>
                            {translations?.portfolio?.speaking_languages}:{" "}
                            <span>{currentPortfolio?.info?.languages}</span>
                          </li>
                        )}
                      </>
                    )}
                    {type === "page" &&
                      Object.entries(currentPortfolio?.info || {})
                        .filter(([key]) => key !== "bio")
                        .map(([key, value], index) => (
                          <li key={index}>
                            {key}:{" "}
                            {key === "website" ? (
                              <Link href={value}>{value}</Link>
                            ) : (
                              <span>{value}</span>
                            )}
                          </li>
                        ))}
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
            {currentSelectedData !== "products" && (
              <div className="images">
                <div className="top">
                  <h4> {translations?.portfolio?.products}</h4>
                  {products?.length > 6 && (
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
          </div>
        )}

        <div className="bigSection">
          {currentSelectedData !== "about" && (
            <div className="actions">
              <h4>
                {translations?.portfolio?.all}{" "}
                {currentSelectedData === "friends"
                  ? translations?.sidechats?.[currentSelectedData]
                  : translations?.portfolio?.[currentSelectedData] || ""}
              </h4>
              <button>Sort by Time</button>
            </div>
          )}
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
          ) : (
            <ul className="about">
              <h4>{translations?.portfolio?.about}</h4>

              {(currentPortfolio?.info?.bio ||
                currentPortfolio?.info?.find((x) => x.key === "bio")) &&
                (type === "page" ? (
                  <pre style={{ display: "block" }}>
                    {currentPortfolio?.info?.bio}
                  </pre>
                ) : (
                  <pre style={{ display: "block" }}>
                    {currentPortfolio?.info?.bio}
                  </pre>
                ))}

              {type === "user" && (
                <>
                  {currentPortfolio?.info?.birthDate && (
                    <li>
                      {translations?.portfolio?.birthdate}:{" "}
                      <span>
                        {new Date(
                          currentPortfolio?.info?.birthDate
                        ).toLocaleDateString("en-GB")}
                      </span>
                    </li>
                  )}

                  {currentPortfolio?.info?.region && (
                    <li>
                      {translations?.portfolio?.region}:{" "}
                      <span>{currentPortfolio?.info?.region}</span>
                    </li>
                  )}

                  {currentPortfolio?.info?.current_location && (
                    <li>
                      {translations?.portfolio?.current_location}:{" "}
                      <span>{currentPortfolio?.info?.current_location}</span>
                    </li>
                  )}

                  {currentPortfolio?.info?.work && (
                    <li>
                      {translations?.portfolio?.work}:{" "}
                      <span>{currentPortfolio?.info?.work}</span>
                    </li>
                  )}

                  {currentPortfolio?.info?.college && (
                    <li>
                      {translations?.portfolio?.college}:{" "}
                      <span>{currentPortfolio?.info?.college}</span>
                    </li>
                  )}

                  {currentPortfolio?.info?.languages && (
                    <li>
                      {translations?.portfolio?.speaking_languages}:{" "}
                      <span>{currentPortfolio?.info?.languages}</span>
                    </li>
                  )}
                </>
              )}

              {type === "page" &&
                Object.entries(currentPortfolio?.info || {})
                  .filter(([key]) => key !== "bio")
                  .map(([key, value], index) => (
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
                        <span>{value}</span>
                      )}
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
      <EditProfileForm editType={editType} setEditType={setEditType} />
    </div>
  );
}
