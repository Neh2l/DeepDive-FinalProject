
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiEdit3,
  FiChevronRight,
  FiLogOut,
  FiShoppingBag,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiSettings,
  FiStar,
  FiX,
  FiSave,
} from "react-icons/fi";

import {
  logoutUser,
  updateUser,
} from "../redux/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const firstLetter =
    user.name?.charAt(0)?.toUpperCase() || "U";

  const firstName =
    user.name?.split(" ")[0] || "User";

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleOpenEdit = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
    });

    setIsEditOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    dispatch(
      updateUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
      })
    );

    setIsEditOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f6f6f6] text-gray-900">

      {/* ================= HEADER ================= */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-5">

              <div className="relative">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffd814] text-3xl font-black text-gray-900 shadow-sm ring-4 ring-yellow-50 sm:h-24 sm:w-24 sm:text-4xl">
                  {firstLetter}
                </div>

                <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white">
                  <FiCheckCircle size={14} />
                </div>

              </div>

              <div>

                <p className="mb-1 text-sm font-medium text-gray-500">
                  Welcome back,
                </p>

                <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                  {firstName}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">

                  <span className="flex items-center gap-1.5">
                    <FiMail size={15} />
                    {user.email}
                  </span>

                  <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

                  <span className="flex items-center gap-1.5">
                    <FiStar
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    Shoply Member
                  </span>

                </div>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={handleOpenEdit}
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-gray-900 hover:bg-gray-50"
              >
                <FiEdit3 size={17} />
                Edit Profile
              </button>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 rounded-xl bg-[#ffd814] px-5 py-3 text-sm font-bold text-gray-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7ca00] hover:shadow-md"
              >
                Continue Shopping
                <FiArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">

          {/* ================= SIDEBAR ================= */}

          <aside className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-5 py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                My Account
              </p>
            </div>

            <nav className="p-2.5">

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-[#fff8d6] px-4 py-3.5 text-sm font-bold text-gray-950"
              >
                <span className="flex items-center gap-3">
                  <FiUser size={18} />
                  Account Overview
                </span>

                <FiChevronRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-950"
              >
                <span className="flex items-center gap-3">
                  <FiPackage
                    size={18}
                    className="text-gray-400 transition group-hover:text-gray-900"
                  />
                  My Orders
                </span>

                <FiChevronRight
                  size={17}
                  className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-700"
                />
              </button>

              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-950"
              >
                <span className="flex items-center gap-3">
                  <FiHeart
                    size={18}
                    className="text-gray-400 transition group-hover:text-red-500"
                  />
                  Wishlist
                </span>

                <FiChevronRight
                  size={17}
                  className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-700"
                />
              </button>

              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-950"
              >
                <span className="flex items-center gap-3">
                  <FiMapPin
                    size={18}
                    className="text-gray-400 transition group-hover:text-gray-900"
                  />
                  Addresses
                </span>

                <FiChevronRight
                  size={17}
                  className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-700"
                />
              </button>

              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-950"
              >
                <span className="flex items-center gap-3">
                  <FiCreditCard
                    size={18}
                    className="text-gray-400 transition group-hover:text-gray-900"
                  />
                  Payment Methods
                </span>

                <FiChevronRight
                  size={17}
                  className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-700"
                />
              </button>

              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-950"
              >
                <span className="flex items-center gap-3">
                  <FiShield
                    size={18}
                    className="text-gray-400 transition group-hover:text-gray-900"
                  />
                  Security
                </span>

                <FiChevronRight
                  size={17}
                  className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-700"
                />
              </button>

              <div className="my-2 border-t border-gray-100" />

              <button
                type="button"
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
              >
                <FiSettings
                  size={18}
                  className="text-gray-400 group-hover:text-gray-900"
                />
                Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                <FiLogOut
                  size={18}
                  className="transition group-hover:-translate-x-0.5"
                />
                Sign Out
              </button>

            </nav>

          </aside>

          {/* ================= MAIN ================= */}

          <div className="min-w-0 space-y-7">

            {/* STATS */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* ORDERS */}

              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
                    <FiPackage size={21} />
                  </div>

                  <FiChevronRight className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-700" />

                </div>

                <p className="mt-5 text-2xl font-black text-gray-950">
                  0
                </p>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  Total Orders
                </p>

              </button>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() => navigate("/wishlist")}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105 ${
                      totalWishlistItems > 0
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    <FiHeart
                      size={21}
                      className={
                        totalWishlistItems > 0
                          ? "fill-red-500"
                          : ""
                      }
                    />
                  </div>

                  <FiChevronRight className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-700" />

                </div>

                <p className="mt-5 text-2xl font-black text-gray-950">
                  {totalWishlistItems}
                </p>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  Wishlist Items
                </p>

              </button>

              {/* CART */}

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-gray-900 transition group-hover:scale-105">
                    <FiShoppingBag size={21} />
                  </div>

                  <FiChevronRight className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-700" />

                </div>

                <p className="mt-5 text-2xl font-black text-gray-950">
                  {totalItems}
                </p>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  Cart Items
                </p>

              </button>

              {/* MEMBER */}

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <FiStar size={21} />
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-600">
                    Active
                  </span>

                </div>

                <p className="mt-5 text-lg font-black text-gray-950">
                  Shoply
                </p>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  Member account
                </p>

              </div>

            </div>

            {/* PERSONAL INFORMATION */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-lg font-black text-gray-950">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your account details and contact information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  <FiEdit3 size={16} />
                  Edit
                </button>

              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-2">

                <div className="rounded-xl border border-gray-200 bg-[#fafafa] p-5">

                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <FiUser size={15} />
                    Full Name
                  </div>

                  <p className="text-base font-bold text-gray-950">
                    {user.name}
                  </p>

                </div>

                <div className="rounded-xl border border-gray-200 bg-[#fafafa] p-5">

                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <FiMail size={15} />
                    Email Address
                  </div>

                  <p className="break-all text-base font-bold text-gray-950">
                    {user.email}
                  </p>

                </div>

              </div>

            </section>

            {/* SHOPPING CENTER */}

            <section>

              <div className="mb-5">

                <h2 className="text-lg font-black text-gray-950">
                  Your Shopping Center
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Quick access to everything you need
                </p>

              </div>

              <div className="grid gap-4 md:grid-cols-3">

                {/* ORDERS */}

                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-110">
                      <FiPackage size={22} />
                    </div>

                    <FiArrowRight className="text-gray-300 transition duration-300 group-hover:translate-x-1 group-hover:text-gray-900" />

                  </div>

                  <h3 className="font-black text-gray-950">
                    My Orders
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-gray-500">
                    Track deliveries and manage your previous purchases.
                  </p>

                </button>

                {/* WISHLIST */}

                <button
                  type="button"
                  onClick={() => navigate("/wishlist")}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 transition duration-300 group-hover:scale-110">
                      <FiHeart
                        size={22}
                        className={
                          totalWishlistItems > 0
                            ? "fill-red-500"
                            : ""
                        }
                      />
                    </div>

                    <FiArrowRight className="text-gray-300 transition duration-300 group-hover:translate-x-1 group-hover:text-gray-900" />

                  </div>

                  <h3 className="font-black text-gray-950">
                    Wishlist
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-gray-500">
                    {totalWishlistItems > 0
                      ? `${totalWishlistItems} ${
                          totalWishlistItems === 1
                            ? "product"
                            : "products"
                        } saved in your wishlist.`
                      : "Keep your favorite products saved for later."}
                  </p>

                </button>

                {/* SHOPPING */}

                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-gray-900 transition duration-300 group-hover:scale-110">
                      <FiShoppingBag size={22} />
                    </div>

                    <FiArrowRight className="text-gray-300 transition duration-300 group-hover:translate-x-1 group-hover:text-gray-900" />

                  </div>

                  <h3 className="font-black text-gray-950">
                    Continue Shopping
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-gray-500">
                    Explore new products and discover your next favorite.
                  </p>

                </button>

              </div>

            </section>

            {/* TRUST */}

            <section className="relative overflow-hidden rounded-2xl bg-[#111111] p-6 text-white shadow-sm sm:p-7">

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#ffd814]/10 blur-3xl" />

              <div className="relative grid gap-7 sm:grid-cols-3">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <FiTruck size={20} className="text-[#ffd814]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">
                      Fast Delivery
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Reliable delivery right to your door.
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <FiClock size={20} className="text-[#ffd814]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">
                      Easy Shopping
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      A simple experience from browsing to checkout.
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <FiShield size={20} className="text-[#ffd814]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">
                      Secure Account
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Your personal information stays protected.
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* MOBILE LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 lg:hidden"
            >
              <FiLogOut size={17} />
              Sign Out
            </button>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/*                  EDIT PROFILE MODAL               */}
      {/* ================================================= */}

      {isEditOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsEditOpen(false);
            }
          }}
        >

          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-7">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-gray-900">
                    <FiEdit3 size={20} />
                  </div>

                  <div>

                    <h2 className="text-xl font-black text-gray-950">
                      Edit Profile
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Update your personal information
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <FiX size={21} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSaveChanges}
              className="p-6 sm:p-7"
            >

              {/* AVATAR */}

              <div className="mb-7 flex items-center gap-4 rounded-2xl bg-[#fafafa] p-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffd814] text-xl font-black text-gray-950">
                  {firstLetter}
                </div>

                <div>

                  <p className="font-bold text-gray-950">
                    {user.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Your profile information is visible only to you.
                  </p>

                </div>

              </div>

              {/* NAME */}

              <div className="mb-5">

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Full Name
                </label>

                <div className="relative">

                  <FiUser
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-gray-900 focus:ring-4 focus:ring-gray-100"
                    required
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="mb-7">

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Email Address
                </label>

                <div className="relative">

                  <FiMail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-gray-900 focus:ring-4 focus:ring-gray-100"
                    required
                  />

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#ffd814] px-6 py-3.5 text-sm font-black text-gray-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7ca00] hover:shadow-md"
                >
                  <FiSave size={17} />
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </main>
  );
}

export default Profile;
