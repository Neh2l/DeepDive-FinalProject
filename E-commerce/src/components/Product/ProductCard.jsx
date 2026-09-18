import { useState } from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiEye,
  FiAward,
  FiCheck,
  FiArrowUpRight,
  FiZap,
  FiTruck,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/cartSlice";
import { toggleWishlist } from "../../redux/wishlistSlice";

import LoginRequiredModal from "../LoginRequiredModal";

function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginAction, setLoginAction] = useState("cart");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const wishlistItems = useSelector((state) => state.wishlist.items);

  // ========================================
  // PRODUCT DATA
  // ========================================

  const productId = product._id || product.id;

  const productImage =
    product.images?.[0]?.url ||
    product.images?.[0] ||
    product.thumbnail ||
    product.image ||
    "";

  const normalizedProduct = {
    ...product,
    id: productId,
    image: productImage,
    thumbnail: productImage,
  };

  // ========================================
  // WISHLIST
  // ========================================

  const isWishlisted = wishlistItems.some(
    (item) => (item._id || item.id) === productId,
  );

  // ========================================
  // DISCOUNT
  // ========================================

  const isBestSeller = index < 3;

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  const oldPrice = discount > 0 ? product.price / (1 - discount / 100) : null;

  // ========================================
  // LOGIN MODAL
  // ========================================

  const openLoginModal = (action) => {
    setLoginAction(action);
    setShowLoginModal(true);
  };

  // ========================================
  // ADD TO CART
  // ========================================

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openLoginModal("cart");
      return;
    }

    dispatch(
      addToCart({
        ...normalizedProduct,
        quantity: 1,
      }),
    );
  };

  // ========================================
  // WISHLIST
  // ========================================

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openLoginModal("wishlist");
      return;
    }

    dispatch(toggleWishlist(normalizedProduct));
  };

  return (
    <>
      <article
        className="
          group
          relative
          w-full
          max-w-[290px]
          overflow-hidden
          rounded-[18px]
          border
          border-gray-200
          bg-white
          dark:border-[#2a2a2a]
          dark:bg-[#1a1a1a]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-gray-300
          dark:hover:border-[#3a3a3a]
          hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)]
        "
      >
        {/* IMAGE AREA */}

        <div
          className="
            relative
            h-[250px]
            overflow-hidden
            bg-[#f8f8f8]
            dark:bg-[#202020]
          "
        >
          {/* Background */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,#f8f8f8_65%,#eeeeee_100%)]
              dark:bg-[radial-gradient(circle_at_50%_40%,#292929_0%,#202020_65%,#1a1a1a_100%)]
            "
          />

          {/* Best Seller */}

          {isBestSeller && (
            <div
              className="
                absolute
                left-3
                top-3
                z-20
                flex
                items-center
                gap-1.5
                rounded-full
                bg-gray-950
                px-2.5
                py-1.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.06em]
                text-white
              "
            >
              <FiAward size={11} />
              Best Seller
            </div>
          )}

          {/* Discount */}

          {discount > 0 && (
            <div
              className="
                absolute
                left-3
                top-[43px]
                z-20
                flex
                items-center
                gap-1
                rounded-full
                bg-[#ffd814]
                px-2.5
                py-1
                text-[9px]
                font-black
                text-gray-950
              "
            >
              <FiZap size={10} />
              {discount}% OFF
            </div>
          )}

          {/* Wishlist */}

          <button
            type="button"
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            className={`
              absolute
              right-3
              top-3
              z-30
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-300
              hover:scale-110
              ${
                isWishlisted
                  ? "border-red-100 bg-red-50 text-red-500"
                  : "border-gray-200 bg-white/90 text-gray-600 hover:border-gray-300 hover:text-red-500 dark:border-[#3a3a3a] dark:bg-[#252525]/90 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-red-400"
              }
            `}
          >
            <FiHeart size={16} className={isWishlisted ? "fill-current" : ""} />
          </button>

          {/* Product Image */}

          <Link
            to={`/products/${productId}`}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <img
              src={productImage}
              alt={product.title}
              className="
                relative
                z-10
                h-full
                w-full
                object-contain
                p-8
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.07]
              "
            />
          </Link>

          {/* Quick View */}

          <Link
            to={`/products/${productId}`}
            className="
              absolute
              bottom-3
              left-1/2
              z-30
              flex
              -translate-x-1/2
              translate-y-3
              items-center
              gap-2
              rounded-full
              border
              border-gray-200
              bg-white
              px-4
              py-2
              text-[9px]
              font-extrabold
              uppercase
              tracking-wide
              text-gray-800
              opacity-0
              shadow-lg
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
              dark:border-[#3a3a3a]
              dark:bg-[#252525]
              dark:text-white
            "
          >
            <FiEye size={12} />
            Quick View
          </Link>
        </div>

        {/* PRODUCT CONTENT */}

        <div className="p-4">
          {/* Category + Verified */}

          <div className="mb-2 flex items-center justify-between">
            <span
              className="
                max-w-[150px]
                truncate
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
            >
              {product.category || "Featured"}
            </span>

            <span
              className="
                flex
                items-center
                gap-1
                text-[9px]
                font-bold
                text-emerald-600
                dark:text-emerald-400
              "
            >
              <FiCheck size={10} />
              Verified
            </span>
          </div>

          {/* Product Title */}

          <Link to={`/products/${productId}`}>
            <h3
              className="
                line-clamp-2
                min-h-[42px]
                text-[14px]
                font-extrabold
                leading-[1.45]
                text-gray-950
                dark:text-white
                transition-colors
                duration-300
                group-hover:text-gray-700
                dark:group-hover:text-gray-300
              "
            >
              {product.title}
            </h3>
          </Link>

          {/* Rating */}

          <div className="mt-3 flex items-center gap-2">
            <div
              className="
                flex
                items-center
                gap-1
                rounded-md
                bg-[#fff8d6]
                px-2
                py-1
                text-[10px]
                font-extrabold
                text-gray-900
              "
            >
              {product.rating ? Number(product.rating).toFixed(1) : "4.8"}

              <FiStar size={10} className="fill-[#f5b800] text-[#f5b800]" />
            </div>

            <span className="text-[10px] text-gray-400">Excellent</span>
          </div>

          {/* Price */}

          <div className="mt-3 flex items-end gap-2">
            <span
              className="
                text-[22px]
                font-black
                tracking-[-0.02em]
                text-gray-950
                dark:text-white
              "
            >
              ${Number(product.price).toFixed(2)}
            </span>

            {oldPrice && (
              <span
                className="
                  mb-1
                  text-[11px]
                  font-medium
                  text-gray-400
                  line-through
                "
              >
                ${oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Delivery */}

          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              border-t
              border-gray-100
              dark:border-[#2a2a2a]
              pt-3
            "
          >
            <FiTruck size={14} className="shrink-0 text-gray-500" />

            <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
              Free delivery on eligible orders
            </p>
          </div>

          {/* Add To Cart */}

          <button
            type="button"
            onClick={handleAddToCart}
            className="
              group/cart
              relative
              mt-3
              flex
              w-full
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-xl
              bg-gray-950
              px-4
              py-3
              text-[11px]
              font-extrabold
              text-white
              transition-all
              duration-300
              hover:bg-black
              dark:hover:bg-[#2a2a2a]
              hover:shadow-[0_10px_25px_rgba(0,0,0,0.16)]
              active:scale-[0.98]
            "
          >
            {/* Shine */}

            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[100%]
                w-1/2
                skew-x-[-20deg]
                bg-white/15
                transition-all
                duration-700
                group-hover/cart:left-[130%]
              "
            />

            <FiShoppingCart
              size={14}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover/cart:scale-110
              "
            />

            <span className="relative z-10">Add to Cart</span>

            <FiArrowUpRight
              size={13}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover/cart:translate-x-0.5
                group-hover/cart:-translate-y-0.5
              "
            />
          </button>
        </div>

        {/* Bottom Accent */}

        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-[2px]
            w-0
            -translate-x-1/2
            bg-[#ffd814]
            transition-all
            duration-500
            group-hover:w-1/2
          "
        />
      </article>

      {/* LOGIN REQUIRED MODAL */}

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        action={loginAction}
      />
    </>
  );
}

export default ProductCard;
