
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
    <article className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="relative flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f8f8f8] sm:h-36 sm:w-36">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-[9px] font-black text-gray-800 shadow-sm">
            SHOPLY
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                  {item.category || "Product"}
                </p>

                <h3 className="line-clamp-2 text-base font-bold leading-6 text-gray-900 transition duration-300 group-hover:text-gray-700">
                  {item.title}
                </h3>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-100 text-gray-400 transition duration-300 hover:border-red-100 hover:bg-red-50 hover:text-red-500"
                aria-label="Remove product"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-gray-500">
                <FiTruck
                  size={14}
                  className="text-green-500"
                />
                <span>Free delivery</span>
              </div>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span className="font-medium text-green-600">
                In Stock
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={14} />
                </button>

                <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-2 text-sm font-bold text-gray-900">
                  {item.quantity}
                </span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-[#ffd600] hover:text-black"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="mb-1 text-xs text-gray-400">
                {item.quantity} × ${item.price.toFixed(2)}
              </p>

              <p className="text-xl font-black text-gray-900">
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
