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
          "Reset link is invalid or expired.",
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
      <main className="min-h-screen bg-[#f5f5f3] px-5 py-10 dark:bg-[#111] sm:px-8 sm:py-14">
        <div className="mx-auto flex min-h-[85vh] max-w-[500px] items-center justify-center">
          <div className="w-full">
            {/* SHOPLY LOGO */}
            <div className="mb-8 flex justify-center">
              <Link to="/" className="group flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#ffd600] transition-transform duration-300 group-hover:scale-105">
                  <span className="text-lg font-black text-black">
                    S
                  </span>
                </div>

                <span className="text-[27px] font-black tracking-[-0.04em] text-gray-950 dark:text-white">
                  Shoply
                </span>
              </Link>
            </div>

            {/* SUCCESS */}
            <div className="border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
              <div className="h-1.5 w-full bg-[#ffd600]" />

              <div className="px-7 py-11 text-center sm:px-10 sm:py-13">
                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400">
                  <FiCheck size={29} strokeWidth={2.5} />
                </div>

                <p className="mt-8 text-[9px] font-black uppercase tracking-[0.28em] text-green-600 dark:text-green-400">
                  Password Recovery
                </p>

                <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-gray-950 sm:text-4xl dark:text-white">
                  Password Updated
                </h1>

                <p className="mx-auto mt-4 max-w-[370px] text-sm leading-7 text-gray-500 dark:text-gray-400">
                  Your password has been changed successfully. You can
                  now sign in using your new password.
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="group mt-8 flex h-12 w-full items-center justify-center gap-2 bg-[#ffd600] px-6 text-xs font-black uppercase tracking-[0.08em] text-black transition-all duration-300 hover:bg-[#f5cc00]"
                >
                  Go to Login

                  <FiArrowLeft
                    size={16}
                    className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400 dark:border-[#2a2a2a]">
                  <FiShield size={14} />
                  Your account is protected by Shoply
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.12em] text-gray-400">
              © 2026 Shoply. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     RESET PASSWORD
  ========================= */

  return (
    <main className="min-h-screen bg-[#f5f5f3] px-5 py-10 dark:bg-[#111] sm:px-8 sm:py-14">
      <div className="mx-auto flex min-h-[85vh] max-w-[500px] items-center justify-center">
        <div className="w-full">
          {/* SHOPLY LOGO */}
          <div className="mb-8 flex justify-center">
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[#ffd600] transition-transform duration-300 group-hover:scale-105">
                <span className="text-lg font-black text-black">
                  S
                </span>
              </div>

              <span className="text-[27px] font-black tracking-[-0.04em] text-gray-950 dark:text-white">
                Shoply
              </span>
            </Link>
          </div>

          {/* MAIN CARD */}
          <div className="border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
            <div className="h-1.5 w-full bg-[#ffd600]" />

            <div className="px-7 py-9 sm:px-10 sm:py-11">
              {/* HEADER */}
              <div className="mb-9 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#fff4b8] text-gray-950 dark:bg-[#ffd600]/15 dark:text-[#ffd600]">
                  <FiLock size={25} strokeWidth={2.2} />
                </div>

                <p className="mt-7 text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                  Account Security
                </p>

                <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-gray-950 dark:text-white">
                  Create a new password
                </h1>

                <p className="mx-auto mt-4 max-w-[370px] text-sm leading-7 text-gray-500 dark:text-gray-400">
                  Choose a strong password to keep your Shoply account
                  secure.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NEW PASSWORD */}
                <div>
                  <label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.15em] text-gray-700 dark:text-gray-300">
                    New password
                  </label>

                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={17}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      className="h-12 w-full border border-gray-300 bg-white pl-11 pr-12 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-900 dark:border-[#363636] dark:bg-[#151515] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
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
                  <label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.15em] text-gray-700 dark:text-gray-300">
                    Confirm password
                  </label>

                  <div className="relative">
                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={17}
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
                      className="h-12 w-full border border-gray-300 bg-white pl-11 pr-12 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-gray-900 dark:border-[#363636] dark:bg-[#151515] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
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
                <div className="border border-gray-200 bg-[#f7f7f5] px-4 py-4 dark:border-[#303030] dark:bg-[#151515]">
                  <div className="flex gap-3">
                    <FiShield
                      className="mt-0.5 shrink-0 text-gray-400"
                      size={16}
                    />

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                        Password requirement
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Your password must contain at least 6
                        characters.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 bg-[#ffd600] text-xs font-black uppercase tracking-[0.08em] text-black transition-all duration-300 hover:bg-[#f5cc00] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
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

              {/* BACK TO LOGIN */}
              <Link
                to="/login"
                className="mt-7 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-gray-500 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
              >
                <FiArrowLeft size={15} />
                Back to Login
              </Link>

              {/* SECURITY */}
              <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400 dark:border-[#2a2a2a]">
                <FiShield size={14} />
                Secure password recovery powered by Shoply
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;