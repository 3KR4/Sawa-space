"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ConvertTime from "@/utils/ConvertTime";

import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useLanguage } from "../../Contexts/LanguageContext";
import Product from "@/Components/shop/Product";

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

export default function ProductsSection({ data, section }) {
  const { setOpenPostForm } = useContext(MenusContext);
  const { locale, translations, changeLanguage } = useLanguage();
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
          spaceBetween={7}
          speed={1000}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1400: { slidesPerView: 3 },
            1600: { slidesPerView: 4 },
            1700: { slidesPerView: 5 },
          }}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <Product key={index} data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
