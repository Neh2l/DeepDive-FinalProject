
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
          "We couldn't find your order. Please check your orders page."
        );
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/orders/${orderId}`
        );

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
        console.error(
          "PAYMENT RESULT ERROR:",
          error
        );

        setStatus("error");

        setErrorMessage(
          error.response?.data?.message ||
            "We couldn't check your payment status."
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
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-12 dark:bg-[#111]">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-[32px] border border-gray-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-12 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-[#252525]">
              <FiLoader
                size={32}
                className="animate-spin text-gray-700 dark:text-white"
              />
            </div>

            <h1 className="mt-7 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Checking your payment
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Please wait while we confirm your payment securely.
            </p>

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
      <main className="min-h-screen overflow-hidden bg-[#f7f7f7] px-4 py-8 dark:bg-[#111] sm:py-14">

        <div className="mx-auto max-w-3xl">

          {/* SUCCESS CARD */}

          <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.07)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

            {/* Decorative background */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-green-100 blur-3xl dark:bg-green-900/20" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#ffd600]/10 blur-3xl" />

            <div className="relative px-5 py-10 text-center sm:px-10 sm:py-14">

              {/* Success Icon */}

              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">

                <div className="absolute inset-0 animate-ping rounded-full bg-green-100 opacity-60 dark:bg-green-900/20" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-[0_15px_40px_rgba(34,197,94,0.25)]">

                  <FiCheck
                    size={38}
                    strokeWidth={3}
                    className="text-white"
                  />

                </div>

              </div>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.25em] text-green-600 dark:text-green-400">
                Payment Confirmed
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Order Confirmed!
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400">
                Your payment was successful and your order has been confirmed.
                We’ll take care of the rest.
              </p>

              {/* ORDER INFO */}

              <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left dark:border-[#2a2a2a] dark:bg-[#222]">

                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Order
                  </p>

                  <p className="mt-1 text-sm font-black text-gray-900 dark:text-white">
                    {shortOrderId}
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left dark:border-[#2a2a2a] dark:bg-[#222]">

                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Payment
                  </p>

                  <div className="mt-1 flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-green-500" />

                    <p className="text-sm font-black text-green-600 dark:text-green-400">
                      Paid
                    </p>

                  </div>

                </div>

              </div>

              {/* TOTAL */}

              {order?.total !== undefined && (
                <div className="mx-auto mt-4 flex max-w-xl items-center justify-between rounded-2xl bg-[#111] px-5 py-4 text-white dark:bg-white dark:text-black">

                  <span className="text-sm font-bold opacity-70">
                    Total Paid
                  </span>

                  <span className="text-xl font-black">
                    {Number(order.total).toFixed(2)} EGP
                  </span>

                </div>
              )}

              {/* BUTTONS */}

              <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">

                <Link
                  to={
                    order?._id
                      ? `/orders/${order._id}`
                      : "/orders"
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#ffd600] px-5 py-4 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#f5cc00] hover:shadow-[0_12px_30px_rgba(255,214,0,0.25)]"
                >
                  View Order

                  <FiArrowRight size={17} />
                </Link>

                <Link
                  to="/products"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-black text-gray-900 transition hover:border-gray-400 hover:bg-gray-50 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-[#222]"
                >
                  Continue Shopping

                  <FiShoppingBag size={17} />
                </Link>

              </div>

            </div>

            {/* TRUST FOOTER */}

            <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-5 dark:border-[#2a2a2a] dark:bg-[#151515]">

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-bold text-gray-400">

                <span className="flex items-center gap-1.5">
                  <FiShield size={13} />
                  Secure Payment
                </span>

                <span className="flex items-center gap-1.5">
                  <FiCreditCard size={13} />
                  Payment Verified
                </span>

                <span className="flex items-center gap-1.5">
                  <FiCheck size={13} />
                  Order Confirmed
                </span>

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
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 dark:bg-[#111] sm:py-16">

        <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">

          <div className="w-full rounded-[32px] border border-gray-200 bg-white p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-12 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">

              <FiClock
                size={32}
                className="text-amber-600 dark:text-amber-400"
              />

            </div>

            <p className="mt-7 text-[10px] font-black uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
              Payment Processing
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              We’re confirming your payment
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Your payment is being verified. This page will update
              automatically once we receive confirmation.
            </p>

            {order?._id && (
              <div className="mx-auto mt-7 max-w-sm rounded-2xl bg-gray-50 p-4 dark:bg-[#222]">

                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Order
                </p>

                <p className="mt-1 text-sm font-black dark:text-white">
                  {shortOrderId}
                </p>

              </div>
            )}

            <div className="mt-7 flex items-center justify-center gap-2 text-xs font-bold text-gray-400">

              <FiLoader
                size={14}
                className="animate-spin"
              />

              Waiting for payment confirmation...

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
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 dark:bg-[#111] sm:py-16">

        <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">

          <div className="w-full rounded-[32px] border border-gray-200 bg-white p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-12 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">

              <FiX
                size={32}
                className="text-red-600 dark:text-red-400"
              />

            </div>

            <p className="mt-7 text-[10px] font-black uppercase tracking-[0.25em] text-red-600 dark:text-red-400">
              Payment Failed
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Payment wasn’t completed
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Your payment could not be completed. Your order is still
              available so you can try again.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#ffd600] px-6 py-4 text-sm font-black text-black transition hover:bg-[#f5cc00]"
              >
                <FiRefreshCw size={17} />
                Try Again
              </Link>

              <Link
                to="/orders"
                className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-6 py-4 text-sm font-black dark:border-[#333]"
              >
                My Orders
                <FiArrowRight size={17} />
              </Link>

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
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 dark:bg-[#111] sm:py-16">

      <div className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center">

        <div className="w-full rounded-[32px] border border-gray-200 bg-white p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-12 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-[#252525]">

            <FiCreditCard
              size={32}
              className="text-gray-500"
            />

          </div>

          <h1 className="mt-7 text-2xl font-black text-gray-900 sm:text-3xl dark:text-white">
            We couldn't verify the payment
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
            {errorMessage ||
              "Please check your order status or try again."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              to="/orders"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#ffd600] px-6 py-4 text-sm font-black text-black transition hover:bg-[#f5cc00]"
            >
              <FiShoppingBag size={17} />
              My Orders
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-6 py-4 text-sm font-black dark:border-[#333] dark:text-white"
            >
              <FiHome size={17} />
              Home
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default PaymentResult;
