import { useEffect, useState } from "react";

import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiChevronRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiCheckCircle,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";

import { getFooterSettings } from "../../Apis/footerSettingsApi";

import { useCategories } from "../../context/CategoryContext";

function Footer() {
  const { categories: footerCategories } = useCategories();

  const [footerSettings, setFooterSettings] = useState({
    phone: "",
    email: "",
    location: "",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  const location = useLocation();

  /* =========================================================
     FETCH FOOTER SETTINGS
  ========================================================= */

  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        const response = await getFooterSettings();

        setFooterSettings(response.data);
      } catch (error) {
        console.error("Footer settings error:", error);
      }
    };

    fetchFooterSettings();
  }, []);

  /* =========================================================
     SCROLL TO TOP
  ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-800 dark:border-[#2a2a2a] dark:bg-[#111111] dark:text-gray-200">

      {/* =====================================================
          BIG BRAND INTRO
      ===================================================== */}

      <section className="border-b border-gray-100 dark:border-[#2a2a2a]">

        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">

          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">

            {/* BRAND */}

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black shadow-lg">

                  <FiShoppingBag size={27} />

                </div>

                <Link
                  to="/"
                  className="text-5xl font-black tracking-tight"
                >
                  <span className="text-yellow-400">
                    shop
                  </span>
                  ly
                </Link>

              </div>

              <h2 className="mt-7 max-w-2xl text-3xl font-black leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                Everything you need.
                <br />
                <span className="text-yellow-400">
                  All in one place.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-500 dark:text-gray-400">
                Shoply is your everyday online marketplace, bringing
                products, great deals, and a smooth shopping experience
                together in one place.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-5">

                <div className="flex items-center gap-2">

                  <FiCheckCircle
                    className="text-yellow-500"
                    size={18}
                  />

                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Reliable shopping
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <FiCheckCircle
                    className="text-yellow-500"
                    size={18}
                  />

                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Quality products
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <FiCheckCircle
                    className="text-yellow-500"
                    size={18}
                  />

                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Easy shopping
                  </span>

                </div>

              </div>

            </div>

            {/* RIGHT FEATURE CARD */}

            <div className="relative overflow-hidden rounded-3xl bg-gray-950 p-8 text-white shadow-2xl dark:bg-[#1a1a1a] md:p-10">

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl" />

              <div className="relative">

                <FiStar
                  size={28}
                  className="text-yellow-400"
                />

                <h3 className="mt-5 text-2xl font-black">
                  A better way to shop
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  Discover products you love, explore new categories,
                  and enjoy a shopping experience designed around
                  simplicity and convenience.
                </p>

                <div className="mt-7 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black">
                    <FiShoppingBag size={18} />
                  </div>

                  <span className="text-sm font-semibold">
                    Shop smarter with Shoply
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN FOOTER CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">

        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1.4fr_1fr_1fr]">

          {/* =================================================
              BRAND / SOCIAL
          ================================================= */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Shoply
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500 dark:text-gray-400">
              Your trusted destination for everyday shopping.
              Find what you need, discover something new, and
              enjoy a simple experience from start to finish.
            </p>

            <div className="mt-7">

              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                Follow Shoply
              </p>

              <div className="flex gap-3">

                <Social
                  icon={<FiFacebook size={18} />}
                  label="Facebook"
                  href={footerSettings.facebook}
                />

                <Social
                  icon={<FiInstagram size={18} />}
                  label="Instagram"
                  href={footerSettings.instagram}
                />

                <Social
                  icon={<FiTwitter size={18} />}
                  label="Twitter"
                  href={footerSettings.twitter}
                />

                <Social
                  icon={<FiYoutube size={18} />}
                  label="YouTube"
                  href={footerSettings.youtube}
                />

              </div>

            </div>

          </div>

          {/* =================================================
              SHOP CATEGORIES
          ================================================= */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Shop Categories
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4">

              <Link
                to="/products"
                className="
                  group
                  flex
                  items-center
                  text-sm
                  text-gray-500
                  transition-all
                  duration-200
                  hover:translate-x-1
                  hover:text-gray-900
                  dark:text-gray-400
                  dark:hover:text-white
                "
              >
                <FiChevronRight
                  size={14}
                  className="mr-2 text-yellow-500"
                />

                All Products
              </Link>

              {footerCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${encodeURIComponent(
                    category._id
                  )}`}
                  className="
                    group
                    flex
                    items-center
                    text-sm
                    text-gray-500
                    transition-all
                    duration-200
                    hover:translate-x-1
                    hover:text-gray-900
                    dark:text-gray-400
                    dark:hover:text-white
                  "
                >
                  <FiChevronRight
                    size={14}
                    className="mr-2 text-yellow-500"
                  />

                  {category.name}
                </Link>
              ))}

            </div>

          </div>

          {/* =================================================
              HELP
          ================================================= */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Help & Support
            </h3>

            <div className="mt-6 space-y-4">

              <FooterLink to="/profile">
                My Account
              </FooterLink>

              <FooterLink to="/orders">
                My Orders
              </FooterLink>

              <FooterLink to="/contact">
                Contact Us
              </FooterLink>

              <FooterLink to="/about">
                About Shoply
              </FooterLink>

            </div>

          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Get In Touch
            </h3>

            <div className="mt-6 space-y-5">

              <Contact
                icon={<FiPhone size={18} />}
                title="Phone"
                text={footerSettings.phone}
              />

              <Contact
                icon={<FiMail size={18} />}
                title="Email"
                text={footerSettings.email}
              />

              <Contact
                icon={<FiMapPin size={18} />}
                title="Location"
                text={footerSettings.location}
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            SERVICE FEATURES
        ===================================================== */}

        <div className="mt-16 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-[#2a2a2a] dark:bg-[#171717]">

          <div className="grid md:grid-cols-2 lg:grid-cols-4">

            <ServiceItem
              icon={<FiTruck size={23} />}
              title="Fast Delivery"
              text="Reliable delivery to your doorstep"
            />

            <ServiceItem
              icon={<FiShield size={23} />}
              title="Secure Shopping"
              text="Your information stays protected"
            />

            <ServiceItem
              icon={<FiRefreshCw size={23} />}
              title="Easy Returns"
              text="Simple and convenient experience"
            />

            <ServiceItem
              icon={<FiHeadphones size={23} />}
              title="Customer Support"
              text="We're here whenever you need us"
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="border-t border-gray-200 dark:border-[#2a2a2a]">

        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-7 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <p>
            © 2026 Shoply. All rights reserved.
          </p>

          <div className="flex items-center gap-2">

            <span className="text-gray-400">
              Payment method:
            </span>

            <span className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-700 dark:border-[#2a2a2a] dark:bg-[#171717] dark:text-gray-300">

              <span className="text-base">
                💵
              </span>

              Cash on Delivery

            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}


/* =========================================================
   FOOTER LINK
========================================================= */

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="
        group
        flex
        items-center
        text-sm
        text-gray-500
        transition-all
        duration-200
        hover:translate-x-1
        hover:text-gray-900
        dark:text-gray-400
        dark:hover:text-white
      "
    >
      <FiChevronRight
        size={14}
        className="mr-2 text-yellow-500"
      />

      {children}
    </Link>
  );
}


/* =========================================================
   SOCIAL
========================================================= */

function Social({ icon, label, href }) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-gray-200
        bg-white
        text-gray-600
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-yellow-400
        hover:bg-yellow-400
        hover:text-black
        hover:shadow-lg
        dark:border-[#333]
        dark:bg-[#1a1a1a]
        dark:text-gray-400
      "
    >
      {icon}
    </a>
  );
}


/* =========================================================
   CONTACT
========================================================= */

function Contact({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {title}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-gray-700 dark:text-gray-300">
          {text || "Not available"}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   SERVICE ITEM
========================================================= */

function ServiceItem({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 px-6 py-6 last:border-b-0 md:border-r md:last:border-r-0 lg:border-b-0 dark:border-[#2a2a2a]">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-500">
        {icon}
      </div>

      <div>

        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
          {title}
        </h4>

        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
          {text}
        </p>

      </div>

    </div>
  );
}


export default Footer;