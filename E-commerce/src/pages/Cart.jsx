
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
    <div className="min-h-screen bg-[#f6f6f6] text-[#171717]">

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

              <h1 className="text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
                Shopping Cart
              </h1>

            </div>

          </div>


          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Review your items, update quantities, and get everything ready
            for checkout.
          </p>

        </div>


        {/* =====================================================
            MAIN CART
        ====================================================== */}

        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">

          {/* ===================================================
              CART ITEMS
          ==================================================== */}

          <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-6">

            <CartList />

          </section>


          {/* ===================================================
              ORDER SUMMARY
          ==================================================== */}

          <aside className="lg:sticky lg:top-6">

            <CartSummary />

          </aside>

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

                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">

                      <FiStar size={16} />

                    </span>


                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400">
                      Curated for you
                    </span>

                  </div>


                  <h2 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                    Suggested for you
                  </h2>


                  <p className="mt-1 text-sm text-gray-500">
                    You may also like these picks
                  </p>

                </div>


                {/* =================================================
                    VIEW ALL
                ================================================== */}

                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-gray-900 transition hover:text-yellow-600"
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

              <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200" />

              <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200" />

            </div>


            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

              {[1, 2, 3, 4].map(
                (item) => (

                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                  >

                    <div className="h-52 animate-pulse bg-gray-100" />

                    <div className="space-y-3 p-4">

                      <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />

                      <div className="h-4 w-full animate-pulse rounded bg-gray-100" />

                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />

                      <div className="h-5 w-24 animate-pulse rounded bg-gray-100" />

                      <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100" />

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
