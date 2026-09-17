import { useEffect, useState } from "react";

import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMapPin,
  FiMenu,
  FiLogOut,
  FiX,
  FiChevronRight,
  FiPackage,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logoutUser } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";
import { clearWishlist } from "../../redux/wishlistSlice";

import { useTheme } from "../../context/ThemeContext";

import { getProducts } from "../../Apis/productsApi";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [navCategories, setNavCategories] =
    useState([]);

  const { user, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalWishlistItems =
    wishlistItems.length;

  // =========================================================
  // GET CATEGORIES FROM BACKEND
  // =========================================================

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

        setNavCategories(uniqueCategories);
      } catch (error) {
        console.error(
          "Navbar categories error:",
          error
        );

        setNavCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // =========================================================
  // CLOSE MOBILE MENU
  // =========================================================

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  function handleLogout() {
    dispatch(clearCart());
    dispatch(clearWishlist());
    dispatch(logoutUser());

    closeMobileMenu();

    navigate("/");
  }

  // =========================================================
  // MOBILE LINK CLASS
  // =========================================================

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#222]"
    }`;

  return (
    <>
      {/* =====================================================
          TOP ANNOUNCEMENT
      ====================================================== */}

      <div className="bg-black px-4 py-2 text-center text-xs font-medium text-white dark:bg-[#0a0a0a]">
        Free delivery on orders over $50
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur dark:border-[#2a2a2a] dark:bg-[#171717]/95">
        <div className="mx-auto max-w-[1400px] px-4">

          {/* =================================================
              MAIN ROW
          ================================================= */}

          <div className="flex min-h-[72px] items-center gap-4">

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
              className="rounded-xl p-2 text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#252525] lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>

            {/* LOGO */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="shrink-0 text-3xl font-black tracking-[-0.07em] transition-transform duration-300 hover:scale-105"
            >
              <span className="text-yellow-500">
                shop
              </span>

              <span className="text-gray-900 dark:text-white">
                ly
              </span>
            </Link>

            {/* LOCATION */}

            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-left text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#252525] md:flex"
            >
              <FiMapPin
                size={20}
                className="text-gray-700 dark:text-gray-300"
              />

              <div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Deliver to
                </p>

                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Egypt
                </p>
              </div>
            </button>

            {/* SEARCH */}

            <div className="relative hidden flex-1 md:block">

              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="h-11 w-full rounded-xl border border-transparent bg-gray-100 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100 dark:bg-[#242424] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-yellow-400 dark:focus:bg-[#242424] dark:focus:ring-yellow-400/10"
              />

            </div>

            {/* ACCOUNT */}

            {isLoggedIn && user ? (

              <div className="group relative hidden sm:block">

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#252525]"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400">
                    <FiUser size={19} />
                  </div>

                  <div className="text-left">

                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Hello,{" "}
                      {user.name.split(" ")[0]}
                    </p>

                    <p className="max-w-[110px] truncate text-sm font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </p>

                  </div>

                </button>

                <div className="invisible absolute right-0 top-full z-50 w-48 translate-y-2 rounded-2xl border border-gray-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-[#2a2a2a] dark:bg-[#1a1a1a]">

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:!text-white dark:hover:bg-[#252525]"
                  >
                    <FiUser
                      size={17}
                      className="text-gray-700 dark:!text-white"
                    />
                    My Account
                  </Link>

                  <Link
                    to="/orders"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:!text-white dark:hover:bg-[#252525]"
                  >
                    <FiPackage
                      size={17}
                      className="text-gray-700 dark:!text-white"
                    />
                    My Orders
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <FiLogOut size={17} />
                    Sign Out
                  </button>

                </div>

              </div>

            ) : (

              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-xl px-3 py-2 text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#252525] sm:flex"
              >

                <FiUser size={21} />

                <div className="text-left">

                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Hello, sign in
                  </p>

                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Account
                  </p>

                </div>

              </Link>

            )}

            {/* THEME */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-600 hover:shadow-md dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-gray-300 dark:hover:border-yellow-400 dark:hover:bg-[#222] dark:hover:text-yellow-400"
            >

              <span
                className={`absolute transition-all duration-500 ${
                  theme === "light"
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                }`}
              >
                <FiMoon size={20} />
              </span>

              <span
                className={`absolute transition-all duration-500 ${
                  theme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              >
                <FiSun size={20} />
              </span>

            </button>

            {/* WISHLIST */}

            <Link
              to="/wishlist"
              className={`relative rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-[#252525] ${
                totalWishlistItems > 0
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >

              <FiHeart
                size={23}
                className={
                  totalWishlistItems > 0
                    ? "fill-red-500 dark:fill-red-400"
                    : "text-gray-900 dark:text-white"
                }
              />

              {totalWishlistItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-black text-white shadow-sm">
                  {totalWishlistItems}
                </span>
              )}

            </Link>

            {/* CART */}

            <Link
              to="/cart"
              className="relative rounded-xl p-2 text-gray-900 transition hover:bg-gray-100 dark:text-white dark:hover:bg-[#252525]"
            >

              <FiShoppingCart
                size={24}
                className="text-gray-900 dark:text-white"
              />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-xs font-black text-gray-900">
                  {totalItems}
                </span>
              )}

            </Link>

          </div>

          {/* MOBILE SEARCH */}

          <div className="pb-3 md:hidden">

            <div className="relative">

              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={19}
              />

              <input
                type="text"
                placeholder="Search products, brands and more..."
                className="h-11 w-full rounded-xl border border-transparent bg-gray-100 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100 dark:bg-[#242424] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-yellow-400 dark:focus:bg-[#242424] dark:focus:ring-yellow-400/10"
              />

            </div>

          </div>

          {/* =================================================
              DYNAMIC CATEGORIES
          ================================================= */}

          <nav className="hidden h-12 items-center gap-7 overflow-x-auto border-t border-gray-100 dark:border-[#2a2a2a] lg:flex">

            <NavLink
              to="/"
              className="text-sm font-semibold text-gray-900 transition hover:text-yellow-600 dark:!text-white dark:hover:!text-yellow-400"
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className="text-sm font-semibold text-gray-900 transition hover:text-yellow-600 dark:!text-white dark:hover:!text-yellow-400"
            >
              All Products
            </NavLink>

            {navCategories.map(
              (category) => (
                <NavLink
                  key={category}
                  to={`/products?category=${encodeURIComponent(
                    category
                  )}`}
                  className="shrink-0 text-sm font-medium text-gray-600 transition hover:text-black dark:!text-white dark:hover:!text-white"
                >
                  {category}
                </NavLink>
              )
            )}

            <span className="ml-auto shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600 dark:bg-red-500/10 dark:!text-red-400">
              SALE
            </span>

          </nav>

        </div>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >

        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[88%] max-w-[380px] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-[#111111] ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >

          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-5 dark:border-[#2a2a2a] dark:bg-[#111111]">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-3xl font-black tracking-[-0.07em]"
            >
              <span className="text-yellow-500">
                shop
              </span>

              <span className="text-gray-900 dark:text-white">
                ly
              </span>
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition hover:bg-gray-200 dark:bg-[#222] dark:text-gray-300 dark:hover:bg-[#2a2a2a]"
            >
              <FiX size={21} />
            </button>

          </div>

          {/* ACCOUNT */}

          <div className="border-b border-gray-100 p-5 dark:border-[#2a2a2a]">

            {isLoggedIn && user ? (

              <div className="rounded-2xl bg-gray-950 p-4 dark:bg-[#1c1c1c]">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-gray-950">
                    <FiUser size={20} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-400">
                      Welcome back
                    </p>

                    <p className="truncate text-sm font-black text-white">
                      {user.name}
                    </p>

                  </div>

                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">

                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-white/10 px-3 py-2.5 text-center text-xs font-bold text-white transition hover:bg-white/20"
                  >
                    My Account
                  </Link>

                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-yellow-400 px-3 py-2.5 text-center text-xs font-black text-gray-950 transition hover:bg-yellow-300"
                  >
                    My Orders
                  </Link>

                </div>

              </div>

            ) : (

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-2xl bg-gray-950 p-4 text-white transition hover:bg-gray-800 dark:bg-[#1c1c1c] dark:hover:bg-[#252525]"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-gray-950">
                    <FiUser size={20} />
                  </div>

                  <div>

                    <p className="text-xs text-gray-400">
                      Welcome to Shoply
                    </p>

                    <p className="text-sm font-medium text-white">
                      Sign in to your account
                    </p>

                  </div>

                </div>

                <FiChevronRight
                  className="text-gray-400"
                  size={20}
                />

              </Link>

            )}

          </div>

          {/* THEME */}

          <div className="border-b border-gray-100 p-5 dark:border-[#2a2a2a]">

            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left transition-all duration-300 hover:border-yellow-200 hover:bg-yellow-50 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:hover:border-yellow-400 dark:hover:bg-[#222]"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm dark:bg-[#252525] dark:text-yellow-400">

                  {theme === "light" ? (
                    <FiMoon size={19} />
                  ) : (
                    <FiSun size={19} />
                  )}

                </div>

                <div>

                  <p className="text-sm font-black text-gray-900 dark:text-white">
                    {theme === "light"
                      ? "Dark Mode"
                      : "Light Mode"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {theme === "light"
                      ? "Switch to dark theme"
                      : "Switch to light theme"}
                  </p>

                </div>

              </div>

              <div
                className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-yellow-400"
                    : "bg-gray-300"
                }`}
              >

                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    theme === "dark"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />

              </div>

            </button>

          </div>

          {/* QUICK ACTIONS */}

          <div className="border-b border-gray-100 p-5 dark:border-[#2a2a2a]">

            <p className="mb-3 px-1 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
              Quick access
            </p>

            <div className="grid grid-cols-2 gap-3">

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="relative flex items-center gap-3 rounded-2xl border border-gray-100 p-4 transition hover:-translate-y-0.5 hover:border-red-100 hover:bg-red-50 dark:border-[#2a2a2a] dark:hover:border-red-500/20 dark:hover:bg-red-500/10"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">

                  <FiHeart
                    size={19}
                    className={
                      totalWishlistItems > 0
                        ? "fill-red-500"
                        : ""
                    }
                  />

                </div>

                <div>

                  <p className="text-sm font-black text-gray-900 dark:text-white">
                    Wishlist
                  </p>

                  <p className="text-xs text-gray-400">
                    {totalWishlistItems} saved
                  </p>

                </div>

              </Link>

              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="relative flex items-center gap-3 rounded-2xl border border-gray-100 p-4 transition hover:-translate-y-0.5 hover:border-yellow-200 hover:bg-yellow-50 dark:border-[#2a2a2a] dark:hover:border-yellow-400/30 dark:hover:bg-yellow-400/10"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-gray-900 dark:bg-yellow-400/10 dark:text-yellow-400">
                  <FiShoppingCart size={19} />
                </div>

                <div>

                  <p className="text-sm font-black text-gray-900 dark:text-white">
                    Cart
                  </p>

                  <p className="text-xs text-gray-400">
                    {totalItems} items
                  </p>

                </div>

              </Link>

            </div>

          </div>

          {/* =================================================
              MOBILE SHOP CATEGORIES
          ================================================= */}

          <div className="p-5">

            <p className="mb-3 px-1 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
              Shop
            </p>

            <nav className="space-y-1">

              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                Home
                <FiChevronRight size={17} />
              </NavLink>

              <NavLink
                to="/products"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                All Products
                <FiChevronRight size={17} />
              </NavLink>

              {navCategories.map(
                (category) => (
                  <NavLink
                    key={category}
                    to={`/products?category=${encodeURIComponent(
                      category
                    )}`}
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    {category}
                    <FiChevronRight size={17} />
                  </NavLink>
                )
              )}

            </nav>

            {/* LOCATION */}

            <div className="mt-6 rounded-2xl bg-gray-50 p-4 dark:bg-[#1a1a1a]">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm dark:bg-[#252525] dark:text-gray-300">
                  <FiMapPin size={19} />
                </div>

                <div>

                  <p className="text-[11px] text-gray-400">
                    Deliver to
                  </p>

                  <p className="text-sm font-black text-gray-900 dark:text-white">
                    Egypt
                  </p>

                </div>

              </div>

            </div>

            {/* LOGOUT */}

            {isLoggedIn && user && (

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
              >

                <span className="flex items-center gap-3">

                  <FiLogOut size={18} />

                  Sign Out

                </span>

                <FiChevronRight size={17} />

              </button>

            )}

          </div>

          <div className="border-t border-gray-100 px-5 py-6 dark:border-[#2a2a2a]">

            <p className="text-center text-xs text-gray-400">
              © 2026 Shoply. All rights reserved.
            </p>

          </div>

        </aside>

      </div>
    </>
  );
}

export default Navbar;