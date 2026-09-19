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
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-16 text-[#111] dark:bg-[#111] dark:text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            
            <div className="hidden min-h-[360px] bg-[#111] p-10 text-white md:flex md:flex-col md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffd600]">
                  Shoply
                </p>

                <h2 className="mt-8 max-w-xs text-4xl font-black leading-[0.95] tracking-[-0.05em]">
                  Nothing to
                  <br />
                  checkout.
                </h2>
              </div>

              <p className="max-w-xs text-xs leading-6 text-white/45">
                Your shopping bag is currently empty.
              </p>
            </div>

            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-14 text-center sm:px-10">
              <div className="flex h-14 w-14 items-center justify-center border border-[#deded9] bg-[#f7f7f5] text-gray-400 dark:border-[#303030] dark:bg-[#222]">
                <FiCreditCard size={24} />
              </div>

              <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Your bag
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                Your cart is empty
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
                Add some products before continuing
                to checkout.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-flex items-center gap-3 bg-[#ffd600] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-[#f3ca00]"
              >
                Start Shopping
                <FiArrowLeft
                  size={15}
                  className="rotate-180"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN CHECKOUT
  ========================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f3] text-[#111] dark:bg-[#111] dark:text-white">
      <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-8 sm:py-10 lg:px-12 xl:px-16">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-10 border-b border-[#deded9] pb-7 dark:border-[#292929] sm:mb-12 sm:pb-8">
          <Link
            to="/cart"
            className="group mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <FiArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to cart
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gray-400">
                Shoply / Checkout
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Checkout
              </h1>
            </div>

            <p className="max-w-md text-xs leading-6 text-gray-500 dark:text-gray-400 md:text-right">
              Complete your delivery details and choose
              how you would like to pay for your order.
            </p>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] xl:gap-16">

          {/* ===================================================
              LEFT
          =================================================== */}

          <div className="min-w-0">

            {/* =================================================
                DELIVERY
            ================================================= */}

            <section className="border-b border-[#deded9] pb-9 dark:border-[#292929] sm:pb-11">
              <div className="mb-7 flex items-start justify-between gap-5">
                <div className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#ffd600] text-black">
                    <FiMapPin size={17} />
                  </span>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      01
                    </p>

                    <h2 className="mt-1 text-xl font-black tracking-[-0.025em] sm:text-2xl">
                      Delivery Information
                    </h2>

                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">

                {/* Full Name */}

                <div className="min-w-0">
                  <label className="mb-2.5 block text-[9px] font-black uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                    Full Name
                  </label>

                  <div className="relative">
                    <FiUser
                      size={15}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full border-b border-[#cfcfc9] bg-transparent py-3 pl-7 pr-2 text-sm font-medium outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-[#3a3a3a] dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>

                {/* Phone */}

                <div className="min-w-0">
                  <label className="mb-2.5 block text-[9px] font-black uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FiPhone
                      size={15}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      className="w-full border-b border-[#cfcfc9] bg-transparent py-3 pl-7 pr-2 text-sm font-medium outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-[#3a3a3a] dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>

                {/* City */}

                <div className="min-w-0">
                  <label className="mb-2.5 block text-[9px] font-black uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Cairo"
                    className="w-full border-b border-[#cfcfc9] bg-transparent py-3 text-sm font-medium outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-[#3a3a3a] dark:text-white dark:focus:border-white"
                  />
                </div>

                {/* Address */}

                <div className="min-w-0">
                  <label className="mb-2.5 block text-[9px] font-black uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, building, apartment..."
                    className="w-full border-b border-[#cfcfc9] bg-transparent py-3 text-sm font-medium outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-[#3a3a3a] dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <section className="border-b border-[#deded9] py-9 dark:border-[#292929] sm:py-11">
              <div className="mb-7 flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-black text-white dark:bg-white dark:text-black">
                  <FiCreditCard size={17} />
                </span>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    02
                  </p>

                  <h2 className="mt-1 text-xl font-black tracking-[-0.025em] sm:text-2xl">
                    Payment Method
                  </h2>

                  <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
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
                  className={`group w-full border p-4 text-left transition-all duration-300 sm:p-5 ${
                    paymentMethod === "COD"
                      ? "border-black bg-white dark:border-white dark:bg-[#1a1a1a]"
                      : "border-[#d7d7d1] bg-transparent hover:border-gray-500 dark:border-[#303030] dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors ${
                        paymentMethod === "COD"
                          ? "bg-[#ffd600] text-black"
                          : "bg-[#e9e9e5] text-gray-600 dark:bg-[#252525] dark:text-gray-300"
                      }`}
                    >
                      <FiTruck size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                        Pay when your order arrives.
                      </p>
                    </div>

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-all ${
                        paymentMethod === "COD"
                          ? "border-black bg-black dark:border-white dark:bg-white"
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
                  className={`group w-full border p-4 text-left transition-all duration-300 sm:p-5 ${
                    paymentMethod === "Paymob"
                      ? "border-black bg-white dark:border-white dark:bg-[#1a1a1a]"
                      : "border-[#d7d7d1] bg-transparent hover:border-gray-500 dark:border-[#303030] dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors ${
                        paymentMethod === "Paymob"
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-[#e9e9e5] text-gray-600 dark:bg-[#252525] dark:text-gray-300"
                      }`}
                    >
                      <FiCreditCard size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-black">
                          Pay Online
                        </p>

                        <span className="bg-[#e9f7ed] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          Secure
                        </span>
                      </div>

                      <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                        Pay securely with Paymob.
                      </p>
                    </div>

                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-all ${
                        paymentMethod === "Paymob"
                          ? "border-black bg-black dark:border-white dark:bg-white"
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
                    <div className="mt-4 flex items-start gap-2 border-t border-gray-100 pt-4 text-[10px] leading-5 text-gray-500 dark:border-[#292929] dark:text-gray-400">
                      <FiLock
                        size={13}
                        className="mt-1 shrink-0"
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

            <div className="flex items-center gap-3 py-6">
              <FiShield
                size={17}
                className="shrink-0 text-green-600"
              />

              <p className="text-[10px] leading-5 text-gray-500 dark:text-gray-400 sm:text-xs">
                Your payment information is securely handled
                by Paymob. We never store your card details.
              </p>
            </div>
          </div>

          {/* ===================================================
              RIGHT — ORDER SUMMARY
          =================================================== */}

          <aside className="min-w-0 lg:sticky lg:top-7">
            <div className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

              {/* Header */}

              <div className="border-b border-[#e2e2dd] px-5 py-5 dark:border-[#292929] sm:px-6 sm:py-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
                      Shoply
                    </p>

                    <h2 className="mt-1 text-xl font-black tracking-[-0.03em]">
                      Your Order
                    </h2>
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    {items.length}{" "}
                    {items.length === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>
              </div>

              {/* Items */}

              <div className="max-h-[330px] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-w-0 gap-3"
                  >
                    <div className="relative h-[68px] w-[58px] shrink-0 overflow-hidden bg-[#f2f2ef] dark:bg-[#242424]">
                      <img
                        src={
                          item.thumbnail ||
                          item.image
                        }
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />

                      <span className="absolute bottom-0 left-0 flex min-w-5 items-center justify-center bg-black px-1.5 py-1 text-[8px] font-black text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 py-0.5">
                      <p className="line-clamp-2 text-xs font-bold leading-5 text-gray-900 dark:text-white">
                        {item.title}
                      </p>

                      <p className="mt-1.5 text-[9px] uppercase tracking-[0.08em] text-gray-400">
                        {Number(item.price).toFixed(2)} EGP
                        {" × "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 py-0.5 text-xs font-black">
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toFixed(2)}{" "}
                      EGP
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}

              <div className="border-t border-[#e2e2dd] px-5 py-6 dark:border-[#292929] sm:px-6">
                <div className="space-y-4">

                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Subtotal
                    </span>

                    <span className="font-bold">
                      {subtotal.toFixed(2)} EGP
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Delivery
                    </span>

                    {delivery === 0 ? (
                      <span className="font-bold text-green-600 dark:text-green-400">
                        FREE
                      </span>
                    ) : (
                      <span className="font-bold">
                        {delivery.toFixed(2)} EGP
                      </span>
                    )}
                  </div>

                  <div className="my-5 h-px bg-[#e2e2dd] dark:bg-[#292929]" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        Total
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Including delivery
                      </p>
                    </div>

                    <span className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                      {total.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                {/* Button */}

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="group mt-7 flex min-h-14 w-full items-center justify-center gap-3 bg-[#ffd600] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[#f3ca00] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? paymentMethod === "Paymob"
                      ? "Opening Secure Checkout..."
                      : "Confirming Order..."
                    : paymentMethod === "Paymob"
                      ? "Continue to Payment"
                      : "Confirm Order"}

                  {!isSubmitting &&
                    (paymentMethod === "Paymob" ? (
                      <FiCreditCard
                        size={16}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <FiCheck
                        size={17}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    ))}
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.12em] text-gray-400">
                  <FiLock size={11} />
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