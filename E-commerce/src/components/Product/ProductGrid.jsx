
import ProductCard from "./ProductCard";

function ProductGrid({ products, loading = false }) {
  // ==========================================
  // LOADING SKELETON
  // ==========================================

  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-2
          justify-items-center
          gap-x-3
          gap-y-5
          sm:grid-cols-2
          sm:gap-x-5
          sm:gap-y-6
          lg:grid-cols-3
          lg:gap-x-5
          lg:gap-y-7
          xl:grid-cols-4
          xl:gap-x-6
        "
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              w-full
              max-w-[290px]
              overflow-hidden
              rounded-[18px]
              border
              border-gray-200
              bg-white
              shadow-[0_5px_20px_rgba(0,0,0,0.04)]
            "
          >
            {/* Image */}

            <div className="h-[250px] animate-pulse bg-gray-100" />

            {/* Content */}

            <div className="space-y-3 p-4">
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-gray-200" />

              <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-3/5 animate-pulse rounded bg-gray-200" />

              <div className="mt-4 h-7 w-1/3 animate-pulse rounded bg-gray-200" />

              <div className="h-10 animate-pulse rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!products || products.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
          rounded-[24px]
          border
          border-dashed
          border-gray-300
          bg-gray-50
        "
      >
        <div className="px-6 text-center">
          <h3 className="text-xl font-black text-gray-900">
            No products found
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Try changing your filters or search term.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PRODUCTS GRID
  // ==========================================

  return (
    <div
      className="
        grid
        grid-cols-2
        justify-items-center
        gap-x-3
        gap-y-5
        sm:grid-cols-2
        sm:gap-x-5
        sm:gap-y-6
        md:grid-cols-3
        md:gap-x-5
        md:gap-y-7
        lg:grid-cols-3
        lg:gap-x-6
        lg:gap-y-8
        xl:grid-cols-4
        xl:gap-x-7
        xl:gap-y-9
      "
    >
      {products.map((product, index) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
