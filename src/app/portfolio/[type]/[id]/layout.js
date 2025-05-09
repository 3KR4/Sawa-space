"use client";
import React, { Suspense } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function PortfolioLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="big-loader">
          <DotLottieReact
            src="/Animation - 1746716306960.lottie"
            loop
            autoplay
          />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
