import { useState } from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/cartSlice";
import { toggleWishlist } from "../../redux/wishlistSlice";

import LoginRequiredModal from "../LoginRequiredModal";

function ProductDetails({ product }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [loginAction, setLoginAction] = useState("cart");

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item._id === product._id
  );

  // ================= DISCOUNT =================

  const discount = Math.round(
    product.discountPercentage || 0
  );

  const oldPrice =
    discount > 0
      ? product.price / (1 - discount / 100)
      : null;

  // ================= LOGIN MODAL =================

  const openLoginModal = (action) => {
    setLoginAction(action);
    setShowLoginModal(true);
  };

  // ================= QUANTITY =================

  const handleIncrease = () => {
    setQuantity((prev) =>
      prev < product.stock ? prev + 1 : prev
    );
  };

  const handleDecrease = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  // ================= ADD TO CART =================

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      openLoginModal("cart");
      return;
    }

    for (let i = 0; i < quantity; i += 1) {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
        })
      );
    }
  };

  // ================= WISHLIST =================

  const handleWishlist = () => {
    if (!isLoggedIn) {
      openLoginModal("wishlist");
      return;
    }

    dispatch(toggleWishlist(product));
  };

  return (
    <>
      <div className="flex flex-col px-1 sm:px-2">

        {/* CATEGORY */}

        <div>
          <span className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
            {product.category}
          </span>
        </div>

        {/* TITLE */}

        <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.045em] text-gray-950 dark:text-white sm:text-4xl lg:text-5xl">
          {product.title}
        </h1>

        {/* RATING */}

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">

          <div className="flex items-center gap-2">
            <FiStar
              size={15}
              className="fill-[#f5b800] text-[#f5b800]"
            />

            <span className="text-xs font-black text-gray-900 dark:text-white">
              {product.rating || "4.5"}
            </span>
          </div>

          <span className="h-1 w-1 bg-gray-300 dark:bg-[#444]" />

          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-400">
            Excellent rating
          </span>

          <span className="h-1 w-1 bg-gray-300 dark:bg-[#444]" />

          <span
            className={`text-[10px] font-bold uppercase tracking-[0.08em] ${
              product.stock > 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>

        {/* DESCRIPTION */}

        <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-[15px]">
          {product.description}
        </p>

        {/* PRICE */}

        <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">

          <span className="text-3xl font-black tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl">
            ${Number(product.price).toFixed(2)}
          </span>

          {oldPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ${oldPrice.toFixed(2)}
              </span>

              <span className="bg-[#ffd600] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-black">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* DIVIDER */}

        <div className="my-8 h-px bg-[#deded9] dark:bg-[#292929]" />

        {/* QUANTITY */}

        <div>
          <div className="flex items-center justify-between gap-5">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Quantity
            </p>

            {product.stock > 0 && (
              <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-gray-400">
                {product.stock} available
              </span>
            )}
          </div>

          <div className="mt-3 flex w-fit items-center border border-[#d6d6d1] bg-white dark:border-[#333] dark:bg-[#181818]">

            <button
              type="button"
              onClick={handleDecrease}
              className="flex h-11 w-11 items-center justify-center text-gray-500 transition-colors duration-200 hover:bg-[#f5f5f3] hover:text-black dark:text-gray-400 dark:hover:bg-[#222] dark:hover:text-white"
            >
              <FiMinus size={14} />
            </button>

            <span className="flex h-11 min-w-12 items-center justify-center border-x border-[#d6d6d1] text-sm font-black text-gray-900 dark:border-[#333] dark:text-white">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={product.stock <= 0}
              className="flex h-11 w-11 items-center justify-center text-gray-500 transition-colors duration-200 hover:bg-[#ffd600] hover:text-black disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400"
            >
              <FiPlus size={14} />
            </button>

          </div>
        </div>

        {/* ACTION BUTTONS */}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="group flex min-h-14 flex-1 items-center justify-center gap-3 bg-[#ffd600] px-6 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[#f3ca00] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-[#292929]"
          >
            <FiShoppingCart
              size={17}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {product.stock > 0
              ? "Add to cart"
              : "Out of stock"}
          </button>

          <button
            type="button"
            onClick={handleWishlist}
            className={`flex min-h-14 items-center justify-center gap-3 border px-6 py-4 text-[10px] font-black uppercase tracking-[0.14em] transition-all duration-300 ${
              isWishlisted
                ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
                : "border-[#d6d6d1] bg-white text-gray-800 hover:border-gray-900 hover:text-black dark:border-[#333] dark:bg-[#181818] dark:text-gray-200 dark:hover:border-white dark:hover:text-white"
            }`}
          >
            <FiHeart
              size={17}
              className={
                isWishlisted
                  ? "fill-current"
                  : ""
              }
            />

            {isWishlisted
              ? "Saved"
              : "Wishlist"}
          </button>

        </div>

        {/* FEATURES */}

        <div className="mt-9 grid border-y border-[#deded9] dark:border-[#292929] sm:grid-cols-3">

          <div className="border-b border-[#deded9] px-4 py-5 dark:border-[#292929] sm:border-b-0 sm:border-r">
            <FiTruck
              className="text-green-600 dark:text-green-400"
              size={18}
            />

            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
              Free Delivery
            </p>

            <p className="mt-1.5 text-[10px] leading-4 text-gray-500 dark:text-gray-400">
              Fast delivery to your door
            </p>
          </div>

          <div className="border-b border-[#deded9] px-4 py-5 dark:border-[#292929] sm:border-b-0 sm:border-r">
            <FiShield
              className="text-gray-700 dark:text-gray-300"
              size={18}
            />

            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
              Secure Payment
            </p>

            <p className="mt-1.5 text-[10px] leading-4 text-gray-500 dark:text-gray-400">
              Your payment is protected
            </p>
          </div>

          <div className="px-4 py-5">
            <FiRefreshCw
              className="text-gray-700 dark:text-gray-300"
              size={18}
            />

            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
              Easy Returns
            </p>

            <p className="mt-1.5 text-[10px] leading-4 text-gray-500 dark:text-gray-400">
              Simple return process
            </p>
          </div>

        </div>

        {/* PRODUCT INFO */}

        <div className="mt-8 border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

          <div className="grid grid-cols-2 divide-x divide-[#deded9] dark:divide-[#292929]">

            <div className="px-5 py-5 sm:px-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Brand
              </p>

              <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
                {product.brand || "Shoply"}
              </p>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Availability
              </p>

              <p
                className={`mt-2 flex items-center gap-2 text-sm font-bold ${
                  product.stock > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500"
                }`}
              >
                <FiCheck size={14} />

                {product.stock > 0
                  ? `${product.stock} Available`
                  : "Out of Stock"}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* LOGIN REQUIRED MODAL */}

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() =>
          setShowLoginModal(false)
        }
        action={loginAction}
      />
    </>
  );
}

export default ProductDetails;