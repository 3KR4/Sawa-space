import React from "react";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { Categories } from "emoji-picker-react";
import { useLanguage } from "@/app/contexts/LanguageContext";

import {
  IoPhonePortrait,
  IoHome,
  IoHardwareChip,
  IoGameController,
} from "react-icons/io5";

import { TbTools, TbDeviceGamepad3Filled } from "react-icons/tb";
import { GiRolledCloth } from "react-icons/gi";
import {
  FaHeart,
  FaCar,
  FaBasketballBall,
  FaLaptopCode,
  FaShoppingBasket,
} from "react-icons/fa";
import { MdOutlinePets, MdLocalGroceryStore } from "react-icons/md";
import { CgGirl } from "react-icons/cg";
import { FaHeartCircleBolt } from "react-icons/fa6";

function MarketSideSection() {
  const { locale, translations } = useLanguage();

  const [priceRangevalue, setPriceRangevalue] = useState([10, 100000]);

  const Sections = [
    { id: 5, name: { en: "home related", ar: "منزلي" }, icon: IoHome },
    { id: 3, name: { en: "phones", ar: "الهواتف" }, icon: IoPhonePortrait },
    { id: 2, name: { en: "hardware", ar: "الأجهزة" }, icon: IoHardwareChip },
    { id: 7, name: { en: "accessories", ar: "الإكسسوارات" }, icon: TbTools },
    {
      id: 6,
      name: { en: "computers", ar: "أجهزة الكمبيوتر" },
      icon: FaLaptopCode,
    },
    {
      id: 4,
      name: { en: "consoles", ar: "اجهزة الكونسول" },
      icon: TbDeviceGamepad3Filled,
    },
    {
      id: 1,
      name: { en: "toys & games", ar: "ألعاب" },
      icon: IoGameController,
    },
    {
      id: 8,
      name: { en: "sports equipment", ar: "الادوات الرياضية" },
      icon: FaBasketballBall,
    },
    { id: 9, name: { en: "fashion", ar: "الموضة" }, icon: GiRolledCloth },
    { id: 10, name: { en: "health", ar: "الصحة" }, icon: FaHeart },
    { id: 11, name: { en: "beauty", ar: "الجمال" }, icon: CgGirl },
    { id: 12, name: { en: "vehicles", ar: "المركبات" }, icon: FaCar },
    {
      id: 13,
      name: { en: "pet supplies", ar: "ادوات الحيوانات الأليفة" },
      icon: MdOutlinePets,
    },
    {
      id: 14,
      name: { en: "grocery", ar: "البقالة" },
      icon: MdLocalGroceryStore,
    },
  ];

  return (
    <>
      <div className="Filter-Holder main-btns">
        <h4 className="main-title">
          {translations?.market_place?.market_place}
        </h4>
        <ul>
          <li
            className="active"
            onClick={() => {
              console.log(x.name);
            }}
          >
            <FaShoppingBasket />
            {translations?.market_place?.browse_all}
          </li>
          <li
            onClick={() => {
              console.log(x.name);
            }}
          >
            <FaHeartCircleBolt />
            {translations?.market_place?.following_pages}
          </li>
        </ul>
      </div>
      <hr />

      <div className="Filter-Holder forPrice">
        <h4 className="filter-title">
          {translations?.market_place?.filter_by_price}
        </h4>
        <p className="filter-paragraph">
          {translations?.market_place?.enter_min_and_max_price}
        </p>
        <div className="price-input">
          <div className="field">
            <span>{translations?.market_place?.min}</span>
            <h3>{priceRangevalue[0]}</h3>
          </div>
          <div className="separator">-</div>
          <div className="field">
            <h3>{priceRangevalue[1]}</h3>
            <span>{translations?.market_place?.max}</span>
          </div>
        </div>
        <Slider
          className="priceSlider"
          getAriaLabel={() => "Minimum distance shift"}
          value={priceRangevalue}
          // onChange={handlePriceRangeChange}
          min={10}
          max={10000}
          sx={{
            "& .MuiSlider-thumb": {
              width: 15,
              height: 15,
            },
            "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
              boxShadow: "0px 0px 0px 7px rgb(94 94 94 / 16%)",
            },
          }}
        />
      </div>
      <hr />
      <div className="Filter-Holder forCat">
        <h4 className="filter-title">
          {translations?.market_place?.filter_by_categories}
        </h4>
        <ul>
          {Sections.map((x, index) => {
            const IconComponent = x.icon;
            return (
              <li
                key={index}
                onClick={() => {
                  console.log(x.name);
                }}
              >
                <IconComponent key={x.id} />
                {locale === "ar" ? x.name.ar : x.name.en}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MarketSideSection;
