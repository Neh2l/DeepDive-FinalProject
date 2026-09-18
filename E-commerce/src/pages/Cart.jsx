import { useEffect, useState } from "react";

import CartList from "../components/Cart/CartList";
import CartSummary from "../components/Cart/CartSummary";
import ProductCard from "../components/Product/ProductCard";

import {
  FiShoppingBag,
  FiArrowLeft,
  FiStar,
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

        console.log("Cart Suggested Products:", response);

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
      const productId = product.id || product._id;

      return !cartProductIds.includes(productId);
    })
    .slice(0, 8);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#171717] dark:bg-[#111111] dark:text-white">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-200/10 blur-3xl" />

      </div>


      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd600] text-black shadow-sm">

              <FiShoppingBag size={21} />

            </div>


            <div>

              <p className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Shoply
              </p>

              <h1 className="text-3xl font-black tracking-tight text-[#171717] dark:text-white sm:text-4xl">
                Shopping Cart
              </h1>

            </div>

          </div>


          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Review your items, update quantities, and get everything ready
            for checkout.
          </p>

        </div>


        {/* =====================================================
            MAIN CART
        ====================================================== */}

        <div
          className={
            cartItems.length === 0
              ? "grid grid-cols-1"
              : "grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start"
          }
        >

          {/* ===================================================
              CART ITEMS
          ==================================================== */}

          <section
            className={
              cartItems.length === 0
                ? "min-h-[520px] rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_12px_45px_rgba(0,0,0,0.05)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a] sm:p-10"
                : "rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a] sm:p-6"
            }
          >

            {cartItems.length === 0 ? (

              /* =================================================
                  PREMIUM EMPTY CART
              ================================================== */

              <div className="flex min-h-[450px] flex-col items-center justify-center px-4 text-center">


                <div className="relative mb-7">

                  <div className="absolute inset-0 scale-150 rounded-full bg-[#ffd600]/10 blur-2xl" />

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-gray-100 bg-[#fafafa] shadow-[0_12px_35px_rgba(0,0,0,0.06)] dark:border-[#333] dark:bg-[#222]">

                    <FiShoppingBag
                      size={38}
                      strokeWidth={1.5}
                      className="text-[#171717] dark:text-white"
                    />

                  </div>


                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-[#ffd600] text-[10px] font-black text-black dark:border-[#1a1a1a]">
                    0
                  </span>

                </div>



                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                  Your Shopping Bag
                </p>



                <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white sm:text-3xl">
                  Your cart is empty
                </h2>



                <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Discover something you love and add it to your cart.
                  Your selected items will appear here.
                </p>



                <Link
                  to="/products"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#ffd600] px-7 py-3.5 text-sm font-black text-black shadow-[0_8px_20px_rgba(255,214,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5ca00] hover:shadow-[0_12px_25px_rgba(255,214,0,0.3)]"
                >

                  <FiShoppingBag size={17} />

                  Continue Shopping

                  <FiArrowLeft
                    size={16}
                    className="rotate-180"
                  />

                </Link>


                {/* TRUST TEXT */}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">

                  <span>Secure Checkout</span>

                  <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />

                  <span>Easy Returns</span>

                  <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />

                  <span>Quality Products</span>

                </div>

              </div>

            ) : (

              <CartList />

            )}

          </section>


          

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

            <section className="mt-16">

              {/* =================================================
                  SECTION HEADER
              ================================================== */}

              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-[#2a2500] dark:text-yellow-400">

                      <FiStar size={16} />

                    </span>


                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400">
                      Curated for you
                    </span>

                  </div>


                  <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white sm:text-3xl">
                    Suggested for you
                  </h2>


                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    You may also like these picks
                  </p>

                </div>


                {/* =================================================
                    VIEW ALL
                ================================================== */}

                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-gray-900 transition hover:text-yellow-600 dark:text-gray-300 dark:hover:text-yellow-400"
                >

                  View all

                  <FiArrowLeft
                    size={16}
                    className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>

              </div>


              {/* =================================================
                  PRODUCT GRID
              ================================================== */}

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">

                {suggestedProducts.map(
                  (product, index) => (

                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      index={index}
                    />

                  )
                )}

              </div>

            </section>

          )}


        {/* =====================================================
            LOADING STATE
        ====================================================== */}

        {loadingProducts && (

          <section className="mt-16">

            <div className="mb-7">

              <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

              <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

              <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

            </div>


            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

              {[1, 2, 3, 4].map(
                (item) => (

                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#1a1a1a]"
                  >

                    <div className="h-52 animate-pulse bg-gray-100 dark:bg-[#222]" />

                    <div className="space-y-3 p-4">

                      <div className="h-3 w-20 animate-pulse rounded bg-gray-100 dark:bg-[#2a2a2a]" />

                      <div className="h-4 w-full animate-pulse rounded bg-gray-100 dark:bg-[#2a2a2a]" />

                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100 dark:bg-[#2a2a2a]" />

                      <div className="h-5 w-24 animate-pulse rounded bg-gray-100 dark:bg-[#2a2a2a]" />

                      <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-[#2a2a2a]" />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default Cart;