import { useEffect, useState } from "react";

import CartList from "../components/Cart/CartList";
import CartSummary from "../components/Cart/CartSummary";
import ProductCard from "../components/Product/ProductCard";

import {
  FiShoppingBag,
  FiStar,
  FiArrowUpRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getProducts } from "../Apis/productsApi";

function Cart() {
  // =========================================================
  // CART ITEMS
  // =========================================================

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // =========================================================
  // API PRODUCTS
  // =========================================================

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const response = await getProducts();

        console.log(
          "Cart Suggested Products:",
          response
        );

        // Handle different possible backend response shapes
        const productsData =
          response?.data?.products ||
          response?.data ||
          response?.products ||
          [];

        setProducts(
          Array.isArray(productsData)
            ? productsData
            : []
        );
      } catch (error) {
        console.error(
          "Suggested products error:",
          error
        );

        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================================================
  // PRODUCTS ALREADY IN CART
  // =========================================================

  const cartProductIds = cartItems.map(
    (item) => item.id || item._id
  );

  // =========================================================
  // SUGGESTED PRODUCTS
  // =========================================================

  const suggestedProducts = products
    .filter((product) => {
      const productId =
        product.id || product._id;

      return !cartProductIds.includes(productId);
    })
    .slice(0, 8);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#f7f7f5]
        text-[#171717]
        dark:bg-[#111111]
        dark:text-white
      "
    >
      {/* =====================================================
          MAIN
      ====================================================== */}

      <main
        className="
          mx-auto
          max-w-[1500px]
          px-5
          py-10

          sm:px-8
          sm:py-12

          lg:px-10
          lg:py-14

          xl:px-12
        "
      >
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <header
          className="
            mb-10
            border-b
            border-[#dededb]
            pb-8
            dark:border-[#2a2a2a]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              {/* BRAND */}

              <div className="mb-3 flex items-center gap-2">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#ffd600]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-gray-400
                  "
                >
                  Shoply
                </span>
              </div>

              {/* TITLE */}

              <h1
                className="
                  text-[32px]
                  font-semibold
                  leading-none
                  tracking-[-0.04em]
                  text-[#111]

                  sm:text-[40px]

                  dark:text-white
                "
              >
                Shopping bag
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-3
                  max-w-lg
                  text-[12px]
                  leading-6
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Review your selected items before
                completing your order.
              </p>
            </div>

            {/* CART COUNT */}

            <div
              className="
                flex
                items-center
                gap-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-gray-500
                dark:text-gray-400
              "
            >
              <FiShoppingBag size={15} />

              <span>
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "item"
                  : "items"}
              </span>
            </div>
          </div>
        </header>

        {/* =====================================================
            MAIN CART
        ====================================================== */}

        <div
          className={
            cartItems.length === 0
              ? "grid grid-cols-1"
              : `
                grid
                gap-8

                lg:grid-cols-[minmax(0,1fr)_360px]
                lg:items-start

                xl:grid-cols-[minmax(0,1fr)_390px]
              `
          }
        >
          {/* ===================================================
              CART ITEMS
          ==================================================== */}

          <section
            className="
              border
              border-[#dededb]
              bg-white
              dark:border-[#2a2a2a]
              dark:bg-[#171717]
            "
          >
            {cartItems.length === 0 ? (
              /* =================================================
                  EMPTY CART
              ================================================== */

              <div
                className="
                  flex
                  min-h-[500px]
                  flex-col
                  items-center
                  justify-center
                  px-6
                  py-16
                  text-center

                  sm:px-10
                "
              >
                {/* ICON */}

                <div
                  className="
                    mb-7
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    border
                    border-[#dededb]
                    bg-[#fafafa]
                    text-[#171717]

                    dark:border-[#333]
                    dark:bg-[#202020]
                    dark:text-white
                  "
                >
                  <FiShoppingBag
                    size={27}
                    strokeWidth={1.4}
                  />
                </div>

                {/* LABEL */}

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-gray-400
                  "
                >
                  Your shopping bag
                </p>

                {/* TITLE */}

                <h2
                  className="
                    mt-3
                    text-[27px]
                    font-semibold
                    tracking-[-0.035em]
                    text-[#111]

                    sm:text-[32px]

                    dark:text-white
                  "
                >
                  Your bag is empty
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-3
                    max-w-[390px]
                    text-[12px]
                    leading-6
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Discover pieces you'll love and
                  add them to your shopping bag.
                </p>

                {/* CTA */}

                <Link
                  to="/products"
                  className="
                    group
                    mt-8
                    inline-flex
                    items-center
                    gap-3
                    bg-[#ffd600]
                    px-7
                    py-3.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-black
                    transition-all
                    duration-300
                    hover:bg-[#f5ca00]
                  "
                >
                  Continue shopping

                  <FiArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </Link>

                {/* TRUST */}

                <div
                  className="
                    mt-9
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-x-4
                    gap-y-2
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-gray-400
                  "
                >
                  <span>
                    Secure checkout
                  </span>

                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-gray-300
                      dark:bg-gray-600
                    "
                  />

                  <span>
                    Easy returns
                  </span>

                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-gray-300
                      dark:bg-gray-600
                    "
                  />

                  <span>
                    Quality products
                  </span>
                </div>
              </div>
            ) : (
              <CartList />
            )}
          </section>

          {/* ===================================================
              CART SUMMARY
          ==================================================== */}

          {cartItems.length > 0 && (
            <aside className="lg:sticky lg:top-6">
              <CartSummary />
            </aside>
          )}
        </div>

        {/* =====================================================
            SUGGESTED FOR YOU
        ====================================================== */}

        {!loadingProducts &&
          suggestedProducts.length > 0 && (
            <section className="mt-20">
              {/* =================================================
                  SECTION HEADER
              ================================================== */}

              <div
                className="
                  mb-8
                  flex
                  flex-col
                  gap-5
                  border-b
                  border-[#dededb]
                  pb-6

                  sm:flex-row
                  sm:items-end
                  sm:justify-between

                  dark:border-[#2a2a2a]
                "
              >
                <div>
                  {/* LABEL */}

                  <div className="mb-3 flex items-center gap-2">
                    <FiStar
                      size={13}
                      className="text-[#d6ae00]"
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.24em]
                        text-gray-400
                      "
                    >
                      Curated selection
                    </span>
                  </div>

                  {/* TITLE */}

                  <h2
                    className="
                      text-[26px]
                      font-semibold
                      tracking-[-0.035em]
                      text-[#111]

                      sm:text-[30px]

                      dark:text-white
                    "
                  >
                    You may also like
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-2
                      text-[11px]
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    More pieces selected for you
                  </p>
                </div>

                {/* VIEW ALL */}

                <Link
                  to="/products"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-gray-800
                    transition-colors
                    hover:text-gray-500

                    dark:text-gray-300
                    dark:hover:text-white
                  "
                >
                  View all

                  <FiArrowUpRight
                    size={13}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </Link>
              </div>

              {/* =================================================
                  PRODUCTS CATALOGUE
              ================================================== */}

              <div
                className="
                  border
                  border-[#dededb]
                  bg-white

                  dark:border-[#2a2a2a]
                  dark:bg-[#171717]
                "
              >
                <div
                  className="
                    grid
                    grid-cols-2

                    gap-x-5
                    gap-y-12
                    p-5

                    sm:grid-cols-3
                    sm:gap-x-6
                    sm:gap-y-14
                    sm:p-7

                    md:gap-x-7
                    md:p-8

                    lg:grid-cols-4
                    lg:gap-x-8
                    lg:gap-y-16
                    lg:p-9

                    xl:gap-x-9
                    xl:p-10
                  "
                >
                  {suggestedProducts.map(
                    (product, index) => (
                      <div
                        key={
                          product._id ||
                          product.id
                        }
                        className="
                          min-w-0
                          w-full
                        "
                      >
                        <ProductCard
                          product={product}
                          index={index}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          )}

        {/* =====================================================
            LOADING STATE
        ====================================================== */}

        {loadingProducts && (
          <section className="mt-20">
            {/* HEADER SKELETON */}

            <div
              className="
                mb-8
                border-b
                border-[#dededb]
                pb-6
                dark:border-[#2a2a2a]
              "
            >
              <div
                className="
                  mb-3
                  h-2.5
                  w-28
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#292929]
                "
              />

              <div
                className="
                  h-7
                  w-52
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#292929]
                "
              />

              <div
                className="
                  mt-3
                  h-3
                  w-40
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#292929]
                "
              />
            </div>

            {/* PRODUCTS CATALOGUE SKELETON */}

            <div
              className="
                border
                border-[#dededb]
                bg-white

                dark:border-[#2a2a2a]
                dark:bg-[#171717]
              "
            >
              <div
                className="
                  grid
                  grid-cols-2

                  gap-x-5
                  gap-y-12
                  p-5

                  sm:grid-cols-3
                  sm:gap-x-6
                  sm:gap-y-14
                  sm:p-7

                  lg:grid-cols-4
                  lg:gap-x-7
                  lg:p-9
                "
              >
                {[1, 2, 3, 4].map(
                  (item) => (
                    <div
                      key={item}
                      className="
                        min-w-0
                        overflow-hidden
                        bg-white
                        dark:bg-[#191919]
                      "
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          aspect-[3/4]
                          animate-pulse
                          bg-[#eeeeec]
                          dark:bg-[#222]
                        "
                      />

                      {/* CONTENT */}

                      <div
                        className="
                          space-y-3
                          px-1
                          pb-5
                          pt-4
                        "
                      >
                        <div
                          className="
                            h-2.5
                            w-1/3
                            animate-pulse
                            bg-gray-200
                            dark:bg-[#2a2a2a]
                          "
                        />

                        <div
                          className="
                            h-4
                            w-4/5
                            animate-pulse
                            bg-gray-200
                            dark:bg-[#2a2a2a]
                          "
                        />

                        <div
                          className="
                            h-4
                            w-2/5
                            animate-pulse
                            bg-gray-200
                            dark:bg-[#2a2a2a]
                          "
                        />

                        <div
                          className="
                            mt-4
                            h-5
                            w-1/3
                            animate-pulse
                            bg-gray-200
                            dark:bg-[#2a2a2a]
                          "
                        />

                        <div
                          className="
                            mt-4
                            h-10
                            w-full
                            animate-pulse
                            bg-gray-200
                            dark:bg-[#2a2a2a]
                          "
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Cart;