import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
} from "react-icons/fi";

import "swiper/css";

const categories = [
  {
    id: 1,
    name: "Fashion",
    subtitle: "Style & Trends",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 2,
    name: "Electronics",
    subtitle: "Smart Technology",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 3,
    name: "Beauty",
    subtitle: "Beauty Essentials",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 4,
    name: "Home & Living",
    subtitle: "Make It Yours",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 5,
    name: "Sports",
    subtitle: "Move Better",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 6,
    name: "Wellness",
    subtitle: "Feel Your Best",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 7,
    name: "Automotive",
    subtitle: "Drive Your Way",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: 8,
    name: "Accessories",
    subtitle: "Complete Your Look",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=90",
  },
];

function CategorySlider() {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-[#111111] sm:py-24">

      {/* ================= BACKGROUND DECOR ================= */}
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-[#ffd814]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-gray-100 blur-3xl dark:bg-[#1a1a1a]" />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex items-end justify-between">

          <div>

            {/* Small Label */}
            <div className="mb-4 flex items-center gap-3">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffd814] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffd814]" />
              </span>

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                Explore Shoply
              </span>

            </div>

            {/* Heading */}
            <div className="flex items-end gap-4">

              <h2 className="text-[30px] font-black leading-none tracking-[-0.055em] text-gray-950 dark:text-white sm:text-[40px] lg:text-[46px]">
                Shop by
                <span className="ml-2 text-gray-400">
                  category
                </span>
              </h2>

            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
              Discover everything you need, carefully selected for your everyday
              lifestyle.
            </p>

          </div>

          {/* ================= VIEW ALL ================= */}
          <button
            className="
              group
              hidden
              items-center
              gap-3
              rounded-full
              bg-gray-950
              px-6
              py-3.5
              text-xs
              font-black
              text-white
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-black
              hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)]
              sm:flex
            "
          >
            View all

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-white/10
                transition-transform
                duration-300
                group-hover:rotate-45
              "
            >
              <FiArrowUpRight size={14} />
            </span>
          </button>

        </div>


        {/* ================= SLIDER ================= */}
        <div className="group relative">

          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            speed={1200}
            grabCursor={true}
            autoplay={{
              delay: 2200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".premium-category-prev",
              nextEl: ".premium-category-next",
            }}
            spaceBetween={18}
            slidesPerView={1.7}
            breakpoints={{
              480: {
                slidesPerView: 2.4,
                spaceBetween: 18,
              },

              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },

              768: {
                slidesPerView: 4,
                spaceBetween: 22,
              },

              1024: {
                slidesPerView: 5,
                spaceBetween: 24,
              },

              1280: {
                slidesPerView: 6,
                spaceBetween: 26,
              },

              1536: {
                slidesPerView: 7,
                spaceBetween: 28,
              },
            }}
          >

            {categories.map((category) => (

              <SwiperSlide key={category.id}>

                <div className="group/category cursor-pointer">

                  {/* ================= IMAGE CARD ================= */}
                  <div
                    className="
                      relative
                      aspect-[0.82]
                      overflow-hidden
                      rounded-[30px]
                      bg-gray-100
                      shadow-[0_8px_35px_rgba(0,0,0,0.06)]
                      transition-all
                      duration-700
                      ease-[cubic-bezier(.16,1,.3,1)]
                      group-hover/category:-translate-y-2
                      group-hover/category:shadow-[0_25px_60px_rgba(0,0,0,0.14)]
                      dark:bg-[#1a1a1a]
                    "
                  >

                    {/* IMAGE */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-[1200ms]
                        ease-[cubic-bezier(.16,1,.3,1)]
                        group-hover/category:scale-[1.1]
                      "
                    />

                    {/* DARK OVERLAY */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/75
                        via-black/5
                        to-transparent
                        opacity-70
                        transition-opacity
                        duration-500
                        group-hover/category:opacity-90
                      "
                    />

                    {/* TOP NUMBER */}
                    <div
                      className="
                        absolute
                        left-4
                        top-4
                        flex
                        h-8
                        min-w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-black/20
                        px-2
                        text-[10px]
                        font-black
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-500
                        group-hover/category:border-white/40
                        group-hover/category:bg-white
                        group-hover/category:text-gray-950
                      "
                    >
                      {String(category.id).padStart(2, "0")}
                    </div>

                    {/* ARROW */}
                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        translate-y-[-8px]
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-gray-950
                        opacity-0
                        shadow-xl
                        transition-all
                        duration-500
                        group-hover/category:translate-y-0
                        group-hover/category:opacity-100
                        group-hover/category:rotate-0
                      "
                    >
                      <FiArrowUpRight size={17} />
                    </div>


                    {/* ================= TEXT INSIDE IMAGE ================= */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-5
                        transition-transform
                        duration-500
                        group-hover/category:-translate-y-1
                      "
                    >

                      <p
                        className="
                          mb-1.5
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-white/60
                        "
                      >
                        {category.subtitle}
                      </p>

                      <h3
                        className="
                          text-[17px]
                          font-black
                          tracking-[-0.03em]
                          text-white
                          sm:text-[18px]
                        "
                      >
                        {category.name}
                      </h3>

                      {/* Animated Line */}
                      <div className="mt-3 h-[2px] w-0 overflow-hidden rounded-full bg-[#ffd814] transition-all duration-700 group-hover/category:w-10" />

                    </div>

                  </div>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>


          {/* ================= LEFT FADE ================= */}
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              z-10
              h-full
              w-20
              bg-gradient-to-r
              from-white
              via-white/70
              to-transparent
              dark:from-[#111111]
              dark:via-[#111111]/70
            "
          />


          {/* ================= RIGHT FADE ================= */}
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-10
              h-full
              w-20
              bg-gradient-to-l
              from-white
              via-white/70
              to-transparent
              dark:from-[#111111]
              dark:via-[#111111]/70
            "
          />


          {/* ================= LEFT ARROW ================= */}
          <button
            className="
              premium-category-prev
              absolute
              left-3
              top-1/2
              z-20
              flex
              h-12
              w-12
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-900
              opacity-0
              shadow-[0_12px_35px_rgba(0,0,0,0.14)]
              transition-all
              duration-300
              group-hover:opacity-100
              hover:scale-110
              hover:bg-gray-950
              hover:text-white
              active:scale-95
              dark:border-[#2a2a2a]
              dark:bg-[#1a1a1a]
              dark:text-white
            "
          >
            <FiChevronLeft size={19} />
          </button>


          {/* ================= RIGHT ARROW ================= */}
          <button
            className="
              premium-category-next
              absolute
              right-3
              top-1/2
              z-20
              flex
              h-12
              w-12
              translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-900
              opacity-0
              shadow-[0_12px_35px_rgba(0,0,0,0.14)]
              transition-all
              duration-300
              group-hover:opacity-100
              hover:scale-110
              hover:bg-gray-950
              hover:text-white
              active:scale-95
              dark:border-[#2a2a2a]
              dark:bg-[#1a1a1a]
              dark:text-white
            "
          >
            <FiChevronRight size={19} />
          </button>

        </div>


        {/* ================= MOBILE VIEW ALL ================= */}
        <button
          className="
            group
            mt-8
            flex
            items-center
            gap-2
            text-xs
            font-black
            text-gray-950
            dark:text-white
            sm:hidden
          "
        >
          View all

          <FiArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>

      </div>
    </section>
  );
}

export default CategorySlider;