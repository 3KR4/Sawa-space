"use client";

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";

import { MenusContext } from "@/Contexts/MenusContext";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { useLanguage } from "../../Contexts/LanguageContext";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

function Product({ data, viewOwner }) {
  const { setDangerEvent, setOpenProductForm } = useContext(MenusContext);
  const { locale, translations, changeLanguage } = useLanguage();
  const { pathname, screenSize } = useContext(ScreenContext);
  const [activeImg, setActiveImg] = useState(data?.img?.[0] || null);

  return (
    <div className="Product">
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
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Product;
