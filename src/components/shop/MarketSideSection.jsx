"use client";

import React from "react";
import { useState, useContext, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useLanguage } from "@/Contexts/LanguageContext";
import { departements } from "@/utils/Data";
import { useRouter, useSearchParams } from "next/navigation";
import { ScreenContext } from "@/Contexts/ScreenContext";
import { pageService } from "@/services/api/pageService";
import { useNotification } from "@/Contexts/NotificationContext";
import {
  IoPhonePortrait,
  IoHome,
  IoHardwareChip,
  IoClose,
  IoGameController,
} from "react-icons/io5";

import { TbTools, TbDeviceGamepad3Filled } from "react-icons/tb";
import { GiRolledCloth } from "react-icons/gi";
import {
  FaHeart,
  FaCar,
  FaBasketballBall,
  FaTrashAlt,
  FaShoppingBasket,
} from "react-icons/fa";
import { MdOutlinePets, MdLocalGroceryStore, MdEdit } from "react-icons/md";
import { CgGirl } from "react-icons/cg";
import { FaHeartCircleBolt, FaPlus } from "react-icons/fa6";

function MarketSideSection({
  type,
  heighstPrice,
  onFilterChange,
  currentFilters,
  clearFilters,
  setMobileFilters,
  totalCount,
  isMyPage,
  categories,
  setCurrentPortfolio,
}) {
  const { screenSize, actionLoading, setActionLoading, fetchPageData } =
    useContext(ScreenContext);
  const { addNotification } = useNotification();

  const { locale, translations } = useLanguage();

  const handleDepartmentClick = (newDep) => {
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
  const [originalCats, setOriginalCats] = useState([]);

  const [selectedCat, setSelectedCat] = useState([]);
  const availability = currentFilters.availability || "";
  const [startEditCats, setStartEditCats] = useState(false);
  const handleAddMoreCats = () => {
    const allFilled = categories?.every((cat) => cat.trim() !== "");
    if (allFilled) {
      setCurrentPortfolio((prev) => ({
        ...prev,
        category: [...prev.category, ""],
      }));
    }
  };

  const handleUpdateCategory = async () => {
    try {
      setActionLoading((prev) => [...prev, "category"]);

      const cleanedCategories = categories.filter((cat) => cat.trim() !== "");

      await pageService.updateCategories({
        category: cleanedCategories,
      });

      setCurrentPortfolio((prev) => ({
        ...prev,
        category: cleanedCategories, // update state without empty strings
      }));
      await fetchPageData();

      addNotification({
        type: "success",
        message: "Categories updated successfully.",
      });

      setStartEditCats(false);
    } catch (err) {
      console.error("Failed to update categories:", err);
      addNotification({
        type: "error",
        message: "Failed to update categories. Try again.",
      });
    } finally {
      setActionLoading((prev) => prev.filter((x) => x !== "category"));
    }
  };

  const handleToggleCategory = (cat) => {
    const newSelected = selectedCat.includes(cat)
      ? selectedCat.filter((c) => c !== cat)
      : [...selectedCat, cat];
    setSelectedCat(newSelected);
    onFilterChange({ category: newSelected.join(",") });
  };
  useEffect(() => {
    if (currentFilters.category) {
      setSelectedCat(currentFilters.category.split(","));
    } else {
      setSelectedCat([]);
    }
  }, [currentFilters.category]);

  return (
    <>
      {screenSize === "small" && (
        <IoClose
          className="close"
          onClick={() => {
            setMobileFilters(false);
          }}
        />
      )}
      {type === "market" && (
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
            {screenSize === "small" && (
              <span className="totalProducts">{totalCount} products found</span>
            )}
          </ul>
        </div>
      )}
      {type === "page" && (
        <div className="Filter-Holder forCat">
          <h4 className="filter-title">
            {translations?.market_place?.availability}
          </h4>
          <ul>
            {["inStock", "outOfStock"].map((status) => (
              <li
                key={status}
                className={availability === status ? "active" : ""}
                onClick={() =>
                  onFilterChange({
                    availability: availability === status ? null : status,
                  })
                }
              >
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={availability === status}
                    readOnly
                  />
                  <span className="custom-checkbox"></span>
                </label>
                {
                  translations?.market_place?.[
                    status === "inStock" ? "in_stock" : "out_of_stock"
                  ]
                }
              </li>
            ))}
          </ul>
        </div>
      )}
      {(currentFilters?.dep || type == "page") && (
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
      {type === "market" && (
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
      )}
      {type === "page" && (
        <div className="Filter-Holder forCat cats">
          <h4 className="filter-title">
            {translations?.market_place?.filter_by_categories}
            {isMyPage &&
              (startEditCats ? (
                <button
                  type="button"
                  className="main-button add-btn"
                  onClick={handleAddMoreCats}
                >
                  <FaPlus />
                </button>
              ) : (
                <button
                  type="button"
                  className="main-button add-btn"
                  onClick={() => {
                    setOriginalCats(categories);
                    setStartEditCats(true);
                  }}
                >
                  <MdEdit />
                </button>
              ))}
          </h4>
          <ul>
            {categories?.map((cat, index) => {
              const isSelected =
                currentFilters.category?.split(",").includes(cat) &&
                !startEditCats;

              return (
                <li
                  key={index}
                  className={`ellipsisText ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    if (!startEditCats) handleToggleCategory(cat);
                  }}
                >
                  {!startEditCats ? (
                    <>
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={isSelected}
                          readOnly
                        />
                        <span className="custom-checkbox"></span>
                      </label>
                      {cat}
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={cat}
                        onChange={(e) => {
                          const newCats = [...categories];
                          newCats[index] = e.target.value;
                          setCurrentPortfolio((prev) => ({
                            ...prev,
                            category: newCats,
                          }));
                        }}
                      />
                      <FaTrashAlt
                        onClick={() =>
                          setCurrentPortfolio((prev) => ({
                            ...prev,
                            category: prev.category?.filter(
                              (_, i) => i !== index
                            ),
                          }))
                        }
                      />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
          {startEditCats && (
            <div className="btns rowHolder actions">
              <button
                type="button"
                className="main-button secondary"
                onClick={() => {
                  setCurrentPortfolio((prev) => ({
                    ...prev,
                    category: originalCats,
                  }));
                  setStartEditCats(false);
                }}
              >
                <span>{translations?.actions?.cancel}</span>
              </button>

              <button
                className={`main-button ${
                  actionLoading.includes("category") ? "loading" : ""
                }`}
                onClick={handleUpdateCategory}
              >
                <div className="lds-dual-ring"></div>
                <span>{translations?.actions?.save_changes}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MarketSideSection;
