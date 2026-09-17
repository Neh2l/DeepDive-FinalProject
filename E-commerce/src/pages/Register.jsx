import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiArrowRight,
  FiShoppingBag,
  FiCheck,
  FiAlertCircle,
  FiShield,
} from "react-icons/fi";

import { registerUser } from "../redux/authSlice";

function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    const normalizedEmail = formData.email.trim().toLowerCase();

    try {
      await dispatch(
        registerUser({
          name: formData.name.trim(),
          email: normalizedEmail,
          password: formData.password,
        })
      ).unwrap();

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 900);
    } catch (err) {
      console.error("Registration error:", err);
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

        {/* CARD */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-6 py-8 sm:px-9 sm:py-9 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">

          {/* HEADER */}

          <div className="mb-7">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Create your Shoply account
            </h1>

            <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
              Join us and start shopping today.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-lg bg-red-50 border border-red-100 p-3.5 text-red-600 text-sm font-medium dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-400">
              <FiAlertCircle className="shrink-0 mt-0.5" />

              <span>{error}</span>
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="mb-5 flex items-center gap-3 rounded-lg bg-green-50 border border-green-100 p-3.5 text-green-600 text-sm font-medium dark:bg-green-950/30 dark:border-green-900/40 dark:text-green-400">
              <FiCheck className="shrink-0" />

              <span>
                Account created successfully!
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-gray-200">
                Full name
              </label>

              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full h-12 pl-10 pr-4 rounded-lg border ${
                    errors.name
                      ? "border-red-400"
                      : "border-gray-300 dark:border-[#3a3a3a]"
                  } bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400`}
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}

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

            {/* PASSWORD */}

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-gray-200">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
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

            {/* CONFIRM PASSWORD */}

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-gray-200">
                Confirm password
              </label>

              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full h-12 pl-10 pr-11 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-gray-300 dark:border-[#3a3a3a]"
                  } bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors dark:hover:text-white"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* TERMS */}

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">

                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) =>
                    setAcceptedTerms(e.target.checked)
                  }
                  className="mt-0.5 w-4 h-4 accent-[#ffd800]"
                />

                <span className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                  I agree to{" "}
                  <span className="text-gray-900 font-semibold dark:text-white">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-gray-900 font-semibold dark:text-white">
                    Privacy Policy
                  </span>
                </span>

              </label>

              {errors.terms && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="group w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#ffd800] text-sm font-black text-gray-950 transition-all duration-300 hover:bg-[#f5cd00] hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />

                  Creating account...
                </>
              ) : (
                <>
                  Create account

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

          </form>

          {/* LOGIN */}

          <div className="mt-7 pt-6 border-t border-gray-100 text-center dark:border-[#2a2a2a]">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-bold text-gray-900 hover:underline dark:text-white"
              >
                Sign in
              </Link>

            </p>

          </div>

          {/* SECURITY */}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

            <FiShield />

            <span>
              Your information is protected and secure
            </span>

          </div>

        </div>

        {/* FOOTER */}

        <p className="text-center text-xs text-gray-400 mt-5">
          © 2026 Shoply. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default Register;