import React from "react";
import { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { messages, posts } from "@/Data";
import "swiper/css";
import "../app/Css/chat.css";
import { DynamicMenusContext } from "@/app/contexts/DynamicMenus";
import { InputActionsContext } from "@/app/contexts/InputActionsContext";
import { MenusContext } from "@/app/contexts/MenusContext";
import { ScreenContext } from "@/app/contexts/ScreenContext";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/Comment";
import ActionsBtns from "@/components/ActionsBtns";
import TypeComment from "@/components/TypeComment";

import { PiShareFat } from "react-icons/pi";
import { FaRegComments } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

import { IoClose } from "react-icons/io5";

function ImagesSwiper() {
  const {
    dataSwiperType,
    dataForSwiper,
    imgFocus,
    setImgFocus,
    imgIndex,
    setImgIndex,
    closeImgHolderRef,
  } = useContext(MenusContext);

  const {
    handleMenus,
    setOpenUsersReact,
  } = useContext(DynamicMenusContext);
  const {
    setMessageText,
  } = useContext(InputActionsContext);
  const {
    pathname,
    screenSize,
  } = useContext(ScreenContext);

  const [swiperRef, setSwiperRef] = useState(null);
  const data =
    dataSwiperType === "msg" && messages.find((msg) => msg.id === imgFocus);

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(imgIndex);
    }
  }, [imgIndex, swiperRef]);

  const handleImageClick = (id, index) => {
    setImgFocus(id);
    if (index === "") {
      const mediaIndex = mediaMsgs.findIndex((msg) => msg.id == id);
      swiperRef.slideTo(mediaIndex, 500);
      setImgIndex(mediaIndex);
    } else {
      swiperRef.slideTo(index, 500);
      setImgIndex(index);
    }
  };

  return (
    <div
      ref={closeImgHolderRef}
      className={`focusedMsg ${!pathname.includes("chat") ? "forPosts" : ""} ${
        imgFocus ? "active" : ""
      } ${dataSwiperType}`}
    >
      {dataSwiperType === "post" ? (
        <div className={`post`}>
          {screenSize === "large" && (
            <div className="left-img">
              <div className="hold">
                {dataForSwiper?.img && (
                  <img
                    src={
                      dataForSwiper?.img[
                        dataForSwiper?.img.length === 1 ? 0 : imgIndex
                      ]
                    }
                    alt={
                      dataForSwiper?.user
                        ? `${dataForSwiper?.user.name}'s image`
                        : "User image"
                    }
                  />
                )}
              </div>
              {dataForSwiper?.img?.length > 1 && (
                <Swiper
                  onSwiper={setSwiperRef}
                  spaceBetween={5}
                  slidesPerView={"auto"}
                  loop={false}
                  centeredSlides={true}
                >
                  {dataForSwiper.img.map((x, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => {
                        handleImageClick(dataForSwiper.id, index);
                        console.log(index);
                      }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={x}
                        alt={`Slide ${index}`}
                        className={`${imgIndex == index ? "active" : ""}`}
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}
          <div className="right-info">
            <div className="top">
              <div className="left">
                <Image
                  src={dataForSwiper?.user?.img || "/users/default.png"}
                  alt={dataForSwiper?.user?.name}
                  width={40}
                  height={40}
                  className={`rounded`}
                  onClick={(e) => handleMenus(e, "userInfo", data?.id)}
                />
                <div className="info">
                  <h5>{dataForSwiper?.user?.name}</h5>
                  <span>July 19 2018, 19:42pm</span>
                </div>
              </div>
              <div className="icons-holder">
                <HiDotsVertical
                  onClick={(e) => {
                    handleMenus(e, "postSettings", data.id);
                    setCurentUserId(dataForSwiper?.id);
                  }}
                />
                <IoClose
                  className="close closeMenu"
                  onClick={() => {
                    setImgFocus(null);
                    setMessageText("");
                  }}
                />
              </div>
            </div>
            <div className="bottom">
              {dataForSwiper?.reacts?.count !== 0 && (
                <div
                  className="left emojesCounter"
                  onClick={(e) => {
                    setOpenUsersReact("post");
                    handleMenus(e, "usersReact", dataForSwiper.id);
                  }}
                >
                  {dataForSwiper?.reacts?.topUseage.map((x, index) => (
                    <p key={index}>{x}</p>
                  ))}
                  <p>{dataForSwiper?.reacts?.count}</p>
                </div>
              )}

              {screenSize !== "small" && <ActionsBtns id={dataForSwiper.id} />}

              <div className="right">
                <div>
                  <PiShareFat />
                  {dataForSwiper?.shareCount}
                </div>
                <div>
                  <FaRegComment />
                  {dataForSwiper?.comments?.count}
                </div>
              </div>
            </div>
            {screenSize !== "large" && (
              <div className="left-img">
                <div className="hold">
                  {dataForSwiper?.img && (
                    <img
                      src={
                        dataForSwiper?.img[
                          dataForSwiper?.img.length === 1 ? 0 : imgIndex
                        ]
                      }
                      alt={
                        dataForSwiper?.user
                          ? `${dataForSwiper?.user?.name}'s image`
                          : "User image"
                      }
                    />
                  )}
                </div>
                {dataForSwiper?.img?.length > 1 && (
                  <Swiper
                    onSwiper={setSwiperRef}
                    spaceBetween={5}
                    slidesPerView={"auto"}
                    loop={false}
                    centeredSlides={true}
                  >
                    {dataForSwiper.img.map((x, index) => (
                      <SwiperSlide
                        key={index}
                        onClick={() => {
                          handleImageClick(dataForSwiper.id, index);
                          console.log(index);
                        }}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          src={x}
                          alt={`Slide ${index}`}
                          className={`${imgIndex == index ? "active" : ""}`}
                          style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            )}

            <div className="middle">
            {dataForSwiper.link && (
              <div className="Links">
                {dataForSwiper?.link?.map((x, index) => (
                  <div key={index}>
                    {dataForSwiper?.link.length === 1 ? null : `${index + 1} -`}
                    <Link key={index} href={x}>
                      {x}
                    </Link>
                  </div>
                ))}
              </div>
            )}
              {dataForSwiper?.paragraph && <p>{dataForSwiper?.paragraph}</p>}

              {dataForSwiper.mentions.length > 0 && (
              <div className="mentions">
                <h5>{dataForSwiper.user.name} mention</h5>
                {dataForSwiper.mentions?.map((x, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleMenus(e, "userInfo", x.userId)}
                  >
                    @{x.userName}
                  </button>
                ))}
              </div>
            )}

              {screenSize === "small" && <ActionsBtns id={dataForSwiper.id} />}

              <div className="comments">
                <div className="topHolderComments">
                  <div className="top">
                    <h3>Comments ({dataForSwiper?.comments?.count})</h3>
                  </div>
                  <div className="holder">
                    {dataForSwiper?.comments &&
                    Array.isArray(dataForSwiper?.comments?.allComments) &&
                    dataForSwiper?.comments?.allComments?.length > 0 ? (
                      dataForSwiper?.comments?.allComments.map(
                        (comment, index) => (
                          <Comment key={index} data={comment} />
                        )
                      )
                    ) : (
                      <div className="noCommentsYet">
                        <FaRegComments />
                        <h4>Nothing in here yet</h4>
                        <p>Be the first to post a comment.</p>
                      </div>
                    )}
                  </div>
                </div>

                <TypeComment id={dataForSwiper.id} />
              </div>
            </div>
          </div>
        </div>
      ) : dataSwiperType === "msg" ? (
        <>
          <div className="hold">
            {imgFocus && (
              <IoClose
                className="close closeMenu"
                onClick={() => setImgFocus(null)}
              />
            )}
            {data?.user !== "Bob" && <h5>{data?.user}</h5>}
            {data?.img && (
              <img
                src={data?.img}
                alt={data?.user ? `${data?.user}'s image` : "User image"}
              />
            )}
            {data?.message && <p>{data?.message}</p>}
          </div>
          {dataForSwiper?.length > 1 && (
            <Swiper
              onSwiper={setSwiperRef}
              spaceBetween={5}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={false}
            >
              {dataForSwiper.map((x, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => handleImageClick(x.id, index)}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={x.img}
                    alt={`Slide ${index}`}
                    className={`${imgFocus == x.id ? "active" : ""}`}
                    style={{
                      maxWidth: "90%",
                      maxHeight: "90%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      ) : (
        <div className="hold OneImg">
          {imgFocus && (
            <IoClose
              className="close closeMenu"
              onClick={() => setImgFocus(null)}
            />
          )}
          {imgFocus?.name !== "Bob" && <h5>{imgFocus?.name}</h5>}
          {imgFocus?.img && (
            <img
              src={imgFocus?.img}
              alt={imgFocus?.name ? `${imgFocus?.name}'s image` : "User image"}
            />
          )}
          {imgFocus?.paragraph && <p>{imgFocus?.paragraph}</p>}
        </div>
      )}
    </div>
  );
}

export default ImagesSwiper;
