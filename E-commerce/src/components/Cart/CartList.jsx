import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function CartList() {
  const items = useSelector((state) => state.cart.items);

  if (!items || items.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center px-8 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center bg-[#f4f4f1] text-gray-400 dark:bg-[#222] dark:text-gray-500">
          <FiShoppingBag size={32} />
        </div>

        <p className="mt-8 text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
          Your shopping bag
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-gray-900 dark:text-white sm:text-3xl">
          Your cart is empty
        </h2>

        <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500 dark:text-gray-400">
          Looks like you haven't added anything to your cart yet.
          Let's find something you love.
        </p>

        <Link
          to="/"
          className="group mt-9 inline-flex items-center gap-3 bg-[#ffd600] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-[#f3ca00]"
        >
          Start Shopping

          <FiArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-5 border-b border-[#deded9] pb-7 dark:border-[#292929] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
            Shopping bag
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-gray-900 dark:text-white sm:text-3xl">
            Your Items
          </h2>

          <p className="mt-2 text-xs text-gray-400">
            {items.length}{" "}
            {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-green-600 dark:text-green-400">
          <span className="h-1.5 w-1.5 bg-green-500" />
          Ready to checkout
        </div>
      </div>

      {/* PRODUCTS */}

      <div className="space-y-6">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default CartList;