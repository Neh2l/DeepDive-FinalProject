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
  FiArrowUpRight,
  FiShoppingBag,
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

  // =========================================================
  // FETCH FOOTER SETTINGS
  // =========================================================

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

  // =========================================================
  // SCROLL TO TOP
  // =========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);

  return (
    <footer
      className="
        border-t
        border-gray-200
        bg-white
        text-gray-900
        dark:border-[#292929]
        dark:bg-[#111111]
        dark:text-white
      "
    >

      {/* =====================================================
          SERVICE STRIP
      ====================================================== */}

      <div
        className="
          border-b
          border-gray-200
          dark:border-[#292929]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1400px]
            grid-cols-2
            lg:grid-cols-4
          "
        >

          <ServiceItem
            icon={<FiTruck size={18} />}
            title="Fast delivery"
            text="Delivered to your door"
          />

          <ServiceItem
            icon={<FiShield size={18} />}
            title="Secure shopping"
            text="Safe & protected checkout"
          />

          <ServiceItem
            icon={<FiRefreshCw size={18} />}
            title="Easy returns"
            text="Simple return process"
          />

          <ServiceItem
            icon={<FiHeadphones size={18} />}
            title="Need help?"
            text="We're here for you"
          />

        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div
        className="
          mx-auto
          max-w-[1400px]
          px-5
          py-16
          sm:px-8
          lg:px-10
          lg:py-20
        "
      >

        {/* ===================================================
            BRAND INTRO
        ==================================================== */}

        <div
          className="
            grid
            gap-12
            border-b
            border-gray-200
            pb-14
            dark:border-[#292929]
            lg:grid-cols-[1.5fr_1fr]
            lg:items-end
          "
        >

          {/* BRAND */}

          <div>

            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-2.5
              "
            >

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  bg-[#ffd814]
                  text-black
                "
              >
                <FiShoppingBag size={17} />
              </span>

              <span
                className="
                  text-[25px]
                  font-black
                  tracking-[-0.06em]
                "
              >
                <span className="text-[#ffd814]">
                  shop
                </span>
                ly
              </span>

            </Link>

            <p
              className="
                mt-6
                max-w-[570px]
                text-[13px]
                leading-7
                text-gray-500
                dark:text-gray-400
              "
            >
              Everything you need, all in one place.
              Discover everyday essentials, new favourites,
              and products worth bringing home.
            </p>

          </div>

          {/* NEWSLETTER */}

        <div>
  <p
    className="
      text-[9px]
      font-bold
      uppercase
      tracking-[0.2em]
      text-gray-400
    "
  >
    Shoply / 2026
  </p>

  <p
    className="
      mt-4
      text-[11px]
      leading-5
      text-gray-500
      dark:text-gray-400
    "
  >
    A curated digital marketplace
    <br />
    for everyday essentials.
  </p>
</div>

        </div>

        {/* ===================================================
            LINKS
        ==================================================== */}

        <div
          className="
            grid
            gap-12
            border-b
            border-gray-200
            py-14
            dark:border-[#292929]
            sm:grid-cols-2
            lg:grid-cols-[1fr_1.5fr_1fr_1fr]
          "
        >

          {/* SHOP */}

          <FooterColumn title="Shop">

            <FooterLink to="/products">
              All Products
            </FooterLink>

            {footerCategories.slice(0, 7).map((category) => (
              <FooterLink
                key={category._id}
                to={`/products?category=${encodeURIComponent(
                  category._id
                )}`}
              >
                {category.name}
              </FooterLink>
            ))}

          </FooterColumn>

          {/* HELP */}

          <FooterColumn title="Help & information">

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

          </FooterColumn>

          {/* CONTACT */}

          <FooterColumn title="Contact">

            <ContactRow
              icon={<FiPhone size={15} />}
              text={footerSettings.phone}
            />

            <ContactRow
              icon={<FiMail size={15} />}
              text={footerSettings.email}
            />

            <ContactRow
              icon={<FiMapPin size={15} />}
              text={footerSettings.location}
            />

          </FooterColumn>

          {/* FOLLOW */}

          <FooterColumn title="Follow us">

            <div className="flex flex-wrap gap-2">

              <Social
                icon={<FiInstagram size={16} />}
                label="Instagram"
                href={footerSettings.instagram}
              />

              <Social
                icon={<FiFacebook size={16} />}
                label="Facebook"
                href={footerSettings.facebook}
              />

              <Social
                icon={<FiTwitter size={16} />}
                label="Twitter"
                href={footerSettings.twitter}
              />

              <Social
                icon={<FiYoutube size={16} />}
                label="YouTube"
                href={footerSettings.youtube}
              />

            </div>

            <p
              className="
                mt-6
                max-w-[180px]
                text-[10px]
                leading-5
                text-gray-400
              "
            >
              Follow Shoply for new arrivals,
              offers and inspiration.
            </p>

          </FooterColumn>

        </div>

        {/* ===================================================
            BOTTOM
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* COPYRIGHT */}

          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-gray-400
            "
          >
            © 2026 Shoply. All rights reserved.
          </p>

          {/* PAYMENT */}

          <div
            className="
              flex
              items-center
              gap-3
              text-[9px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-gray-400
            "
          >

            <span>
              Secure checkout
            </span>

            <span className="h-1 w-1 bg-[#ffd814]" />

            <span>
              Cash on delivery
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}


/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({ title, children }) {
  return (
    <div>

      <h3
        className="
          mb-6
          text-[9px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-gray-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>

    </div>
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
        w-fit
        items-center
        gap-2
        text-[12px]
        text-gray-500
        transition-all
        duration-300
        hover:text-gray-950
        dark:text-gray-400
        dark:hover:text-white
      "
    >

      <span
        className="
          h-px
          w-0
          bg-[#ffd814]
          transition-all
          duration-300
          group-hover:w-3
        "
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
        h-9
        w-9
        items-center
        justify-center
        border
        border-gray-200
        text-gray-500
        transition-all
        duration-300
        hover:border-[#ffd814]
        hover:bg-[#ffd814]
        hover:text-black
        dark:border-[#333]
        dark:text-gray-400
      "
    >
      {icon}
    </a>
  );
}


/* =========================================================
   CONTACT ROW
========================================================= */

function ContactRow({ icon, text }) {
  return (
    <div className="flex items-start gap-3">

      <span
        className="
          mt-0.5
          shrink-0
          text-[#d5ad00]
          dark:text-[#ffd814]
        "
      >
        {icon}
      </span>

      <span
        className="
          break-words
          text-[12px]
          leading-5
          text-gray-500
          dark:text-gray-400
        "
      >
        {text || "Not available"}
      </span>

    </div>
  );
}


/* =========================================================
   SERVICE ITEM
========================================================= */

function ServiceItem({ icon, title, text }) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        border-b
        border-gray-200
        px-5
        py-5
        dark:border-[#292929]
        sm:px-7
        lg:border-b-0
        lg:border-r
        lg:last:border-r-0
      "
    >

      <span
        className="
          shrink-0
          text-gray-900
          dark:text-white
        "
      >
        {icon}
      </span>

      <div>

        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-gray-900
            dark:text-white
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[9px]
            text-gray-400
          "
        >
          {text}
        </p>

      </div>

    </div>
  );
}


export default Footer;