
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShoppingBag,
  FiCheck,
  FiAlertCircle,
  FiTruck,
  FiShield,
  FiTag,
} from "react-icons/fi";

import { registerUser } from "../redux/authSlice";

function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  // ================= ADMIN ACCOUNT =================

  const ADMIN_EMAIL = "ahmed123@gmail.com";

  // ================= INPUT CHANGE =================

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  }

  // ================= VALIDATION =================

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Please enter your name.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name =
        "Name must be at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password =
        "Please create a password.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    return newErrors;
  }

  // ================= GET ALL USERS =================

  function getUsers() {
    try {
      const savedUsers =
        localStorage.getItem("shoplyUsers");

      if (!savedUsers) {
        return [];
      }

      const users = JSON.parse(savedUsers);

      return Array.isArray(users) ? users : [];
    } catch {
      localStorage.removeItem("shoplyUsers");

      return [];
    }
  }

  // ================= SUBMIT =================

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);

      return;
    }

    const name = formData.name.trim();

    const email = formData.email
      .trim()
      .toLowerCase();

    // ================= ADMIN EMAIL =================

    if (email === ADMIN_EMAIL) {
      setErrors({
        submit:
          "This email is reserved for the administrator.",
      });

      return;
    }

    // ================= GET ALL USERS =================

    const users = getUsers();

    // ================= CHECK EXISTING USER =================

    const existingUser = users.find(
      (user) =>
        user.email?.trim().toLowerCase() ===
        email
    );

    if (existingUser) {
      setErrors({
        submit:
          "An account with this email already exists.",
      });

      return;
    }

    // ================= CREATE USER =================

    const user = {
      name,
      email,
      password: formData.password,
      role: "user",
    };

    setIsLoading(true);

    setTimeout(() => {

      // Save through Redux
      dispatch(registerUser(user));

      // Make sure ALL users remain saved
      const updatedUsers = [
        ...users,
        user,
      ];

      localStorage.setItem(
        "shoplyUsers",
        JSON.stringify(updatedUsers)
      );

      // Save current logged-in user
      localStorage.setItem(
        "shoplyUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "shoplyLoggedIn",
        "true"
      );

      setIsLoading(false);

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 900);

    }, 700);
  }

  // ================= INPUT STYLE =================

  const inputBase =
    "w-full rounded-2xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400";

  // ================= UI =================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f7f7]">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-yellow-300/20 blur-[120px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-yellow-300/15 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/10 blur-[100px]" />

      </div>

      {/* ================= FLOATING PRODUCTS ================= */}

      <div className="pointer-events-none absolute left-[4%] top-[15%] hidden w-32 rotate-[-8deg] animate-bounce overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-xl [animation-duration:7s] lg:block">

        <img
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=85"
          alt="Laptop"
          className="h-24 w-full rounded-xl object-cover"
        />

      </div>

      <div className="pointer-events-none absolute right-[5%] top-[12%] hidden w-32 rotate-[8deg] animate-bounce overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-xl [animation-duration:8s] lg:block">

        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85"
          alt="Headphones"
          className="h-24 w-full rounded-xl object-cover"
        />

      </div>

      <div className="pointer-events-none absolute bottom-[13%] left-[6%] hidden w-28 rotate-[7deg] animate-bounce overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-xl [animation-duration:9s] lg:block">

        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=85"
          alt="Watch"
          className="h-24 w-full rounded-xl object-cover"
        />

      </div>

      <div className="pointer-events-none absolute bottom-[12%] right-[6%] hidden w-32 rotate-[-7deg] animate-bounce overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-xl [animation-duration:8.5s] lg:block">

        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=85"
          alt="Camera"
          className="h-24 w-full rounded-xl object-cover"
        />

      </div>

      {/* ================= MAIN ================= */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">

        <div className="w-full max-w-[470px]">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="mb-7 flex justify-center transition-transform duration-300 hover:scale-105"
          >

            <span className="text-5xl font-black tracking-[-0.08em] text-yellow-500">
              shop
            </span>

            <span className="text-5xl font-black tracking-[-0.08em] text-gray-900">
              ly
            </span>

            <span className="ml-2 mt-2 h-3 w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/40" />

          </Link>

          {/* ================= CARD ================= */}

          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.08)] sm:p-8">

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300" />

            {/* ================= HEADER ================= */}

            <div className="mb-7 text-center">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 shadow-sm">
                <FiShoppingBag size={24} />
              </div>

              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-600">
                Join Shoply
              </p>

              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Start your shopping journey with us.
              </p>

            </div>

            {/* ================= ERROR ================= */}

            {errors.submit && (

              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                <FiAlertCircle size={18} />

                <span>{errors.submit}</span>

              </div>
            )}

            {/* ================= SUCCESS ================= */}

            {success && (

              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">

                  <FiCheck size={15} />

                </div>

                <span>
                  Account created successfully!
                </span>

              </div>
            )}

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}

              <div className="group">

                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Full name
                </label>

                <div className="relative">

                  <FiUser
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      errors.name
                        ? "text-red-500"
                        : "text-gray-400 group-focus-within:text-yellow-500"
                    }`}
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    className={`${inputBase} ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />

                </div>

                {errors.name && (

                  <p className="mt-1.5 px-1 text-xs text-red-500">
                    {errors.name}
                  </p>

                )}

              </div>

              {/* EMAIL */}

              <div className="group">

                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Email address
                </label>

                <div className="relative">

                  <FiMail
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      errors.email
                        ? "text-red-500"
                        : "text-gray-400 group-focus-within:text-yellow-500"
                    }`}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`${inputBase} ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />

                </div>

                {errors.email && (

                  <p className="mt-1.5 px-1 text-xs text-red-500">
                    {errors.email}
                  </p>

                )}

              </div>

              {/* PASSWORD */}

              <div className="group">

                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <FiLock
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      errors.password
                        ? "text-red-500"
                        : "text-gray-400 group-focus-within:text-yellow-500"
                    }`}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    className={`${inputBase} pr-12 ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:scale-110 hover:text-yellow-500"
                  >

                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}

                  </button>

                </div>

                {errors.password && (

                  <p className="mt-1.5 px-1 text-xs text-red-500">
                    {errors.password}
                  </p>

                )}

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="group">

                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Confirm password
                </label>

                <div className="relative">

                  <FiLock
                    size={18}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      errors.confirmPassword
                        ? "text-red-500"
                        : "text-gray-400 group-focus-within:text-yellow-500"
                    }`}
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className={`${inputBase} pr-12 ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:scale-110 hover:text-yellow-500"
                  >

                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}

                  </button>

                </div>

                {errors.confirmPassword && (

                  <p className="mt-1.5 px-1 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>

                )}

              </div>

              {/* TERMS */}

              <label className="flex cursor-pointer items-start gap-3 pt-1">

                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 cursor-pointer accent-yellow-400"
                />

                <span className="text-xs leading-5 text-gray-500">

                  I agree to Shoply's{" "}

                  <span className="font-bold text-gray-800">
                    Terms
                  </span>{" "}

                  and{" "}

                  <span className="font-bold text-gray-800">
                    Privacy Policy
                  </span>

                  .

                </span>

              </label>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={isLoading || success}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-yellow-400 py-4 text-sm font-black text-gray-900 shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/25 disabled:cursor-not-allowed disabled:opacity-70"
              >

                <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />

                <span className="relative z-10 flex items-center gap-2">

                  {isLoading ? (
                    <>

                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />

                      Creating account...

                    </>
                  ) : success ? (
                    <>

                      <FiCheck size={18} />

                      Account created

                    </>
                  ) : (
                    <>

                      Create Account

                      <FiArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />

                    </>
                  )}

                </span>

              </button>

            </form>

            {/* ================= LOGIN ================= */}

            <div className="mt-7 text-center text-sm text-gray-500">

              Already have an account?

              <Link
                to="/login"
                className="ml-1 font-black text-gray-900 underline decoration-yellow-400 decoration-2 underline-offset-4 transition-colors hover:text-yellow-600"
              >
                Sign in
              </Link>

            </div>

            {/* ================= TRUST ================= */}

            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">

              <TrustItem
                icon={<FiShield />}
                text="Secure"
              />

              <TrustItem
                icon={<FiTruck />}
                text="Fast delivery"
              />

              <TrustItem
                icon={<FiTag />}
                text="Best deals"
              />

            </div>

          </div>

          {/* ================= COPYRIGHT ================= */}

          <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
            © 2026 Shoply · Shop smarter. Live better.
          </p>

        </div>
      </div>
    </main>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-gray-400 transition-colors duration-300 hover:text-yellow-600">

      <span className="text-yellow-500/80">
        {icon}
      </span>

      <span className="text-[10px] font-bold">
        {text}
      </span>

    </div>
  );
}

export default Register;
