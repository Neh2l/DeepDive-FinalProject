
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiUser,
  FiTruck,
  FiCreditCard,
  FiShield,
  FiLock,
  FiSmartphone,
} from "react-icons/fi";

import { clearCart } from "../redux/cartSlice";
import { createOrder } from "../Apis/ordersApi";
import { createPaymentIntention } from "../Apis/paymobApi";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);

  /* =========================================================
     FORM
  ========================================================= */

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
  });

  /* =========================================================
     PAYMENT METHOD
  ========================================================= */

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     TOTALS
  ========================================================= */

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const delivery = subtotal >= 100 ? 0 : 5;

  const total = subtotal + delivery;

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     CREATE ORDER + PAYMENT
  ========================================================= */

  const handleConfirmOrder = async () => {
    /* ---------------------------------------------------------
       VALIDATION
    --------------------------------------------------------- */

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim() ||
      !formData.address.trim()
    ) {
      alert("Please complete all shipping information.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      /* -------------------------------------------------------
         CREATE ORDER
      ------------------------------------------------------- */

      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),

        shippingAddress: `${formData.fullName}, ${formData.phone}, ${formData.city}, ${formData.address}`,

        paymentMethod,
      };

      console.log(
        "ORDER DATA SENT TO BACKEND:",
        orderData
      );

      const data = await createOrder(orderData);

      console.log(
        "ORDER CREATED BY BACKEND:",
        data
      );

      const createdOrder =
        data.order ||
        data.data ||
        data;

      console.log(
        "CREATED ORDER:",
        createdOrder
      );

      if (!createdOrder?._id) {
        throw new Error(
          "Order ID was not returned from backend."
        );
      }

      /* =======================================================
         CASH ON DELIVERY
      ======================================================= */

      if (paymentMethod === "COD") {
        dispatch(clearCart());

        navigate(
          `/orders/${createdOrder._id}`
        );

        return;
      }

      /* =======================================================
         PAYMOB
      ======================================================= */

      if (paymentMethod === "Paymob") {
        const paymentData = {
          amount: total,

          orderId: createdOrder._id,

          items: items.map((item) => ({
            name: item.title,

            amount: Math.round(
              Number(item.price) * 100
            ),

            description:
              item.title || "Product",

            quantity: Number(
              item.quantity
            ),
          })),

          billingData: {
            first_name:
              formData.fullName
                .trim()
                .split(" ")[0] || "Customer",

            last_name:
              formData.fullName
                .trim()
                .split(" ")
                .slice(1)
                .join(" ") || "Customer",

            phone_number:
              formData.phone,

            street:
              formData.address,

            city:
              formData.city,

            email:
              "customer@example.com",
          },
        };

        console.log(
          "PAYMOB PAYMENT DATA:",
          paymentData
        );

        const paymentResponse =
          await createPaymentIntention(
            paymentData
          );

        console.log(
          "PAYMOB RESPONSE:",
          paymentResponse
        );

        /*
         * The backend will return the
         * Paymob Unified Checkout URL.
         */

        if (
          !paymentResponse?.checkoutUrl
        ) {
          throw new Error(
            "Paymob checkout URL was not returned."
          );
        }

        /* =====================================================
           SAVE ORDER ID BEFORE LEAVING OUR WEBSITE
           
           PaymentResult.jsx will use this ID after
           Paymob redirects the customer back.
        ===================================================== */

        sessionStorage.setItem(
          "pendingOrderId",
          createdOrder._id
        );

        /*
         * Do NOT clear the cart yet.
         *
         * The payment is not completed
         * at this point.
         */

        window.location.href =
          paymentResponse.checkoutUrl;

        return;
      }

    } catch (error) {
      console.error(
        "ORDER / PAYMENT ERROR:",
        error
      );

      console.error(
        "BACKEND ERROR:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while processing your order."
      );

      setIsSubmitting(false);
    }
  };

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 sm:py-16 dark:bg-[#111111]">

        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 sm:h-16 sm:w-16 dark:bg-[#222] dark:text-gray-500">
            <FiCreditCard
              size={26}
              className="sm:h-7 sm:w-7"
            />
          </div>

          <h1 className="mt-5 text-xl font-black text-gray-900 sm:text-2xl dark:text-white">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Add some products before continuing
            to checkout.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#ffd600] px-5 py-3 text-sm font-black text-black transition hover:bg-[#f5cc00] sm:px-6 sm:py-3.5"
          >
            Start Shopping

            <FiArrowLeft
              size={17}
              className="rotate-180"
            />
          </Link>

        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN CHECKOUT
  ========================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f7f7] text-gray-900 dark:bg-[#111111] dark:text-white">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6 sm:mb-8">

          <Link
            to="/cart"
            className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-900 sm:mb-5 dark:text-gray-400 dark:hover:text-white"
          >
            <FiArrowLeft size={16} />

            Back to cart
          </Link>

          <div>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 sm:text-[11px]">
              Shoply
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl dark:text-white">
              Checkout
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:mt-3 sm:text-sm sm:leading-6 dark:text-gray-400">
              Complete your delivery information
              and choose your preferred payment
              method.
            </p>

          </div>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">

          {/* ===================================================
              LEFT
          =================================================== */}

          <div className="min-w-0 space-y-5 sm:space-y-6">

            {/* =================================================
                DELIVERY
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-6 md:p-7 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

              <div className="mb-5 flex items-center gap-3 sm:mb-6">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffd600] text-black sm:h-11 sm:w-11 sm:rounded-2xl">
                  <FiMapPin size={19} />
                </div>

                <div className="min-w-0">

                  <h2 className="text-lg font-black sm:text-xl dark:text-white">
                    Delivery Information
                  </h2>

                  <p className="mt-1 text-[11px] text-gray-400 sm:text-xs">
                    Where should we deliver your order?
                  </p>

                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">

                {/* Full Name */}

                <div className="min-w-0">

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500 sm:text-xs dark:text-gray-400">
                    Full Name
                  </label>

                  <div className="relative">

                    <FiUser
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-4"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white sm:rounded-2xl sm:py-3.5 sm:pl-11 sm:pr-4 dark:border-[#2a2a2a] dark:bg-[#222] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:bg-[#222]"
                    />

                  </div>
                </div>

                {/* Phone */}

                <div className="min-w-0">

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500 sm:text-xs dark:text-gray-400">
                    Phone Number
                  </label>

                  <div className="relative">

                    <FiPhone
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 sm:left-4"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white sm:rounded-2xl sm:py-3.5 sm:pl-11 sm:pr-4 dark:border-[#2a2a2a] dark:bg-[#222] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:bg-[#222]"
                    />

                  </div>
                </div>

                {/* City */}

                <div className="min-w-0">

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500 sm:text-xs dark:text-gray-400">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Cairo"
                    className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white sm:rounded-2xl sm:px-4 sm:py-3.5 dark:border-[#2a2a2a] dark:bg-[#222] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:bg-[#222]"
                  />

                </div>

                {/* Address */}

                <div className="min-w-0">

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-gray-500 sm:text-xs dark:text-gray-400">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, building, apartment..."
                    className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white sm:rounded-2xl sm:px-4 sm:py-3.5 dark:border-[#2a2a2a] dark:bg-[#222] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 dark:focus:bg-[#222]"
                  />

                </div>

              </div>
            </section>

            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-6 md:p-7 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

              <div className="mb-5 flex items-center gap-3 sm:mb-6">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-800 sm:h-11 sm:w-11 sm:rounded-2xl dark:bg-[#222] dark:text-gray-200">
                  <FiCreditCard size={19} />
                </div>

                <div>

                  <h2 className="text-lg font-black sm:text-xl dark:text-white">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-[11px] text-gray-400 sm:text-xs">
                    Choose how you want to pay.
                  </p>

                </div>

              </div>

              <div className="space-y-3">

                {/* =================================================
                    COD
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("COD")
                  }
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                    paymentMethod === "COD"
                      ? "border-gray-900 bg-gray-50 shadow-sm dark:border-white dark:bg-[#222]"
                      : "border-gray-200 bg-white hover:border-gray-400 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:hover:border-gray-600"
                  }`}
                >

                  <div className="flex items-center gap-3 sm:gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffd600] text-black">
                      <FiTruck size={19} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-sm font-black dark:text-white">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs dark:text-gray-400">
                        Pay when your order arrives.
                      </p>

                    </div>

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        paymentMethod === "COD"
                          ? "border-gray-900 bg-gray-900 dark:border-white dark:bg-white"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {paymentMethod === "COD" && (
                        <FiCheck
                          size={12}
                          className="text-white dark:text-black"
                        />
                      )}
                    </div>

                  </div>

                </button>

                {/* =================================================
                    PAYMOB
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("Paymob")
                  }
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                    paymentMethod === "Paymob"
                      ? "border-gray-900 bg-gray-50 shadow-sm dark:border-white dark:bg-[#222]"
                      : "border-gray-200 bg-white hover:border-gray-400 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:hover:border-gray-600"
                  }`}
                >

                  <div className="flex items-center gap-3 sm:gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111] text-white dark:bg-white dark:text-black">
                      <FiCreditCard size={19} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <p className="text-sm font-black dark:text-white">
                          Pay Online
                        </p>

                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Secure
                        </span>

                      </div>

                      <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs dark:text-gray-400">
                        Pay securely with Paymob.
                      </p>

                    </div>

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        paymentMethod === "Paymob"
                          ? "border-gray-900 bg-gray-900 dark:border-white dark:bg-white"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {paymentMethod === "Paymob" && (
                        <FiCheck
                          size={12}
                          className="text-white dark:text-black"
                        />
                      )}
                    </div>

                  </div>

                  {paymentMethod === "Paymob" && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl bg-white p-3 text-[10px] leading-4 text-gray-500 dark:bg-[#1a1a1a] dark:text-gray-400">
                      <FiLock
                        size={14}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        You will be redirected to Paymob's
                        secure checkout to complete your payment.
                      </span>
                    </div>
                  )}

                </button>

              </div>
            </section>

            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-3.5 sm:items-center sm:p-4 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

              <FiShield
                size={18}
                className="mt-0.5 shrink-0 text-green-600 sm:mt-0"
              />

              <p className="text-[11px] leading-5 text-gray-500 sm:text-xs dark:text-gray-400">
                Your payment information is securely
                handled by Paymob. We never store your
                card details.
              </p>

            </div>

          </div>

          {/* ===================================================
              RIGHT
          =================================================== */}

          <aside className="min-w-0 lg:sticky lg:top-6">

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] sm:rounded-3xl dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

              {/* Header */}

              <div className="border-b border-gray-100 p-4 sm:p-6 dark:border-[#2a2a2a]">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 sm:text-[11px]">
                  Shoply
                </p>

                <h2 className="mt-1 text-xl font-black sm:text-2xl dark:text-white">
                  Your Order
                </h2>

              </div>

              {/* Items */}

              <div className="max-h-[300px] space-y-4 overflow-y-auto p-4 sm:max-h-[340px] sm:p-6">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="flex min-w-0 gap-3"
                  >

                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-16 sm:w-16 dark:bg-[#222]">

                      <img
                        src={
                          item.thumbnail ||
                          item.image
                        }
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[9px] font-black text-white">
                        {item.quantity}
                      </span>

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-xs font-bold text-gray-900 sm:text-sm dark:text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                        {Number(item.price).toFixed(2)} EGP ×{" "}
                        {item.quantity}
                      </p>

                    </div>

                    <p className="shrink-0 text-xs font-black sm:text-sm dark:text-white">
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toFixed(2)}{" "}
                      EGP
                    </p>

                  </div>

                ))}

              </div>

              {/* =================================================
                  SUMMARY
              ================================================= */}

              <div className="border-t border-gray-100 p-4 sm:p-6 dark:border-[#2a2a2a]">

                <div className="space-y-3">

                  <div className="flex justify-between gap-4 text-sm">

                    <span className="text-gray-500 dark:text-gray-400">
                      Subtotal
                    </span>

                    <span className="shrink-0 font-bold dark:text-white">
                      {subtotal.toFixed(2)} EGP
                    </span>

                  </div>

                  <div className="flex justify-between gap-4 text-sm">

                    <span className="text-gray-500 dark:text-gray-400">
                      Delivery
                    </span>

                    {delivery === 0 ? (

                      <span className="shrink-0 font-bold text-green-600 dark:text-green-400">
                        FREE
                      </span>

                    ) : (

                      <span className="shrink-0 font-bold dark:text-white">
                        {delivery.toFixed(2)} EGP
                      </span>

                    )}

                  </div>

                  <div className="my-4 h-px bg-gray-100 dark:bg-[#2a2a2a]" />

                  <div className="flex items-end justify-between gap-4">

                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                      Total
                    </span>

                    <span className="text-2xl font-black sm:text-3xl dark:text-white">
                      {total.toFixed(2)} EGP
                    </span>

                  </div>

                </div>

                {/* =================================================
                    BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="group mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl bg-[#ffd600] px-4 py-3.5 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#f5cc00] hover:shadow-[0_12px_30px_rgba(255,214,0,0.25)] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:px-5 sm:py-4"
                >

                  {isSubmitting
                    ? paymentMethod === "Paymob"
                      ? "Opening Secure Checkout..."
                      : "Confirming Order..."
                    : paymentMethod === "Paymob"
                      ? "Continue to Payment"
                      : "Confirm Order"}

                  {!isSubmitting && (
                    paymentMethod === "Paymob" ? (
                      <FiCreditCard
                        size={18}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <FiCheck
                        size={18}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    )
                  )}

                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">
                  <FiLock size={12} />
                  Secure checkout
                </div>

              </div>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Checkout;
