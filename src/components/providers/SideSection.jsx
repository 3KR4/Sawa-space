"use client";
import React from "react";
function SideSection({ children, mobileFilters }) {
  return (
    <div className={`sideSection ${mobileFilters ? "active" : ""}`}>
      {children}
    </div>
  );
}

export default SideSection;
