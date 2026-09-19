import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiSliders,
  FiStar,
  FiX,
} from "react-icons/fi";

import ProductGrid from "../components/Product/ProductGrid";
import { getProducts } from "../Apis/productsApi";
import { useCategories } from "../context/CategoryContext";

const categories = [
  { label: "All", value: "all" },
];

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Highest Rated", value: "rating" },
  { label: "Biggest Discount", value: "discount" },
];

function Products() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const searchFromUrl = searchParams.get("search") || "";

  // =========================================================
  // CATEGORIES CONTEXT
  // =========================================================

  const { categories: contextCategories } = useCategories();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchFromUrl);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "all"
  );

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minRating, setMinRating] = useState(0);

  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  const [sortBy, setSortBy] = useState("relevance");

  const [currentPage, setCurrentPage] = useState(1);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [sortOpen, setSortOpen] = useState(false);

  const productsPerPage = 18;

  // =========================================================
  // BACKEND CATEGORIES
  // =========================================================

  const backendCategories = useMemo(() => {
    return [
      ...categories,
      ...contextCategories.map((category) => ({
        label: category.name,
        value: category._id,
      })),
    ];
  }, [contextCategories]);

  // =========================================================
  // CATEGORY FROM NAVBAR / URL
  // =========================================================

  useEffect(() => {
    if (!categoryFromUrl) {
      setSelectedCategory("all");
      return;
    }

    const matchedCategory = backendCategories.find(
      (category) =>
        String(category.value) === String(categoryFromUrl)
    );

    setSelectedCategory(
      matchedCategory ? matchedCategory.value : "all"
    );
  }, [categoryFromUrl, backendCategories]);

  // =========================================================
  // SEARCH FROM NAVBAR
  // =========================================================

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  // =========================================================
  // FETCH PRODUCTS FROM BACKEND
  // =========================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts();

        console.log(
          "PRODUCT CATEGORY:",
          response?.data?.[0]?.category
        );

        console.log(
          "FIRST PRODUCT:",
          response?.data?.[0]
        );

        setProducts(response.data || []);
      } catch (error) {
        console.error("Products error:", error);

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================================================
  // MAX PRODUCT PRICE
  // =========================================================

  const maxProductPrice = useMemo(() => {
    if (!products.length) {
      return 2000;
    }

    return Math.ceil(
      Math.max(
        ...products.map(
          (product) => Number(product.price) || 0
        )
      )
    );
  }, [products]);

  // =========================================================
  // DEFAULT MAX PRICE
  // =========================================================

  useEffect(() => {
    if (products.length > 0 && maxPrice === "") {
      setMaxPrice(String(maxProductPrice));
    }
  }, [products, maxProductPrice, maxPrice]);

  // =========================================================
  // SEARCH + FILTER + SORT
  // =========================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // SEARCH

    const searchValue = search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((product) => {
        const title = String(
          product.title || ""
        ).toLowerCase();

        const category = String(
          product.category || ""
        ).toLowerCase();

        const brand = String(
          product.brand || ""
        ).toLowerCase();

        const description = String(
          product.description || ""
        ).toLowerCase();

        return (
          title.includes(searchValue) ||
          category.includes(searchValue) ||
          brand.includes(searchValue) ||
          description.includes(searchValue)
        );
      });
    }

    // CATEGORY

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          String(product.category) ===
          String(selectedCategory)
      );
    }

    // PRICE

    const minimumPrice =
      minPrice === "" ? 0 : Number(minPrice);

    const maximumPrice =
      maxPrice === ""
        ? maxProductPrice
        : Number(maxPrice);

    result = result.filter((product) => {
      const productPrice =
        Number(product.price) || 0;

      return (
        productPrice >= minimumPrice &&
        productPrice <= maximumPrice
      );
    });

    // RATING

    if (minRating > 0) {
      result = result.filter((product) => {
        const rating =
          Number(product.rating) || 4.5;

        return rating >= minRating;
      });
    }

    // DISCOUNT

    if (onlyDiscounted) {
      result = result.filter((product) => {
        const discount =
          Number(product.discountPercentage) || 0;

        return discount > 0;
      });
    }

    // SORT

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          (Number(b.rating) || 4.5) -
          (Number(a.rating) || 4.5)
      );
    }

    if (sortBy === "discount") {
      result.sort(
        (a, b) =>
          (Number(b.discountPercentage) || 0) -
          (Number(a.discountPercentage) || 0)
      );
    }

    return result;
  }, [
    products,
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    maxProductPrice,
    minRating,
    onlyDiscounted,
    sortBy,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) * productsPerPage;

    return filteredProducts.slice(
      start,
      start + productsPerPage
    );
  }, [filteredProducts, currentPage]);

  // =========================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =========================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    onlyDiscounted,
    sortBy,
  ]);

  // =========================================================
  // HELPERS
  // =========================================================

  const selectedSortLabel =
    sortOptions.find(
      (option) => option.value === sortBy
    )?.label || "Relevance";

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (minPrice !== "" ? 1 : 0) +
    (maxPrice !== "" &&
    Number(maxPrice) < maxProductPrice
      ? 1
      : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyDiscounted ? 1 : 0);

  const clearFilters = () => {
    setSearch("");

    setSelectedCategory("all");

    setMinPrice("");

    setMaxPrice(String(maxProductPrice));

    setMinRating(0);

    setOnlyDiscounted(false);

    setSortBy("relevance");

    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f3f3f1] text-[#111111] dark:bg-[#111111] dark:text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-[#dededb] bg-[#f3f3f1] dark:border-[#292929] dark:bg-[#111111]">

        <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-12 sm:px-8 lg:px-10 lg:pb-12 lg:pt-16">

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">

            <div>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#ffd814]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-500">
                  Shoply marketplace
                </span>
              </div>

              <h1 className="max-w-[760px] text-[42px] font-medium leading-[0.98] tracking-[-0.055em] text-[#111111] dark:text-white sm:text-[54px] lg:text-[68px]">
                Everything you want.
                <br />

                <span className="text-gray-400 dark:text-gray-500">
                  In one place.
                </span>
              </h1>

              <p className="mt-6 max-w-[570px] text-[12px] leading-6 text-gray-500 dark:text-gray-400 sm:text-[13px]">
                Discover products worth bringing home,
                from everyday essentials to new
                favourites.
              </p>

            </div>

            {/* SEARCH */}

            <div className="w-full">

              <div className="mb-2 flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Search the collection
                </span>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400 transition hover:text-black dark:hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="group flex h-12 items-center border-b border-[#111111] bg-transparent transition-colors duration-300 focus-within:border-[#ffd814] dark:border-white dark:focus-within:border-[#ffd814]">

                <FiSearch
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-gray-400 transition-colors group-focus-within:text-[#111111] dark:group-focus-within:text-white"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products, brands..."
                  className="ml-3 w-full bg-transparent px-1 text-[12px] font-medium text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-600"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="ml-2 flex h-7 w-7 items-center justify-center text-gray-400 transition hover:text-black dark:hover:text-white"
                  >
                    <FiX size={15} />
                  </button>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}

      <section className="border-b border-[#dededb] bg-white dark:border-[#292929] dark:bg-[#151515]">

        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

          <div className="flex gap-7 overflow-x-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {backendCategories.map((category) => {

              const active =
                selectedCategory ===
                category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      category.value
                    )
                  }
                  className={`relative shrink-0 pb-2 text-[9px] font-bold uppercase tracking-[0.17em] transition-colors duration-300 ${
                    active
                      ? "text-[#111111] dark:text-white"
                      : "text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                  }`}
                >
                  {category.label}

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#ffd814] transition-all duration-300 ${
                      active
                        ? "w-full"
                        : "w-0"
                    }`}
                  />
                </button>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">

        {/* MOBILE CONTROLS */}

        <div className="mb-7 flex gap-4 lg:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className="relative flex flex-1 items-center justify-center gap-2 border border-[#d8d8d5] bg-white px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-800 dark:border-[#303030] dark:bg-[#191919] dark:text-gray-200"
          >
            <FiSliders size={15} />

            Filters

            {activeFiltersCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center bg-[#ffd814] px-1 text-[9px] font-black text-black">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="relative flex-1">

            <button
              type="button"
              onClick={() =>
                setSortOpen(!sortOpen)
              }
              className="flex w-full items-center justify-between border border-[#d8d8d5] bg-white px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-800 dark:border-[#303030] dark:bg-[#191919] dark:text-gray-200"
            >
              <span className="flex items-center gap-2">
                <FiRefreshCw size={14} />
                Sort
              </span>

              <FiChevronDown
                className={`transition-transform ${
                  sortOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-full border border-gray-200 bg-white p-1 shadow-2xl dark:border-[#303030] dark:bg-[#191919]">

                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(
                        option.value
                      );

                      setSortOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] ${
                      sortBy ===
                      option.value
                        ? "bg-[#f5f5f2] text-black dark:bg-[#242424] dark:text-white"
                        : "text-gray-500 hover:bg-[#f7f7f5] dark:text-gray-400 dark:hover:bg-[#222]"
                    }`}
                  >
                    {option.label}

                    {sortBy ===
                      option.value && (
                      <FiCheck
                        size={13}
                        className="text-[#b59600]"
                      />
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

        <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)]">

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="hidden lg:block">

            <div className="sticky top-24">

              <div className="mb-7 flex items-center justify-between border-b border-[#d8d8d5] pb-4 dark:border-[#303030]">

                <div className="flex items-center gap-2">

                  <FiSliders
                    size={15}
                    strokeWidth={1.5}
                  />

                  <h2 className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    Filters
                  </h2>

                  {activeFiltersCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center bg-[#ffd814] px-1 text-[9px] font-black text-black">
                      {activeFiltersCount}
                    </span>
                  )}

                </div>

                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[8px] font-bold uppercase tracking-[0.13em] text-gray-400 transition hover:text-red-500"
                  >
                    Clear
                  </button>
                )}

              </div>

              <div className="space-y-9">

                {/* CATEGORY */}

                <div>

                  <h3 className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-900 dark:text-white">
                    Category
                  </h3>

                  <div className="max-h-64 space-y-0.5 overflow-y-auto pr-2">

                    {backendCategories.map(
                      (category) => (
                        <button
                          key={
                            category.value
                          }
                          type="button"
                          onClick={() =>
                            setSelectedCategory(
                              category.value
                            )
                          }
                          className={`group flex w-full items-center justify-between border-l-2 px-3 py-2.5 text-left text-[10px] font-medium transition-all ${
                            selectedCategory ===
                            category.value
                              ? "border-[#ffd814] bg-white text-black dark:bg-[#1b1b1b] dark:text-white"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-black dark:text-gray-400 dark:hover:text-white"
                          }`}
                        >

                          {category.label}

                          {selectedCategory ===
                            category.value && (
                            <FiCheck
                              size={13}
                              className="text-[#b59600]"
                            />
                          )}

                        </button>
                      )
                    )}

                  </div>

                </div>

                {/* PRICE */}

                <div>

                  <h3 className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-900 dark:text-white">
                    Price
                  </h3>

                  <div className="flex items-center gap-2">

                    <div className="flex-1 border-b border-gray-300 pb-2 dark:border-[#444]">

                      <span className="block text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400">
                        Min
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) =>
                          setMinPrice(
                            e.target.value
                          )
                        }
                        placeholder="0"
                        className="mt-1 w-full bg-transparent text-[11px] font-bold outline-none dark:text-white"
                      />

                    </div>

                    <span className="text-gray-300">
                      —
                    </span>

                    <div className="flex-1 border-b border-gray-300 pb-2 dark:border-[#444]">

                      <span className="block text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400">
                        Max
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(
                            e.target.value
                          )
                        }
                        placeholder={String(
                          maxProductPrice
                        )}
                        className="mt-1 w-full bg-transparent text-[11px] font-bold outline-none dark:text-white"
                      />

                    </div>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">

                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("50");
                      }}
                      className="text-[8px] font-bold uppercase tracking-[0.08em] text-gray-400 transition hover:text-black dark:hover:text-white"
                    >
                      Under $50
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("50");
                        setMaxPrice("200");
                      }}
                      className="text-[8px] font-bold uppercase tracking-[0.08em] text-gray-400 transition hover:text-black dark:hover:text-white"
                    >
                      $50–$200
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("200");
                        setMaxPrice("500");
                      }}
                      className="text-[8px] font-bold uppercase tracking-[0.08em] text-gray-400 transition hover:text-black dark:hover:text-white"
                    >
                      $200–$500
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("500");
                        setMaxPrice(
                          String(
                            maxProductPrice
                          )
                        );
                      }}
                      className="text-[8px] font-bold uppercase tracking-[0.08em] text-gray-400 transition hover:text-black dark:hover:text-white"
                    >
                      $500+
                    </button>

                  </div>

                </div>

                {/* RATING */}

                <div>

                  <h3 className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-900 dark:text-white">
                    Customer rating
                  </h3>

                  <div className="space-y-1">

                    {[4, 3, 2, 1].map(
                      (rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() =>
                            setMinRating(
                              minRating ===
                                rating
                                ? 0
                                : rating
                            )
                          }
                          className={`flex w-full items-center gap-2 border-l-2 px-3 py-2.5 text-left transition ${
                            minRating ===
                            rating
                              ? "border-[#ffd814] bg-white dark:bg-[#1b1b1b]"
                              : "border-transparent hover:bg-white dark:hover:bg-[#1b1b1b]"
                          }`}
                        >

                          <div className="flex">

                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <FiStar
                                  key={star}
                                  size={11}
                                  className={
                                    star <=
                                    rating
                                      ? "fill-[#e9b900] text-[#e9b900]"
                                      : "text-gray-300 dark:text-gray-600"
                                  }
                                />
                              )
                            )}

                          </div>

                          <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                            & up
                          </span>

                          {minRating ===
                            rating && (
                            <FiCheck
                              size={13}
                              className="ml-auto text-[#b59600]"
                            />
                          )}

                        </button>
                      )
                    )}

                  </div>

                </div>

                {/* DEALS */}

                <div className="border-t border-[#dededb] pt-7 dark:border-[#303030]">

                  <button
                    type="button"
                    onClick={() =>
                      setOnlyDiscounted(
                        !onlyDiscounted
                      )
                    }
                    className="flex w-full items-center justify-between"
                  >

                    <div className="text-left">

                      <h3 className="text-[9px] font-bold uppercase tracking-[0.18em]">
                        Deals
                      </h3>

                      <p className="mt-2 text-[9px] leading-4 text-gray-400">
                        Show discounted products
                      </p>

                    </div>

                    <div
                      className={`flex h-5 w-9 items-center p-0.5 transition-colors ${
                        onlyDiscounted
                          ? "bg-[#ffd814]"
                          : "bg-gray-200 dark:bg-[#3a3a3a]"
                      }`}
                    >

                      <span
                        className={`h-4 w-4 bg-white shadow-sm transition-transform ${
                          onlyDiscounted
                            ? "translate-x-4"
                            : ""
                        }`}
                      />

                    </div>

                  </button>

                </div>

              </div>

            </div>

          </aside>

          {/* =================================================
              PRODUCTS AREA
          ================================================== */}

          <div className="min-w-0">

            {/* TOOLBAR */}

            <div className="mb-7 flex flex-col gap-4 border-b border-[#d8d8d5] pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-[#303030]">

              <div>

                <div className="flex items-center gap-3">

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-900 dark:text-white">
                    {loading
                      ? "Finding products..."
                      : `${filteredProducts.length} products`}
                  </p>

                  {!loading &&
                    filteredProducts.length >
                      0 && (
                      <span className="h-1 w-1 bg-[#ffd814]" />
                    )}

                  {!loading &&
                    search && (
                      <p className="text-[9px] text-gray-400">
                        Results for "
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {search}
                        </span>
                        "
                      </p>
                    )}

                </div>

              </div>

              {/* DESKTOP SORT */}

              <div className="relative hidden sm:block">

                <button
                  type="button"
                  onClick={() =>
                    setSortOpen(!sortOpen)
                  }
                  className="flex items-center gap-4 border-b border-gray-900 bg-transparent px-1 py-2 text-[9px] font-bold uppercase tracking-[0.13em] text-gray-700 transition-colors hover:border-[#ffd814] dark:border-white dark:text-gray-300"
                >

                  <span>
                    Sort:
                    {" "}
                    <span className="text-gray-950 dark:text-white">
                      {selectedSortLabel}
                    </span>
                  </span>

                  <FiChevronDown
                    size={14}
                    className={`transition-transform ${
                      sortOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 border border-gray-200 bg-white p-1 shadow-2xl dark:border-[#303030] dark:bg-[#191919]">

                    {sortOptions.map(
                      (option) => (
                        <button
                          key={
                            option.value
                          }
                          type="button"
                          onClick={() => {
                            setSortBy(
                              option.value
                            );

                            setSortOpen(
                              false
                            );
                          }}
                          className={`flex w-full items-center justify-between px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.07em] ${
                            sortBy ===
                            option.value
                              ? "bg-[#f5f5f2] dark:bg-[#242424]"
                              : "hover:bg-[#f7f7f5] dark:hover:bg-[#222]"
                          }`}
                        >

                          {option.label}

                          {sortBy ===
                            option.value && (
                            <FiCheck
                              size={13}
                              className="text-[#b59600]"
                            />
                          )}

                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* PRODUCT AREA */}

            <div className="relative">

              {loading ? (
                <ProductGrid
                  products={paginatedProducts}
                  loading={loading}
                />
              ) : paginatedProducts.length > 0 ? (
                <div className="border-t border-l border-[#dededb] bg-white dark:border-[#292929] dark:bg-[#151515]">

                  <ProductGrid
                    products={
                      paginatedProducts
                    }
                    loading={loading}
                  />

                </div>
              ) : (
                <div className="flex min-h-[400px] items-center justify-center border border-[#dededb] bg-white dark:border-[#292929] dark:bg-[#151515]">

                  <div className="text-center">

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      No products found
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-5 border-b border-black pb-1 text-[9px] font-bold uppercase tracking-[0.15em] text-black dark:border-white dark:text-white"
                    >
                      Clear filters
                    </button>

                  </div>

                </div>
              )}

            </div>

            {/* PAGINATION */}

            {!loading &&
              filteredProducts.length > 0 &&
              totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-1">

                  <button
                    type="button"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      goToPage(
                        currentPage - 1
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center border border-gray-200 bg-white text-gray-600 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-30 dark:border-[#303030] dark:bg-[#191919] dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                  >
                    <FiChevronLeft size={15} />
                  </button>

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) =>
                      index + 1
                  )
                    .slice(
                      Math.max(
                        0,
                        currentPage - 3
                      ),
                      Math.min(
                        totalPages,
                        currentPage + 2
                      )
                    )
                    .map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() =>
                          goToPage(page)
                        }
                        className={`flex h-10 min-w-10 items-center justify-center px-3 text-[9px] font-bold ${
                          currentPage === page
                            ? "bg-[#111111] text-white dark:bg-white dark:text-black"
                            : "border border-gray-200 bg-white text-gray-500 hover:border-black hover:text-black dark:border-[#303030] dark:bg-[#191919] dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      goToPage(
                        currentPage + 1
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center border border-gray-200 bg-white text-gray-600 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-30 dark:border-[#303030] dark:bg-[#191919] dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                  >
                    <FiChevronRight size={15} />
                  </button>

                </div>
              )}

          </div>

        </div>

      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="absolute inset-0 bg-black/40"
            aria-label="Close filters"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto border-t border-gray-200 bg-white shadow-2xl dark:border-[#303030] dark:bg-[#191919]">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 dark:border-[#303030] dark:bg-[#191919]">

              <div className="flex items-center gap-2">

                <FiFilter size={16} />

                <h2 className="text-[10px] font-bold uppercase tracking-[0.18em]">
                  Filters
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false
                  )
                }
                className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-500 dark:border-[#303030] dark:text-gray-300"
              >
                <FiX size={16} />
              </button>

            </div>

            <div className="divide-y divide-gray-200 dark:divide-[#303030]">

              {/* MOBILE PRICE */}

              <div className="p-5">

                <h3 className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em]">
                  Price
                </h3>

                <div className="flex gap-3">

                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(
                        e.target.value
                      )
                    }
                    placeholder="Min price"
                    className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-[11px] font-bold outline-none focus:border-[#ffd814] dark:border-[#444] dark:text-white"
                  />

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(
                        e.target.value
                      )
                    }
                    placeholder="Max price"
                    className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-[11px] font-bold outline-none focus:border-[#ffd814] dark:border-[#444] dark:text-white"
                  />

                </div>

              </div>

              {/* MOBILE RATING */}

              <div className="p-5">

                <h3 className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em]">
                  Rating
                </h3>

                <div className="flex gap-2">

                  {[4, 3, 2, 1].map(
                    (rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setMinRating(
                            minRating ===
                              rating
                              ? 0
                              : rating
                          )
                        }
                        className={`flex flex-1 items-center justify-center gap-1 border px-2 py-3 text-[9px] font-bold ${
                          minRating ===
                          rating
                            ? "border-[#ffd814] bg-[#fffbea] dark:bg-[#302d13]"
                            : "border-gray-200 dark:border-[#303030]"
                        }`}
                      >

                        {rating}

                        <FiStar
                          size={11}
                          className="fill-[#e9b900] text-[#e9b900]"
                        />

                        +

                      </button>
                    )
                  )}

                </div>

              </div>

              {/* MOBILE DEAL */}

              <div className="p-5">

                <button
                  type="button"
                  onClick={() =>
                    setOnlyDiscounted(
                      !onlyDiscounted
                    )
                  }
                  className="flex w-full items-center justify-between"
                >

                  <div className="text-left">

                    <h3 className="text-[9px] font-bold uppercase tracking-[0.18em]">
                      Discounted products
                    </h3>

                    <p className="mt-2 text-[9px] text-gray-400">
                      Show products with deals
                    </p>

                  </div>

                  <div
                    className={`flex h-5 w-9 items-center p-0.5 ${
                      onlyDiscounted
                        ? "bg-[#ffd814]"
                        : "bg-gray-200 dark:bg-[#3a3a3a]"
                    }`}
                  >

                    <span
                      className={`h-4 w-4 bg-white shadow transition-transform ${
                        onlyDiscounted
                          ? "translate-x-4"
                          : ""
                      }`}
                    />

                  </div>

                </button>

              </div>

            </div>

            <div className="sticky bottom-0 flex gap-3 border-t border-gray-200 bg-white p-4 dark:border-[#303030] dark:bg-[#191919]">

              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 border border-gray-200 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-700 dark:border-[#303030] dark:text-gray-300"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false
                  )
                }
                className="flex-[2] bg-[#111111] py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white dark:bg-white dark:text-black"
              >
                Show {filteredProducts.length} products
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Products;