import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShield,
  FiTruck,
  FiTag,
  FiCheck,
} from "react-icons/fi";

function CartSummary() {
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const freeDeliveryLimit = 100;

  const remaining = Math.max(
    freeDeliveryLimit - subtotal,
    0
  );

  const delivery =
    subtotal >= freeDeliveryLimit ? 0 : 5;

  const total = subtotal + delivery;

  return (
    <div className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

      {/* HEADER */}

      <div className="border-b border-[#deded9] px-7 py-7 sm:px-8 sm:py-8 dark:border-[#292929]">
        <p className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
          Shoply
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-gray-900 dark:text-white">
          Order Summary
        </h2>
      </div>

      {/* FREE DELIVERY */}

      <div className="border-b border-[#deded9] bg-[#fffdf2] px-7 py-7 dark:border-[#292929] dark:bg-[#211f00] sm:px-8">
        <div className="flex items-start gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#ffd600] text-black">
            <FiTruck size={17} />
          </div>

          <div className="min-w-0 flex-1">
            {remaining > 0 ? (
              <>
                <p className="text-xs font-black text-gray-900 dark:text-white">
                  Add ${remaining.toFixed(2)} more
                </p>

                <p className="mt-1.5 text-[11px] leading-5 text-gray-500 dark:text-gray-400">
                  to unlock free delivery
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-black text-green-600">
                  Free delivery unlocked!
                </p>

                <p className="mt-1.5 text-[11px] leading-5 text-gray-500 dark:text-gray-400">
                  No delivery fees on this order
                </p>
              </>
            )}
          </div>
        </div>

        {/* PROGRESS */}

        <div className="mt-6 h-1.5 overflow-hidden bg-gray-200 dark:bg-[#3a3a3a]">
          <div
            className={
              subtotal >= freeDeliveryLimit
                ? "h-full w-full bg-[#ffd600] transition-all duration-700"
                : subtotal >= 75
                  ? "h-full w-3/4 bg-[#ffd600] transition-all duration-700"
                  : subtotal >= 50
                    ? "h-full w-1/2 bg-[#ffd600] transition-all duration-700"
                    : subtotal >= 25
                      ? "h-full w-1/4 bg-[#ffd600] transition-all duration-700"
                      : "h-full w-[10%] bg-[#ffd600] transition-all duration-700"
            }
          />
        </div>
      </div>

      {/* PRICE DETAILS */}

      <div className="px-7 py-8 sm:px-8 sm:py-9">

        <div className="space-y-5">

          {/* SUBTOTAL */}

          <div className="flex items-center justify-between gap-5 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Subtotal
            </span>

            <span className="font-bold text-gray-900 dark:text-white">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {/* DELIVERY */}

          <div className="flex items-center justify-between gap-5 text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <FiTruck size={14} />
              Delivery
            </span>

            {delivery === 0 ? (
              <span className="font-bold text-green-600">
                FREE
              </span>
            ) : (
              <span className="font-bold text-gray-900 dark:text-white">
                ${delivery.toFixed(2)}
              </span>
            )}
          </div>

          {/* DISCOUNT */}

          <div className="flex items-center justify-between gap-5 text-sm">
            <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <FiTag size={14} />
              Discount
            </span>

            <span className="font-bold text-green-600">
              $0.00
            </span>
          </div>

        </div>

        {/* DIVIDER */}

        <div className="my-7 h-px bg-[#deded9] dark:bg-[#292929]" />

        {/* TOTAL */}

        <div className="flex items-end justify-between gap-5">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Total
            </p>

            <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-gray-900 dark:text-white">
              ${total.toFixed(2)}
            </p>
          </div>

          <span className="border border-gray-200 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500 dark:border-[#333] dark:text-gray-400">
            USD
          </span>

        </div>

        {/* CHECKOUT */}

        <Link
          to="/checkout"
          className="group mt-8 flex min-h-14 w-full items-center justify-center gap-3 bg-[#ffd600] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[#f3ca00]"
        >
          Proceed to Checkout

          <FiArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        {/* TRUST */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="flex min-h-[58px] items-center gap-3 border border-[#e4e4df] bg-[#f8f8f6] px-3.5 py-3 dark:border-[#292929] dark:bg-[#202020]">
            <FiShield
              className="shrink-0 text-gray-700 dark:text-gray-300"
              size={15}
            />

            <span className="text-[9px] font-medium leading-4 text-gray-500 dark:text-gray-400">
              Secure checkout
            </span>
          </div>

          <div className="flex min-h-[58px] items-center gap-3 border border-[#e4e4df] bg-[#f8f8f6] px-3.5 py-3 dark:border-[#292929] dark:bg-[#202020]">
            <FiCheck
              className="shrink-0 text-green-500"
              size={15}
            />

            <span className="text-[9px] font-medium leading-4 text-gray-500 dark:text-gray-400">
              Easy returns
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartSummary;