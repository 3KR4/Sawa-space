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
import { fetchingContext } from "@/Contexts/fetchingContext";
import { productService } from "@/services/api/productService";

export default function ProductsSection({ render }) {
  const { translations } = useLanguage();
  const { screenSize } = useContext(fetchingContext);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    pageRef.current = 1;
    setHasMore(true);
    loadProducts();
  }, [render]);

  const loadProducts = async () => {
    if (isFetching.current || !hasMore) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const currentPage = pageRef.current;
      console.log("Fetching page:", currentPage);

      const res = await productService.getProducts(
        "all",
        null,
        null,
        render,
        null,
        null,
        null,
        null,
        currentPage,
        6
      );

      const newProducts = res?.data?.data || [];
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(currentPage < res.data.lastPage);

      // Update both state and ref
      setPage((prev) => {
        const next = prev + 1;
        pageRef.current = next;
        return next;
      });
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  };

  const handleSlideChange = (swiper) => {
    const slidesPerView = swiper.params.slidesPerView;
    const lastVisibleIndex = swiper.activeIndex + slidesPerView;
    const remainingSlides = products.length - lastVisibleIndex;

    if (remainingSlides <= 2 && hasMore) {
      loadProducts();
    }
  };

  const [currentDep, setCurrentDep] = useState(null);

  return products.length ? (
    <div className="productSection">
      <div className="top">
        <h4 className="left-title">
          {translations?.market_place?.[render.replace(/\s+/g, "_")] || render}
        </h4>
        <div className="navigations-icons">
          <FaAngleLeft className={`custom-prev ${render}`} />
          <FaAngleRight className={`custom-next ${render}`} />
        </div>
      </div>

      <div className="swiper-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={7}
          speed={1000}
          navigation={{
            nextEl: `.custom-next.${render}`,
            prevEl: `.custom-prev.${render}`,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            500: { slidesPerView: 2 },
            1030: { slidesPerView: 2 },
            1300: { slidesPerView: 3 },
            1400: { slidesPerView: 3 },
            1500: { slidesPerView: 4 },
            1700: { slidesPerView: 5 },
          }}
          onSlideChange={handleSlideChange}
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <Product data={item} viewOwner={true} />
            </SwiperSlide>
          ))}
          {hasMore && (
            <>
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
            </>
          )}
        </Swiper>
      </div>
    </div>
  ) : null;
}
