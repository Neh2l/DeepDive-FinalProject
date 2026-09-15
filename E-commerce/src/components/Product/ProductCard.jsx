
import { useState } from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiEye,
  FiAward,
  FiCheck,
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

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const isBestSeller = index < 3;

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  const oldPrice =
    discount > 0
      ? product.price / (1 - discount / 100)
      : null;

  const openLoginModal = (action) => {
    setLoginAction(action);
    setShowLoginModal(true);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openLoginModal("cart");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openLoginModal("wishlist");
      return;
    }

    dispatch(toggleWishlist(product));
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-yellow-200 hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]">
        {isBestSeller ? (
          <span className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-md bg-black px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-yellow-400 shadow-md">
            <FiAward size={11} />
            Best seller
          </span>
        ) : discount > 10 ? (
          <span className="absolute left-3 top-3 z-20 rounded-md bg-red-500 px-2.5 py-1 text-[10px] font-black text-white shadow-md">
            -{discount}%
          </span>
        ) : null}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 ${
            isWishlisted
              ? "text-red-500"
              : "text-gray-500 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <FiHeart
            size={17}
            className={
              isWishlisted ? "fill-current" : ""
            }
          />
        </button>

        <Link
          to={`/products/${product.id}`}
          className="block"
        >
          <div className="relative flex h-52 items-center justify-center overflow-hidden bg-white p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-yellow-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/0 blur-3xl transition-all duration-700 group-hover:bg-yellow-300/20" />

            <img
              src={product.thumbnail || product.image}
              alt={product.title}
              className="relative z-10 h-full w-full object-contain transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-2"
            />

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 translate-y-12 items-center gap-2 whitespace-nowrap rounded-full bg-black px-4 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <FiEye size={14} />
              Quick view
            </div>

            <div className="absolute bottom-0 left-1/2 z-20 h-1 w-0 -translate-x-1/2 rounded-full bg-yellow-400 transition-all duration-500 group-hover:w-20" />
          </div>
        </Link>

        <div className="p-4">
          <Link to={`/products/${product.id}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 transition-colors group-hover:text-yellow-600">
              {product.category}
            </span>

            <h3 className="mt-1 min-h-[40px] line-clamp-2 text-sm font-bold leading-5 text-gray-800 transition-colors group-hover:text-black">
              {product.title}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-1">
            <FiStar
              size={13}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-xs font-black">
              {product.rating || "4.5"}
            </span>

            <span className="text-[10px] text-gray-400">
              Excellent
            </span>
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-lg font-black text-gray-900 transition-colors group-hover:text-yellow-600">
              ${Number(product.price).toFixed(2)}
            </span>

            {oldPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                ${oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-green-600">
            <FiCheck size={12} />
            FREE DELIVERY
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-xs font-bold text-gray-800 transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black hover:shadow-md"
          >
            <FiShoppingCart size={14} />
            Add to cart
          </button>
        </div>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        action={loginAction}
      />
    </>
  );
}

export default ProductCard;
