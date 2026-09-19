import { useEffect, useState } from "react";

import {
  FiArrowUpRight,
  FiClock,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../../components/Product/ProductCard";

function DealsSection({ products = [], loading = false }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  // =========================================================
  // COUNTDOWN
  // =========================================================

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

  const dealProducts = products.slice(0, 8);

  return (
    <section
      className="
        bg-[#eeeeec]
        px-5
        py-20
        dark:bg-[#111111]
        sm:px-8
        sm:py-24
        lg:px-10
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1400px]">

        {/* =====================================================
            EDITORIAL HEADER
        ====================================================== */}

        <div
          className="
            border-b
            border-gray-300
            pb-9
            dark:border-[#2a2a2a]
            sm:pb-11
          "
        >
          <div
            className="
              flex
              flex-col
              gap-10
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="max-w-[700px]">

              {/* LABEL */}

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-gray-400
                  dark:text-gray-500
                "
              >
                <span className="h-px w-9 bg-[#ffd814]" />

                Limited edition offers
              </div>

              {/* TITLE */}

              <h2
                className="
                  text-[38px]
                  font-medium
                  leading-[1.02]
                  tracking-[-0.05em]
                  text-[#111111]
                  dark:text-white
                  sm:text-[50px]
                  lg:text-[60px]
                "
              >
                Exceptional pieces.
                <br />

                <span className="text-gray-400 dark:text-gray-500">
                  Exceptional prices.
                </span>
              </h2>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-5
                  max-w-[500px]
                  text-[12px]
                  leading-6
                  text-gray-500
                  dark:text-gray-400
                  sm:text-[13px]
                "
              >
                A limited selection of favourites, available
                for less while the clock is running.
              </p>

            </div>

            {/* =================================================
                COUNTDOWN
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-4
                lg:mb-1
              "
            >

              {/* CLOCK */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  border
                  border-black
                  text-black
                  dark:border-white
                  dark:text-white
                "
              >
                <FiClock
                  size={17}
                  strokeWidth={1.5}
                />
              </div>

              {/* TIME */}

              <div>

                <p
                  className="
                    mb-1.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-gray-400
                  "
                >
                  Offer ends in
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    font-mono
                    text-[21px]
                    font-medium
                    tracking-[0.04em]
                    text-black
                    dark:text-white
                  "
                >

                  <span>
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>

                  <span className="text-gray-300 dark:text-gray-600">
                    :
                  </span>

                  <span>
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>

                  <span className="text-gray-300 dark:text-gray-600">
                    :
                  </span>

                  <span>
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* =====================================================
            PRODUCTS AREA
        ====================================================== */}

        <div className="mt-8">

          {/* ===================================================
              PRODUCTS HEADER
          ==================================================== */}

          <div
            className="
              mb-5
              flex
              items-center
              justify-between
              border-b
              border-gray-300
              pb-4
              dark:border-[#2a2a2a]
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  bg-[#ffd814]
                  text-black
                "
              >
                <FiZap
                  size={13}
                  strokeWidth={2}
                />
              </span>

              <div>

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-gray-900
                    dark:text-white
                  "
                >
                  Today's selection
                </p>

                <p
                  className="
                    mt-0.5
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                  "
                >
                  Special prices · Limited availability
                </p>

              </div>

            </div>

            {/* =================================================
                ARROWS
            ================================================== */}

            <div className="flex items-center gap-2">

              <button
                type="button"
                className="
                  deals-prev
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  border
                  border-gray-300
                  bg-white
                  text-gray-800
                  transition-all
                  duration-300
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                  dark:border-[#333]
                  dark:bg-[#1b1b1b]
                  dark:text-white
                  dark:hover:border-white
                  dark:hover:bg-white
                  dark:hover:text-black
                "
                aria-label="Previous deals"
              >
                <FiChevronLeft size={15} />
              </button>

              <button
                type="button"
                className="
                  deals-next
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  border
                  border-gray-300
                  bg-white
                  text-gray-800
                  transition-all
                  duration-300
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                  dark:border-[#333]
                  dark:bg-[#1b1b1b]
                  dark:text-white
                  dark:hover:border-white
                  dark:hover:bg-white
                  dark:hover:text-black
                "
                aria-label="Next deals"
              >
                <FiChevronRight size={15} />
              </button>

            </div>

          </div>

          {/* ===================================================
              CARDS CONTAINER
          ==================================================== */}

          <div
            className="
              relative
              overflow-hidden
              bg-white
              px-4
              py-7
              sm:px-6
              sm:py-8
              lg:px-8
              lg:py-9
              dark:bg-[#191919]
            "
          >

            {/* YELLOW TOP LINE */}

            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-[2px]
                bg-[#ffd814]
              "
            />

            {/* =================================================
                LOADING
            ================================================== */}

            {loading ? (

              <div
                className="
                  grid
                  grid-cols-2
                  gap-x-4
                  gap-y-10
                  sm:grid-cols-3
                  lg:grid-cols-4
                "
              >
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                      aspect-[3/4]
                      animate-pulse
                      bg-gray-200
                      dark:bg-[#252525]
                    "
                  />
                ))}
              </div>

            ) : dealProducts.length > 0 ? (

              /* =================================================
                  SWIPER
              ================================================== */

              <Swiper
                modules={[Autoplay, Navigation]}
                loop={dealProducts.length > 4}
                speed={700}
                spaceBetween={18}
                slidesPerView={1.25}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  prevEl: ".deals-prev",
                  nextEl: ".deals-next",
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 1.7,
                    spaceBetween: 16,
                  },

                  640: {
                    slidesPerView: 2.2,
                    spaceBetween: 18,
                  },

                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },

                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 22,
                  },

                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                className="deals-swiper"
              >

                {dealProducts.map((product, index) => (

                  <SwiperSlide
                    key={
                      product._id ||
                      product.id ||
                      index
                    }
                    className="!h-auto"
                  >

                    <ProductCard
                      product={product}
                      index={index}
                    />

                  </SwiperSlide>

                ))}

              </Swiper>

            ) : (

              /* =================================================
                  EMPTY STATE
              ================================================== */

              <div
                className="
                  flex
                  min-h-[250px]
                  items-center
                  justify-center
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-gray-400
                "
              >
                No deals available
              </div>

            )}

          </div>

        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-between
            gap-5
            border-t
            border-gray-300
            pt-7
            dark:border-[#2a2a2a]
            sm:flex-row
          "
        >

          {/* STATUS */}

          <div className="flex items-center gap-3">

            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-[#ffd814]
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-gray-400
              "
            >
              Offers end soon
            </span>

          </div>

          {/* CTA */}

          <Link
            to="/products"
            className="
              group
              flex
              items-center
              gap-4
              border-b
              border-black
              pb-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.17em]
              text-black
              transition-all
              duration-300
              hover:gap-6
              dark:border-white
              dark:text-white
            "
          >

            Explore all deals

            <FiArrowUpRight
              size={14}
              strokeWidth={1.6}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />

          </Link>

        </div>

      </div>
    </section>
  );
}

export default DealsSection;