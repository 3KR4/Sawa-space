"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { maxLength } from "@/Methods";
import { messages, users, posts } from "@/Data";
import { use } from "react";
import Post from "@/components/Post";
import SettingMenu from "@/components/SettingMenu";
import { products } from "@/Data";

import "../Css/marketplace.css";
import SideSection from "@/components/SideSection";
import MarketSideSection from "@/components/MarketSideSection";
import ProductsSection from "@/components/ProductsSection";

export default function MarketPlace() {
  const sections = [
    { name: "accessories", start: 0, end: 6 },
    { name: "toys & games", start: 6, end: 12 },
    { name: "vehicles", start: 12, end: 18 },
  ];

  return (
    <div className={`marketplace`}>
      <SideSection>
        <MarketSideSection />
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
