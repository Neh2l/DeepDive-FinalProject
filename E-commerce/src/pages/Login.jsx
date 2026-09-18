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
        })
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
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-10 dark:bg-[#111111]">
      <div className="w-full max-w-[480px]">

        {/* LOGO */}

        <div className="flex justify-center mb-7">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#ffd800] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
              <FiShoppingBag className="text-gray-950 text-xl" />
            </div>

            <span className="text-[28px] font-black tracking-tight text-gray-950 dark:text-white">
              Shoply
            </span>
          </Link>
        </div>


        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-6 py-8 sm:px-9 sm:py-9 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">


          <div className="mb-7">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Welcome back
            </h1>

            <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
              Sign in to continue shopping on Shoply.
            </p>
          </div>


          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-lg bg-red-50 border border-red-100 p-3.5 text-red-600 text-sm font-medium dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-400">
              <FiAlertCircle className="shrink-0 mt-0.5" />

              <span>{error}</span>
            </div>
          )}


          {success && (
            <div className="mb-5 flex items-center gap-3 rounded-lg bg-green-50 border border-green-100 p-3.5 text-green-600 text-sm font-medium dark:bg-green-950/30 dark:border-green-900/40 dark:text-green-400">
              <FiCheck className="shrink-0" />

              <span>
                Login successful!
              </span>
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-gray-200">
                Email address
              </label>

              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full h-12 pl-10 pr-4 rounded-lg border ${
                    errors.email
                      ? "border-red-400"
                      : "border-gray-300 dark:border-[#3a3a3a]"
                  } bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400`}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>


            <div>
              <div className="flex items-center justify-between mb-2">

                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                  Password
                </label>


                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-gray-600 hover:text-gray-950 hover:underline transition dark:text-gray-400 dark:hover:text-white"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full h-12 pl-10 pr-11 rounded-lg border ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-300 dark:border-[#3a3a3a]"
                  } bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors dark:hover:text-white"
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.password}
                </p>
              )}
            </div>


            <div className="flex items-center">
              <label className="flex items-center gap-2.5 cursor-pointer">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="w-4 h-4 accent-[#ffd800]"
                />

                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Keep me signed in
                </span>

              </label>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="group w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#ffd800] text-sm font-black text-gray-950 transition-all duration-300 hover:bg-[#f5cd00] hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />

                  Signing in...
                </>
              ) : (
                <>
                  Sign in

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

          </form>


          <div className="mt-7 pt-6 border-t border-gray-100 text-center dark:border-[#2a2a2a]">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              New to Shoply?{" "}

              <Link
                to="/signup"
                className="font-bold text-gray-900 hover:underline dark:text-white"
              >
                Create your account
              </Link>
            </p>

          </div>


          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <FiShield />

            <span>
              Secure login powered by Shoply
            </span>
          </div>

        </div>


       

      </div>
    </div>
  );
}

export default Login;