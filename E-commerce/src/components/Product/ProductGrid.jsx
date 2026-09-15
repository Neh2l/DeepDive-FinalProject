import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
          (item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
            >
              <div className="h-52 animate-pulse bg-gray-100" />

              <div className="space-y-3 p-4">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                <div className="h-6 w-24 animate-pulse rounded bg-gray-100" />
                <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
        <h3 className="text-xl font-black text-gray-900">
          No products found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}

export default ProductGrid;