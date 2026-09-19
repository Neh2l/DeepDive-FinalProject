import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import ProductGrid from "../../components/Product/ProductGrid";

function FeaturedProducts({ products = [], loading = false }) {
  return (
    <section
      className="
        bg-white
        px-4
        py-14
        dark:bg-[#111111]
        min-[400px]:px-5
        sm:px-8
        sm:py-20
        lg:px-10
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1400px]">

        <div
          className="
            mb-9
            flex
            flex-col
            gap-6
            border-b
            border-gray-200
            pb-7
            dark:border-[#2a2a2a]
            sm:mb-12
            sm:gap-8
            sm:pb-9
            lg:mb-14
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="w-full max-w-[650px]">

            <div
              className="
                mb-4
                flex
                items-center
                gap-2.5
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-gray-400
                dark:text-gray-500
                min-[400px]:text-[8px]
                sm:mb-5
                sm:gap-3
                sm:text-[9px]
              "
            >
              <span className="h-px w-6 bg-[#ffd814] sm:w-8" />

              Featured collection
            </div>

            <h2
              className="
                text-[30px]
                font-medium
                leading-[1.02]
                tracking-[-0.045em]
                text-[#111111]
                dark:text-white
                min-[400px]:text-[33px]
                sm:text-[44px]
                lg:text-[56px]
              "
            >
              Pieces worth
              <br />

              <span className="text-gray-400 dark:text-gray-500">
                discovering.
              </span>
            </h2>

            <p
              className="
                mt-4
                max-w-[500px]
                text-[10px]
                leading-5
                text-gray-500
                dark:text-gray-400
                min-[400px]:text-[11px]
                sm:mt-5
                sm:text-[13px]
                sm:leading-6
              "
            >
              A considered edit of standout pieces, selected
              for their design, quality and everyday appeal.
            </p>
          </div>

          <Link
            to="/products"
            className="
              group
              flex
              w-fit
              items-center
              gap-3
              border-b
              border-black
              pb-2
              text-[8px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-black
              transition-all
              duration-300
              hover:gap-5
              dark:border-white
              dark:text-white
              sm:gap-4
              sm:text-[9px]
              sm:tracking-[0.16em]
            "
          >
            Explore collection

            <FiArrowUpRight
              size={13}
              strokeWidth={1.6}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                sm:w-[14px]
                sm:h-[14px]
              "
            />
          </Link>
        </div>

        <ProductGrid
          products={products.slice(0, 8)}
          loading={loading}
        />

        {!loading && products.length > 0 && (
          <div
            className="
              mt-10
              flex
              justify-center
              sm:mt-16
              lg:mt-20
            "
          >
            <Link
              to="/products"
              className="
                group
                flex
                w-full
                max-w-[260px]
                items-center
                justify-center
                gap-3
                border
                border-black
                px-5
                py-3
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-black
                transition-all
                duration-300
                hover:bg-black
                hover:text-white
                dark:border-white
                dark:text-white
                dark:hover:bg-white
                dark:hover:text-black
                min-[400px]:max-w-[280px]
                sm:w-fit
                sm:max-w-none
                sm:px-8
                sm:py-3.5
                sm:text-[9px]
                sm:tracking-[0.16em]
              "
            >
              View all products

              <FiArrowUpRight
                size={12}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  sm:w-[13px]
                  sm:h-[13px]
                "
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
