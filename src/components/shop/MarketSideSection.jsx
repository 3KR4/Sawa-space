"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import Slider from "@mui/material/Slider";
import { useLanguage } from "@/Contexts/LanguageContext";
import { departements } from "@/utils/Data";
import { useRouter, useSearchParams } from "next/navigation";
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

function MarketSideSection({
  heighstPrice,
  onFilterChange,
  currentFilters,
  clearFilters,
}) {
  const { locale, translations } = useLanguage();

  const handleDepartmentClick = (newDep) => {
    clearFilters();
    onFilterChange({ dep: newDep });
  };

  const [priceRangeValue, setPriceRangeValue] = useState([
    currentFilters.minP || 0,
    currentFilters.maxP || heighstPrice,
  ]);

  const handlePriceRangeChange = (_, newValue) => {
    setPriceRangeValue(newValue);
    onFilterChange({
      minP: newValue[0],
      maxP: newValue[1],
    });
  };

  const heighstPricee = heighstPrice;

  return (
    <>
      <div className="Filter-Holder main-btns">
        <h4 className="main-title">
          {translations?.market_place?.market_place}
        </h4>
        <ul>
          <li className="active">
            <FaShoppingBasket />
            {translations?.market_place?.browse_all}
          </li>
          <li>
            <FaHeartCircleBolt />
            {translations?.market_place?.following_pages}
          </li>
        </ul>
      </div>
      {currentFilters?.dep && (
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
              <h3>{currentFilters.minP || 0}</h3>
            </div>
            <div className="separator">-</div>
            <div className="field">
              <h3>{currentFilters.maxP || heighstPrice || "∞"}</h3>
              <span>{translations?.market_place?.max}</span>
            </div>
          </div>
          <Slider
            value={priceRangeValue}
            onChange={(_, newValue) => setPriceRangeValue(newValue)}
            onChangeCommitted={handlePriceRangeChange}
            min={0}
            max={heighstPricee}
            className="priceSlider"
            getAriaLabel={() => "Minimum distance shift"}
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
      )}
      <div className="Filter-Holder forCat">
        <h4 className="filter-title">
          {translations?.market_place?.filter_by_categories}
        </h4>
        <ul>
          {departements.map((x, index) => {
            const IconComponent = x.icon;
            return (
              <li
                className={currentFilters.dep == x.name ? "active" : ""}
                key={index}
                onClick={() => handleDepartmentClick(x.name)}
              >
                <IconComponent key={x.id} />
                {translations?.market_place?.[x.name.replace(/\s+/g, "_")]}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MarketSideSection;
