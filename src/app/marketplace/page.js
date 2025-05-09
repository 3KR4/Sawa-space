"use client";
export const dynamic = "force-dynamic";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
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
import { useLanguage } from "@/Contexts/LanguageContext";
import { ScreenContext } from "@/Contexts/ScreenContext";

import { IoGrid, IoSearch, IoClose } from "react-icons/io5";

export default function MarketPlace() {
  const { translations } = useLanguage();
  const { screenSize } = useContext(ScreenContext);
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
  const [loading, setLoading] = useState(false);
  const [heighstPrice, setHeighstPrice] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [productSearch, setProductSearch] = useState(filters.search || "");
  const isFetching = useRef(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  console.log("filters", filters);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          params.set(key, key === "page" ? parseInt(value) : value.toString());
        }
      });

      router.replace(`?${params.toString()}`);
    },
    [router]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters) => {
      let updated;

      // إذا كان التغيير هو department، نمسح الفلاتر الأخرى
      if (newFilters.dep !== undefined && newFilters.dep !== filters.dep) {
        updated = {
          dep: newFilters.dep,
          search: null,
          minP: null,
          maxP: null,
          page: 1,
        };
        setProductSearch(""); // إفراغ حقل البحث
      } else {
        updated = { ...filters, ...newFilters, page: 1 };
      }

      setFilters(updated);
      updateURL(updated);
      setProducts([]);
    },
    [filters, updateURL]
  );

  // Load products based on current filters
  const loadProducts = useCallback(async () => {
    if (isFetching.current) return;

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
        12
      );

      const newProducts = res?.data?.data || [];
      setProducts(newProducts);

      const lastPage = res?.data?.lastPage || 1;
      setHeighstPrice((prev) =>
        filters.minP || filters.maxP ? prev : res?.data?.highestPrice || 5000000
      );
      setTotalCount(res?.data?.totalCount);
      setLastPage(res?.data?.lastPage);
    } catch (err) {
      console.error(err);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [filters]);

  // Load products when filters change
  useEffect(() => {
    loadProducts();
  }, [filters, loadProducts]);

  const handlePageChange = (e) => {
    const updated = {
      ...filters,
      page: e.selected + 1,
    };
    setFilters(updated);
    setProducts([]);
    updateURL(updated); // 👈 Sync URL with new page
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleFilterChange({ search: productSearch });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [productSearch]);

  const clearFilters = (overrideFilters = {}) => {
    const cleared = {
      dep: null,
      search: null,
      minP: null,
      maxP: null,
      page: 1,
      ...overrideFilters,
    };
    setFilters(cleared);
    setProductSearch("");
    setProducts([]);
    updateURL(cleared);
  };
  return (
    <div className={`marketplace`}>
      <SideSection mobileFilters={mobileFilters}>
        <MarketSideSection
          type={"market"}
          heighstPrice={heighstPrice}
          onFilterChange={handleFilterChange}
          currentFilters={filters}
          clearFilters={clearFilters}
          setMobileFilters={setMobileFilters}
          totalCount={totalCount}
        />
      </SideSection>

      {filters.dep ? (
        <div className="grid-products">
          <div className="top">
            <div>
              <div
                className="search-holderr"
                style={{
                  padding: productSearch.length !== 0 ? "0 0 0 10px" : "0 10px",
                }}
              >
                <IoSearch
                  className="searchIco"
                  onClick={() =>
                    document.getElementById("searchInProductsInput").focus()
                  }
                />
                <div className="middle">
                  <h4
                    style={{
                      opacity: productSearch.length !== 0 ? "0" : "1",
                    }}
                    onClick={() =>
                      document.getElementById("searchInProductsInput").focus()
                    }
                  >
                    {translations?.placeHolders?.search_in_products}
                  </h4>
                  <input
                    id="searchInProductsInput"
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                {productSearch.length > 0 && (
                  <IoClose
                    className="delete"
                    onClick={() => setProductSearch("")}
                  />
                )}
              </div>

              <span className="totalProducts">{totalCount} products found</span>
            </div>
            <div>
              {screenSize === "small" && (
                <button
                  className="main-button"
                  onClick={() => setMobileFilters(true)}
                >
                  <IoGrid /> Filters
                </button>
              )}

              <div className="active-filters">
                {filters.dep ? (
                  <div className="filter-chip">
                    {filters.dep}
                    <IoClose
                      onClick={() => handleFilterChange({ dep: null })}
                    />
                  </div>
                ) : null}

                {filters.minP ? (
                  <div className="filter-chip">
                    Min: {filters.minP}
                    <IoClose
                      onClick={() => handleFilterChange({ minP: null })}
                    />
                  </div>
                ) : null}
                {filters.maxP ? (
                  <div className="filter-chip">
                    Max: {filters.maxP}
                    <IoClose
                      onClick={() => handleFilterChange({ maxP: null })}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className="products"
            style={{
              background: loading ? "white" : "",
              padding: loading ? "10px" : "",
            }}
          >
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
            pageCount={lastPage}
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
