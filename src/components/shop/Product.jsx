"use client";

import React, { useContext, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/Styles/chat.css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useLanguage } from "../../Contexts/LanguageContext";
import ContentLoader from "react-content-loader";

import { PiShareFat } from "react-icons/pi";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Product({ data, viewOwner, focused = false }) {
  const { translations, locale } = useLanguage();
  const { screenSize, userData, userPage } = useContext(ScreenContext);
  const {
    setDangerEvent,
    setOpenProductForm,
    setSingleProvider,
    setOpenShare,
  } = useContext(MenusContext);
  const direction = locale === "ar" ? "rtl" : "ltr";

  const [swiperRef, setSwiperRef] = useState(null);
  const [activeImg, setActiveImg] = useState(data?.img[0] || null);

  console.log("product", data);

  return (
    <div className="Product post">
      {!focused ? (
        <>
          <div className="image-holder">
            <div className="backimg">
              <Image src={activeImg?.newpath?.url} alt={data?.name} fill />
            </div>

            <Image
              className="mainImg"
              src={activeImg?.newpath?.url}
              alt={data?.name}
              fill
            />
            <div className="counter-viewer">
              {data?.img?.map((x, index) => (
                <span
                  key={index}
                  className={activeImg === x ? "active" : ""}
                  onMouseEnter={() => setActiveImg(x)}
                  onClick={() =>
                    setSingleProvider({
                      type: "product",
                      sharing_data: data,
                      focused_img_index: index,
                    })
                  }
                ></span>
              ))}
            </div>
          </div>

          <div className="content">
            <h4 className="title ellipsisText">{data?.name}</h4>

            <div>
              <div className="row">
                <div className="price" style={{ flexWrap: "wrap" }}>
                  {data?.sale && data?.sale !== 0 ? (
                    <>
                      <span className="originalPrice">${data?.Price}</span>
                      {`-`}
                      <span className="currentPrice">
                        ${data?.Price - (data?.Price * data?.sale) / 100}
                      </span>
                    </>
                  ) : (
                    <span className="currentPrice">${data?.Price}</span>
                  )}
                </div>
                {viewOwner ? (
                  data?.category && (
                    <h5 className="category ellipsisText">{data.category}</h5>
                  )
                ) : data?.sale && data.sale !== 0 ? (
                  <span className="salePercentage">-{data.sale}% off</span>
                ) : null}
              </div>
            </div>
            {viewOwner ? (
              <>
                <hr />
                <div className="row last">
                  <div className="row">
                    <Image
                      className="rounded"
                      src={data?.pageDetails[0]?.img?.url}
                      alt={data?.pageDetails[0]?.pagename}
                      fill
                    />
                    <h4>{data?.pageDetails[0]?.pagename}</h4>
                  </div>
                  {data?.sale && data?.sale !== 0 ? (
                    <span className="salePercentage">-{data.sale}% off</span>
                  ) : null}
                </div>
              </>
            ) : data?.pageid === userPage?._id ? (
              <div className="row last">
                <FaRegEdit
                  onClick={() => {
                    setOpenProductForm({
                      type: "edit",
                      productId: data?._id,
                    });
                  }}
                />
                <FaTrashAlt
                  onClick={() => {
                    setDangerEvent({
                      id: data?._id,
                      type: "delete_product",
                      message: "are you sure you want to remove this product",
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          {screenSize === "large" && (
            <div className="left-img">
              <div className="hold">
                {data?.img && (
                  <img
                    src={activeImg?.newpath?.url}
                    alt={activeImg?.newpath?.url}
                  />
                )}
              </div>
              {data?.img?.length > 1 && (
                <Swiper
                  ref={swiperRef}
                  onSwiper={setSwiperRef}
                  className={`previewSmallImages`}
                  dir={direction}
                  spaceBetween={5}
                  slidesPerView={"auto"}
                  loop={false}
                  centeredSlides={true}
                >
                  {data?.img.map((x, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => {
                        swiperRef.slideTo(index);
                        setActiveImg(x);
                      }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={x?.newpath?.url}
                        alt={`Slide ${index}`}
                        className={`${activeImg == x ? "active" : ""}`}
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
          {!data ? (
            <ContentLoader
              className="skeleton skeleton-SingleDetails"
              width={600}
              height={600}
              viewBox="0 0 600 600"
              backgroundColor="#f3f3f3"
              foregroundColor="#e0e0e0"
            >
              {/* ... skeleton loader content ... */}
            </ContentLoader>
          ) : (
            <div className="right-info">
              <div className="top">
                <div className="left">
                  <Image
                    src={data?.pageDetails[0]?.img?.url || "/users/default.svg"}
                    style={{
                      cursor: "pointer",
                    }}
                    alt={`asd`}
                    width={40}
                    height={40}
                    className={`rounded`}
                    onClick={(e) =>
                      !isMyPost &&
                      handleMenus(e, "user-Info", data?.pageid, {
                        type: "page",
                      })
                    }
                  />
                  <div className="info">
                    <h5>{data?.pageDetails[0]?.pagename}</h5>
                  </div>
                </div>
                <div className="icons-holder">
                  <PiShareFat
                    className="share-ico"
                    onClick={() =>
                      setOpenShare(
                        `${window.location.origin}?product=${data?._id}`
                      )
                    }
                  />
                  <IoClose
                    className="close closeMenu"
                    onClick={() => {
                      const baseUrl =
                        window.location.origin + window.location.pathname;
                      window.history.pushState({}, "", baseUrl);
                      setSingleProvider(null);
                      setMessageText("");
                    }}
                  />
                </div>
              </div>
              {data?.pageid === userPage?._id ? (
                <div className="row last">
                  <FaRegEdit
                    onClick={() => {
                      setOpenProductForm({
                        type: "edit",
                        productId: data?._id,
                      });
                    }}
                  />
                  <FaTrashAlt
                    className="danger"
                    onClick={() => {
                      setDangerEvent({
                        id: data?._id,
                        type: "delete_product",
                        message: "are you sure you want to remove this product",
                      });
                    }}
                  />
                </div>
              ) : null}
              {screenSize !== "large" && (
                <div className="left-img">
                  <div className="hold">
                    {data?.img && (
                      <img
                        src={activeImg?.newpath?.url}
                        alt={activeImg?.newpath?.url}
                      />
                    )}
                  </div>
                  {data?.img?.length > 1 && (
                    <Swiper
                      ref={swiperRef}
                      onSwiper={setSwiperRef}
                      className={`previewSmallImages`}
                      dir={direction}
                      spaceBetween={5}
                      slidesPerView={"auto"}
                      loop={false}
                      centeredSlides={true}
                    >
                      {data?.img.map((x, index) => (
                        <SwiperSlide
                          key={index}
                          onClick={() => {
                            swiperRef.slideTo(index);
                            setActiveImg(x);
                          }}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={x.newpath.url}
                            alt={`Slide ${index}`}
                            className={`${activeImg == x ? "active" : ""}`}
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
                <div className="row">
                  {data?.name && <h4>{data?.name}</h4>}

                  {data?.category && (
                    <h5 className="category ellipsisText">{data.category}</h5>
                  )}
                </div>
                <div>
                  <div className="row">
                    <div className="price" style={{ flexWrap: "wrap" }}>
                      {data?.sale && data?.sale !== 0 ? (
                        <>
                          <span className="originalPrice">${data?.Price}</span>
                          {`-`}
                          <span className="currentPrice">
                            ${data?.Price - (data?.Price * data?.sale) / 100}
                          </span>
                        </>
                      ) : (
                        <span className="currentPrice">${data?.Price}</span>
                      )}
                    </div>

                    {data?.sale && data.sale !== 0 && (
                      <span className="salePercentage">-{data.sale}% off</span>
                    )}
                  </div>
                </div>
                {data?.name && <p>{data?.details}</p>}

                {Array.isArray(data?.about) && data.about.length > 0 && (
                  <>
                    <hr className="about-hr" />
                    <h4>additional details</h4>
                    <ul className="about-items">
                      {data.about.map(({ key, value }, index) => (
                        <li className="about-item" key={index}>
                          <strong>{key}:</strong> <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Product;
