"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { products } from "@/utils/Data";
import { departements } from "@/utils/Data";
import "@/Styles/marketplace.css";

import SideSection from "@/components/providers/SideSection";
import MarketSideSection from "@/components/shop/MarketSideSection";
import ProductsSection from "@/components/shop/ProductsSection";

export default function MarketPlace() {

  return (
    <div className={`marketplace`}>
      <SideSection>
        <MarketSideSection type="render-for-marketPlace" />
      </SideSection>

      <div className="shop">
        {departements.map(({ name}) => (
          <ProductsSection key={name} render={name} />
        ))}
      </div>
    </div>
  );
}
