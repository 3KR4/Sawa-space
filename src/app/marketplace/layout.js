import React, { Suspense } from "react";

export default function MarketplaceLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading marketplace...</div>}>{children}</Suspense>
  );
}
