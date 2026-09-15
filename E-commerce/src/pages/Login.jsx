
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
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

import { loginUser } from "../redux/authSlice";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginError, setLoginError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  // ================= ADMIN ACCOUNT =================

  const ADMIN_EMAIL = "ahmed123@gmail.com";

  const ADMIN_PASSWORD = "123456";

  // ================= VALIDATION =================

  function validateForm() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

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
    }));

    setLoginError("");
  }

  // ================= GET USERS =================

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

  // ================= LOGIN =================

  function handleSubmit(e) {
    e.preventDefault();

    setLoginError("");

    if (!validateForm()) {
      return;
    }

    const email = formData.email
      .trim()
      .toLowerCase();

    const password = formData.password;

    // ================= ADMIN LOGIN =================

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setIsLoading(true);

      setTimeout(() => {
        const adminUser = {
          name: "Ahmed",
          email: ADMIN_EMAIL,
          role: "admin",
        };

        dispatch(loginUser(adminUser));

        setIsLoading(false);

        setSuccess(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 900);
      }, 700);

      return;
    }

    // ================= NORMAL USER LOGIN =================

    const users = getUsers();

    if (users.length === 0) {
      setLoginError(
        "No account found. Please create an account first."
      );

      return;
    }

    const user = users.find(
      (savedUser) =>
        savedUser.email?.trim().toLowerCase() ===
          email &&
        savedUser.password === password
    );

    if (!user) {
      setLoginError(
        "Email or password is incorrect."
      );

      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const normalUser = {
        ...user,
        role: "user",
      };

      dispatch(loginUser(normalUser));

      setIsLoading(false);

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 900);
    }, 700);
  }

  // ================= VALID STATES =================

  const validEmail =
    formData.email &&
    !errors.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    );

  const validPassword =
    formData.password &&
    !errors.password &&
    formData.password.length >= 6;

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

      <div className="pointer-events-none absolute left-[4%] top-[15%] hidden h-32 w-32 rotate-[-8deg] animate-bounce overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-2 shadow-xl [animation-duration:7s] lg:block">
        <img
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=85"
          alt="Laptop"
          className="h-full w-full rounded-[1.4rem] object-cover"
        />
      </div>

      <div className="pointer-events-none absolute right-[4%] top-[13%] hidden h-32 w-32 rotate-[7deg] animate-bounce overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-2 shadow-xl [animation-duration:8s] lg:block">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85"
          alt="Headphones"
          className="h-full w-full rounded-[1.4rem] object-cover"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[14%] left-[6%] hidden h-32 w-32 rotate-[6deg] animate-bounce overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-2 shadow-xl [animation-duration:9s] lg:block">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=85"
          alt="Watch"
          className="h-full w-full rounded-[1.4rem] object-cover"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[12%] right-[6%] hidden h-32 w-32 rotate-[-7deg] animate-bounce overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-2 shadow-xl [animation-duration:8s] lg:block">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=85"
          alt="Camera"
          className="h-full w-full rounded-[1.4rem] object-cover"
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

          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.08)] sm:p-9">

            {/* Top Line */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300" />

            {/* ================= HEADER ================= */}

            <div className="mb-8 text-center">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 shadow-sm">
                <FiShoppingBag size={24} />
              </div>

              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-600">
                Welcome back
              </p>

              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                Sign in to Shoply
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Your favorite products are waiting
                for you.
              </p>
            </div>

            {/* ================= ERROR ================= */}

            {loginError && (
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600">
                <FiAlertCircle
                  className="mt-0.5 shrink-0"
                  size={17}
                />

                <span>{loginError}</span>
              </div>
            )}

            {/* ================= SUCCESS ================= */}

            {success && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm font-bold text-green-600">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
                  <FiCheck size={15} />
                </span>

                Welcome back! Redirecting...
              </div>
            )}

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* ================= EMAIL ================= */}

              <div>

                <label className="mb-2.5 block text-xs font-bold text-gray-700">
                  Email address
                </label>

                <div className="group relative">

                  <FiMail
                    size={18}
                    className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 ${
                      errors.email
                        ? "text-red-500"
                        : validEmail
                        ? "text-green-500"
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
                    className={`w-full rounded-2xl border bg-gray-50 py-4 pl-11 pr-12 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-all duration-300 ${
                      errors.email
                        ? "border-red-300 bg-red-50 focus:ring-4 focus:ring-red-100"
                        : validEmail
                        ? "border-green-300 focus:ring-4 focus:ring-green-100"
                        : "border-gray-200 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                    }`}
                  />

                  {validEmail && (
                    <FiCheck
                      size={17}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                    />
                  )}
                </div>

                {errors.email && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
                    <FiAlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* ================= PASSWORD ================= */}

              <div>

                <div className="mb-2.5 flex items-center justify-between">

                  <label className="text-xs font-bold text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[11px] font-bold text-yellow-600 transition hover:text-yellow-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="group relative">

                  <FiLock
                    size={18}
                    className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 ${
                      errors.password
                        ? "text-red-500"
                        : validPassword
                        ? "text-green-500"
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full rounded-2xl border bg-gray-50 py-4 pl-11 pr-12 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-all duration-300 ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : validPassword
                        ? "border-green-300"
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
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
                    <FiAlertCircle size={12} />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* ================= REMEMBER ================= */}

              <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2">

                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-yellow-400"
                  />

                  <span className="text-xs text-gray-500">
                    Remember me
                  </span>

                </label>

                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Secure login
                </span>
              </div>

              {/* ================= BUTTON ================= */}

              <button
                type="submit"
                disabled={isLoading || success}
                className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-yellow-400 py-4 text-sm font-black text-gray-900 shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >

                <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />

                <span className="relative z-10 flex items-center gap-2">

                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />

                      Signing in...
                    </>
                  ) : success ? (
                    <>
                      <FiCheck size={17} />

                      Success
                    </>
                  ) : (
                    <>
                      Sign In

                      <FiArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                </span>
              </button>
            </form>

            {/* ================= SIGN UP ================= */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                New to Shoply?
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            <Link
              to="/signup"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-gray-700 transition-all duration-300 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
            >
              Create your account

              <FiArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* ================= TRUST ================= */}

            <div className="mt-7 grid grid-cols-3 gap-2">

              <TrustItem
                icon={<FiShield size={14} />}
                text="Secure"
              />

              <TrustItem
                icon={<FiTruck size={14} />}
                text="Fast delivery"
              />

              <TrustItem
                icon={<FiTag size={14} />}
                text="Best deals"
              />

            </div>
          </div>

          {/* ================= COPYRIGHT ================= */}

          <p className="mt-6 text-center text-[10px] font-medium text-gray-400">
            © 2026 Shoply. Shop smarter. Live better.
          </p>

        </div>
      </div>
    </main>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border border-gray-100 bg-white py-3 text-gray-400 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:text-yellow-600">

      {icon}

      <span className="text-[9px] font-bold uppercase tracking-wider">
        {text}
      </span>

    </div>
  );
}

export default Login;
