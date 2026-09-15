
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">
              Stay in the loop.
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Get exclusive deals and new arrivals in your inbox.
            </p>
          </div>

          <div className="flex w-full max-w-md">
            <div className="relative flex-1">
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                placeholder="Your email address"
                className="h-12 w-full rounded-l-lg bg-white px-11 text-sm text-black outline-none"
              />
            </div>

            <button
              type="button"
              className="rounded-r-lg bg-yellow-400 px-5 text-sm font-bold text-black transition hover:bg-yellow-300"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            className="inline-block text-3xl font-black transition-opacity hover:opacity-80"
          >
            <span className="text-yellow-400">shop</span>ly
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Your everyday marketplace for products,
            deals and everything in between.
          </p>

          <div className="mt-5 flex gap-3">
            <Social
              icon={<FiFacebook />}
              label="Facebook"
            />

            <Social
              icon={<FiInstagram />}
              label="Instagram"
            />

            <Social
              icon={<FiTwitter />}
              label="Twitter"
            />

            <Social
              icon={<FiYoutube />}
              label="YouTube"
            />
          </div>
        </div>

        <FooterColumn
          title="Shop"
          links={[
            {
              label: "All Products",
              to: "/products",
            },
            {
              label: "Electronics",
              to: "/products?category=smartphones",
            },
            {
              label: "Fashion",
              to: "/products?category=mens-shirts",
            },
            {
              label: "Beauty",
              to: "/products?category=beauty",
            },
            {
              label: "Home & Furniture",
              to: "/products?category=furniture",
            },
          ]}
        />

        <FooterColumn
          title="Help"
          links={[
            {
              label: "Your Account",
              to: "/profile",
            },
            {
              label: "My Orders",
              to: "/my-orders",
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

        {/* About */}
        <FooterColumn
          title="About"
          links={[
            {
              label: "About Shoply",
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

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-gray-500">
        © 2026 Shoply. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-gray-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({ icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:text-black"
    >
      {icon}
    </button>
  );
}

export default Footer;
