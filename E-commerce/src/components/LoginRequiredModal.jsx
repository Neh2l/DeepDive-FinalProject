import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiShoppingCart,
  FiX,
  FiShield,
} from "react-icons/fi";

function LoginRequiredModal({
  isOpen,
  onClose,
  action = "cart",
}) {
  if (!isOpen) {
    return null;
  }

  const isWishlist = action === "wishlist";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] animate-[modalIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-200 hover:rotate-90 hover:bg-gray-100 hover:text-gray-900"
        >
          <FiX size={18} />
        </button>

        <div className="px-6 pb-7 pt-10 sm:px-8">
          {/* Icon */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            <div
              className={`absolute inset-0 rounded-[24px] blur-xl ${
                isWishlist
                  ? "bg-red-200/50"
                  : "bg-yellow-200/60"
              }`}
            />

            <div
              className={`relative flex h-20 w-20 items-center justify-center rounded-[24px] border ${
                isWishlist
                  ? "border-red-100 bg-red-50 text-red-500"
                  : "border-yellow-100 bg-yellow-50 text-yellow-600"
              }`}
            >
              {isWishlist ? (
                <FiHeart
                  size={34}
                  className="fill-red-100"
                />
              ) : (
                <FiShoppingCart size={34} />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="mt-7 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              Almost there
            </span>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Login required
            </h2>

            <p className="mx-auto mt-3 max-w-[340px] text-sm leading-6 text-gray-500">
              {isWishlist
                ? "Sign in to save your favorite products and access your wishlist anytime."
                : "Sign in to add products to your cart and continue shopping with Shoply."}
            </p>
          </div>

          {/* Mini Trust */}
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
              <FiShield size={14} />
            </div>

            <span className="text-[10px] font-bold text-gray-500">
              Your shopping experience is secure
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <Link
              to="/login"
              onClick={onClose}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3.5 text-sm font-black text-gray-950 shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/25 active:scale-[0.98]"
            >
              Sign In

              <FiArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/signup"
              onClick={onClose}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
            >
              Create Account

              <FiArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Continue */}
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full text-center text-xs font-bold text-gray-400 transition-colors hover:text-gray-700"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRequiredModal;