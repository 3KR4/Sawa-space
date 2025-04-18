"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { products } from "@/utils/Data";

import "@/Styles/marketplace.css";
import SideSection from "@/components/providers/SideSection";
import MarketSideSection from "@/components/shop/MarketSideSection";
import ProductsSection from "@/components/shop/ProductsSection";

export default function MarketPlace() {
  const sections = [
    { name: "accessories", start: 0, end: 6 },
    { name: "toys & games", start: 6, end: 12 },
    { name: "vehicles", start: 12, end: 18 },
  ];

  return (
    <div className={`marketplace`}>
      <SideSection>
        <MarketSideSection type="render-for-marketPlace" />
      </SideSection>

      <div className="shop">
        {sections.map(({ name, start, end }) => (
          <ProductsSection
            key={name}
            data={products.slice(start, end)}
            section={name}
          />
        ))}
      </div>
    </div>
  );
}
