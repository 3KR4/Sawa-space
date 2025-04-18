"use client";

import React, { useContext } from "react";
import Image from "next/image";
import ConvertTime from "@/utils/ConvertTime";

import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useLanguage } from "../../Contexts/LanguageContext";

function Product({ data, type }) {
  const { setOpenPostForm } = useContext(MenusContext);
  const { locale, translations, changeLanguage } = useLanguage();
  const { pathname, screenSize } = useContext(ScreenContext);

  return (
    <div className="Product">
      <Image className="mainImg" src={data?.images[0]} alt={data?.name} fill />

      <div className="content">
        <div className="row" style={{ marginBottom: "-6px" }}>
          <h4 className="title">{data?.title}</h4>
          {data?.sale && data?.sale !== 0 && (
            <span className="salePercentage">
              -{data?.sale < 10 ? `0${data.sale}` : data.sale}% off
            </span>
          )}
        </div>
        <div>
          <div className="row">
            <div className="price">
              {data?.sale && data?.sale !== 0 ? (
                <>
                  <span className="originalPrice">${data?.price}</span>
                  <span className="currentPrice">
                    ${data?.price - (data?.price * data?.sale) / 100}
                  </span>
                </>
              ) : (
                <span className="currentPrice">${data?.price}</span>
              )}
            </div>
            {data?.category && <h5 className="category">{data?.category}</h5>}
          </div>

          <div className="row loc-serv">
            {data?.deliveryService ? (
              <h4 className="deliveryService">Shipping available</h4>
            ) : (
              <h4 className="deliveryService">Pickup only in</h4>
            )}
            {data?.location && <h4 className="location">{data?.location}</h4>}
          </div>
        </div>
        {type !== "in_seller_page" && (
          <>
            <hr />
            <div className="row last">
              <div className="row">
                <Image
                  className="rounded"
                  src={data?.page?.img || data?.user?.img}
                  alt={data?.page?.name || data?.user?.name}
                  fill
                />
                <h4>{data?.page?.name || data?.user?.name}</h4>
              </div>
              <span>{ConvertTime(data?.time, locale, "product")}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
