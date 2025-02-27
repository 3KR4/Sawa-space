import React from "react";
import { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { messages, posts } from "@/Data";
import "swiper/css";
import "../app/Css/chat.css";
import { AllContext } from "@/app/Context";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/Comment";

import { IoLink } from "react-icons/io5";
import { PiShareFat } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import {
  MdOutlineAddReaction,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { IoClose, IoCopy } from "react-icons/io5";

function ImagesSwiper() {
  const {
    dataSwiperType,
    dataForSwiper,
    imgFocus,
    setImgFocus,
    imgIndex,
    setImgIndex,
    closeImgHolderRef,
  } = useContext(AllContext);

  const [swiperRef, setSwiperRef] = useState(null);

  const data =
    dataSwiperType === "msg"
      ? messages.find((msg) => msg.id === imgFocus)
      : posts.find((post) => post.id === imgFocus);


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

  console.log(data);
  console.log(dataForSwiper);
  

  return (
    <div
      ref={closeImgHolderRef}
      className={`focusedMsg ${imgFocus && "active"} ${dataSwiperType}`}
    >
      {dataSwiperType === "post" ? (
        <div className={`post`}>

          <div className="left-img">
          <div className="hold">
            {data?.img && (
              <img
                src={dataForSwiper?.img[dataForSwiper?.img.length === 1 ? 0 : imgIndex]}
                alt={data?.user ? `${data?.user.name}'s image` : "User image"}
              />
            )}
          </div>
          {dataForSwiper?.img?.length > 1 && (
            <Swiper
              onSwiper={setSwiperRef}
              spaceBetween={5}
              slidesPerView={"auto"}
              centeredSlides={true}
              loop={false}
            >
              {dataForSwiper.img.map((x, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => {handleImageClick(dataForSwiper.id, index); console.log(index);}
                  }
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={x}
                    alt={`Slide ${index}`}
                    className={`${imgIndex == index && "active"}`}
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

          <div className="right-info">
            <div className="top">
              <div className="left">
                <Image
                  src={data?.user.img || "/users/default.png"}
                  alt={data?.user.name}
                  width={40}
                  height={40}
                />
                <div className="info">
                  <h5>{data?.user.name}</h5>
                  <span>July 19 2018, 19:42pm</span>
                </div>
              </div>
              <div className="icons-holder">
              <HiDotsVertical
                onClick={(e) => {
                  handleMessageActions(e);
                  setCurentUserId(data?.id);
                }}
              />
                <IoClose className="close" onClick={() => setImgFocus(null)} />
              </div>
            </div>
            <div className="bottom">
              {data?.reacts.count !== 0 && (
                <div className="left emojesCounter">
                  {data?.reacts.topUseage.map((x, index) => (
                    <p key={index}>{x}</p>
                  ))}
                  <p>{data?.reacts.count}</p>
                </div>
              )}
              <div className="actions">
                <MdOutlineAddReaction />
                <IoLink />
                <PiShareFat />
              </div>
              <div className="right">
                <div>
                  <PiShareFat />
                  {data?.shareCount}
                </div>
                <div>
                  <FaRegComment />
                  {data?.comments.count}
                </div>
              </div>
            </div>
            <div className="middle">
              {data?.link && <Link href={data?.link}>{data?.link}</Link>}
              {data?.paragraph && <p>{data?.paragraph}</p>}

              <div className="comments">
                <div className="topHolderComments">
                  <div className="top">
                    <h3>Comments ({data?.comments.count})</h3>
                  </div>
                  <div className="holder">
                    {data?.comments &&
                    Array.isArray(data?.comments.allComments) &&
                    data?.comments.allComments.length > 0 ? (
                      data?.comments.allComments.map((comment) => (
                        <Comment data={comment} />
                      ))
                    ) : (
                      <div className="noCommentsYet">
                        <FaRegComments />
                        <h4>Nothing in here yet</h4>
                        <p>Be the first to post a comment.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="action-holder">
                  <div className="top">
                    <textarea placeholder="Write a comment.."></textarea>
                  </div>
                  <div className="actions">
                    <div className="left">
                      <Image
                        src={"/avatar.png"}
                        alt={"user"}
                        width={40}
                        height={40}
                      />
                      Mahmoud Elshazly
                    </div>
                    <div className="right">
                      <BsEmojiSmile />
                      <MdOutlinePhotoSizeSelectActual />
                      <button>Post a Comment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="hold">
            {imgFocus && (
              <IoClose className="closeMsg" onClick={() => setImgFocus(null)} />
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
                    className={`${imgFocus == x.id && "active"}`}
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
      )}
    </div>
  );
}

export default ImagesSwiper;
