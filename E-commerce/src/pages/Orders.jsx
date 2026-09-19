import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiChevronRight,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";

import { getMyOrders } from "../Apis/ordersApi";

function Orders() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyOrders();

        console.log("ORDERS FROM BACKEND:", data);
        console.log("FIRST ORDER:", data.orders?.[0]);
        console.log(
          "FIRST ORDER ITEMS:",
          data.orders?.[0]?.items
        );
        console.log(
          "FIRST ORDER FIRST ITEM:",
          data.orders?.[0]?.items?.[0]
        );

        const ordersData =
          data.orders || data.data || [];

        setOrders(
          Array.isArray(ordersData)
            ? ordersData
            : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch orders:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filters = [
    "All",
    "Pending",
    "Shipped",
    "Delivered",
    "Canceled",
  ];

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter(
          (order) =>
            order.status === activeFilter
        );

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111] transition-colors duration-300 dark:bg-[#111] dark:text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-9 border-b border-[#deded9] pb-8 dark:border-[#292929]">
          <Link
            to="/"
            className="
              group
              mb-8
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.14em]
              text-gray-500
              transition-colors
              hover:text-black
              dark:text-gray-400
              dark:hover:text-white
            "
          >
            <FiArrowRight
              size={15}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
            />

            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                Shoply Account
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                Your Orders
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 dark:text-gray-400">
                Track your purchases and view your complete
                order history.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#ffd600] text-black sm:h-14 sm:w-14">
              <FiPackage
                size={23}
              />
            </div>
          </div>
        </div>

        {/* =========================
            FILTERS
        ========================= */}

        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`
                  relative
                  px-5
                  py-4
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  transition-all
                  duration-300
                  sm:px-7
                  ${
                    activeFilter === filter
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-gray-500 hover:bg-[#f7f7f5] hover:text-black dark:text-gray-400 dark:hover:bg-[#222] dark:hover:text-white"
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading ? (
          <div className="border border-[#deded9] bg-white px-6 py-16 text-center dark:border-[#292929] dark:bg-[#181818]">
            <div className="mx-auto h-9 w-9 animate-spin border-[3px] border-[#deded9] border-t-black dark:border-[#333] dark:border-t-white" />

            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
              Loading your orders...
            </p>
          </div>
        ) : error ? (
          /* =========================
             ERROR
          ========================= */

          <div className="border border-red-200 bg-red-50 px-7 py-14 text-center dark:border-red-900/40 dark:bg-red-950/20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-red-200 bg-red-100 text-red-500 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400">
              <FiPackage size={27} />
            </div>

            <p className="mt-7 text-[9px] font-black uppercase tracking-[0.25em] text-red-500 dark:text-red-400">
              Order History
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-red-700 dark:text-red-400">
              Something went wrong
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        ) : filteredOrders.length > 0 ? (
          /* =========================
             ORDERS
          ========================= */

          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
              />
            ))}
          </div>
        ) : (
          /* =========================
             EMPTY
          ========================= */

          <div className="border border-[#deded9] bg-white px-7 py-16 text-center dark:border-[#292929] dark:bg-[#181818]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#deded9] bg-[#f7f7f5] text-gray-400 dark:border-[#333] dark:bg-[#222] dark:text-gray-500">
              <FiShoppingBag size={27} />
            </div>

            <p className="mt-7 text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
              Shopping History
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
              No orders found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              You don't have any{" "}
              {activeFilter.toLowerCase()} orders.
            </p>

            <Link
              to="/products"
              className="
                group
                mt-8
                inline-flex
                min-h-12
                items-center
                gap-3
                bg-[#ffd600]
                px-6
                py-3.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.14em]
                text-black
                transition-all
                duration-300
                hover:bg-[#f3ca00]
              "
            >
              Start Shopping

              <FiArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function OrderCard({ order }) {
  const date = new Date(
    order.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const statusStyle = {
    Pending:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/40 dark:bg-yellow-950/20 dark:text-yellow-400",

    Shipped:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-400",

    Delivered:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-950/20 dark:text-green-400",

    Canceled:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400",
  };

  const firstItems = (
    order.items || []
  ).slice(0, 3);

  const totalItems = (
    order.items || []
  ).reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <article className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

      {/* =========================
          TOP
      ========================= */}

      <div className="flex flex-col gap-5 border-b border-[#deded9] px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-8 dark:border-[#292929]">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
              Order
            </span>

            <span className="text-sm font-black text-gray-900 dark:text-white">
              #{order._id}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-gray-400">
            <FiCalendar size={13} />

            {date}
          </div>
        </div>

        <span
          className={`w-fit border px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.14em] ${
            statusStyle[order.status] ||
            "border-gray-200 bg-gray-50 text-gray-600 dark:border-[#333] dark:bg-[#222] dark:text-gray-400"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* =========================
          PRODUCTS
      ========================= */}

      <div className="px-7 py-7 sm:px-9 sm:py-8">
        <div className="flex flex-wrap gap-3">
          {firstItems.map((item, index) => {

            // Image comes from:
            // item.product.images[0].url

            const productImage =
              item.product?.images?.[0]?.url ||
              null;

            const productName =
              item.product?.name ||
              "Product";

            return (
              <div
                key={`${order._id}-${index}`}
                className="relative flex h-24 w-24 items-center justify-center overflow-hidden bg-[#f6f6f4] dark:bg-[#222] sm:h-28 sm:w-28"
              >
                {productImage ? (
                  <img
                    src={productImage}
                    alt={productName}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300 dark:text-gray-600">
                    <FiPackage size={22} />
                  </div>
                )}
              </div>
            );
          })}

          {order.items?.length > 3 && (
            <div className="flex h-24 w-24 items-center justify-center bg-[#f1f1ee] text-xs font-black text-gray-500 dark:bg-[#222] dark:text-gray-400 sm:h-28 sm:w-28">
              +{order.items.length - 3}
            </div>
          )}
        </div>

        {/* =========================
            ORDER INFO
        ========================= */}

        <div className="mt-8 grid gap-6 border-t border-[#deded9] pt-7 sm:grid-cols-3 dark:border-[#292929]">

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
              Items
            </p>

            <p className="mt-2 text-sm font-black">
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
              Payment
            </p>

            <p className="mt-2 text-sm font-black">
              {order.paymentMethod === "COD"
                ? "Cash on Delivery"
                : order.paymentMethod ||
                  "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
              Total
            </p>

            <p className="mt-2 text-xl font-black tracking-[-0.03em]">
              $
              {Number(
                order.total
              ).toFixed(2)}
            </p>
          </div>
        </div>

        {/* =========================
            VIEW ORDER
        ========================= */}

        <Link
          to={`/orders/${order._id}`}
          className="
            group
            mt-8
            flex
            min-h-12
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
          View Order

          <FiChevronRight
            size={16}
            className="
              text-gray-800
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:text-white
              dark:text-gray-200
              dark:group-hover:text-black
            "
          />
        </Link>
      </div>
    </article>
  );
}

export default Orders;