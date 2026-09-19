import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiMapPin,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiX,
} from "react-icons/fi";

import { getOrderById, cancelOrder } from "../Apis/ordersApi";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  // ==========================================
  // Backend URL
  // ==========================================

  const API_BASE_URL =
    "https://finalproject-team5.vercel.app";

  // ==========================================
  // Get Product Image
  // ==========================================

  const getProductImage = (product) => {
    if (!product) {
      return null;
    }

    let image =
      product.thumbnail ||
      product.image ||
      product.imageUrl ||
      product.imageURL ||
      product.photo ||
      product.productImage ||
      product.productImageUrl ||
      product.mainImage ||
      product.coverImage ||
      product.images?.[0] ||
      product.image?.[0] ||
      product.photos?.[0] ||
      null;

    if (typeof image === "object" && image !== null) {
      image =
        image.url ||
        image.secure_url ||
        image.path ||
        image.src ||
        null;
    }

    if (!image || typeof image !== "string") {
      return null;
    }

    image = image.trim();

    if (!image) {
      return null;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:image/")
    ) {
      return image;
    }

    if (image.startsWith("//")) {
      return `https:${image}`;
    }

    if (image.startsWith("/")) {
      return `${API_BASE_URL}${image}`;
    }

    return `${API_BASE_URL}/${image}`;
  };

  // ==========================================
  // Get Product Name
  // ==========================================

  const getProductName = (product) => {
    if (!product) {
      return "Product";
    }

    return (
      product.title ||
      product.name ||
      product.productName ||
      "Product"
    );
  };

  // ==========================================
  // Fetch Order
  // ==========================================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("ORDER ID FROM URL:", id);

        const data = await getOrderById(id);

        console.log(
          "ORDER DETAILS FROM BACKEND:",
          data
        );

        const orderData =
          data?.order ||
          data?.data ||
          data;

        console.log(
          "ACTUAL ORDER:",
          orderData
        );

        console.log(
          "ORDER ITEMS:",
          orderData?.items
        );

        orderData?.items?.forEach((item, index) => {
          console.log(
            `ITEM ${index + 1}:`,
            item
          );

          console.log(
            `ITEM ${index + 1} PRODUCT:`,
            item?.product
          );

          console.log(
            `ITEM ${index + 1} IMAGE:`,
            getProductImage(item?.product)
          );
        });

        setOrder(orderData);
      } catch (error) {
        console.error(
          "Failed to fetch order:",
          error
        );

        console.log(
          "BACKEND ERROR:",
          error.response?.data
        );

        setError(
          error.response?.data?.message ||
            "Failed to load this order."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  // ==========================================
  // Cancel Order
  // ==========================================

  const handleCancelOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCanceling(true);
      setCancelError("");

      console.log(
        "CANCELING ORDER:",
        id
      );

      const data = await cancelOrder(id);

      console.log(
        "CANCEL RESPONSE:",
        data
      );

      const updatedOrder =
        data?.order ||
        data?.data ||
        data;

      setOrder((currentOrder) => ({
        ...currentOrder,
        ...(updatedOrder || {}),
        status: "Canceled",
      }));
    } catch (error) {
      console.error(
        "Failed to cancel order:",
        error
      );

      console.log(
        "CANCEL ERROR:",
        error.response?.data
      );

      setCancelError(
        error.response?.data?.message ||
          "Failed to cancel this order."
      );
    } finally {
      setCanceling(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-16 dark:bg-[#111]">
        <div className="mx-auto max-w-[520px] border border-[#deded9] bg-white px-7 py-16 text-center dark:border-[#292929] dark:bg-[#181818]">
          <div className="mx-auto h-9 w-9 animate-spin border-[3px] border-[#deded9] border-t-black dark:border-[#333] dark:border-t-white" />

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
            Loading order details...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-16 dark:bg-[#111]">
        <div className="mx-auto max-w-[520px] border border-[#deded9] bg-white px-7 py-16 text-center dark:border-[#292929] dark:bg-[#181818]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#deded9] bg-[#f7f7f5] text-gray-400 dark:border-[#333] dark:bg-[#222] dark:text-gray-500">
            <FiPackage size={27} />
          </div>

          <p className="mt-7 text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
            Shoply Orders
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-gray-900 dark:text-white">
            Order not found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
            {error ||
              "We couldn't find this order. It may have been removed or the order ID is incorrect."}
          </p>

          <Link
            to="/orders"
            className="mt-8 inline-flex min-h-12 items-center gap-3 bg-[#ffd600] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#f3ca00]"
          >
            <FiArrowLeft size={16} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // Order Information
  // ==========================================

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "N/A";

  const time = order.createdAt
    ? new Date(order.createdAt).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "N/A";

  const totalItems = (order.items || []).reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // ==========================================
  // Status
  // ==========================================

  const statusSteps = [
    {
      status: "Pending",
      title: "Order Confirmed",
      description:
        "Your order has been received successfully.",
    },
    {
      status: "Shipped",
      title: "Shipped",
      description:
        "Your order is on its way.",
    },
    {
      status: "Delivered",
      title: "Delivered",
      description:
        "Your order has been delivered.",
    },
  ];

  const statusOrder = [
    "Pending",
    "Shipped",
    "Delivered",
  ];

  const currentStatusIndex =
    statusOrder.indexOf(order.status);

  const isCanceled =
    order.status === "Canceled";

  const canCancel =
    order.status === "Pending";

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111] dark:bg-[#111] dark:text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">

        {/* Back */}

        <Link
          to="/orders"
          className="group mb-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <FiArrowLeft
            size={15}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Orders
        </Link>

        {/* Header */}

        <div className="mb-9 flex flex-col gap-7 border-b border-[#deded9] pb-8 dark:border-[#292929] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
              Order Details
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-[-0.055em] sm:text-4xl lg:text-5xl">
              Your Order
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.08em] text-gray-400">
              <span className="font-bold text-gray-800 dark:text-gray-200">
                #{order._id}
              </span>

              <span className="h-1 w-1 bg-gray-300 dark:bg-[#444]" />

              <span className="flex items-center gap-1.5">
                <FiCalendar size={13} />
                {date}
              </span>

              <span className="h-1 w-1 bg-gray-300 dark:bg-[#444]" />

              <span>{time}</span>
            </div>
          </div>

          <span
            className={`w-fit border px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.16em] ${
              order.status === "Pending"
                ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/40 dark:bg-yellow-950/20 dark:text-yellow-400"
                : order.status === "Shipped"
                  ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-400"
                  : order.status === "Delivered"
                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-950/20 dark:text-green-400"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start">

          {/* ==========================================
              LEFT
          ========================================== */}

          <div className="space-y-7">

            {/* Order Progress */}

            <section className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
              <div className="border-b border-[#deded9] px-7 py-7 sm:px-9 sm:py-8 dark:border-[#292929]">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
                  Order Progress
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.035em]">
                  Track your order
                </h2>
              </div>

              <div className="px-7 py-8 sm:px-9 sm:py-9">
                {isCanceled ? (
                  <div className="border border-red-200 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-950/20">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                        <FiX size={19} />
                      </div>

                      <div>
                        <h3 className="text-sm font-black text-red-700 dark:text-red-400">
                          Order Canceled
                        </h3>

                        <p className="mt-1.5 text-xs leading-5 text-red-600/80 dark:text-red-400/80">
                          This order has been canceled.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-7">
                    {statusSteps.map(
                      (step, index) => {
                        const stepIndex =
                          statusOrder.indexOf(
                            step.status
                          );

                        const completed =
                          stepIndex <=
                          currentStatusIndex;

                        const active =
                          step.status ===
                          order.status;

                        return (
                          <div
                            key={step.status}
                            className="relative flex gap-5"
                          >
                            {index <
                              statusSteps.length - 1 && (
                              <div
                                className={`absolute left-[19px] top-11 h-[calc(100%+10px)] w-px ${
                                  stepIndex <
                                  currentStatusIndex
                                    ? "bg-black dark:bg-white"
                                    : "bg-[#deded9] dark:bg-[#333]"
                                }`}
                              />
                            )}

                            <div
                              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center ${
                                completed
                                  ? "bg-black text-white dark:bg-white dark:text-black"
                                  : "border border-[#deded9] bg-[#f7f7f5] text-gray-400 dark:border-[#333] dark:bg-[#222] dark:text-gray-500"
                              }`}
                            >
                              {completed ? (
                                <FiCheck size={16} />
                              ) : (
                                <FiPackage size={16} />
                              )}
                            </div>

                            <div className="pt-1">
                              <h3
                                className={`text-sm font-black ${
                                  active
                                    ? "text-gray-900 dark:text-white"
                                    : completed
                                      ? "text-gray-700 dark:text-gray-300"
                                      : "text-gray-400"
                                }`}
                              >
                                {step.title}
                              </h3>

                              <p className="mt-1.5 text-xs leading-5 text-gray-500 dark:text-gray-400">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Products */}

            <section className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
              <div className="border-b border-[#deded9] px-7 py-7 sm:px-9 sm:py-8 dark:border-[#292929]">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
                      Order Items
                    </p>

                    <h2 className="mt-3 text-2xl font-black tracking-[-0.035em]">
                      {totalItems}{" "}
                      {totalItems === 1
                        ? "item"
                        : "items"}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center border border-[#deded9] bg-[#f7f7f5] text-gray-500 dark:border-[#333] dark:bg-[#222] dark:text-gray-400">
                    <FiShoppingBag size={18} />
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#deded9] dark:divide-[#292929]">
                {(order.items || []).map(
                  (item, index) => {
                    const product =
                      item.product || {};

                    const productImage =
                      getProductImage(
                        product
                      );

                    const productName =
                      getProductName(
                        product
                      );

                    const itemPrice = Number(
                      item.price ||
                        product.price ||
                        0
                    );

                    const quantity = Number(
                      item.quantity || 0
                    );

                    const itemTotal =
                      itemPrice * quantity;

                    return (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex flex-col gap-5 px-7 py-7 sm:flex-row sm:items-center sm:px-9 sm:py-8"
                      >

                        {/* Product Image */}

                        <div className="relative flex h-28 w-full shrink-0 items-center justify-center overflow-hidden bg-[#f6f6f4] dark:bg-[#222] sm:h-24 sm:w-24">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={productName}
                              className="h-full w-full object-contain p-3"
                              loading="lazy"
                              onError={(event) => {
                                console.error(
                                  "IMAGE FAILED:",
                                  productImage
                                );

                                event.currentTarget.style.display =
                                  "none";

                                const parent =
                                  event.currentTarget
                                    .parentElement;

                                if (
                                  parent &&
                                  !parent.querySelector(
                                    ".image-error-placeholder"
                                  )
                                ) {
                                  const placeholder =
                                    document.createElement(
                                      "div"
                                    );

                                  placeholder.className =
                                    "image-error-placeholder flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600";

                                  placeholder.innerHTML =
                                    `<span>📦</span>`;

                                  parent.appendChild(
                                    placeholder
                                  );
                                }
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                              <FiPackage size={25} />
                            </div>
                          )}
                        </div>

                        {/* Product Information */}

                        <div className="min-w-0 flex-1">
                          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                            Product
                          </p>

                          <h3 className="text-sm font-black leading-6 text-gray-900 dark:text-white sm:text-base">
                            {productName}
                          </h3>

                          <p className="mt-2 text-[11px] text-gray-400">
                            Quantity: {quantity}
                          </p>

                          <p className="mt-3 text-xs font-bold text-gray-600 dark:text-gray-300">
                            ${itemPrice.toFixed(2)} each
                          </p>
                        </div>

                        {/* Item Total */}

                        <div className="border-t border-[#eeeeea] pt-4 sm:min-w-[110px] sm:border-t-0 sm:pt-0 sm:text-right dark:border-[#292929]">
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                            Total
                          </p>

                          <p className="mt-2 text-xl font-black tracking-[-0.03em] text-gray-900 dark:text-white">
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>

          {/* ==========================================
              RIGHT
          ========================================== */}

          <aside className="space-y-7 lg:sticky lg:top-6">

            {/* Summary */}

            <section className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
              <div className="border-b border-[#deded9] px-7 py-7 sm:px-8 sm:py-8 dark:border-[#292929]">
                <p className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                  Shoply
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                  Order Summary
                </h2>
              </div>

              <div className="px-7 py-8 sm:px-8 sm:py-9">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-5 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Items
                    </span>

                    <span className="font-bold">
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-5 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Payment
                    </span>

                    <span className="max-w-[170px] text-right text-xs font-bold leading-5">
                      {order.paymentMethod ===
                      "COD"
                        ? "Cash on Delivery"
                        : order.paymentMethod ||
                          "N/A"}
                    </span>
                  </div>
                </div>

                <div className="my-7 h-px bg-[#deded9] dark:bg-[#292929]" />

                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                      Total
                    </p>

                    <p className="mt-2 text-3xl font-black tracking-[-0.05em]">
                      $
                      {Number(
                        order.total || 0
                      ).toFixed(2)}
                    </p>
                  </div>

                  <span className="border border-[#deded9] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:border-[#333]">
                    USD
                  </span>
                </div>
              </div>
            </section>

            {/* Delivery */}

            <section className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
              <div className="border-b border-[#deded9] px-7 py-6 dark:border-[#292929]">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#ffd600] text-black">
                    <FiMapPin size={18} />
                  </div>

                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                      Delivery
                    </p>

                    <h2 className="mt-1.5 text-base font-black">
                      Delivery Information
                    </h2>
                  </div>
                </div>
              </div>

              <div className="px-7 py-7 sm:px-8">
                <p className="text-sm font-bold leading-7 text-gray-800 dark:text-gray-200">
                  {order.shippingAddress ||
                    "No shipping address available."}
                </p>
              </div>
            </section>

            {/* Payment */}

            <section className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
              <div className="flex items-center gap-4 px-7 py-6 sm:px-8">
                <div className="flex h-10 w-10 items-center justify-center border border-[#deded9] bg-[#f7f7f5] text-gray-600 dark:border-[#333] dark:bg-[#222] dark:text-gray-300">
                  <FiTruck size={18} />
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Payment Method
                  </p>

                  <p className="mt-1.5 text-sm font-black">
                    {order.paymentMethod ===
                    "COD"
                      ? "Cash on Delivery"
                      : order.paymentMethod ||
                        "N/A"}
                  </p>
                </div>
              </div>
            </section>

            {/* Cancel Error */}

            {cancelError && (
              <div className="border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900/40 dark:bg-red-950/20">
                <p className="text-xs font-bold leading-5 text-red-600 dark:text-red-400">
                  {cancelError}
                </p>
              </div>
            )}

            {/* Cancel Order */}

            {canCancel && (
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={canceling}
                className="
                  group
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  border
                  border-red-200
                  bg-white
                  px-5
                  py-3.5
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-red-600
                  transition-all
                  duration-300
                  hover:border-red-600
                  hover:bg-red-600
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:border-red-900/50
                  dark:bg-[#181818]
                  dark:text-red-400
                  dark:hover:border-red-500
                  dark:hover:bg-red-600
                  dark:hover:text-white
                "
              >
                <FiX
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-90"
                />

                {canceling
                  ? "Canceling Order..."
                  : "Cancel Order"}
              </button>
            )}

            {/* Security */}

            <div className="flex items-start gap-4 border border-[#deded9] bg-white px-6 py-5 dark:border-[#292929] dark:bg-[#181818]">
              <FiShield
                size={18}
                className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
              />

              <p className="text-[11px] leading-6 text-gray-500 dark:text-gray-400">
                Your order information is securely
                stored with Shoply.
              </p>
            </div>

            {/* All Orders */}

            <Link
              to="/orders"
              className="
                group
                flex
                min-h-12
                w-full
                items-center
                justify-center
                gap-3
                border
                border-[#d6d6d1]
                bg-white
                px-5
                py-3.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.14em]
                text-gray-800
                transition-all
                duration-300
                hover:border-black
                hover:bg-black
                hover:text-white
                dark:border-[#333]
                dark:bg-[#181818]
                dark:text-gray-200
                dark:hover:border-white
                dark:hover:bg-white
                dark:hover:text-black
              "
            >
              View All Orders

              <FiChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;