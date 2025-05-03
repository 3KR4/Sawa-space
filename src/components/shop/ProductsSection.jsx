"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import Product from "@/components/shop/Product";
import { useLanguage } from "../../Contexts/LanguageContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { productService } from "@/services/api/productService";

export default function ProductsSection({ render }) {
  const { translations } = useLanguage();
  const { screenSize } = useContext(ScreenContext);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);

  useEffect(() => {
    loadProducts();
  }, [render]);

  const loadProducts = async () => {
    if (isFetching.current || !hasMore) return;
    isFetching.current = true;

    try {
      const res = await productService.getProducts(
        "all", // type
        null, // pageId
        null, // name
        render, // departement
        null, // category
        null, // availability
        null, // min
        null, // max
        page, // page
        6 // limit
      );

      const newProducts = res?.data?.data || [];
      console.log(newProducts);
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(page < res.data.last_page);
      setPage((prev) => prev + 1);
    } finally {
      isFetching.current = false;
    }
  };

  const handleSlideChange = (swiper) => {
    const remainingSlides = products.length - swiper.activeIndex;

    // Load more when 2 or fewer slides remain
    if (remainingSlides <= 2 && hasMore) {
      loadProducts();
    }
  };

  return (
    <div className="productSection">
      <div className="top">
        <h4 className="left-title">
          {translations?.market_place?.[render.replace(/\s+/g, "_")] || render}
        </h4>
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
          onSlideChange={handleSlideChange}
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <Product data={item} viewOwner={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
