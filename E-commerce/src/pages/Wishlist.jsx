import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiShoppingBag,
  FiShield,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist } from "../redux/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#f7f7f5]
        text-[#171717]
        dark:bg-[#111111]
        dark:text-white
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section
        className="
          border-b
          border-[#dededb]
          bg-white
          dark:border-[#2a2a2a]
          dark:bg-[#151515]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-5
            py-9

            sm:px-8
            sm:py-11

            lg:px-10

            xl:px-12
          "
        >
          {/* BACK */}

          <Link
            to="/products"
            className="
              group
              mb-9
              inline-flex
              items-center
              gap-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-gray-500
              transition-colors
              duration-200
              hover:text-gray-950
              dark:text-gray-400
              dark:hover:text-white
            "
          >
            <FiArrowLeft
              size={14}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
            />

            Continue shopping
          </Link>

          {/* HEADER CONTENT */}

          <div
            className="
              flex
              flex-col
              gap-6

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              {/* EYEBROW */}

              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#e5b900]
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
                  Saved for later
                </span>
              </div>

              {/* TITLE */}

              <h1
                className="
                  text-[34px]
                  font-semibold
                  leading-none
                  tracking-[-0.045em]
                  text-[#111]

                  sm:text-[44px]

                  dark:text-white
                "
              >
                Wishlist
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-4
                  max-w-xl
                  text-[12px]
                  leading-6
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Keep the products you love close.
                Move them to your cart whenever
                you're ready.
              </p>
            </div>

            {/* WISHLIST COUNT */}

            {wishlistItems.length > 0 && (
              <div
                className="
                  flex
                  items-center
                  gap-4
                  border
                  border-[#dededb]
                  bg-[#fafafa]
                  px-5
                  py-4

                  dark:border-[#2a2a2a]
                  dark:bg-[#1b1b1b]
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    bg-white
                    text-[#e04a4a]

                    dark:bg-[#242424]
                    dark:text-red-400
                  "
                >
                  <FiHeart size={15} />
                </div>

                <div>
                  <p
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-gray-950
                      dark:text-white
                    "
                  >
                    {wishlistItems.length}{" "}
                    {wishlistItems.length === 1
                      ? "product"
                      : "products"}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      text-gray-400
                    "
                  >
                    Saved in your wishlist
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section
        className="
          mx-auto
          max-w-[1500px]
          px-5
          py-10

          sm:px-8
          sm:py-12

          lg:px-10

          xl:px-12
        "
      >
        {wishlistItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* =================================================
                TOOLBAR
            ================================================== */}

            <div
              className="
                mb-8
                flex
                flex-col
                gap-4
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
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-[#ffd600]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-gray-400
                    "
                  >
                    Your selection
                  </span>
                </div>

                <h2
                  className="
                    text-[24px]
                    font-semibold
                    tracking-[-0.035em]
                    text-[#111]
                    dark:text-white
                  "
                >
                  Saved products
                </h2>

                <p
                  className="
                    mt-2
                    text-[11px]
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Your favorites are waiting for you.
                </p>
              </div>

              {/* DISCOVER MORE */}

              <Link
                to="/products"
                className="
                  group
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-gray-800
                  transition-colors
                  duration-200
                  hover:text-gray-500
                  dark:text-gray-300
                  dark:hover:text-white
                "
              >
                Discover more

                <FiArrowRight
                  size={13}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
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

                  sm:grid-cols-2
                  sm:gap-x-6
                  sm:gap-y-14
                  sm:p-7

                  lg:grid-cols-3
                  lg:gap-x-7
                  lg:gap-y-16
                  lg:p-9

                  xl:grid-cols-4
                  xl:gap-x-8
                  xl:p-10
                "
              >
                {wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-0 w-full"
                  >
                    <WishlistCard
                      product={product}
                      onMoveToCart={handleMoveToCart}
                      onRemove={handleRemove}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                SERVICE FEATURES
            ================================================== */}

            <div
              className="
                mt-12
                grid
                overflow-hidden
                border
                border-[#dededb]
                bg-white

                dark:border-[#2a2a2a]
                dark:bg-[#171717]

                sm:grid-cols-3
              "
            >
              <ServiceFeature
                icon={<FiTruck />}
                title="Fast delivery"
                text="Quick and reliable delivery."
              />

              <ServiceFeature
                icon={<FiShield />}
                title="Secure shopping"
                text="Your account stays protected."
              />

              <ServiceFeature
                icon={<FiCheck />}
                title="Easy shopping"
                text="Save now, buy whenever you're ready."
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

/* =====================================================
   WISHLIST CARD
===================================================== */

function WishlistCard({
  product,
  onMoveToCart,
  onRemove,
}) {
  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  const originalPrice =
    discount > 0
      ? product.price / (1 - discount / 100)
      : null;

  return (
    <article
      className="
        group
        relative
        min-w-0
        overflow-hidden
        bg-white

        dark:bg-[#191919]
      "
    >
      {/* =================================================
          PRODUCT IMAGE
      ================================================== */}

      <div
        className="
          relative
          aspect-[3/4]
          overflow-hidden
          bg-[#f3f3f1]

          dark:bg-[#222]
        "
      >
        <Link
          to={`/products/${product.id}`}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <img
            src={
              product.thumbnail ||
              product.images?.[0]
            }
            alt={product.title}
            className="
              h-full
              w-full
              object-contain
              p-5
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.035]
            "
          />
        </Link>

        {/* DISCOUNT */}

        {discount > 0 && (
          <span
            className="
              absolute
              left-3
              top-3
              bg-[#111]
              px-2.5
              py-1.5
              text-[8px]
              font-black
              uppercase
              tracking-[0.06em]
              text-white
            "
          >
            -{discount}%
          </span>
        )}

        {/* REMOVE */}

        <button
          type="button"
          onClick={() => onRemove(product.id)}
          aria-label="Remove from wishlist"
          className="
            absolute
            right-3
            top-3
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            border
            border-gray-200
            bg-white/95
            text-gray-500
            backdrop-blur
            transition-all
            duration-200

            hover:border-red-200
            hover:bg-white
            hover:text-red-500

            dark:border-[#333]
            dark:bg-[#191919]/95
            dark:text-gray-400
            dark:hover:border-red-900/40
            dark:hover:bg-[#111]
            dark:hover:text-red-400
          "
        >
          <FiTrash2 size={14} />
        </button>

        {/* QUICK VIEW */}

        <Link
          to={`/products/${product.id}`}
          className="
            absolute
            bottom-0
            left-0
            right-0
            z-20
            flex
            translate-y-full
            items-center
            justify-center
            gap-2
            bg-white/95
            py-3
            text-[9px]
            font-bold
            uppercase
            tracking-[0.13em]
            text-gray-900
            backdrop-blur-sm
            transition-transform
            duration-300
            group-hover:translate-y-0

            dark:bg-[#181818]/95
            dark:text-white
          "
        >
          View product

          <FiArrowRight size={12} />
        </Link>
      </div>

      {/* =================================================
          PRODUCT INFO
      ================================================== */}

      <div className="px-1 pb-5 pt-4">
        {/* CATEGORY */}

        <p
          className="
            mb-1.5
            truncate
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-gray-400
            dark:text-gray-500
          "
        >
          {product.category}
        </p>

        {/* TITLE */}

        <Link
          to={`/products/${product.id}`}
        >
          <h2
            className="
              line-clamp-2
              min-h-[42px]
              text-[14px]
              font-medium
              leading-[1.4]
              text-gray-900
              transition-colors
              duration-300
              hover:text-gray-500

              dark:text-white
              dark:hover:text-gray-300
            "
          >
            {product.title}
          </h2>
        </Link>

        {/* RATING */}

        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span
              className="
                text-[10px]
                font-semibold
                text-gray-700
                dark:text-gray-300
              "
            >
              {product.rating?.toFixed(1) ||
                "4.5"}
            </span>

            <span
              className="
                text-[11px]
                text-[#e3b400]
              "
            >
              ★
            </span>
          </div>

          <span
            className="
              text-[9px]
              text-gray-400
            "
          >
            {product.stock || 0} available
          </span>
        </div>

        {/* PRICE */}

        <div className="mt-3 flex items-baseline gap-2">
          <span
            className="
              text-[17px]
              font-bold
              tracking-[-0.01em]
              text-gray-950

              dark:text-white
            "
          >
            ${product.price?.toFixed(2)}
          </span>

          {originalPrice && (
            <span
              className="
                text-[11px]
                font-normal
                text-gray-400
                line-through
              "
            >
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* ACTIONS */}

        <div className="mt-4 flex gap-2">
          {/* MOVE TO CART */}

          <button
            type="button"
            onClick={() =>
              onMoveToCart(product)
            }
            className="
              group/button
              flex
              min-w-0
              flex-1
              items-center
              justify-center
              gap-2
              border
              border-gray-900
              bg-white
              px-3
              py-2.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-gray-900
              transition-all
              duration-300

              hover:bg-gray-900
              hover:text-white

              active:scale-[0.99]

              dark:border-white
              dark:bg-transparent
              dark:text-white
              dark:hover:bg-white
              dark:hover:text-black
            "
          >
            <FiShoppingBag
              size={13}
              className="
                shrink-0
                transition-transform
                duration-200
                group-hover/button:scale-110
              "
            />

            <span className="truncate">
              Move to cart
            </span>
          </button>

          {/* DETAILS */}

          <Link
            to={`/products/${product.id}`}
            aria-label="View product details"
            className="
              flex
              h-[38px]
              w-[38px]
              shrink-0
              items-center
              justify-center
              border
              border-gray-200
              bg-white
              text-gray-600
              transition-all
              duration-300

              hover:border-gray-950
              hover:bg-gray-950
              hover:text-white

              dark:border-[#333]
              dark:bg-[#191919]
              dark:text-gray-300
              dark:hover:border-white
              dark:hover:bg-white
              dark:hover:text-gray-950
            "
          >
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =====================================================
   EMPTY WISHLIST
===================================================== */

function EmptyWishlist() {
  return (
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
          relative
          flex
          min-h-[540px]
          flex-col
          items-center
          justify-center
          overflow-hidden
          px-6
          py-20
          text-center
        "
      >
        {/* TOP ACCENT */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-1
            bg-[#ffd814]
          "
        />

        {/* SUBTLE BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-[#fff8d6]/60
            blur-3xl

            dark:bg-[#2a2500]/20
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-32
            h-80
            w-80
            rounded-full
            bg-[#f3f3f1]
            blur-3xl

            dark:bg-[#222]
          "
        />

        {/* ICON */}

        <div
          className="
            relative
            mb-8
            flex
            h-20
            w-20
            items-center
            justify-center
            border
            border-[#dededb]
            bg-[#fafafa]
            text-[#d6aa00]

            dark:border-[#333]
            dark:bg-[#202020]
            dark:text-[#e5b900]
          "
        >
          <FiHeart
            size={31}
            strokeWidth={1.5}
          />
        </div>

        {/* EYEBROW */}

        <span
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-gray-400
          "
        >
          Saved for later
        </span>

        {/* TITLE */}

        <h2
          className="
            mt-3
            text-[29px]
            font-semibold
            tracking-[-0.04em]
            text-gray-950

            sm:text-[36px]

            dark:text-white
          "
        >
          Your wishlist is waiting
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            max-w-lg
            text-[12px]
            leading-6
            text-gray-500
            dark:text-gray-400
          "
        >
          Save the products you love and keep
          them ready for your next shopping trip.
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
            bg-[#ffd814]
            px-8
            py-3.5
            text-[9px]
            font-black
            uppercase
            tracking-[0.13em]
            text-gray-950
            transition-all
            duration-300

            hover:bg-[#f7ca00]

            active:scale-[0.99]
          "
        >
          <FiShoppingBag
            size={15}
            className="
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />

          Start shopping

          <FiArrowRight
            size={15}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>

        {/* BOTTOM INFO */}

        <div
          className="
            mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-7
            gap-y-3
            border-t
            border-gray-100
            pt-6
            text-[8px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-gray-400

            dark:border-[#292929]
          "
        >
          <span className="flex items-center gap-2">
            <FiHeart
              size={12}
              className="text-red-400"
            />

            Save favorites
          </span>

          <span
            className="
              hidden
              h-1
              w-1
              rounded-full
              bg-gray-300

              sm:block
            "
          />

          <span className="flex items-center gap-2">
            <FiTruck
              size={12}
              className="text-gray-500"
            />

            Fast delivery
          </span>

          <span
            className="
              hidden
              h-1
              w-1
              rounded-full
              bg-gray-300

              sm:block
            "
          />

          <span className="flex items-center gap-2">
            <FiShield
              size={12}
              className="text-gray-500"
            />

            Secure shopping
          </span>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   SERVICE FEATURE
===================================================== */

function ServiceFeature({
  icon,
  title,
  text,
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        border-b
        border-gray-100
        px-6
        py-7
        transition-colors
        duration-200
        last:border-b-0
        hover:bg-[#fafafa]

        dark:border-[#2a2a2a]
        dark:hover:bg-[#202020]

        sm:border-b-0
        sm:border-r
        sm:last:border-r-0
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          border
          border-[#dededb]
          bg-[#fafafa]
          text-gray-800
          transition-transform
          duration-200
          group-hover:scale-105

          dark:border-[#333]
          dark:bg-[#202020]
          dark:text-white
        "
      >
        {icon}
      </div>

      <div>
        <h3
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.08em]
            text-gray-950
            dark:text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-[10px]
            leading-5
            text-gray-500
            dark:text-gray-400
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default Wishlist;