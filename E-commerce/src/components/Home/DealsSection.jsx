import { useEffect, useState } from "react";
import { FiArrowRight, FiClock, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

import ProductGrid from "../../components/Product/ProductGrid";

function DealsSection({ products = [], loading = false }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (
          prev.hours === 0 &&
          prev.minutes === 0 &&
          prev.seconds === 0
        ) {
          return {
            hours: 8,
            minutes: 42,
            seconds: 19,
          };
        }

        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1,
          };
        }

        if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          };
        }

        return {
          hours: prev.hours - 1,
          minutes: 59,
          seconds: 59,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="flex flex-wrap items-center gap-3">

              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-red-500">
                <FiZap size={13} />
                Flash Deals
              </span>

              <span className="text-sm font-medium text-gray-400">
                Limited time only
              </span>

            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Deals you don't want to miss
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Grab today's best prices before the countdown ends.
            </p>
          </div>

          {/* COUNTDOWN */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-gray-200 bg-[#fafafa] px-4 py-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111] text-[#ffd814]">
              <FiClock size={19} />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Ends in
              </p>

              <div className="mt-1 flex items-center gap-1 text-sm font-black text-gray-950">

                <span>
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>

                <span className="text-gray-300">:</span>

                <span>
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>

                <span className="text-gray-300">:</span>

                <span>
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>

              </div>
            </div>

          </div>
        </div>

        {/* PRODUCTS */}
        <ProductGrid
          products={products.slice(0, 6)}
          loading={loading}
        />

        {/* VIEW ALL */}
        <div className="mt-8 flex justify-center">

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-gray-900 transition-all duration-300 hover:border-gray-950 hover:bg-gray-950 hover:text-white"
          >
            View all deals

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default DealsSection;