
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
} from "react-icons/fi";

import { clearCart } from "../redux/cartSlice";
import { createOrder } from "../Apis/ordersApi";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 100 ? 0 : 5;

  const total = subtotal + delivery;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmOrder = async () => {
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
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),

        shippingAddress: `${formData.fullName}, ${formData.phone}, ${formData.city}, ${formData.address}`,

        paymentMethod: "COD",
      };

      console.log(" ORDER DATA SENT TO BACKEND:", orderData);

      const data = await createOrder(orderData);

      console.log(" ORDER CREATED BY BACKEND:", data);

      const createdOrder = data.order || data.data || data;

      console.log(" CREATED ORDER:", createdOrder);

      if (!createdOrder?._id) {
        throw new Error("Order ID was not returned from backend.");
      }

      dispatch(clearCart());

      navigate(`/orders/${createdOrder._id}`);
    } catch (error) {
      console.error(" ORDER CREATION ERROR:", error);
      console.error(
        " BACKEND ERROR:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while creating your order."
      );

      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            <FiCreditCard size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add some products before continuing to checkout.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#ffd600] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#f5cc00]"
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

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mb-8">
          <Link
            to="/cart"
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-900"
          >
            <FiArrowLeft size={16} />
            Back to cart
          </Link>

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
              Shoply
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              Checkout
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Complete your delivery information and review
              your order before confirming.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">

          {/* LEFT */}

          <div className="space-y-6">

            {/* Shipping Information */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffd600] text-black">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    Delivery Information
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full Name */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                    Full Name
                  </label>

                  <div className="relative">
                    <FiUser
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Phone */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FiPhone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white"
                    />
                  </div>
                </div>

                {/* City */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Cairo"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white"
                  />
                </div>

                {/* Address */}

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, building, apartment..."
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-gray-900 focus:bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-800">
                  <FiCreditCard size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-gray-900 bg-gray-50 p-4">
                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd600] text-black">
                    <FiTruck size={18} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-black">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </div>

                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
                    <FiCheck
                      size={13}
                      className="text-white"
                    />
                  </div>

                </div>
              </div>
            </section>

            {/* Security */}

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
              <FiShield
                size={18}
                className="text-green-600"
              />

              <p className="text-xs leading-5 text-gray-500">
                Your order information is stored securely
                and used only to process your purchase.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)]">

              {/* Header */}

              <div className="border-b border-gray-100 p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Shoply
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Your Order
                </h2>
              </div>

              {/* Items */}

              <div className="max-h-[340px] space-y-4 overflow-y-auto p-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">

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
                      <p className="truncate text-sm font-bold text-gray-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        ${Number(item.price).toFixed(2)} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-black">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}

              <div className="border-t border-gray-100 p-6">
                <div className="space-y-3">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-bold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Delivery
                    </span>

                    {delivery === 0 ? (
                      <span className="font-bold text-green-600">
                        FREE
                      </span>
                    ) : (
                      <span className="font-bold">
                        ${delivery.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="my-4 h-px bg-gray-100" />

                  <div className="flex items-end justify-between">
                    <span className="text-sm font-bold text-gray-500">
                      Total
                    </span>

                    <span className="text-3xl font-black">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ffd600] px-5 py-4 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#f5cc00] hover:shadow-[0_12px_30px_rgba(255,214,0,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Confirming Order..."
                    : "Confirm Order"}

                  {!isSubmitting && (
                    <FiCheck
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </button>

              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
