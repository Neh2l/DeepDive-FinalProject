import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import DealsSection from "../components/Home/DealsSection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import PromoMosaic from "../components/Home/PromoMosaic";
import WelcomeCard from "../components/WelcomeCard";
// import CategorySlider from "../components/Home/CategorySlider";

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
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
    <main className="min-h-screen bg-[#f6f6f6] text-gray-900">

      {/* Welcome Card */}
      <WelcomeCard />

      <section className="relative overflow-hidden bg-[#111111]">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative min-h-[620px] overflow-hidden lg:min-h-[680px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/n56py1.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="relative z-20 flex min-h-[620px] items-center px-6 py-20 sm:px-10 lg:min-h-[680px] lg:px-16 xl:px-24">
              <div className="max-w-2xl text-white">

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  <FiZap className="text-[#ffd814]" />
                  THE EVERYDAY EDIT
                </div>

                <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-8xl">
                  Everything you need.
                  <span className="mt-2 block text-[#ffd814]">
                    All in one place.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
                  Discover thousands of products, unbeatable prices, and a
                  shopping experience designed around you.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-3 rounded-xl bg-[#ffd814] px-6 py-4 text-sm font-black text-gray-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#f7ca00] hover:shadow-2xl"
                  >
                    Shop Now
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                  >
                    Explore Store
                  </Link>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <FiCheck className="text-[#ffd814]" />
                    </div>
                    Verified products
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <FiTruck className="text-[#ffd814]" />
                    </div>
                    Fast delivery
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-7 right-6 z-30 hidden rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:block lg:right-16 xl:right-24">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Flash deals end in
              </p>

              <div className="flex items-center gap-2">
                <TimeBox value={timeLeft.hours} label="HRS" />

                <span className="font-bold text-white/50">:</span>

                <TimeBox value={timeLeft.minutes} label="MIN" />

                <span className="font-bold text-white/50">:</span>

                <TimeBox value={timeLeft.seconds} label="SEC" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <Feature
            icon={<FiTruck />}
            title="Fast & Reliable"
            text="Quick delivery to your door"
          />

          <Feature
            icon={<FiShield />}
            title="Secure Shopping"
            text="Your data is always protected"
          />

          <Feature
            icon={<FiShoppingBag />}
            title="Quality Products"
            text="Carefully selected for you"
          />

          <Feature
            icon={<FiStar />}
            title="Loved by Customers"
            text="A shopping experience you'll enjoy"
          />
        </div>
      </section> */}

      {/* <CategorySlider/> */}

      <DealsSection />

      <FeaturedProducts />

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-[#111111]">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="inline-flex rounded-full bg-[#ffd814] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-gray-950">
                Shoply Exclusive
              </span>

              <h2 className="mt-5 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Your next favorite thing is{" "}
                <span className="text-[#ffd814]">waiting.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                From everyday essentials to products you didn't know you needed
                — discover something worth adding to your cart.
              </p>

              <Link
                to="/products"
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-black text-gray-950 transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffd814]"
              >
                Start Shopping
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative min-h-[320px] overflow-hidden lg:min-h-[390px]">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=90"
                alt="Shoply shopping"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRENDING
      ====================================================== */}

      {/* <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Discover more
              </span>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Trending right now
              </h2>
            </div>

            <Link
              to="/products"
              className="group flex w-fit items-center gap-2 text-sm font-bold text-gray-700 transition hover:text-gray-950"
            >
              View all products
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <TrendCard
              image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=90"
              label="TIMELESS"
              title="Watches that complete your look"
            />

            <TrendCard
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=90"
              label="TECH ESSENTIALS"
              title="Upgrade your everyday setup"
            />

            <TrendCard
              image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=90"
              label="HOME EDIT"
              title="Create a space you'll love"
            />
          </div>
        </div>
      </section> */}

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <BenefitCard
            icon={<FiTruck />}
            title="Fast Delivery"
            text="Get your favorite products delivered quickly and reliably."
          />

          <BenefitCard
            icon={<FiShield />}
            title="Secure Payments"
            text="Shop confidently with a secure and protected experience."
          />

          <BenefitCard
            icon={<FiHeart />}
            title="Made for You"
            text="Save favorites and discover products you'll actually love."
          />
        </div>
      </section>

      <PromoMosaic />

      <section className="bg-[#f6f6f6] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffd814] text-gray-950 shadow-sm">
            <FiShoppingBag size={24} />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Ready to find something amazing?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Explore Shoply and discover products selected to make your everyday
            life a little better.
          </p>

          <Link
            to="/products"
            className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-black px-7 py-4 text-sm font-black !text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-xl"
          >
            Explore Products
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="min-w-[45px] text-center">
      <div className="text-lg font-black leading-none text-white">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-1 text-[8px] font-bold tracking-wider text-gray-500">
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4 px-6 py-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff8d6] text-gray-950">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black text-gray-950">{title}</h3>

        <p className="mt-1 text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   TREND CARD
========================================================= */

function TrendCard({ image, label, title }) {
  return (
    <Link
      to="/products"
      className="group relative min-h-[330px] overflow-hidden rounded-2xl bg-gray-900"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffd814]">
          {label}
        </span>

        <h3 className="mt-2 max-w-sm text-2xl font-black leading-tight text-white">
          {title}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white">
          Shop now
          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   BENEFIT CARD
========================================================= */

function BenefitCard({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff8d6] text-gray-950">
        {icon}
      </div>

      <div>
        <h3 className="font-black text-gray-950">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>
      </div>
    </div>
  );
}

export default Home;