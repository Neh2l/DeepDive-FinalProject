import ProductCard from "./ProductCard";

function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div
        className="
          grid
          w-full
          min-w-0
          grid-cols-2
          gap-x-3
          gap-y-8
          px-2
          py-4

          min-[400px]:gap-x-4
          min-[400px]:px-3

          sm:gap-x-5
          sm:gap-y-12
          sm:px-5
          sm:py-6

          md:grid-cols-3
          md:gap-x-6
          md:gap-y-14
          md:px-6
          md:py-7

          lg:gap-x-7
          lg:gap-y-16
          lg:px-7
          lg:py-8

          xl:grid-cols-4
          xl:gap-x-8
          xl:px-8
          xl:py-9
        "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              min-w-0
              w-full
              max-w-full
              overflow-hidden
              bg-white
              dark:bg-[#191919]
            "
          >
            <div
              className="
                aspect-[3/4]
                w-full
                max-w-full
                animate-pulse
                bg-[#eeeeec]
                dark:bg-[#222]
              "
            />

            <div className="min-w-0 space-y-2 px-1 pb-4 pt-3 sm:space-y-3 sm:pb-5 sm:pt-4">
              <div
                className="
                  h-2
                  w-1/3
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#2a2a2a]
                "
              />

              <div
                className="
                  h-3
                  w-4/5
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#2a2a2a]
                "
              />

              <div
                className="
                  h-3
                  w-2/5
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#2a2a2a]
                "
              />

              <div
                className="
                  mt-3
                  h-4
                  w-1/3
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#2a2a2a]
                "
              />

              <div
                className="
                  mt-3
                  h-8
                  w-full
                  animate-pulse
                  bg-gray-200
                  dark:bg-[#2a2a2a]
                "
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[420px]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-white
          dark:bg-[#151515]
        "
      >
        <div className="w-full max-w-md px-6 text-center">
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-gray-400
              dark:text-gray-500
              sm:text-[10px]
              sm:tracking-[0.2em]
            "
          >
            No products found
          </p>

          <p
            className="
              mt-3
              text-[11px]
              leading-5
              text-gray-500
              dark:text-gray-400
              sm:text-[12px]
              sm:leading-6
            "
          >
            Try changing your filters or search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        w-full
        min-w-0
        grid-cols-2
        gap-x-3
        gap-y-9
        px-2
        py-4

        min-[400px]:gap-x-4
        min-[400px]:px-3

        sm:gap-x-5
        sm:gap-y-12
        sm:px-5
        sm:py-6

        md:grid-cols-3
        md:gap-x-6
        md:gap-y-14
        md:px-6
        md:py-7

        lg:gap-x-7
        lg:gap-y-16
        lg:px-7
        lg:py-8

        xl:grid-cols-4
        xl:gap-x-8
        xl:gap-y-16
        xl:px-8
        xl:py-9
      "
    >
      {products.map((product, index) => (
        <div
          key={product._id || product.id}
          className="
            min-w-0
            w-full
            max-w-full
            overflow-hidden
          "
        >
          <ProductCard
            product={product}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;