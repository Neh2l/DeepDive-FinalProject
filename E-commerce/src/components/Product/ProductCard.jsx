
import { useState } from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiEye,
  FiAward,
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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

  const oldPrice =
    discount > 0
      ? product.price / (1 - discount / 100)
      : null;

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

    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart.`,
    });
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

    if (isWishlisted) {
      toast("Removed from wishlist", {
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      toast.success("Added to wishlist", {
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  return (
    <>
      <article
        className="
          group
          relative
          w-full
          max-w-[300px]
          overflow-hidden
          bg-white
          dark:bg-[#1a1a1a]
        "
      >

        {/* =====================================================
            IMAGE
        ====================================================== */}

        <div
          className="
            relative
            aspect-[3/4]
            overflow-hidden
            bg-[#f5f5f5]
            dark:bg-[#222]
          "
        >

          {/* IMAGE BACKGROUND */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#f5f5f5]
              dark:bg-[#222]
            "
          />

          {/* PRODUCT IMAGE */}

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
                p-5
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.035]
              "
            />
          </Link>

          {/* =================================================
              TOP LEFT BADGES
          ================================================== */}

          <div
            className="
              absolute
              left-3
              top-3
              z-20
              flex
              flex-col
              items-start
              gap-1.5
            "
          >

            {isBestSeller && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  bg-white
                  px-2.5
                  py-1.5
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-gray-900
                  shadow-sm
                "
              >
                <FiAward size={10} />
                Best Seller
              </span>
            )}

            {discount > 0 && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  bg-[#ffd814]
                  px-2.5
                  py-1.5
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.04em]
                  text-gray-950
                "
              >
                <FiZap size={9} />
                -{discount}%
              </span>
            )}

          </div>

          {/* =================================================
              WISHLIST
          ================================================== */}

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
              bg-white/95
              text-gray-800
              transition-all
              duration-300
              hover:bg-white
              hover:text-red-500
              hover:scale-105
              dark:bg-[#1b1b1b]/95
              dark:text-white
              dark:hover:bg-[#111]
              dark:hover:text-red-400
              ${
                isWishlisted
                  ? "text-red-500 dark:text-red-400"
                  : ""
              }
            `}
          >
            <FiHeart
              size={17}
              className={isWishlisted ? "fill-current" : ""}
            />
          </button>

          {/* =================================================
              QUICK VIEW
          ================================================== */}

          <Link
            to={`/products/${productId}`}
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-30
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
              tracking-[0.12em]
              text-gray-900
              backdrop-blur-sm
              transition-transform
              duration-300
              group-hover:translate-y-0
              dark:bg-[#181818]/95
              dark:text-white
            "
          >
            <FiEye size={12} />
            Quick View
          </Link>

        </div>

        {/* =====================================================
            PRODUCT INFORMATION
        ====================================================== */}

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
            {product.category || "Featured"}
          </p>

          {/* TITLE */}

          <Link to={`/products/${productId}`}>
            <h3
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
            </h3>
          </Link>

          {/* =================================================
              RATING
          ================================================== */}

          <div className="mt-2.5 flex items-center gap-2">

            <div className="flex items-center gap-1">

              <FiStar
                size={11}
                className="fill-[#f5b800] text-[#f5b800]"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                {product.rate !== undefined &&
                product.rate !== null
                  ? Number(product.rate).toFixed(1)
                  : "0.0"}
              </span>

            </div>

            <span
              className="
                text-[9px]
                text-gray-400
              "
            >
              Excellent
            </span>

          </div>

          {/* =================================================
              PRICE
          ================================================== */}

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
              ${Number(product.price).toFixed(2)}
            </span>

            {oldPrice && (
              <span
                className="
                  text-[11px]
                  font-normal
                  text-gray-400
                  line-through
                "
              >
                ${oldPrice.toFixed(2)}
              </span>
            )}

          </div>

          {/* =================================================
              DELIVERY
          ================================================== */}

          <div
            className="
              mt-2.5
              flex
              items-center
              gap-1.5
            "
          >

            <span
              className="
                text-[9px]
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              Free delivery
            </span>

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-gray-300
              "
            />

            <span
              className="
                text-[9px]
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              Easy returns
            </span>

          </div>

          {/* =================================================
              ADD TO CART
          ================================================== */}

          <button
            type="button"
            onClick={handleAddToCart}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-2
              border
              border-gray-900
              bg-white
              px-4
              py-2.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
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

            <FiShoppingCart
              size={13}
            />

            Add to bag

            <FiArrowUpRight
              size={12}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />

          </button>

        </div>

      </article>

      {/* =====================================================
          LOGIN REQUIRED MODAL
      ====================================================== */}

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        action={loginAction}
      />
    </>
  );
}

export default ProductCard;
