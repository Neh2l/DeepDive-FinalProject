
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

  const delivery = subtotal >= freeDeliveryLimit ? 0 : 5;

  const total = subtotal + delivery;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Shoply
        </p>

        <h2 className="text-2xl font-black text-gray-900">
          Order Summary
        </h2>
      </div>

      {/* Free Delivery */}
      <div className="border-b border-gray-100 bg-[#fffdf2] p-6">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ffd600] text-black">
            <FiTruck size={16} />
          </div>

          <div className="flex-1">
            {remaining > 0 ? (
              <>
                <p className="text-xs font-bold text-gray-900">
                  Add ${remaining.toFixed(2)} more
                </p>

                <p className="mt-1 text-[11px] leading-5 text-gray-500">
                  to unlock free delivery
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-bold text-green-600">
                  Free delivery unlocked!
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  No delivery fees on this order
                </p>
              </>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className={
              subtotal >= freeDeliveryLimit
                ? "h-full w-full rounded-full bg-[#ffd600] transition-all duration-700"
                : subtotal >= 75
                  ? "h-full w-3/4 rounded-full bg-[#ffd600] transition-all duration-700"
                  : subtotal >= 50
                    ? "h-full w-1/2 rounded-full bg-[#ffd600] transition-all duration-700"
                    : subtotal >= 25
                      ? "h-full w-1/4 rounded-full bg-[#ffd600] transition-all duration-700"
                      : "h-full w-[10%] rounded-full bg-[#ffd600] transition-all duration-700"
            }
          />
        </div>
      </div>

      {/* Price Details */}
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-bold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-500">
            <FiTruck size={14} />
            Delivery
          </span>

          {delivery === 0 ? (
            <span className="font-bold text-green-600">
              FREE
            </span>
          ) : (
            <span className="font-bold text-gray-900">
              ${delivery.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-500">
            <FiTag size={14} />
            Discount
          </span>

          <span className="font-bold text-green-600">
            $0.00
          </span>
        </div>

        <div className="my-5 h-px bg-gray-100" />

        {/* Total */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400">
              Total
            </p>

            <p className="mt-1 text-3xl font-black text-gray-900">
              ${total.toFixed(2)}
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            USD
          </span>
        </div>

        {/* Checkout */}
        <Link
          to="/checkout"
          className="group mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ffd600] px-5 py-4 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#f5cc00] hover:shadow-[0_12px_30px_rgba(255,214,0,0.25)]"
        >
          Proceed to Checkout

          <FiArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        {/* Trust */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
            <FiShield
              className="shrink-0 text-gray-700"
              size={15}
            />

            <span className="text-[10px] font-medium leading-4 text-gray-500">
              Secure checkout
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
            <FiCheck
              className="shrink-0 text-green-500"
              size={15}
            />

            <span className="text-[10px] font-medium leading-4 text-gray-500">
              Easy returns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
