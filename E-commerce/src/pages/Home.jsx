
import { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiHeart,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { getProducts } from "../Apis/productsApi";

import DealsSection from "../components/Home/DealsSection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import PromoMosaic from "../components/Home/PromoMosaic";
import WelcomeCard from "../components/WelcomeCard";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();

        console.log("HOME PRODUCTS:", response);
        console.log("FIRST PRODUCT:", response.data?.[0]);

        setProducts(response.data || []);
      } catch (error) {
        console.error("HOME PRODUCTS ERROR:", error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (
          prev.hours === 0 &&
          prev.minutes === 0 &&
          prev.seconds === 0
        ) {
          return {
            hours: 12,
            minutes: 34,
            seconds: 56,
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

    return () => clearInterval(countdownTimer);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#111111] dark:bg-[#111111] dark:text-white">
      <WelcomeCard />

      <section className="relative overflow-hidden bg-[#111111]">
        <div className="mx-auto max-w-[1500px]">
          <div className="hero-swiper relative overflow-hidden">
            <Swiper
              modules={[
                Autoplay,
                EffectFade,
                Navigation,
                Pagination,
              ]}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              speed={1200}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: false,
              }}
              navigation={{
                prevEl: ".hero-prev",
                nextEl: ".hero-next",
              }}
              pagination={{
                el: ".hero-pagination",
                clickable: true,
              }}
              className="hero-slider"
            >
              <SwiperSlide>
                <div className="relative min-h-[620px] overflow-hidden xs:min-h-[580px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px]">
                  <div className="absolute inset-0">
                    <img
                      src="/p1 (5).jpg"
                      alt="Shoply collection"
                      className="hero-image h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  <div className="relative z-20 flex min-h-[620px] items-center px-5 py-24 sm:min-h-[620px] sm:px-10 md:min-h-[680px] md:px-16 lg:min-h-[720px] lg:px-16 xl:min-h-[760px] xl:px-20">
                    <div className="w-full max-w-[470px] text-white">
                      <HeroEyebrow>
                        THE EVERYDAY EDIT
                      </HeroEyebrow>

                      <h1 className="mt-4 text-[28px] font-medium uppercase leading-[0.98] tracking-[-0.045em] sm:mt-5 sm:text-[36px] md:text-[43px] lg:text-[54px] xl:text-[62px]">
                        Everything you need.
                        <span className="mt-2 block font-medium text-[#ffd814]">
                          All in one place.
                        </span>
                      </h1>

                      <p className="mt-5 max-w-[360px] text-[9px] font-medium uppercase leading-5 tracking-[0.1em] text-white/60 sm:mt-6 sm:text-[10px]">
                        Discover products made for everyday living,
                        effortless style, and everything in between.
                      </p>

                      <div className="mt-7 flex flex-col items-start gap-2.5 min-[400px]:flex-row sm:mt-8 sm:gap-3">
                        <HeroPrimaryButton>
                          Shop now
                        </HeroPrimaryButton>

                        <HeroSecondaryButton>
                          View store
                        </HeroSecondaryButton>
                      </div>

                      <HeroTrust>
                        <TrustItem
                          icon={<FiZap />}
                          text="Curated products"
                        />

                        <TrustItem
                          icon={<FiTruck />}
                          text="Fast delivery"
                        />

                        <TrustItem
                          icon={<FiShield />}
                          text="Secure checkout"
                        />
                      </HeroTrust>
                    </div>
                  </div>

                  <SlideNumber current="01" />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="relative min-h-[620px] overflow-hidden sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px]">
                  <div className="absolute inset-0">
                    <img
                      src="/11.jpg"
                      alt="Shoply new arrivals"
                      className="hero-image h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/45 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  <div className="relative z-20 flex min-h-[620px] items-center justify-end px-5 py-24 sm:min-h-[620px] sm:px-10 md:min-h-[680px] md:px-16 lg:min-h-[720px] lg:px-16 xl:min-h-[760px] xl:px-20">
                    <div className="w-full max-w-[470px] text-right text-white">
                      <HeroEyebrow right>
                        NEW ARRIVALS
                      </HeroEyebrow>

                      <h1 className="mt-4 text-[28px] font-medium uppercase leading-[0.98] tracking-[-0.045em] sm:mt-5 sm:text-[36px] md:text-[43px] lg:text-[54px] xl:text-[62px]">
                        Fresh finds.
                        <span className="mt-2 block font-medium text-[#ffd814]">
                          Made for you.
                        </span>
                      </h1>

                      <p className="ml-auto mt-5 max-w-[360px] text-[9px] font-medium uppercase leading-5 tracking-[0.1em] text-white/60 sm:mt-6 sm:text-[10px]">
                        Explore our latest collection of products
                        carefully selected for modern everyday life.
                      </p>

                      <div className="mt-7 flex flex-col items-end gap-2.5 min-[400px]:flex-row min-[400px]:justify-end sm:mt-8 sm:gap-3">
                        <HeroPrimaryButton>
                          Explore new arrivals
                        </HeroPrimaryButton>

                        <HeroSecondaryButton>
                          View store
                        </HeroSecondaryButton>
                      </div>

                      <HeroTrust right>
                        <TrustItem
                          icon={<FiZap />}
                          text="New collection"
                        />

                        <TrustItem
                          icon={<FiTruck />}
                          text="Fast delivery"
                        />
                      </HeroTrust>
                    </div>
                  </div>

                  <SlideNumber current="02" right />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="relative min-h-[620px] overflow-hidden sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px]">
                  <div className="absolute inset-0">
                    <img
                      src="/pexels-cottonbro-6220653.jpg.jpeg"
                      alt="Shoply style collection"
                      className="hero-image h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  <div className="relative z-20 flex min-h-[620px] items-center px-5 py-24 sm:min-h-[620px] sm:px-10 md:min-h-[680px] md:px-16 lg:min-h-[720px] lg:px-16 xl:min-h-[760px] xl:px-20">
                    <div className="w-full max-w-[470px] text-white">
                      <HeroEyebrow>
                        STYLE YOUR WAY
                      </HeroEyebrow>

                      <h1 className="mt-4 text-[28px] font-medium uppercase leading-[0.98] tracking-[-0.045em] sm:mt-5 sm:text-[36px] md:text-[43px] lg:text-[54px] xl:text-[62px]">
                        Find your next
                        <span className="mt-2 block text-[#ffd814]">
                          favorite thing.
                        </span>
                      </h1>

                      <p className="mt-5 max-w-[360px] text-[9px] font-medium uppercase leading-5 tracking-[0.1em] text-white/60 sm:mt-6 sm:text-[10px]">
                        Discover something worth bringing home.
                      </p>

                      <div className="mt-7 flex flex-col items-start gap-2.5 min-[400px]:flex-row sm:mt-8 sm:gap-3">
                        <HeroPrimaryButton>
                          Discover more
                        </HeroPrimaryButton>

                        <HeroSecondaryButton>
                          View store
                        </HeroSecondaryButton>
                      </div>

                      <HeroTrust>
                        <TrustItem
                          icon={<FiHeart />}
                          text="Curated for you"
                        />

                        <TrustItem
                          icon={<FiTruck />}
                          text="Fast delivery"
                        />
                      </HeroTrust>
                    </div>
                  </div>

                  <SlideNumber current="03" />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="relative min-h-[620px] overflow-hidden sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px]">
                  <div className="absolute inset-0">
                    <img
                      src="/banner.jpg"
                      alt="Shoply shopping"
                      className="hero-image h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  <div className="relative z-20 flex min-h-[620px] items-center px-5 py-24 sm:min-h-[620px] sm:px-10 md:min-h-[680px] md:px-16 lg:min-h-[720px] lg:px-16 xl:min-h-[760px] xl:px-20">
                    <div className="w-full max-w-[470px] text-white">
                      <HeroEyebrow>
                        SHOP SMART
                      </HeroEyebrow>

                      <h1 className="mt-4 text-[28px] font-medium uppercase leading-[0.98] tracking-[-0.045em] sm:mt-5 sm:text-[36px] md:text-[43px] lg:text-[54px] xl:text-[62px]">
                        Good products.
                        <span className="mt-2 block text-[#ffd814]">
                          Better choices.
                        </span>
                      </h1>

                      <p className="mt-5 max-w-[360px] text-[9px] font-medium uppercase leading-5 tracking-[0.1em] text-white/60 sm:mt-6 sm:text-[10px]">
                        Quality products, great prices, and a shopping
                        experience designed around you.
                      </p>

                      <div className="mt-7 flex flex-col items-start gap-2.5 min-[400px]:flex-row sm:mt-8 sm:gap-3">
                        <HeroPrimaryButton>
                          Shop collection
                        </HeroPrimaryButton>

                        <HeroSecondaryButton>
                          View store
                        </HeroSecondaryButton>
                      </div>

                      <HeroTrust>
                        <TrustItem
                          icon={<FiShield />}
                          text="Secure shopping"
                        />

                        <TrustItem
                          icon={<FiTruck />}
                          text="Fast delivery"
                        />
                      </HeroTrust>
                    </div>
                  </div>

                  <SlideNumber current="04" />
                </div>
              </SwiperSlide>
            </Swiper>

            <button
              type="button"
              className="hero-prev absolute bottom-4 left-4 z-40 flex h-8 w-8 items-center justify-center border border-white/25 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black min-[400px]:left-auto min-[400px]:right-[52px] sm:bottom-6 sm:right-[78px] sm:h-9 sm:w-9 lg:right-[112px] lg:h-10 lg:w-10 xl:right-[140px]"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={15} />
            </button>

            <button
              type="button"
              className="hero-next absolute bottom-4 right-4 z-40 flex h-8 w-8 items-center justify-center border border-white/25 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:bottom-6 sm:right-8 sm:h-9 sm:w-9 lg:right-14 lg:h-10 lg:w-10 xl:right-20"
              aria-label="Next slide"
            >
              <FiChevronRight size={15} />
            </button>

            <div className="hero-pagination absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-[27px]" />

            <div className="absolute right-5 top-5 z-30 hidden border border-white/15 bg-black/25 px-3 py-2.5 backdrop-blur-md md:block lg:right-14 xl:right-20">
              <p className="mb-1.5 text-[6px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Flash deals end in
              </p>

              <div className="flex items-center gap-1.5">
                <TimeBox
                  value={timeLeft.hours}
                  label="HRS"
                />

                <span className="font-bold text-white/35">
                  :
                </span>

                <TimeBox
                  value={timeLeft.minutes}
                  label="MIN"
                />

                <span className="font-bold text-white/35">
                  :
                </span>

                <TimeBox
                  value={timeLeft.seconds}
                  label="SEC"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DealsSection
        products={products}
        loading={productsLoading}
      />

      <FeaturedProducts
        products={products}
        loading={productsLoading}
      />

      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0">
          <img
            src="/p1 (11).jpg"
            alt="Shoply exclusive collection"
            className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.02]"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <div className="max-w-[600px]">
            <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
              <span className="h-px w-8 bg-[#ffd814]" />
              Shoply exclusive
            </div>

            <h2 className="mt-6 text-[32px] font-medium leading-[1.04] tracking-[-0.045em] text-white sm:text-[44px] lg:text-[52px]">
              Your next favorite thing is{" "}
              <span className="text-[#ffd814]">
                waiting.
              </span>
            </h2>

            <p className="mt-6 max-w-[470px] text-[12px] leading-6 text-white/65 sm:text-[13px]">
              From everyday essentials to products you
              didn't know you needed — discover something
              worth adding to your collection.
            </p>

            <Link
              to="/products"
              className="group mt-8 flex w-fit items-center gap-4 border-b border-white pb-2 text-[9px] font-bold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:gap-6"
            >
              Start shopping

              <FiArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white dark:border-[#292929] dark:bg-[#111111]">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-3">
          <BenefitCard
            icon={<FiTruck />}
            title="Fast delivery"
            text="Reliable delivery, from checkout to your door."
          />

          <BenefitCard
            icon={<FiShield />}
            title="Secure payments"
            text="A protected checkout experience every time."
          />

          <BenefitCard
            icon={<FiHeart />}
            title="Made for you"
            text="Save favourites and discover pieces worth keeping."
          />
        </div>
      </section>

      <PromoMosaic />

      <section className="bg-[#eeeeec] px-5 py-20 dark:bg-[#151515] sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-[800px] text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#ffd814] text-black">
            <FiShoppingBag size={20} />
          </div>

          <h2 className="mt-7 text-[32px] font-medium leading-[1.05] tracking-[-0.045em] text-[#111111] dark:text-white sm:text-[48px]">
            Ready to find something
            <span className="text-gray-400 dark:text-gray-500">
              {" "}amazing?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[550px] text-[12px] leading-6 text-gray-500 dark:text-gray-400 sm:text-[13px]">
            Explore Shoply and discover products selected
            to make your everyday life a little better.
          </p>

          <Link
            to="/products"
            className="group mt-8 inline-flex items-center gap-4 border-b border-black pb-2 text-[9px] font-bold uppercase tracking-[0.17em] text-black transition-all duration-300 hover:gap-6 dark:border-white dark:text-white"
          >
            Explore products

            <FiArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

function HeroEyebrow({ children, right = false }) {
  return (
    <div
      className={`flex items-center gap-3 text-[7px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-[9px] sm:tracking-[0.25em] ${
        right ? "justify-end" : ""
      }`}
    >
      {!right && (
        <span className="h-px w-6 bg-[#ffd814] sm:w-8" />
      )}

      <span>{children}</span>

      {right && (
        <span className="h-px w-6 bg-[#ffd814] sm:w-8" />
      )}
    </div>
  );
}

function HeroPrimaryButton({ children }) {
  return (
    <Link
      to="/products"
      className="group inline-flex min-h-[40px] items-center gap-3 bg-[#ffd814] px-4 py-2.5 text-[8px] font-bold uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-[#f7ca00] sm:px-6 sm:py-3.5 sm:text-[9px]"
    >
      {children}

      <FiArrowRight
        size={13}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

function HeroSecondaryButton({ children }) {
  return (
    <Link
      to="/products"
      className="group inline-flex min-h-[40px] items-center gap-3 border border-white/30 px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:px-6 sm:py-3.5 sm:text-[9px]"
    >
      {children}

      <FiArrowRight
        size={13}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

function HeroTrust({ children, right = false }) {
  return (
    <div
      className={`mt-7 flex flex-wrap items-center gap-x-4 gap-y-2.5 border-t border-white/15 pt-4 text-[6px] font-medium uppercase tracking-[0.08em] text-white/45 sm:mt-9 sm:gap-x-6 sm:pt-5 sm:text-[8px] sm:tracking-[0.12em] ${
        right ? "justify-end" : ""
      }`}
    >
      {children}
    </div>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="text-[#ffd814]">
        {icon}
      </span>

      {text}
    </div>
  );
}

function SlideNumber({ current, right = false }) {
  return (
    <div
      className={`absolute bottom-5 z-30 hidden items-center gap-2.5 text-white sm:flex lg:bottom-7 ${
        right
          ? "right-5 lg:right-14 xl:right-20"
          : "left-5 lg:left-14 xl:left-20"
      }`}
    >
      <span className="text-[8px] font-semibold uppercase tracking-[0.2em]">
        {current}
      </span>

      <span className="h-px w-7 bg-white/35" />

      <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
        04
      </span>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="min-w-[45px] text-center">
      <div className="text-lg font-medium leading-none text-white">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-1 text-[7px] font-medium uppercase tracking-[0.12em] text-white/35">
        {label}
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4 border-b border-gray-200 px-5 py-7 last:border-b-0 sm:gap-5 sm:px-8 sm:py-8 md:border-b-0 md:border-r md:px-8 lg:px-10 md:last:border-r-0 dark:border-[#292929]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-200 text-gray-900 dark:border-[#333] dark:text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-2 max-w-[250px] text-[11px] leading-5 text-gray-400 dark:text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Home;
