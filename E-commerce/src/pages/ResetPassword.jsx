import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiLock,
  FiShield,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { toast } from "sonner";
import { resetPassword } from "../Apis/authApi";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(token, password);

      setSuccess(true);
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Reset link is invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUCCESS STATE
  ========================= */

  if (success) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] px-4 py-10 dark:bg-[#111111]">
        <div className="mx-auto flex min-h-[85vh] max-w-[470px] items-center justify-center">
          <div className="w-full">

            {/* SHOPLY LOGO */}
            <div className="mb-6 flex justify-center">
              <Link
                to="/"
                className="group flex items-center gap-2.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffd800] shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <span className="text-xl font-black text-gray-950">
                    S
                  </span>
                </div>

                <span className="text-[28px] font-black tracking-tight text-gray-950 dark:text-white">
                  Shoply
                </span>
              </Link>
            </div>

            {/* SUCCESS CARD */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-[#292929] dark:bg-[#1a1a1a]">

              <div className="h-1.5 w-full bg-[#ffd800]" />

              <div className="px-6 py-10 text-center sm:px-9 sm:py-11">

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <FiCheck size={29} strokeWidth={2.5} />
                </div>

                <h1 className="text-[25px] font-black tracking-tight text-gray-950 dark:text-white">
                  Password Updated
                </h1>

                <p className="mx-auto mt-3 max-w-[350px] text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Your password has been changed successfully. You can now
                  sign in using your new password.
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ffd800] px-6 text-sm font-black text-gray-950 transition-all duration-300 hover:bg-[#f5cd00] hover:shadow-md"
                >
                  Go to Login
                  <FiArrowLeft
                    size={16}
                    className="rotate-180"
                  />
                </button>

                <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-xs text-gray-400 dark:border-[#2a2a2a]">
                  <FiShield size={14} />
                  <span>Your account is protected by Shoply</span>
                </div>

              </div>
            </div>

            <p className="mt-5 text-center text-xs text-gray-400">
              © 2026 Shoply. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    );
  }

  /* =========================
     RESET PASSWORD
  ========================= */

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 py-10 dark:bg-[#111111]">
      <div className="mx-auto flex min-h-[85vh] max-w-[470px] items-center justify-center">
        <div className="w-full">

          {/* =========================
              SHOPLY LOGO
          ========================= */}

          <div className="mb-6 flex justify-center">
            <Link
              to="/"
              className="group flex items-center gap-2.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffd800] shadow-sm transition-transform duration-300 group-hover:scale-105">
                <span className="text-xl font-black text-gray-950">
                  S
                </span>
              </div>

              <span className="text-[28px] font-black tracking-tight text-gray-950 dark:text-white">
                Shoply
              </span>
            </Link>
          </div>

          {/* =========================
              MAIN CARD
          ========================= */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-[#292929] dark:bg-[#1a1a1a]">

            {/* Yellow top line */}
            <div className="h-1.5 w-full bg-[#ffd800]" />

            <div className="px-6 py-8 sm:px-9 sm:py-9">

              {/* =========================
                  HEADER
              ========================= */}

              <div className="mb-8 text-center">

                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4b8] text-gray-950 dark:bg-[#ffd800]/15 dark:text-[#ffd800]">
                  <FiLock size={25} strokeWidth={2.2} />
                </div>

                <h1 className="text-[25px] font-black tracking-tight text-gray-950 dark:text-white">
                  Create a new password
                </h1>

                <p className="mx-auto mt-2 max-w-[350px] text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Choose a strong password to keep your Shoply account secure.
                </p>

              </div>

              {/* =========================
                  FORM
              ========================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NEW PASSWORD */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">
                    New password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-11 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 dark:border-[#3a3a3a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-white"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>

                  </div>
                </div>

                {/* CONFIRM PASSWORD */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800 dark:text-gray-200">
                    Confirm password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-11 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 dark:border-[#3a3a3a] dark:bg-[#171717] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>

                  </div>
                </div>

                {/* PASSWORD INFO */}

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-[#303030] dark:bg-[#151515]">
                  <div className="flex gap-3">
                    <FiShield
                      className="mt-0.5 shrink-0 text-gray-400"
                      size={16}
                    />

                    <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                      Your password must contain at least 6 characters.
                    </p>
                  </div>
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ffd800] text-sm font-black text-gray-950 transition-all duration-300 hover:bg-[#f5cd00] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-950 border-t-transparent" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Update Password
                      <FiArrowLeft
                        size={16}
                        className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

              </form>

              {/* =========================
                  BACK TO LOGIN
              ========================= */}

              <Link
                to="/login"
                className="mt-7 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
              >
                <FiArrowLeft size={16} />
                Back to Login
              </Link>

              {/* SECURITY */}

              <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-xs text-gray-400 dark:border-[#2a2a2a]">
                <FiShield size={14} />
                <span>Secure password recovery powered by Shoply</span>
              </div>

            </div>
          </div>

         

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;