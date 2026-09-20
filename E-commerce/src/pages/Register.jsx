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
        }),
      ).unwrap();

      setSuccess(true);

      setTimeout(() => {
        navigate("/verify-email", {
          state: { email: normalizedEmail },
        });
      }, 900);
    } catch (err) {
      console.error("Registration error:", err);
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
                  Create account
                </p>

                <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-gray-950 dark:text-white sm:text-[28px]">
                  Welcome to Shoply
                </h1>

                <p className="mt-2 max-w-[360px] text-[13px] leading-5 text-gray-500 dark:text-gray-400">
                  Create your account and discover a better way to shop.
                </p>
              </div>

              <div className="hidden h-9 w-9 shrink-0 items-center justify-center border border-[#e2e2df] text-gray-500 sm:flex dark:border-[#303030] dark:text-gray-400">
                <FiUser size={16} />
              </div>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-9 sm:py-8">
            {/* ERROR */}
            {error && (
              <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3.5 text-[12px] font-medium text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
                <FiAlertCircle className="mt-0.5 shrink-0" size={15} />
                <span>{error}</span>
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mb-6 flex items-center gap-3 border border-green-200 bg-green-50 px-4 py-3.5 text-[12px] font-medium text-green-600 dark:border-green-900/40 dark:bg-green-950/20 dark:text-green-400">
                <FiCheck className="shrink-0" size={15} />
                <span>Account created successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                  Full name
                </label>

                <div className="relative">
                  <FiUser
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`h-12 w-full border ${
                      errors.name
                        ? "border-red-400"
                        : "border-[#d5d5d2] dark:border-[#383838]"
                    } bg-white pl-10 pr-4 text-[13px] text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-900 dark:bg-[#1b1b1b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white`}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1.5 text-[10px] text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

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
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                  Password
                </label>

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
                    placeholder="At least 6 characters"
                    className={`h-12 w-full border ${
                      errors.password
                        ? "border-red-400"
                        : "border-[#d5d5d2] dark:border-[#383838]"
                    } bg-white pl-10 pr-11 text-[13px] text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-900 dark:bg-[#1b1b1b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
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

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                  Confirm password
                </label>

                <div className="relative">
                  <FiLock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`h-12 w-full border ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-[#d5d5d2] dark:border-[#383838]"
                    } bg-white pl-10 pr-11 text-[13px] text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-900 dark:bg-[#1b1b1b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-[10px] text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* TERMS */}
              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) =>
                      setAcceptedTerms(e.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#ffd800]"
                  />

                  <span className="text-[11px] leading-5 text-gray-500 dark:text-gray-400">
                    I agree to{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Privacy Policy
                    </span>
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-1.5 text-[10px] text-red-500">
                    {errors.terms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 bg-[#ffd814] text-[10px] font-black uppercase tracking-[0.12em] text-gray-950 transition-all duration-300 hover:bg-[#f5cd00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-950 border-t-transparent" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <FiArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* LOGIN */}
            <div className="mt-7 border-t border-[#e5e5e2] pt-6 text-center dark:border-[#292929]">
              <p className="text-[12px] text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-gray-900 transition-colors hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* SECURITY */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.08em] text-gray-400">
              <FiShield size={13} />
              <span>Your information is protected and secure</span>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default Register;