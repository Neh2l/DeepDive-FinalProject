import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMapPin,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const totalWishlistItems = wishlistItems.length;

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <>
      {/* Top Announcement */}

      <div className="bg-black px-4 py-2 text-center text-xs font-medium text-white">
        Free delivery on orders over $50
      </div>

      {/* Main Navbar */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="flex min-h-[72px] items-center gap-4">

            {/* Mobile Menu */}

            <button className="rounded-xl p-2 transition hover:bg-gray-100 lg:hidden">
              <FiMenu size={22} />
            </button>

            {/* Logo */}

            <Link
              to="/"
              className="shrink-0 text-3xl font-black tracking-[-0.07em] transition-transform duration-300 hover:scale-105"
            >
              <span className="text-yellow-500">
                shop
              </span>

              <span className="text-gray-900">
                ly
              </span>
            </Link>

            {/* Location */}

            <button className="hidden items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-gray-100 md:flex">
              <FiMapPin
                size={20}
                className="text-gray-700"
              />

              <div>
                <p className="text-[11px] text-gray-500">
                  Deliver to
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  Egypt
                </p>
              </div>
            </button>

            {/* Search */}

            <div className="relative flex-1">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="h-11 w-full rounded-xl border border-transparent bg-gray-100 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
              />
            </div>

            {/* Account */}

            {isLoggedIn && user ? (
              <div className="group relative hidden sm:block">
                <button className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-gray-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <FiUser size={19} />
                  </div>

                  <div className="text-left">
                    <p className="text-[11px] text-gray-500">
                      Hello, {user.name.split(" ")[0]}
                    </p>

                    <p className="max-w-[110px] truncate text-sm font-bold text-gray-900">
                      {user.name}
                    </p>
                  </div>
                </button>

                {/* Account Dropdown */}

                <div className="invisible absolute right-0 top-full mt-2 w-48 translate-y-2 rounded-2xl border border-gray-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <FiUser size={17} />
                    My Account
                  </Link>

                  <Link
                    to="/orders"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <FiLogOut size={17} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-gray-100 sm:flex"
              >
                <FiUser size={21} />

                <div className="text-left">
                  <p className="text-[11px] text-gray-500">
                    Hello, sign in
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    Account
                  </p>
                </div>
              </Link>
            )}

            {/* Wishlist */}

            <Link
              to="/wishlist"
              className={`relative rounded-xl p-2 transition-all duration-200 hover:bg-gray-100 ${
                totalWishlistItems > 0
                  ? "text-red-500"
                  : "text-gray-900"
              }`}
            >
              {totalWishlistItems > 0 ? (
                <FiHeart
                  size={23}
                  className="fill-red-500"
                />
              ) : (
                <FiHeart size={23} />
              )}

              {totalWishlistItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-black text-white shadow-sm">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}

            <Link
              to="/cart"
              className="relative rounded-xl p-2 transition hover:bg-gray-100"
            >
              <FiShoppingCart size={24} />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-xs font-black text-gray-900">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Categories Navigation */}

          <nav className="hidden h-12 items-center gap-7 overflow-x-auto border-t border-gray-100 lg:flex">
            <NavLink
              to="/"
              className="text-sm font-semibold transition hover:text-yellow-600"
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className="text-sm font-semibold transition hover:text-yellow-600"
            >
              All Products
            </NavLink>

            <NavLink
              to="/category/smartphones"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Electronics
            </NavLink>

            <NavLink
              to="/category/mens-shirts"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Fashion
            </NavLink>

            <NavLink
              to="/category/furniture"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Home & Furniture
            </NavLink>

            <NavLink
              to="/category/beauty"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Beauty
            </NavLink>

            <NavLink
              to="/category/sports-accessories"
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              Sports
            </NavLink>

            <span className="ml-auto rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
              SALE
            </span>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;