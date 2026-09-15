import { useEffect, useMemo, useState } from "react";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minRating, setMinRating] = useState(0);
  const [onlyDiscounted, setOnlyDiscounted] =
    useState(false);

  const [sortBy, setSortBy] = useState("relevance");

  const [currentPage, setCurrentPage] = useState(1);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [sortOpen, setSortOpen] = useState(false);

  const productsPerPage = 18;

  // =========================================================
  // BACKEND CATEGORIES
  // =========================================================

  const backendCategories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return [
      ...categories,
      ...uniqueCategories.map((category) => ({
        label: category,
        value: category,
      })),
    ];
  }, [products]);

  // =========================================================
  // FETCH PRODUCTS FROM BACKEND
  // =========================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts();

        console.log("Backend Products:", response);

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

  // Set default max price after products load

  useEffect(() => {
    if (
      products.length > 0 &&
      maxPrice === ""
    ) {
      setMaxPrice(String(maxProductPrice));
    }
  }, [
    products,
    maxProductPrice,
    maxPrice,
  ]);

  // =========================================================
  // SEARCH + FILTER + SORT
  // =========================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // -------------------------------------------------------
    // SEARCH
    // -------------------------------------------------------

    const searchValue = search
      .trim()
      .toLowerCase();

    if (searchValue) {
      result = result.filter((product) => {
        const title =
          String(product.title || "").toLowerCase();

        const category =
          String(product.category || "").toLowerCase();

        const brand =
          String(product.brand || "").toLowerCase();

        const description =
          String(product.description || "").toLowerCase();

        return (
          title.includes(searchValue) ||
          category.includes(searchValue) ||
          brand.includes(searchValue) ||
          description.includes(searchValue)
        );
      });
    }

    // -------------------------------------------------------
    // CATEGORY
    // -------------------------------------------------------

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    // -------------------------------------------------------
    // PRICE
    // -------------------------------------------------------

    const minimumPrice =
      minPrice === ""
        ? 0
        : Number(minPrice);

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

    // -------------------------------------------------------
    // RATING
    // -------------------------------------------------------

    if (minRating > 0) {
      result = result.filter((product) => {
        const rating =
          Number(product.rating) || 4.5;

        return rating >= minRating;
      });
    }

    // -------------------------------------------------------
    // DISCOUNT
    // -------------------------------------------------------

    if (onlyDiscounted) {
      result = result.filter((product) => {
        const discount =
          Number(product.discountPercentage) || 0;

        return discount > 0;
      });
    }

    // -------------------------------------------------------
    // SORT
    // -------------------------------------------------------

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
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
    filteredProducts.length /
      productsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) *
      productsPerPage;

    return filteredProducts.slice(
      start,
      start + productsPerPage
    );
  }, [
    filteredProducts,
    currentPage,
  ]);

  // Go back to page 1 whenever filters change

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
      (option) =>
        option.value === sortBy
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
    setMaxPrice(
      String(maxProductPrice)
    );
    setMinRating(0);
    setOnlyDiscounted(false);
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
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
    <main className="min-h-screen bg-[#f6f6f6]">

      {/* =====================================================
          HEADER + SEARCH
      ====================================================== */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400">
                Shoply Marketplace
              </span>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Everything you want.
                <span className="text-yellow-500">
                  {" "}
                  In one place.
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Discover thousands of products,
                compare your favorites, and find
                the perfect deal for you.
              </p>
            </div>

            {/* SEARCH */}

            <div className="w-full lg:max-w-md">
              <div className="group flex h-12 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition-all duration-300 focus-within:border-yellow-400 focus-within:bg-white focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

                <FiSearch
                  size={19}
                  className="shrink-0 text-gray-400 transition-colors group-focus-within:text-yellow-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products, brands..."
                  className="ml-3 w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                  >
                    <FiX size={16} />
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

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {backendCategories.map(
              (category) => {
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
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition-all duration-300 ${
                      active
                        ? "border-black bg-black text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-950"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

        {/* MOBILE CONTROLS */}

        <div className="mb-5 flex gap-3 lg:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className="relative flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm"
          >
            <FiSliders size={17} />

            Filters

            {activeFiltersCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-black text-black">
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
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <FiRefreshCw size={16} />
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
              <div className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-xl">
                {sortOptions.map(
                  (option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(
                          option.value
                        );
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-bold ${
                        sortBy ===
                        option.value
                          ? "bg-yellow-50 text-gray-950"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}

                      {sortBy ===
                        option.value && (
                        <FiCheck
                          size={14}
                          className="text-yellow-600"
                        />
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)]">

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

                <div className="flex items-center gap-2">
                  <FiFilter size={17} />

                  <h2 className="text-sm font-black">
                    Filters
                  </h2>

                  {activeFiltersCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-black">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[10px] font-bold text-gray-400 hover:text-red-500"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="divide-y divide-gray-100">

                {/* CATEGORY */}

                <div className="p-5">
                  <h3 className="mb-4 text-xs font-black uppercase tracking-wider">
                    Category
                  </h3>

                  <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
                    {backendCategories.map(
                      (category) => (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() =>
                            setSelectedCategory(
                              category.value
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-semibold ${
                            selectedCategory ===
                            category.value
                              ? "bg-yellow-50 text-gray-950"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {category.label}

                          {selectedCategory ===
                            category.value && (
                            <FiCheck
                              size={14}
                              className="text-yellow-600"
                            />
                          )}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* PRICE */}

                <div className="p-5">
                  <h3 className="mb-4 text-xs font-black uppercase tracking-wider">
                    Price
                  </h3>

                  <div className="flex items-center gap-2">

                    <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <span className="block text-[9px] font-bold uppercase text-gray-400">
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
                        className="mt-0.5 w-full bg-transparent text-xs font-bold outline-none"
                      />
                    </div>

                    <span className="text-gray-300">
                      —
                    </span>

                    <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <span className="block text-[9px] font-bold uppercase text-gray-400">
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
                        className="mt-0.5 w-full bg-transparent text-xs font-bold outline-none"
                      />
                    </div>
                  </div>

                  {/* QUICK PRICE FILTERS */}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("50");
                      }}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-[10px] font-bold text-gray-500 hover:border-yellow-400 hover:bg-yellow-50"
                    >
                      Under $50
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("50");
                        setMaxPrice("200");
                      }}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-[10px] font-bold text-gray-500 hover:border-yellow-400 hover:bg-yellow-50"
                    >
                      $50 - $200
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("200");
                        setMaxPrice("500");
                      }}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-[10px] font-bold text-gray-500 hover:border-yellow-400 hover:bg-yellow-50"
                    >
                      $200 - $500
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
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-[10px] font-bold text-gray-500 hover:border-yellow-400 hover:bg-yellow-50"
                    >
                      $500+
                    </button>
                  </div>
                </div>

                {/* RATING */}

                <div className="p-5">
                  <h3 className="mb-4 text-xs font-black uppercase tracking-wider">
                    Customer Rating
                  </h3>

                  <div className="space-y-2">
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
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                            minRating === rating
                              ? "bg-yellow-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <FiStar
                                  key={star}
                                  size={13}
                                  className={
                                    star <=
                                    rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              )
                            )}
                          </div>

                          <span className="text-xs font-semibold text-gray-600">
                            & up
                          </span>

                          {minRating ===
                            rating && (
                            <FiCheck
                              size={14}
                              className="ml-auto text-yellow-600"
                            />
                          )}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* DEALS */}

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
                      <h3 className="text-xs font-black uppercase tracking-wider">
                        Deals
                      </h3>

                      <p className="mt-1 text-[10px] text-gray-400">
                        Show discounted products
                      </p>
                    </div>

                    <div
                      className={`flex h-6 w-10 items-center rounded-full p-1 ${
                        onlyDiscounted
                          ? "bg-yellow-400"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
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
              PRODUCTS
          ================================================== */}

          <div className="min-w-0">

            {/* TOOLBAR */}

            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-black text-gray-950">
                  {loading
                    ? "Finding products..."
                    : `${filteredProducts.length} products`}
                </p>

                {!loading &&
                  search && (
                    <p className="mt-1 text-xs text-gray-400">
                      Search results for "
                      <span className="font-bold text-gray-700">
                        {search}
                      </span>
                      "
                    </p>
                  )}
              </div>

              {/* DESKTOP SORT */}

              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() =>
                    setSortOpen(!sortOpen)
                  }
                  className="flex min-w-[190px] items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:border-gray-400"
                >
                  <span>
                    Sort:{" "}
                    <span className="text-gray-950">
                      {selectedSortLabel}
                    </span>
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
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-2xl">
                    {sortOptions.map(
                      (option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSortBy(
                              option.value
                            );
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-xs font-bold ${
                            sortBy ===
                            option.value
                              ? "bg-yellow-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {option.label}

                          {sortBy ===
                            option.value && (
                            <FiCheck
                              size={14}
                              className="text-yellow-600"
                            />
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* PRODUCTS GRID */}

            <ProductGrid
              products={paginatedProducts}
              loading={loading}
            />

            {/* PAGINATION */}

            {!loading &&
              filteredProducts.length > 0 &&
              totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">

                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      goToPage(
                        currentPage - 1
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiChevronLeft />
                  </button>

                  {Array.from(
                    { length: totalPages },
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
                        className={`h-10 min-w-10 rounded-xl px-3 text-xs font-black ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400"
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiChevronRight />
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

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">

              <div className="flex items-center gap-2">
                <FiFilter />

                <h2 className="text-sm font-black">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="rounded-full bg-gray-100 p-2 text-gray-500"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="divide-y divide-gray-100">

              {/* MOBILE PRICE */}

              <div className="p-5">
                <h3 className="mb-4 text-xs font-black uppercase tracking-wider">
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
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
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
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              {/* MOBILE RATING */}

              <div className="p-5">
                <h3 className="mb-4 text-xs font-black uppercase tracking-wider">
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
                        className={`flex flex-1 items-center justify-center gap-1 rounded-xl border px-2 py-3 text-xs font-bold ${
                          minRating === rating
                            ? "border-yellow-400 bg-yellow-50"
                            : "border-gray-200"
                        }`}
                      >
                        {rating}

                        <FiStar
                          size={12}
                          className="fill-yellow-400 text-yellow-400"
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
                    <h3 className="text-xs font-black uppercase tracking-wider">
                      Discounted products
                    </h3>

                    <p className="mt-1 text-[10px] text-gray-400">
                      Show products with deals
                    </p>
                  </div>

                  <div
                    className={`flex h-6 w-10 items-center rounded-full p-1 ${
                      onlyDiscounted
                        ? "bg-yellow-400"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        onlyDiscounted
                          ? "translate-x-4"
                          : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 flex gap-3 border-t border-gray-100 bg-white p-4">

              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-black text-gray-700"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="flex-[2] rounded-xl bg-black py-3 text-xs font-black text-white"
              >
                Show{" "}
                {filteredProducts.length} products
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Products;