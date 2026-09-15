import { FiArrowRight, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

import ProductGrid from "../../components/Product/ProductGrid";

function FeaturedProducts({ products = [], loading = false }) {
  return (
    <section className="bg-[#f6f6f6] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400">

              <FiStar className="fill-[#ffd814] text-[#ffd814]" />

              Top picks for you

            </div>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Discover some of our highest-rated products, selected
              for a better shopping experience.
            </p>

          </div>

          <Link
            to="/products"
            className="group flex w-fit items-center gap-2 text-sm font-bold text-gray-700 transition hover:text-gray-950"
          >
            Explore all

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>

        {/* PRODUCTS */}
        <ProductGrid
          products={products.slice(0, 8)}
          loading={loading}
        />

      </div>
    </section>
  );
}

export default FeaturedProducts;