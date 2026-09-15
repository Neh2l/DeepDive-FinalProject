import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiShield,
  FiTruck,
  FiX,
} from "react-icons/fi";

function getSavedOrders() {
  try {
    const savedOrders = localStorage.getItem(
      "shoplyOrders"
    );

    if (!savedOrders) {
      return [];
    }

    const parsedOrders = JSON.parse(savedOrders);

    return Array.isArray(parsedOrders)
      ? parsedOrders
      : [];
  } catch {
    return [];
  }
}

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const orders = getSavedOrders();

  const order = orders.find(
    (item) => item._id === id
  );

  // Order doesn't exist
  if (!order) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            <FiPackage size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-gray-900">
            Order not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We couldn't find this order. It may have been
            removed or the order ID is incorrect.
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

  const date = new Date(
    order.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = new Date(
    order.createdAt
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalItems = order.items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

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

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back */}

        <Link
          to="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-900"
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

            <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
              Order Details
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="font-bold text-gray-900">
                #{order._id}
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} />
                {date}
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span>{time}</span>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider ${
              order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* LEFT */}

          <div className="space-y-6">
            {/* Order Status */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-7">
              <div className="mb-7">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Order Progress
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Track your order
                </h2>
              </div>

              {isCanceled ? (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <FiX size={20} />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-red-700">
                        Order Canceled
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-red-600/80">
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
                            statusSteps.length -
                              1 && (
                            <div
                              className={`absolute left-[19px] top-11 h-[calc(100%+8px)] w-px ${
                                stepIndex <
                                currentStatusIndex
                                  ? "bg-gray-900"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}

                          <div
                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              completed
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-400"
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
                                  ? "text-gray-900"
                                  : completed
                                    ? "text-gray-700"
                                    : "text-gray-400"
                              }`}
                            >
                              {step.title}
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
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

            <section className="rounded-3xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                      Order Items
                    </p>

                    <h2 className="mt-1 text-xl font-black">
                      {totalItems}{" "}
                      {totalItems === 1
                        ? "item"
                        : "items"}
                    </h2>
                  </div>

                  <FiShoppingBagIcon />
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map(
                  (item, index) => {
                    const productImage =
                      item.product?.thumbnail ||
                      item.product?.image ||
                      item.product?.images?.[0];

                    const productName =
                      item.product?.title ||
                      item.product?.name ||
                      "Product";

                    const itemTotal =
                      item.price *
                      item.quantity;

                    return (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex gap-4 p-6"
                      >
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={productName}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-300">
                              <FiPackage
                                size={25}
                              />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-black text-gray-900">
                            {productName}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                          <p className="mt-3 text-sm font-bold text-gray-600">
                            ${Number(item.price).toFixed(2)}{" "}
                            each
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-base font-black text-gray-900">
                            $
                            {Number(
                              itemTotal
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>
          </div>

          {/* RIGHT */}

          <aside className="space-y-6 lg:sticky lg:top-6">
            {/* Summary */}

            <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
              <div className="border-b border-gray-100 p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Shoply
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Items
                  </span>

                  <span className="font-bold">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Payment
                  </span>

                  <span className="font-bold">
                    {order.paymentMethod ===
                    "COD"
                      ? "Cash on Delivery"
                      : order.paymentMethod}
                  </span>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold text-gray-500">
                    Total
                  </span>

                  <span className="text-3xl font-black">
                    $
                    {Number(order.total).toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>
            </section>

            {/* Delivery */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd600] text-black">
                  <FiMapPin size={18} />
                </div>

                <div>
                  <h2 className="text-base font-black">
                    Delivery Information
                  </h2>

                  <p className="text-[11px] text-gray-400">
                    Shipping address
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-bold leading-6 text-gray-800">
                  {order.shippingAddress}
                </p>
              </div>
            </section>

            {/* Payment */}

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                  <FiTruck size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-black">
                    Cash on Delivery
                  </p>
                </div>
              </div>
            </section>

            {/* Security */}

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
              <FiShield
                size={18}
                className="shrink-0 text-green-600"
              />

              <p className="text-xs leading-5 text-gray-500">
                Your order information is securely
                stored with Shoply.
              </p>
            </div>

            <Link
              to="/orders"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-black text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
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

function FiShoppingBagIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
      <FiPackage size={18} />
    </div>
  );
}

export default OrderDetails;