"use client";

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";

import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useLanguage } from "../../Contexts/LanguageContext";

function Product({ data, viewOwner }) {
  const { setOpenPostForm } = useContext(MenusContext);
  const { locale, translations, changeLanguage } = useLanguage();
  const { pathname, screenSize } = useContext(ScreenContext);
  const [activeImg, setActiveImg] = useState(data?.img[0]);

  console.log(activeImg);
  return (
    <div className="Product">
      <div className="image-holder">
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
            ></span>
          ))}
        </div>
      </div>

      <div className="content">
        <div className="row" style={{ marginBottom: "-6px" }}>
          <h4 className="title">{data?.name}</h4>
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
                  <span className="originalPrice">${data?.Price}</span>
                  <span className="currentPrice">
                    ${data?.Price - (data?.Price * data?.sale) / 100}
                  </span>
                </>
              ) : (
                <span className="currentPrice">${data?.Price}</span>
              )}
            </div>
            {data?.category && <h5 className="category">{data?.category}</h5>}
          </div>
        </div>
        {viewOwner && (
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
