import { useDispatch } from "react-redux";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const subtotal = item.price * item.quantity;

  return (
    <article className="group relative overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:hover:border-[#3a3a3a]">
      <div className="flex flex-col gap-6 p-5 sm:flex-row sm:gap-7 sm:p-7 lg:gap-8 lg:p-8">

        {/* PRODUCT IMAGE */}

        <div className="relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden bg-[#f6f6f4] dark:bg-[#222] sm:h-36 sm:w-36 lg:h-40 lg:w-40">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 bg-white px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-gray-800 dark:bg-[#252525] dark:text-gray-200">
            Shoply
          </span>
        </div>

        {/* PRODUCT CONTENT */}

        <div className="flex min-w-0 flex-1 flex-col justify-between">

          {/* TOP */}

          <div>
            <div className="flex items-start justify-between gap-5">

              <div className="min-w-0 flex-1">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {item.category || "Product"}
                </p>

                <h3 className="max-w-2xl text-base font-bold leading-6 text-gray-900 transition duration-300 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300 sm:text-lg">
                  {item.title}
                </h3>
              </div>

              {/* REMOVE */}

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.id))
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 text-gray-400 transition duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-[#2a2a2a] dark:text-gray-400 dark:hover:border-red-900/40 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                aria-label="Remove product"
              >
                <FiTrash2 size={15} />
              </button>
            </div>

            {/* PRODUCT INFO */}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <FiTruck
                  size={14}
                  className="text-green-500"
                />

                <span>
                  Free delivery
                </span>
              </div>

              <span className="h-1 w-1 bg-gray-300 dark:bg-[#3a3a3a]" />

              <span className="font-medium text-green-600 dark:text-green-400">
                In Stock
              </span>
            </div>
          </div>

          {/* BOTTOM */}

          <div className="mt-8 flex flex-col gap-6 border-t border-gray-100 pt-6 sm:flex-row sm:items-end sm:justify-between dark:border-[#2a2a2a]">

            {/* QUANTITY */}

            <div>
              <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Quantity
              </p>

              <div className="flex w-fit items-center border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity(item.id)
                    )
                  }
                  className="flex h-9 w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-[#222] dark:hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={13} />
                </button>

                <span className="flex h-9 min-w-11 items-center justify-center border-x border-gray-200 px-2 text-sm font-bold text-gray-900 dark:border-[#2a2a2a] dark:text-white">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      increaseQuantity(item.id)
                    )
                  }
                  className="flex h-9 w-10 items-center justify-center text-gray-500 transition hover:bg-[#ffd600] hover:text-black dark:text-gray-400 dark:hover:text-black"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={13} />
                </button>
              </div>
            </div>

            {/* PRICE */}

            <div className="sm:min-w-[150px] sm:text-right">
              <p className="mb-1.5 text-[10px] uppercase tracking-[0.08em] text-gray-400">
                {item.quantity} × $
                {item.price.toFixed(2)}
              </p>

              <p className="text-2xl font-black tracking-[-0.03em] text-gray-900 dark:text-white">
                ${subtotal.toFixed(2)}
              </p>
            </div>

          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;