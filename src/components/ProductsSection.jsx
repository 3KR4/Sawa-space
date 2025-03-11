import React, { useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { convertTime } from "@/utils/convertTime";

import { MenusContext } from "@/app/contexts/MenusContext";
import { ScreenContext } from "@/app/contexts/ScreenContext";
import { useLanguage } from "../app/contexts/LanguageContext";

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";


export default function ProductsSection({ data, section }) {
  const { translations } = useLanguage();
  const { setOpenPostForm } = useContext(MenusContext);
  const { locale, changeLanguage } = useLanguage();
  const { pathname, screenSize } = useContext(ScreenContext);

  return (
    <div className="productSection">
      <div className="top">
        <h4 className="left-title">{section}</h4>
        <div className="navigations-icons">
          <FaAngleLeft className="custom-prev" />
          <FaAngleRight className="custom-next" />
        </div>
      </div>

      <div className="swiper-container">
        <Swiper
          modules={[Navigation]}
          slidesPerView={5}
          spaceBetween={7}
          speed={1000}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="Product">
                <Image
                  className="mainImg"
                  src={item?.images[0]}
                  alt={item?.name}
                  fill
                />

                <div className="content">
                  <div className="row" style={{ marginBottom: "-6px" }}>
                    <h4 className="title">{item?.title}</h4>
                    {item?.sale && item?.sale !== 0 && (
                      <span className="salePercentage">
                        -{item?.sale < 10 ? `0${item.sale}` : item.sale}% off
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="row">
                      <div className="price">
                        {item?.sale && item?.sale !== 0 ? (
                          <>
                            <span className="originalPrice">
                              ${item?.price}
                            </span>
                            <span className="currentPrice">
                              ${item?.price - (item?.price * item?.sale) / 100}
                            </span>
                          </>
                        ) : (
                          <span className="currentPrice">${item?.price}</span>
                        )}
                      </div>
                      {item?.category && (
                        <h5 className="category">{item?.category}</h5>
                      )}
                    </div>

                    <div className="row loc-serv">
                      {item?.deliveryService ? (
                        <h4 className="deliveryService">
                          Shipping is available
                        </h4>
                      ) : (
                        <h4 className="deliveryService">Pickup only in</h4>
                      )}
                      {item?.location && (
                        <h4 className="location">{item?.location}</h4>
                      )}
                    </div>
                  </div>

                  <hr />

                  <div className="row last">
                    <div className="row">
                      <Image
                        className="rounded"
                        src={item?.page?.img || item?.user?.img}
                        alt={item?.page?.name || item?.user?.name}
                        fill
                      />
                      <h4>{item?.page?.name || item?.user?.name}</h4>
                    </div>
                    <span>{convertTime(item?.time)}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
