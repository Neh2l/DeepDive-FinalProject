import { createPortal } from "react-dom";
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

  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        min-h-screen
        items-center
        justify-center
        overflow-y-auto
        bg-black/55
        px-4
        py-6
        backdrop-blur-[6px]
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          my-auto
          w-full
          max-w-[430px]
          overflow-hidden
          rounded-[28px]
          border
          border-gray-200
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.28)]
          animate-[modalIn_0.3s_ease-out]
          dark:border-[#2a2a2a]
          dark:bg-[#1a1a1a]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute left-0 right-0 top-0 h-[3px] bg-[#ffd814]" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute
            right-4
            top-4
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-gray-50
            text-gray-400
            transition-all
            duration-300
            hover:rotate-90
            hover:bg-black
            hover:text-white
            dark:bg-[#222]
            dark:text-gray-400
            dark:hover:bg-white
            dark:hover:text-black
          "
        >
          <FiX size={17} />
        </button>

        <div className="px-5 pb-6 pt-9 sm:px-8 sm:pb-8 sm:pt-10">
          <div className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center sm:h-20 sm:w-20">
            <div
              className={`absolute inset-0 rounded-[22px] blur-xl ${
                isWishlist
                  ? "bg-red-200/50"
                  : "bg-yellow-200/60"
              }`}
            />

            <div
              className={`
                relative
                flex
                h-[72px]
                w-[72px]
                items-center
                justify-center
                rounded-[22px]
                border
                sm:h-20
                sm:w-20
                ${
                  isWishlist
                    ? "border-red-100 bg-red-50 text-red-500 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
                    : "border-yellow-100 bg-yellow-50 text-yellow-600 dark:border-yellow-900/40 dark:bg-yellow-950/30 dark:text-yellow-400"
                }
              `}
            >
              {isWishlist ? (
                <FiHeart
                  size={30}
                  className="fill-red-100 sm:h-[34px] sm:w-[34px]"
                />
              ) : (
                <FiShoppingCart
                  size={30}
                  className="sm:h-[34px] sm:w-[34px]"
                />
              )}
            </div>
          </div>

          <div className="mt-6 text-center sm:mt-7">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 sm:text-[10px]">
              Almost there
            </span>

            <h2 className="mt-2 text-[25px] font-black tracking-[-0.04em] text-gray-950 sm:text-3xl dark:text-white">
              Login required
            </h2>

            <p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-6 text-gray-500 sm:text-sm dark:text-gray-400">
              {isWishlist
                ? "Sign in to save your favorite products and access your wishlist anytime."
                : "Sign in to add products to your cart and continue shopping with Shoply."}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 sm:mt-6 sm:px-4 dark:border-[#2a2a2a] dark:bg-[#171717]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm dark:bg-[#222]">
              <FiShield size={14} />
            </div>

            <span className="text-[9px] font-bold text-gray-500 sm:text-[10px] dark:text-gray-400">
              Your shopping experience is secure
            </span>
          </div>

          <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
            <Link
              to="/login"
              onClick={onClose}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#ffd814]
                py-3
                text-[13px]
                font-black
                text-gray-950
                shadow-lg
                shadow-yellow-400/20
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#ffe34f]
                hover:shadow-xl
                active:scale-[0.98]
                sm:py-3.5
                sm:text-sm
              "
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
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                py-3
                text-[13px]
                font-bold
                text-gray-700
                transition-all
                duration-300
                hover:border-gray-300
                hover:bg-gray-50
                sm:py-3.5
                sm:text-sm
                dark:border-[#2a2a2a]
                dark:bg-[#171717]
                dark:text-gray-200
                dark:hover:border-gray-500
                dark:hover:bg-[#222]
              "
            >
              Create Account

              <FiArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              mt-4
              w-full
              text-center
              text-[11px]
              font-bold
              text-gray-400
              transition-colors
              hover:text-gray-700
              sm:mt-5
              sm:text-xs
              dark:hover:text-white
            "
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default LoginRequiredModal;