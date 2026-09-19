import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiHome,
  FiLoader,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

import axiosInstance from "../Apis/axiosInstance";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

function PaymentResult() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("checking");
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /*
   * Paymob may return parameters in the URL.
   * We mainly need the local order ID.
   *
   * If Paymob does not return our order ID directly,
   * we use the one saved before redirecting to Paymob.
   */
  const orderId =
    searchParams.get("orderId") ||
    searchParams.get("merchant_order_id") ||
    sessionStorage.getItem("pendingOrderId");

  /* =========================================================
     CHECK ORDER STATUS
  ========================================================= */

  useEffect(() => {
    let intervalId;

    const checkPaymentStatus = async () => {
      if (!orderId) {
        setStatus("error");
        setErrorMessage(
          "We couldn't find your order. Please check your orders page.",
        );
        return;
      }

      try {
        const response = await axiosInstance.get(`/orders/${orderId}`);

        const currentOrder =
          response.data?.order ||
          response.data?.data ||
          response.data;

        setOrder(currentOrder);

        if (currentOrder?.paymentStatus === "Paid") {
          setStatus("success");

          /*
           * Payment is confirmed by the backend webhook.
           * Now it is safe to clear the cart.
           */
          dispatch(clearCart());

          sessionStorage.removeItem("pendingOrderId");

          if (intervalId) {
            clearInterval(intervalId);
          }

          return;
        }

        if (currentOrder?.paymentStatus === "Failed") {
          setStatus("failed");

          if (intervalId) {
            clearInterval(intervalId);
          }

          return;
        }

        /*
         * Payment is still pending.
         * Paymob webhook may need a few seconds to arrive.
         */
        setStatus("pending");
      } catch (error) {
        console.error("PAYMENT RESULT ERROR:", error);

        setStatus("error");

        setErrorMessage(
          error.response?.data?.message ||
            "We couldn't check your payment status.",
        );
      }
    };

    checkPaymentStatus();

    /*
     * Check again every 3 seconds while payment
     * is still being processed.
     */
    intervalId = setInterval(() => {
      checkPaymentStatus();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [orderId, dispatch]);

  /* =========================================================
     FORMAT ORDER ID
  ========================================================= */

  const shortOrderId = order?._id
    ? `#${order._id.slice(-8).toUpperCase()}`
    : "—";

  /* =========================================================
     CHECKING
  ========================================================= */

  if (status === "checking") {
    return (
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-12 dark:bg-[#111] sm:px-8 sm:py-16">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
            <div className="h-1 w-full bg-[#ffd600]" />

            <div className="px-7 py-12 text-center sm:px-12 sm:py-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gray-200 bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#202020]">
                <FiLoader
                  size={28}
                  className="animate-spin text-gray-700 dark:text-white"
                />
              </div>

              <p className="mt-8 text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                Payment Status
              </p>

              <h1 className="mt-3 text-2xl font-black tracking-[-0.03em] text-gray-900 sm:text-3xl dark:text-white">
                Checking your payment
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                Please wait while we securely confirm your payment.
              </p>

              <div className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-2 border-t border-gray-100 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:border-[#292929]">
                <FiShield size={13} />
                Secure payment verification
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     SUCCESS
  ========================================================= */

  if (status === "success") {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f5f5f3] px-5 py-8 dark:bg-[#111] sm:px-8 sm:py-14">
        <div className="mx-auto max-w-[1100px]">
          <div className="border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
            {/* TOP ACCENT */}
            <div className="h-1.5 w-full bg-[#ffd600]" />

            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              {/* MAIN CONTENT */}
              <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
                {/* SUCCESS ICON */}
                <div className="flex h-16 w-16 items-center justify-center bg-green-500 text-white">
                  <FiCheck size={31} strokeWidth={3} />
                </div>

                <p className="mt-9 text-[9px] font-black uppercase tracking-[0.28em] text-green-600 dark:text-green-400">
                  Payment Confirmed
                </p>

                <h1 className="mt-3 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">
                  Order
                  <br />
                  Confirmed.
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500 dark:text-gray-400">
                  Your payment was successful and your order has been
                  confirmed. We’ll take care of the rest.
                </p>

                {/* ORDER INFO */}
                <div className="mt-10 grid max-w-xl grid-cols-1 border-y border-gray-200 sm:grid-cols-2 dark:border-[#303030]">
                  <div className="border-b border-gray-200 px-1 py-5 sm:border-b-0 sm:border-r sm:pr-7 dark:border-[#303030]">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                      Order
                    </p>

                    <p className="mt-2 text-base font-black text-gray-900 dark:text-white">
                      {shortOrderId}
                    </p>
                  </div>

                  <div className="px-1 py-5 sm:pl-7">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                      Payment
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2 w-2 bg-green-500" />

                      <p className="text-base font-black text-green-600 dark:text-green-400">
                        Paid
                      </p>
                    </div>
                  </div>
                </div>

                {/* TOTAL */}
                {order?.total !== undefined && (
                  <div className="mt-7 flex items-center justify-between border border-gray-200 bg-[#111] px-5 py-5 text-white dark:border-[#303030] dark:bg-white dark:text-black">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] opacity-60">
                      Total Paid
                    </span>

                    <span className="text-xl font-black tracking-[-0.03em] sm:text-2xl">
                      {Number(order.total).toFixed(2)} EGP
                    </span>
                  </div>
                )}

                {/* BUTTONS */}
                <div className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
                  <Link
                    to={
                      order?._id
                        ? `/orders/${order._id}`
                        : "/orders"
                    }
                    className="flex flex-1 items-center justify-center gap-2 bg-[#ffd600] px-6 py-4 text-xs font-black uppercase tracking-[0.08em] text-black transition duration-300 hover:bg-[#f5cc00]"
                  >
                    View Order
                    <FiArrowRight size={16} />
                  </Link>

                  <Link
                    to="/products"
                    className="flex flex-1 items-center justify-center gap-2 border border-gray-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.08em] text-gray-900 transition duration-300 hover:border-gray-400 hover:bg-gray-50 dark:border-[#333] dark:bg-[#171717] dark:text-white dark:hover:bg-[#222]"
                  >
                    Continue Shopping
                    <FiShoppingBag size={16} />
                  </Link>
                </div>
              </div>

              {/* SIDE PANEL */}
              <div className="border-t border-gray-200 bg-[#f7f7f5] dark:border-[#2a2a2a] dark:bg-[#141414] lg:border-l lg:border-t-0">
                <div className="flex h-full flex-col justify-between px-6 py-9 sm:px-9 sm:py-11">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                      Shoply
                    </p>

                    <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-gray-900 dark:text-white">
                      Everything is
                      <br />
                      taken care of.
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400">
                      Your order has been received and your payment has
                      been verified successfully.
                    </p>
                  </div>

                  <div className="mt-12 border-t border-gray-200 pt-6 dark:border-[#303030]">
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <FiShield
                          size={16}
                          className="mt-0.5 shrink-0 text-gray-500"
                        />

                        <div>
                          <p className="text-xs font-black text-gray-900 dark:text-white">
                            Secure Payment
                          </p>

                          <p className="mt-1 text-[11px] leading-5 text-gray-400">
                            Your payment has been securely verified.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiCreditCard
                          size={16}
                          className="mt-0.5 shrink-0 text-gray-500"
                        />

                        <div>
                          <p className="text-xs font-black text-gray-900 dark:text-white">
                            Payment Verified
                          </p>

                          <p className="mt-1 text-[11px] leading-5 text-gray-400">
                            Your transaction has been confirmed.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FiCheck
                          size={16}
                          className="mt-0.5 shrink-0 text-green-500"
                        />

                        <div>
                          <p className="text-xs font-black text-gray-900 dark:text-white">
                            Order Confirmed
                          </p>

                          <p className="mt-1 text-[11px] leading-5 text-gray-400">
                            Your order is now being prepared.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     PENDING
  ========================================================= */

  if (status === "pending") {
    return (
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-10 dark:bg-[#111] sm:px-8 sm:py-16">
        <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">
          <div className="w-full border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
            <div className="h-1 w-full bg-[#ffd600]" />

            <div className="px-7 py-11 text-center sm:px-12 sm:py-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20">
                <FiClock
                  size={28}
                  className="text-amber-600 dark:text-amber-400"
                />
              </div>

              <p className="mt-8 text-[9px] font-black uppercase tracking-[0.28em] text-amber-600 dark:text-amber-400">
                Payment Processing
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-gray-900 sm:text-4xl dark:text-white">
                We’re confirming
                <br />
                your payment.
              </h1>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                Your payment is being verified. This page will update
                automatically once we receive confirmation.
              </p>

              {order?._id && (
                <div className="mx-auto mt-8 max-w-sm border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-left dark:border-[#303030] dark:bg-[#202020]">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Order
                  </p>

                  <p className="mt-2 text-sm font-black text-gray-900 dark:text-white">
                    {shortOrderId}
                  </p>
                </div>
              )}

              <div className="mt-8 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:border-[#292929]">
                <FiLoader size={13} className="animate-spin" />
                Waiting for payment confirmation
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     FAILED
  ========================================================= */

  if (status === "failed") {
    return (
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-10 dark:bg-[#111] sm:px-8 sm:py-16">
        <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">
          <div className="w-full border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
            <div className="h-1 w-full bg-red-500" />

            <div className="px-7 py-11 text-center sm:px-12 sm:py-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20">
                <FiX
                  size={29}
                  className="text-red-600 dark:text-red-400"
                />
              </div>

              <p className="mt-8 text-[9px] font-black uppercase tracking-[0.28em] text-red-600 dark:text-red-400">
                Payment Failed
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-gray-900 sm:text-4xl dark:text-white">
                Payment wasn’t
                <br />
                completed.
              </h1>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                Your payment could not be completed. Your order is still
                available so you can try again.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center gap-2 bg-[#ffd600] px-7 py-4 text-xs font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#f5cc00]"
                >
                  <FiRefreshCw size={16} />
                  Try Again
                </Link>

                <Link
                  to="/orders"
                  className="flex items-center justify-center gap-2 border border-gray-200 px-7 py-4 text-xs font-black uppercase tracking-[0.08em] text-gray-900 transition hover:border-gray-400 dark:border-[#333] dark:text-white"
                >
                  My Orders
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f5f5f3] px-5 py-10 dark:bg-[#111] sm:px-8 sm:py-16">
      <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">
        <div className="w-full border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
          <div className="h-1 w-full bg-gray-800 dark:bg-white" />

          <div className="px-7 py-11 text-center sm:px-12 sm:py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gray-200 bg-[#f7f7f5] dark:border-[#303030] dark:bg-[#202020]">
              <FiCreditCard
                size={28}
                className="text-gray-500"
              />
            </div>

            <p className="mt-8 text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
              Verification Error
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-gray-900 sm:text-4xl dark:text-white">
              We couldn't verify
              <br />
              the payment.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
              {errorMessage ||
                "Please check your order status or try again."}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/orders"
                className="flex items-center justify-center gap-2 bg-[#ffd600] px-7 py-4 text-xs font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#f5cc00]"
              >
                <FiShoppingBag size={16} />
                My Orders
              </Link>

              <Link
                to="/"
                className="flex items-center justify-center gap-2 border border-gray-200 px-7 py-4 text-xs font-black uppercase tracking-[0.08em] text-gray-900 transition hover:border-gray-400 dark:border-[#333] dark:text-white"
              >
                <FiHome size={16} />
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentResult;