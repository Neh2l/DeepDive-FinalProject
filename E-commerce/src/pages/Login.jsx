import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShoppingBag,
  FiCheck,
  FiAlertCircle,
  FiShield,
} from "react-icons/fi";

import { loginUser } from "../redux/authSlice";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState(false);

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================
  // HANDLE LOGIN
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(" LOGIN BUTTON CLICKED");

    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    console.log("FORM DATA:", formData);

    const normalizedEmail = formData.email.trim().toLowerCase();

    try {
      const result = await dispatch(
        loginUser({
          email: normalizedEmail,
          password: formData.password,
        }),
      ).unwrap();

      console.log("LOGIN RESULT:", result);

      console.log("ROLE:", result.user?.role);

      setSuccess(true);

      const userRole = result.user?.role?.toLowerCase();

      if (userRole === "admin" || userRole === "Admin") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 700);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 700);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f1] px-4 py-10 dark:bg-[#111111] sm:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[520px] flex-col justify-center">

        {/* LOGO */}
        <div className="mb-9 flex justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center bg-[#ffd814] text-gray-950 transition-transform duration-300 group-hover:scale-105">
              <FiShoppingBag size={19} />
            </div>

            <span className="text-[25px] font-black tracking-[-0.04em] text-gray-950 dark:text-white">
              Shoply
            </span>
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="border border-[#dededb] bg-white dark:border-[#292929] dark:bg-[#171717]">

          {/* HEADER */}
          <div className="border-b border-[#e5e5e2] px-6 py-7 sm:px-9 sm:py-8 dark:border-[#292929]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-400">
                  Sign in
                </p>

                <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-gray-950 dark:text-white sm:text-[28px]">
                  Welcome back
                </h1>

                <p className="mt-2 max-w-[360px] text-[13px] leading-5 text-gray-500 dark:text-gray-400">
                  Sign in to continue shopping on Shoply.
                </p>
              </div>

              <div className="hidden h-9 w-9 shrink-0 items-center justify-center border border-[#e2e2df] text-gray-500 sm:flex dark:border-[#303030] dark:text-gray-400">
                <FiShoppingBag size={16} />
              </div>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-9 sm:py-8">

            {/* ERROR */}
            {error && (
              <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3.5 text-[12px] font-medium text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
                <FiAlertCircle
                  className="mt-0.5 shrink-0"
                  size={15}
                />

                <span>{error}</span>
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mb-6 flex items-center gap-3 border border-green-200 bg-green-50 px-4 py-3.5 text-[12px] font-medium text-green-600 dark:border-green-900/40 dark:bg-green-950/20 dark:text-green-400">
                <FiCheck
                  className="shrink-0"
                  size={15}
                />

                <span>Login successful!</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                  Email address
                </label>

                <div className="relative">
                  <FiMail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`h-12 w-full border ${
                      errors.email
                        ? "border-red-400"
                        : "border-[#d5d5d2] dark:border-[#383838]"
                    } bg-white pl-10 pr-4 text-[13px] text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-900 dark:bg-[#1b1b1b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-[10px] text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                    Password
                  </label>

                <Link 
  to="/forgot-password" 
  className="text-[10px] font-bold text-gray-500 transition-colors hover:text-gray-950 hover:underline !text-gray-500 dark:!text-white dark:hover:!text-[#ffd800]"
>
  Forgot password?
</Link>
                </div>

                <div className="relative">
                  <FiLock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`h-12 w-full border ${
                      errors.password
                        ? "border-red-400"
                        : "border-[#d5d5d2] dark:border-[#383838]"
                    } bg-white pl-10 pr-11 text-[13px] text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-900 dark:bg-[#1b1b1b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                  >
                    {showPassword ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-[10px] text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* REMEMBER ME */}
              <div className="pt-1">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="h-4 w-4 accent-[#ffd800]"
                  />

                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    Keep me signed in
                  </span>
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 bg-[#ffd814] text-[10px] font-black uppercase tracking-[0.12em] text-gray-950 transition-all duration-300 hover:bg-[#f5cd00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-950 border-t-transparent" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in

                    <FiArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* REGISTER */}
            <div className="mt-7 border-t border-[#e5e5e2] pt-6 text-center dark:border-[#292929]">
              <p className="text-[12px] text-gray-500 dark:text-gray-400">
                New to Shoply?{" "}

                <Link
                  to="/signup"
                  className="font-bold text-gray-900 transition-colors hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
                >
                  Create your account
                </Link>
              </p>
            </div>

            {/* SECURITY */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.08em] text-gray-400">
              <FiShield size={13} />

              <span>
                Secure login powered by Shoply
              </span>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default Login;