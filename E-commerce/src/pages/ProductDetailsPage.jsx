import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

import { getProductById } from "../Apis/productsApi";

import ProductImages from "../components/Product/ProductImages";
import ProductDetails from "../components/Product/ProductDetails";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        console.log("🔥 PRODUCT DETAILS:", response);

        setProduct(response.data);
      } catch (err) {
        console.error("Product details error:", err);
        setError("We couldn't find this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= LOADING =================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f6f6] dark:bg-[#111111]">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

          <div className="grid gap-8 lg:grid-cols-2">

            <div className="min-h-[500px] animate-pulse rounded-3xl bg-white dark:bg-[#1a1a1a]" />

            <div className="space-y-5 rounded-3xl bg-white p-8 dark:bg-[#1a1a1a]">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

              <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

              <div className="h-20 w-full animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

              <div className="h-10 w-40 animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />

              <div className="h-14 w-full animate-pulse rounded bg-gray-200 dark:bg-[#2a2a2a]" />
            </div>

          </div>
        </div>
      </main>
    );
  }

  // ================= ERROR =================

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f6f6] px-4 dark:bg-[#111111]">

        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
            !
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-950 dark:text-white">
            Product not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            The product you're looking for may have
            been removed or doesn't exist anymore.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-black text-white transition hover:bg-gray-800"
          >
            <FiArrowLeft size={16} />
            Back to products
          </Link>

        </div>
      </main>
    );
  }

  // ================= PRODUCT =================

  return (
    <main className="min-h-screen bg-[#f6f6f6] dark:bg-[#111111]">

      {/* ================= BREADCRUMB ================= */}

      <div className="border-b border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 overflow-hidden text-xs">

            <Link
              to="/"
              className="flex shrink-0 items-center gap-1 font-semibold text-gray-400 transition hover:text-gray-950 dark:hover:text-white"
            >
              <FiHome size={13} />
              Home
            </Link>

            <span className="text-gray-300 dark:text-gray-600">
              /
            </span>

            <Link
              to="/products"
              className="shrink-0 font-semibold text-gray-400 transition hover:text-gray-950 dark:hover:text-white"
            >
              Products
            </Link>

            <span className="text-gray-300 dark:text-gray-600">
              /
            </span>

            <span className="truncate font-bold text-gray-800 dark:text-gray-200">
              {product.title}
            </span>

          </div>

        </div>
      </div>

      {/* ================= PRODUCT CONTENT ================= */}

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">

          {/* IMAGES */}

          <div className="min-w-0">
            <ProductImages product={product} />
          </div>

          {/* DETAILS */}

          <div className="min-w-0 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a] sm:p-8 lg:p-10">
            <ProductDetails product={product} />
          </div>

        </div>

      </section>

      {/* ================= BACK TO PRODUCTS ================= */}

      <div className="mx-auto max-w-[1400px] px-4 pb-12 sm:px-6 lg:px-8">

        <Link
          to="/products"
          className="group inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
        >
          <FiArrowLeft
            size={17}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to all products
        </Link>

      </div>

    </main>
  );
}

export default ProductDetailsPage;