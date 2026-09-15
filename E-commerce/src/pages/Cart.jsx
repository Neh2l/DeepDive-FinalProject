
import CartList from "../components/Cart/CartList";
import CartSummary from "../components/Cart/CartSummary";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#171717]">
      {/* Soft Background Decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-200/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd600] text-black shadow-sm">
              <FiShoppingBag size={21} />
            </div>

            <div>
              <p className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Shoply
              </p>

              <h1 className="text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
                Shopping Cart
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Review your items, update quantities, and get everything ready
            for checkout.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Cart Items */}
          <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-6">
            <CartList />
          </section>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-6">
            <CartSummary />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Cart;
