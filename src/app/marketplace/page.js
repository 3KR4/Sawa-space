"use client";
export const dynamic = "force-dynamic";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { products } from "@/utils/Data";
import { departements } from "@/utils/Data";
import "@/Styles/marketplace.css";
import SideSection from "@/components/providers/SideSection";
import MarketSideSection from "@/components/shop/MarketSideSection";
import ProductsSection from "@/components/shop/ProductsSection";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import { productService } from "@/services/api/productService";
import ContentLoader from "react-content-loader";
import Product from "@/components/shop/Product";

export default function MarketPlace() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters state from URL params
  const initialFilters = {
    dep: searchParams.get("dep") || null,
    search: searchParams.get("search") || null,
    minP: searchParams.get("minP") || null,
    maxP: searchParams.get("maxP") || null,
    page: parseInt(searchParams.get("page")) || 1,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [heighstPrice, setHeighstPrice] = useState();
  const [totalCount, setTotalCount] = useState(0);

  const isFetching = useRef(false);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          params.set(key, value.toString());
        }
      });

      router.push(`?${params.toString()}`);
    },
    [router]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilters, page: 1 }; // Reset to page 1 on filter change
        updateURL(updated);
        return updated;
      });
      setProducts([]); // Clear products to show loading state
      setHasMore(true);
    },
    [updateURL]
  );

  // Load products based on current filters
  const loadProducts = useCallback(async () => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setLoading(true);

    try {
      const res = await productService.getProducts(
        "all",
        null,
        filters.search,
        filters.dep,
        null,
        null,
        filters.minP,
        filters.maxP,
        filters.page,
        15
      );

      const newProducts = res?.data?.data || [];
      setProducts((prev) => [...prev, ...newProducts]);

      const lastPage = res?.data?.lastPage || 1;
      setHeighstPrice((prev) =>
        filters.minP || filters.maxP ? prev : res?.data?.highestPrice || 5000000
      );
      setTotalCount(res?.data?.totalCount);

      if (filters.page < lastPage) {
        setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [filters, hasMore]);

  // Load products when filters change
  useEffect(() => {
    loadProducts();
  }, [filters, loadProducts]);

  // Handle page change
  const handlePageChange = (e) => {
    handleFilterChange({ page: e.selected + 1 });
  };

  // Clear all filters
  const clearFilters = () => {
    handleFilterChange({
      dep: null,
      search: null,
      minP: null,
      maxP: null,
      page: 1,
    });
  };

  return (
    <div className={`marketplace`}>
      <SideSection>
        <MarketSideSection
          heighstPrice={heighstPrice}
          onFilterChange={handleFilterChange}
          currentFilters={filters}
          clearFilters={clearFilters}
        />
      </SideSection>

      {filters.dep || filters.search ? (
        <div className="grid-products">
          <div className="top">
            {" "}
            <button className="main-button" onClick={clearFilters}>
              Clear Filters
            </button>
            <span>{totalCount} matching products</span>
          </div>

          <div className="products">
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <ContentLoader
                    key={index}
                    speed={1}
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 300"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    {/* Image Placeholder */}
                    <rect x="0" y="0" rx="8" ry="8" width="100%" height="68%" />

                    {/* Name Placeholder */}
                    <rect
                      x="5"
                      y="212"
                      rx="2"
                      ry="2"
                      width="100%"
                      height="15"
                    />

                    {/* Price Placeholder */}
                    <rect x="5" y="235" rx="4" ry="2" width="150" height="10" />
                    <rect
                      x="195"
                      y="235"
                      rx="4"
                      ry="2"
                      width="100"
                      height="10"
                    />

                    {/* User Info Placeholder */}
                    <circle cx="22" cy="280" r="20" />
                    <rect
                      x="50"
                      y="267"
                      rx="2"
                      ry="2"
                      width="100"
                      height="10"
                    />
                    <rect x="50" y="285" rx="2" ry="2" width="50" height="10" />

                    {/* Social Icons Placeholder */}

                    {/* Discount Placeholder */}
                    <rect
                      x="250"
                      y="280"
                      rx="2"
                      ry="2"
                      width="50"
                      height="10"
                    />
                  </ContentLoader>
                ))
              : products.map((x) => (
                  <Product key={x._id} data={x} viewOwner={true} />
                ))}
          </div>
          <ReactPaginate
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            breakLabel="..."
            nextLabel="next >"
            previousLabel="< prev"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num btns"
            nextLinkClassName="page-num btns"
            containerClassName="pagination"
            activeClassName="active"
            forcePage={filters.page - 1} // Ensure the current page is shown
            onPageChange={handlePageChange}
            renderOnZeroPageCount={null}
          />
        </div>
      ) : (
        <div className={`shop`}>
          {departements.map(({ name }) => (
            <ProductsSection key={name} render={name} />
          ))}
        </div>
      )}
    </div>
  );
}
