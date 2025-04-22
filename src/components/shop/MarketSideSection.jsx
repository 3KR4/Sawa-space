"use client";

import React from "react";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { useLanguage } from "@/Contexts/LanguageContext";

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
  { id: 5, name: "home_related", icon: IoHome },
  { id: 3, name: "phones", icon: IoPhonePortrait },
  { id: 2, name: "hardware", icon: IoHardwareChip },
  { id: 7, name: "accessories", icon: TbTools },
  { id: 6, name: "computers", icon: FaLaptopCode },
  { id: 4, name: "consoles", icon: TbDeviceGamepad3Filled },
  { id: 1, name: "toys_and_games", icon: IoGameController },
  { id: 8, name: "sports_equipment", icon: FaBasketballBall },
  { id: 9, name: "fashion", icon: GiRolledCloth },
  { id: 10, name: "health", icon: FaHeart },
  { id: 11, name: "beauty", icon: CgGirl },
  { id: 12, name: "vehicles", icon: FaCar },
  { id: 13, name: "pet_supplies", icon: MdOutlinePets },
  { id: 14, name: "grocery", icon: MdLocalGroceryStore },
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
          >
            <FaShoppingBasket />
            {translations?.market_place?.browse_all}
          </li>
          <li
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
              >
                <IconComponent key={x.id} />
                {translations?.market_place?.[x.name]}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MarketSideSection;
