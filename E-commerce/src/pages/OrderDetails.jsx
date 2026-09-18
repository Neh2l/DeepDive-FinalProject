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

    // لو image عبارة عن object
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

    // Cloudinary / Firebase / أي URL كامل
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:image/")
    ) {
      return image;
    }

    // لو الصورة بدأت بـ //
    if (image.startsWith("//")) {
      return `https:${image}`;
    }

    // لو الصورة بدأت بـ /
    if (image.startsWith("/")) {
      return `${API_BASE_URL}${image}`;
    }

    // لو backend بيرجع uploads/...
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
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-16 dark:bg-[#111111]">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-[#2a2a2a] dark:border-t-white" />

          <p className="mt-4 text-sm font-bold text-gray-500 dark:text-gray-400">
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
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-16 dark:bg-[#111111]">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-[#222] dark:text-gray-500">
            <FiPackage size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-900 dark:text-white">
            Order not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {error ||
              "We couldn't find this order. It may have been removed or the order ID is incorrect."}
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#ffd600] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#f5cc00]"
          >
            <FiArrowLeft size={17} />
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
    <main className="min-h-screen bg-[#f7f7f7] text-gray-900 dark:bg-[#111111] dark:text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back */}

        <Link
          to="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <FiArrowLeft size={16} />
          Back to Orders
        </Link>

        {/* Header */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
              Shoply
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl dark:text-white">
              Order Details
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white">
                #{order._id}
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />

              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} />
                {date}
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />

              <span>{time}</span>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider ${
              order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
                : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                  : order.status === "Delivered"
                    ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">

          {/* ==========================================
              LEFT
          ========================================== */}

          <div className="space-y-6">

            {/* Order Progress */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-7 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <div className="mb-7">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Order Progress
                </p>

                <h2 className="mt-1 text-xl font-black dark:text-white">
                  Track your order
                </h2>
              </div>

              {isCanceled ? (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-950/20">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                      <FiX size={20} />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-red-700 dark:text-red-400">
                        Order Canceled
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-red-600/80 dark:text-red-400/80">
                        This order has been canceled.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
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
                          className="relative flex gap-4"
                        >
                          {index <
                            statusSteps.length - 1 && (
                            <div
                              className={`absolute left-[19px] top-11 h-[calc(100%+8px)] w-px ${
                                stepIndex <
                                currentStatusIndex
                                  ? "bg-gray-900 dark:bg-white"
                                  : "bg-gray-200 dark:bg-[#2a2a2a]"
                              }`}
                            />
                          )}

                          <div
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              completed
                                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                                : "bg-gray-100 text-gray-400 dark:bg-[#222] dark:text-gray-500"
                            }`}
                          >
                            {completed ? (
                              <FiCheck size={17} />
                            ) : (
                              <FiPackage size={17} />
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

                            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </section>

            {/* Products */}

            <section className="rounded-3xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <div className="border-b border-gray-100 p-6 dark:border-[#2a2a2a]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                      Order Items
                    </p>

                    <h2 className="mt-1 text-xl font-black dark:text-white">
                      {totalItems}{" "}
                      {totalItems === 1
                        ? "item"
                        : "items"}
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-[#222] dark:text-gray-400">
                    <FiShoppingBag size={18} />
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-[#2a2a2a]">
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
                        className="flex gap-4 p-6"
                      >

                        {/* Product Image */}

                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 dark:border-[#2a2a2a] dark:bg-[#222]">

                          {productImage ? (
                            <img
                              src={productImage}
                              alt={productName}
                              className="h-full w-full object-contain p-1"
                              loading="lazy"
                              onError={(event) => {
                                console.error(
                                  "IMAGE FAILED:",
                                  productImage
                                );

                                event.currentTarget.style.display =
                                  "none";

                                const parent =
                                  event.currentTarget.parentElement;

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
                              <FiPackage
                                size={25}
                              />
                            </div>
                          )}

                        </div>

                        {/* Product Information */}

                        <div className="min-w-0 flex-1">
                          <h3 className="font-black text-gray-900 dark:text-white">
                            {productName}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            Quantity:{" "}
                            {quantity}
                          </p>

                          <p className="mt-3 text-sm font-bold text-gray-600 dark:text-gray-300">
                            $
                            {itemPrice.toFixed(
                              2
                            )}{" "}
                            each
                          </p>
                        </div>

                        {/* Item Total */}

                        <div className="text-right">
                          <p className="text-base font-black text-gray-900 dark:text-white">
                            $
                            {itemTotal.toFixed(
                              2
                            )}
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

          <aside className="space-y-6 lg:sticky lg:top-6">

            {/* Summary */}

            <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <div className="border-b border-gray-100 p-6 dark:border-[#2a2a2a]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Shoply
                </p>

                <h2 className="mt-1 text-2xl font-black dark:text-white">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Items
                  </span>

                  <span className="font-bold dark:text-white">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Payment
                  </span>

                  <span className="font-bold dark:text-white">
                    {order.paymentMethod ===
                    "COD"
                      ? "Cash on Delivery"
                      : order.paymentMethod ||
                        "N/A"}
                  </span>
                </div>

                <div className="h-px bg-gray-100 dark:bg-[#2a2a2a]" />

                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    Total
                  </span>

                  <span className="text-3xl font-black dark:text-white">
                    $
                    {Number(
                      order.total || 0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </section>

            {/* Delivery */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd600] text-black">
                  <FiMapPin size={18} />
                </div>

                <div>
                  <h2 className="text-base font-black dark:text-white">
                    Delivery Information
                  </h2>

                  <p className="text-[11px] text-gray-400">
                    Shipping address
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-[#222]">
                <p className="text-sm font-bold leading-6 text-gray-800 dark:text-gray-200">
                  {order.shippingAddress ||
                    "No shipping address available."}
                </p>
              </div>
            </section>

            {/* Payment */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-[#222] dark:text-gray-300">
                  <FiTruck size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-black dark:text-white">
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
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
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
                className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white py-3.5 text-sm font-black text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:bg-[#1a1a1a] dark:text-red-400 dark:hover:border-red-500 dark:hover:bg-red-600 dark:hover:text-white"
              >
                <FiX
                  size={17}
                  className="transition-transform group-hover:rotate-90"
                />

                {canceling
                  ? "Canceling Order..."
                  : "Cancel Order"}
              </button>
            )}

            {/* Security */}

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">
              <FiShield
                size={18}
                className="shrink-0 text-green-600"
              />

              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                Your order information is securely
                stored with Shoply.
              </p>
            </div>

            {/* All Orders */}

            <Link
              to="/orders"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-black text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
            >
              View All Orders

              <FiChevronRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;