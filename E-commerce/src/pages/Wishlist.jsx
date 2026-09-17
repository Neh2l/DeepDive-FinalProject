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
    <main className="min-h-screen bg-[#f7f7f7] text-gray-900 dark:bg-[#111111] dark:text-white">
      {/* ================= HEADER ================= */}
      <section className="border-b border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#111111]">
        <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="group mb-7 inline-flex items-center gap-2 text-xs font-bold text-gray-500 transition-colors duration-200 hover:text-gray-950 dark:hover:text-white"
          >
            <FiArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Continue Shopping
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
                  <FiHeart
                    size={18}
                    className="fill-red-500"
                  />
                </div>

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">
                  Saved for later
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-[-0.03em] text-gray-950 dark:text-white sm:text-5xl">
                Wishlist
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                Keep the products you love close. Move them to your
                cart whenever you're ready.
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm dark:bg-[#222] dark:text-red-400">
                  <FiHeart size={15} />
                </div>

                <div>
                  <p className="text-xs font-black text-gray-950 dark:text-white">
                    {wishlistItems.length}{" "}
                    {wishlistItems.length === 1
                      ? "product"
                      : "products"}
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Saved in your wishlist
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        {wishlistItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* TOOLBAR */}
            <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-[#2a2a2a]">
              <div>
                <h2 className="text-base font-black text-gray-950 dark:text-white">
                  Your saved products
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Your favorites are waiting for you.
                </p>
              </div>

              <Link
                to="/products"
                className="group flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-gray-600 transition-colors duration-200 hover:bg-white hover:text-gray-950 dark:text-gray-300 dark:hover:bg-[#1a1a1a] dark:hover:text-white"
              >
                Discover more
                <FiArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* PRODUCTS */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((product) => (
                <WishlistCard
                  key={product.id}
                  product={product}
                  onMoveToCart={handleMoveToCart}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* SERVICE FEATURES */}
            <div className="mt-12 grid overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#1a1a1a] sm:grid-cols-3">
              <ServiceFeature
                icon={<FiTruck />}
                title="Fast Delivery"
                text="Quick and reliable delivery."
              />

              <ServiceFeature
                icon={<FiShield />}
                title="Secure Shopping"
                text="Your account stays protected."
              />

              <ServiceFeature
                icon={<FiCheck />}
                title="Easy Shopping"
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
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:hover:border-[#3a3a3a]">
      {/* PRODUCT IMAGE */}
      <div className="relative overflow-hidden bg-[#fafafa] dark:bg-[#171717]">
        <Link
          to={`/products/${product.id}`}
          className="block"
        >
          <div className="flex h-[285px] items-center justify-center p-7">
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* DISCOUNT */}
        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-md bg-[#111111] px-2.5 py-1.5 text-[10px] font-black tracking-wide text-white">
            -{discount}%
          </span>
        )}

        {/* REMOVE */}
        <button
          type="button"
          onClick={() => onRemove(product.id)}
          aria-label="Remove from wishlist"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-500 shadow-sm backdrop-blur transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]/95 dark:text-gray-400 dark:hover:border-red-900/40 dark:hover:bg-red-950/30 dark:hover:text-red-400"
        >
          <FiTrash2 size={15} />
        </button>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-5">
        {/* CATEGORY */}
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
          {product.category}
        </p>

        {/* TITLE */}
        <Link
          to={`/products/${product.id}`}
          className="mt-2 block"
        >
          <h2 className="line-clamp-2 min-h-[44px] text-[15px] font-black leading-5 text-gray-950 transition-colors duration-200 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
            {product.title}
          </h2>
        </Link>

        {/* RATING */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-[#fff8d6] px-2 py-1 dark:bg-[#2a2500]">
            <span className="text-[11px] font-black text-gray-950 dark:text-white">
              {product.rating?.toFixed(1) || "4.5"}
            </span>

            <span className="text-[11px] text-yellow-500">
              ★
            </span>
          </div>

          <span className="text-[11px] text-gray-400">
            {product.stock || 0} available
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-black tracking-tight text-gray-950 dark:text-white">
            ${product.price?.toFixed(2)}
          </span>

          {originalPrice && (
            <span className="text-xs font-medium text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => onMoveToCart(product)}
            className="group/button flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ffd814] px-3 py-3 text-xs font-black text-gray-950 transition-all duration-200 hover:bg-[#f7ca00] hover:shadow-md active:scale-[0.98]"
          >
            <FiShoppingBag
              size={15}
              className="shrink-0 transition-transform duration-200 group-hover/button:scale-110"
            />

            <span className="truncate">
              Move to Cart
            </span>
          </button>

          <Link
            to={`/products/${product.id}`}
            aria-label="View product details"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-gray-950 hover:bg-gray-950 hover:text-white dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-gray-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-gray-950"
          >
            <FiArrowRight size={16} />
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
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
      <div className="relative flex min-h-[560px] flex-col items-center justify-center px-6 py-20 text-center">
        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50 blur-3xl dark:bg-red-950/20" />

        {/* ICON */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-red-100 bg-red-50 text-red-500 shadow-sm dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
          <FiHeart
            size={38}
            className="fill-red-100"
          />
        </div>

        <span className="relative mt-8 text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">
          Your wishlist is empty
        </span>

        <h2 className="relative mt-3 text-3xl font-black tracking-[-0.03em] text-gray-950 dark:text-white sm:text-4xl">
          Nothing saved yet.
        </h2>

        <p className="relative mt-4 max-w-lg text-sm leading-7 text-gray-500 dark:text-gray-400">
          When you find something you love, tap the heart icon
          and we'll keep it here for you.
        </p>

        <Link
          to="/products"
          className="group relative mt-8 inline-flex items-center gap-3 rounded-xl bg-gray-950 px-7 py-4 text-xs font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-xl"
        >
          Explore Products

          <FiArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
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
    <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-6 last:border-b-0 dark:border-[#2a2a2a] sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff8d6] text-gray-950 dark:bg-[#2a2500] dark:text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-gray-950 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Wishlist;