import { useState } from "react";

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

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";
import { clearWishlist } from "../../redux/wishlistSlice";

import { useTheme } from "../../context/ThemeContext";
import { useCategories } from "../../context/CategoryContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useTheme();

  const { categories: navCategories } = useCategories();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.items);

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalWishlistItems = wishlistItems.length;

  const currentCategory = new URLSearchParams(location.search).get("category");

  const currentSearch = new URLSearchParams(location.search).get("search");

  function handleSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function handleLogout() {
    dispatch(clearCart());
    dispatch(clearWishlist());
    dispatch(logoutUser());

    closeMobileMenu();

    navigate("/");
  }

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between border-b border-gray-100 px-1 py-4 text-sm font-medium transition-colors dark:border-[#292929] ${
      isActive
        ? "text-gray-950 dark:!text-white"
        : "text-gray-600 hover:text-gray-950 dark:!text-gray-300 dark:hover:!text-white"
    }`;

  const desktopNavClass = ({ isActive }) =>
    `relative flex h-full items-center text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${
      isActive
        ? "text-gray-950 dark:!text-white"
        : "text-gray-500 hover:text-gray-950 dark:!text-gray-300 dark:hover:!text-white"
    }`;

  return (
    <>
      <div className="relative z-[60] border-b border-white/10 bg-[#111111] px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-white">
        Free delivery on orders over $50
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e8e8e5] bg-white/95 backdrop-blur-xl dark:border-[#292929] dark:bg-[#111111]/95">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center gap-3 lg:gap-6">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-900 transition-colors hover:text-yellow-600 dark:text-white dark:hover:text-yellow-400 lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu size={22} strokeWidth={1.7} />
            </button>

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="shrink-0 text-[29px] font-black leading-none tracking-[-0.075em] transition-opacity duration-300 hover:opacity-75 sm:text-[31px]"
            >
              <span className="text-[#f5c400]">shop</span>

              <span className="text-gray-950 dark:text-white">ly</span>
            </Link>

            <button
              type="button"
              className="group hidden shrink-0 items-center gap-2 border-l border-gray-200 pl-5 text-left dark:border-[#2b2b2b] md:flex"
            >
              <FiMapPin
                size={18}
                strokeWidth={1.7}
                className="text-gray-700 transition-colors group-hover:text-yellow-600 dark:text-gray-300 dark:group-hover:text-yellow-400"
              />

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-gray-400">
                  Deliver to
                </p>

                <p className="mt-0.5 text-[12px] font-bold text-gray-900 dark:text-white">
                  Egypt
                </p>
              </div>
            </button>

            <form
              onSubmit={handleSearch}
              className="relative hidden min-w-0 flex-1 md:block"
            >
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                strokeWidth={1.7}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for products, brands and more"
                className="h-[43px] w-full border border-[#dededb] bg-[#f7f7f5] pl-11 pr-4 text-[12px] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-500 focus:bg-white dark:border-[#303030] dark:bg-[#1b1b1b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#555] dark:focus:bg-[#1b1b1b]"
              />
            </form>

            {isLoggedIn && user ? (
              <div className="group relative hidden sm:block">
                <button
                  type="button"
                  className="flex items-center gap-2.5 px-1 py-2 text-gray-900 dark:text-white"
                >
                  <div className="flex h-9 w-9 items-center justify-center bg-[#f4f4f1] text-gray-700 dark:bg-[#242424] dark:text-gray-200">
                    <FiUser size={17} strokeWidth={1.7} />
                  </div>

                  <div className="hidden text-left xl:block">
                    <p className="text-[9px] uppercase tracking-[0.08em] text-gray-400">
                      Hello, {user.name?.split(" ")[0]}
                    </p>

                    <p className="mt-0.5 max-w-[100px] truncate text-[12px] font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                  </div>
                </button>

                <div className="invisible absolute right-0 top-[calc(100%+8px)] z-50 w-52 translate-y-2 border border-[#dededb] bg-white p-2 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.10)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-[#303030] dark:bg-[#181818] dark:shadow-[0_18px_50px_rgba(0,0,0,0.4)]">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-3 text-[12px] font-medium text-gray-700 transition-colors hover:bg-[#f6f6f4] hover:text-gray-950 dark:!text-gray-100 dark:hover:bg-[#242424] dark:hover:!text-white"
                  >
                    <FiUser
                      size={16}
                      strokeWidth={1.7}
                      className="shrink-0 text-gray-600 dark:!text-gray-200"
                    />

                    <span className="dark:!text-gray-100">My Account</span>
                  </Link>

                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-3 py-3 text-[12px] font-medium text-gray-700 transition-colors hover:bg-[#f6f6f4] hover:text-gray-950 dark:!text-gray-100 dark:hover:bg-[#242424] dark:hover:!text-white"
                  >
                    <FiPackage
                      size={16}
                      strokeWidth={1.7}
                      className="shrink-0 text-gray-600 dark:!text-gray-200"
                    />

                    <span className="dark:!text-gray-100">My Orders</span>
                  </Link>

                  <div className="my-1 border-t border-gray-100 dark:border-[#292929]" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-3 text-left text-[12px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:!text-red-400 dark:hover:bg-red-500/10"
                  >
                    <FiLogOut
                      size={16}
                      strokeWidth={1.7}
                      className="shrink-0 dark:!text-red-400"
                    />

                    <span className="dark:!text-red-400">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-2.5 px-1 py-2 text-gray-900 transition-opacity hover:opacity-60 dark:text-white sm:flex"
              >
                <FiUser size={20} strokeWidth={1.7} />

                <div className="hidden text-left xl:block">
                  <p className="text-[9px] uppercase tracking-[0.08em] text-gray-400">
                    Hello, sign in
                  </p>

                  <p className="mt-0.5 text-[12px] font-bold text-gray-900 dark:text-white">
                    Account
                  </p>
                </div>
              </Link>
            )}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="group relative flex h-9 w-9 shrink-0 items-center justify-center text-gray-800 transition-colors hover:text-yellow-600 dark:text-gray-200 dark:hover:text-yellow-400"
            >
              <span
                className={`absolute transition-all duration-500 ${
                  theme === "light"
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                }`}
              >
                <FiMoon size={19} strokeWidth={1.7} />
              </span>

              <span
                className={`absolute transition-all duration-500 ${
                  theme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              >
                <FiSun size={19} strokeWidth={1.7} />
              </span>
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center transition-colors duration-200 hover:text-red-500 ${
                totalWishlistItems > 0
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-900 dark:!text-white"
              }`}
            >
              <FiHeart
                size={21}
                strokeWidth={1.7}
                className={
                  totalWishlistItems > 0
                    ? "fill-red-500 dark:fill-red-400"
                    : "dark:text-white"
                }
              />

              {totalWishlistItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center bg-red-500 px-1 text-[9px] font-bold text-white">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center text-gray-900 transition-colors hover:text-yellow-600 dark:!text-white dark:hover:text-yellow-400"
            >
              <FiShoppingCart
                size={21}
                strokeWidth={1.7}
                className="dark:text-white"
              />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center bg-[#ffd600] px-1 text-[9px] font-black text-gray-950">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <form onSubmit={handleSearch} className="pb-3 md:hidden">
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                strokeWidth={1.7}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for products, brands and more"
                className="h-11 w-full border border-[#dededb] bg-[#f7f7f5] pl-11 pr-4 text-[12px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-500 focus:bg-white dark:border-[#303030] dark:bg-[#1b1b1b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#555]"
              />
            </div>
          </form>

          <nav className="hidden h-[49px] items-center gap-7 overflow-x-auto border-t border-gray-100 dark:border-[#292929] lg:flex">
            <NavLink to="/" end className={desktopNavClass}>
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffd600]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/products"
              end
              className={() =>
                desktopNavClass({
                  isActive:
                    location.pathname === "/products" &&
                    !currentCategory &&
                    !currentSearch,
                })
              }
            >
              {location.pathname === "/products" &&
              !currentCategory &&
              !currentSearch ? (
                <>
                  All Products
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffd600]" />
                </>
              ) : (
                "All Products"
              )}
            </NavLink>

            {navCategories.map((category) => {
              const isCategoryActive =
                location.pathname === "/products" &&
                currentCategory === category._id;

              return (
                <NavLink
                  key={category._id}
                  to={`/products?category=${encodeURIComponent(category._id)}`}
                  className={() =>
                    desktopNavClass({
                      isActive: isCategoryActive,
                    })
                  }
                >
                  {category.name}

                  {isCategoryActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffd600]" />
                  )}
                </NavLink>
              );
            })}

            <span className="ml-auto shrink-0 bg-[#111111] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white dark:bg-[#ffd600] dark:text-gray-950">
              Sale
            </span>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[88%] max-w-[380px] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-[#111111] ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-5 dark:border-[#292929] dark:bg-[#111111]">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-[30px] font-black leading-none tracking-[-0.075em]"
            >
              <span className="text-[#f5c400]">shop</span>

              <span className="text-gray-950 dark:text-white">ly</span>
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="flex h-9 w-9 items-center justify-center text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              <FiX size={21} strokeWidth={1.7} />
            </button>
          </div>

          <div className="border-b border-gray-100 p-5 dark:border-[#292929]">
            {isLoggedIn && user ? (
              <div className="bg-[#111111] p-5 dark:bg-[#1d1d1d]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center bg-yellow-400 text-gray-950">
                    <FiUser size={20} strokeWidth={1.7} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                      Welcome back
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-white">
                      {user.name}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="border border-white/15 px-3 py-2.5 text-center text-[11px] font-bold !text-white transition hover:bg-white/10"
                  >
                    My Account
                  </Link>

                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="bg-yellow-400 px-3 py-2.5 text-center text-[11px] font-black text-gray-950 transition hover:bg-yellow-300"
                  >
                    My Orders
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-between bg-[#111111] p-5 text-white transition hover:bg-[#222] dark:bg-[#1d1d1d]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center bg-yellow-400 text-gray-950">
                    <FiUser size={20} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                      Welcome to Shoply
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Sign in to your account
                    </p>
                  </div>
                </div>

                <FiChevronRight className="text-gray-400" size={19} />
              </Link>
            )}
          </div>

          <div className="border-b border-gray-100 p-5 dark:border-[#292929]">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center justify-between border border-gray-200 bg-[#fafafa] p-4 text-left transition-colors hover:border-gray-400 dark:border-[#303030] dark:bg-[#1a1a1a] dark:hover:border-[#4a4a4a]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-white text-gray-700 dark:bg-[#252525] dark:text-yellow-400">
                  {theme === "light" ? (
                    <FiMoon size={18} strokeWidth={1.7} />
                  ) : (
                    <FiSun size={18} strokeWidth={1.7} />
                  )}
                </div>

                <div>
                  <p className="text-[12px] font-bold text-gray-900 dark:text-white">
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </p>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    {theme === "light"
                      ? "Switch to dark theme"
                      : "Switch to light theme"}
                  </p>
                </div>
              </div>

              <div
                className={`relative h-5 w-10 rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-yellow-400" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </div>
            </button>
          </div>

          <div className="border-b border-gray-100 p-5 dark:border-[#292929]">
            <p className="mb-4 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Quick access
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="relative border border-gray-200 p-4 transition hover:border-red-200 hover:bg-red-50 dark:border-[#303030] dark:hover:border-red-500/20 dark:hover:bg-red-500/10"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                  <FiHeart
                    size={18}
                    strokeWidth={1.7}
                    className={
                      totalWishlistItems > 0
                        ? "fill-red-500 dark:fill-red-400"
                        : ""
                    }
                  />
                </div>

                <p className="text-[12px] font-bold text-gray-900 dark:text-white">
                  Wishlist
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  {totalWishlistItems} saved
                </p>
              </Link>

              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="relative border border-gray-200 p-4 transition hover:border-yellow-200 hover:bg-yellow-50 dark:border-[#303030] dark:hover:border-yellow-400/30 dark:hover:bg-yellow-400/10"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center bg-yellow-50 text-gray-900 dark:bg-yellow-400/10 dark:text-yellow-400">
                  <FiShoppingCart
                    size={18}
                    strokeWidth={1.7}
                    className="dark:text-yellow-400"
                  />
                </div>

                <p className="text-[12px] font-bold text-gray-900 dark:text-white">
                  Cart
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  {totalItems} items
                </p>
              </Link>
            </div>
          </div>

          <div className="p-5">
            <p className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Shop
            </p>

            <nav>
              <NavLink
                to="/"
                end
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                Home
                <FiChevronRight size={17} className="shrink-0" />
              </NavLink>

              <NavLink
                to="/products"
                end
                onClick={closeMobileMenu}
                className={() =>
                  `flex items-center justify-between border-b border-gray-100 px-1 py-4 text-sm font-medium transition-colors dark:border-[#292929] ${
                    location.pathname === "/products" &&
                    !currentCategory &&
                    !currentSearch
                      ? "text-gray-950 dark:!text-white"
                      : "text-gray-600 hover:text-gray-950 dark:!text-gray-300 dark:hover:!text-white"
                  }`
                }
              >
                All Products
                <FiChevronRight size={17} className="shrink-0" />
              </NavLink>

              {navCategories.map((category) => {
                const isCategoryActive =
                  location.pathname === "/products" &&
                  currentCategory === category._id;

                return (
                  <NavLink
                    key={category._id}
                    to={`/products?category=${encodeURIComponent(
                      category._id,
                    )}`}
                    onClick={closeMobileMenu}
                    className={() =>
                      `flex items-center justify-between border-b border-gray-100 px-1 py-4 text-sm font-medium transition-colors dark:border-[#292929] ${
                        isCategoryActive
                          ? "text-gray-950 dark:!text-white"
                          : "text-gray-600 hover:text-gray-950 dark:!text-gray-300 dark:hover:!text-white"
                      }`
                    }
                  >
                    {category.name}

                    <FiChevronRight size={17} className="shrink-0" />
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-7 border-t border-gray-100 pt-6 dark:border-[#292929]">
              <div className="flex items-center gap-3">
                <FiMapPin
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                    Deliver to
                  </p>

                  <p className="mt-0.5 text-[12px] font-bold text-gray-900 dark:text-white">
                    Egypt
                  </p>
                </div>
              </div>
            </div>

            {isLoggedIn && user && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-6 flex w-full items-center justify-between border-t border-gray-100 px-1 pt-5 text-[12px] font-bold text-red-500 dark:border-[#292929] dark:text-red-400"
              >
                <span className="flex items-center gap-3">
                  <FiLogOut size={17} strokeWidth={1.7} />
                  Logout
                </span>

                <FiChevronRight size={17} />
              </button>
            )}
          </div>

          <div className="border-t border-gray-100 px-5 py-6 dark:border-[#292929]">
            <p className="text-center text-[10px] text-gray-400">
              © 2026 Shoply. All rights reserved.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navbar;
