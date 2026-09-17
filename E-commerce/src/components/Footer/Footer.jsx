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
} from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";

import { getProducts } from "../../Apis/productsApi";

function Footer() {
  const [footerCategories, setFooterCategories] = useState([]);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProducts();
        const products = response.data || [];

        const uniqueCategories = [
          ...new Set(
            products
              .map((product) => product.category)
              .filter(Boolean)
          ),
        ];

        setFooterCategories(uniqueCategories);
      } catch (error) {
        console.error("Footer categories error:", error);
        setFooterCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-800 dark:border-[#2a2a2a] dark:bg-[#111111] dark:text-gray-200">

      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1.8fr_1fr_1fr]">

          {/* ================= BRAND ================= */}
          <div className="max-w-sm">

            <Link
              to="/"
              className="inline-block text-3xl font-black tracking-tight"
            >
              <span className="text-yellow-400">shop</span>ly
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500 dark:text-gray-400">
              Your everyday marketplace for products,
              great deals and everything you need in one place.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">

              <Social
                icon={<FiFacebook size={17} />}
                label="Facebook"
              />

              <Social
                icon={<FiInstagram size={17} />}
                label="Instagram"
              />

              <Social
                icon={<FiTwitter size={17} />}
                label="Twitter"
              />

              <Social
                icon={<FiYoutube size={17} />}
                label="YouTube"
              />

            </div>

          </div>

          {/* ================= SHOP ================= */}
          <div>

            <h3 className="mb-5 text-sm font-bold text-gray-900 dark:text-white">
              Shop
            </h3>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3">

              {/* All Products */}
              <Link
                to="/products"
                className="
                  group
                  inline-flex
                  items-center
                  text-sm
                  text-gray-500
                  transition-colors
                  duration-200
                  hover:text-gray-900
                  dark:text-gray-400
                  dark:hover:text-white
                "
              >
                All Products

                <FiChevronRight
                  size={13}
                  className="
                    ml-1
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:translate-x-1
                    group-hover:opacity-100
                  "
                />
              </Link>

              {/* Dynamic Categories */}
              {footerCategories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="
                    group
                    inline-flex
                    items-center
                    text-sm
                    text-gray-500
                    transition-colors
                    duration-200
                    hover:text-gray-900
                    dark:text-gray-400
                    dark:hover:text-white
                  "
                >
                  {category}

                  <FiChevronRight
                    size={13}
                    className="
                      ml-1
                      opacity-0
                      transition-all
                      duration-200
                      group-hover:translate-x-1
                      group-hover:opacity-100
                    "
                  />
                </Link>
              ))}

            </div>

          </div>

          {/* ================= HELP ================= */}
          <FooterColumn
            title="Help & Support"
            links={[
              {
                label: "My Account",
                to: "/profile",
              },
              {
                label: "My Orders",
                to: "/orders",
              },
              {
                label: "Shipping",
                to: "/shipping",
              },
              {
                label: "Returns",
                to: "/returns",
              },
              {
                label: "Payment",
                to: "/payment",
              },
              {
                label: "Contact Us",
                to: "/contact",
              },
            ]}
          />

          {/* ================= ABOUT ================= */}
          <FooterColumn
            title="About Shoply"
            links={[
              {
                label: "About Us",
                to: "/about",
              },
              {
                label: "Careers",
                to: "/careers",
              },
              {
                label: "Privacy Policy",
                to: "/privacy",
              },
              {
                label: "Terms & Conditions",
                to: "/terms",
              },
            ]}
          />

        </div>

        {/* ================= CONTACT ================= */}
        <div className="mt-12 border-t border-gray-100 pt-8 dark:border-[#2a2a2a]">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <Contact
              icon={<FiPhone size={17} />}
              text="+20 100 000 0000"
            />

            <Contact
              icon={<FiMail size={17} />}
              text="support@shoply.com"
            />

            <Contact
              icon={<FiMapPin size={17} />}
              text="Egypt"
            />

          </div>

        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-200 bg-[#fafafa] dark:border-[#2a2a2a] dark:bg-[#171717]">

        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-6 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          {/* Copyright */}
          <p>
            © 2026 Shoply. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-5">

            <Link
              to="/privacy"
              className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

          {/* Cash On Delivery */}
          <div className="flex items-center gap-3">

            <span className="text-xs text-gray-500 dark:text-gray-400">
              Payment:
            </span>

            <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

              <span className="text-sm">
                💵
              </span>

              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Cash on Delivery
              </span>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}


/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({ title, links }) {
  return (
    <div>

      <h3 className="mb-5 text-sm font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      <ul className="space-y-3">

        {links.map((link) => (
          <li key={link.label}>

            <Link
              to={link.to}
              className="
                group
                inline-flex
                items-center
                text-sm
                text-gray-500
                transition-colors
                duration-200
                hover:text-gray-900
                dark:text-gray-400
                dark:hover:text-white
              "
            >

              {link.label}

              <FiChevronRight
                size={13}
                className="
                  ml-1
                  opacity-0
                  transition-all
                  duration-200
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "
              />

            </Link>

          </li>
        ))}

      </ul>

    </div>
  );
}


/* =========================================================
   SOCIAL MEDIA
========================================================= */

function Social({ icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-yellow-400
        text-black
        shadow-sm
        ring-1
        ring-yellow-400/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-yellow-300
        hover:shadow-lg
      "
    >
      {icon}
    </button>
  );
}


/* =========================================================
   CONTACT
========================================================= */

function Contact({ icon, text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="text-yellow-500">
        {icon}
      </div>

      <span className="text-sm text-gray-600 dark:text-gray-400">
        {text}
      </span>

    </div>
  );
}


export default Footer;