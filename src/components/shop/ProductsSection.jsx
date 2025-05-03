"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ContentLoader from "react-content-loader";
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

  return products.length ? (
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
          <SwiperSlide>
            {" "}
            <ContentLoader
              speed={1}
              width="100%"
              height="100%"
              viewBox="0 0 300 300"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              {/* Image Placeholder */}
              <rect x="0" y="0" rx="8" ry="8" width="100%" height="68%" />

              {/* Name Placeholder */}
              <rect x="5" y="212" rx="2" ry="2" width="100%" height="15" />

              {/* Price Placeholder */}
              <rect x="5" y="235" rx="4" ry="2" width="150" height="10" />
              <rect x="195" y="235" rx="4" ry="2" width="100" height="10" />

              {/* User Info Placeholder */}
              <circle cx="22" cy="280" r="20" />
              <rect x="50" y="267" rx="2" ry="2" width="100" height="10" />
              <rect x="50" y="285" rx="2" ry="2" width="50" height="10" />

              {/* Social Icons Placeholder */}

              {/* Discount Placeholder */}
              <rect x="250" y="280" rx="2" ry="2" width="50" height="10" />
            </ContentLoader>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  ) : null;
}
