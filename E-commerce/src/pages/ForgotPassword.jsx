import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiSend,
  FiCheck,
  FiShield,
} from "react-icons/fi";
import { toast } from "sonner";
import { forgotPassword } from "../Apis/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email.trim());

      setSent(true);
      toast.success("Reset link sent successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#111] transition-colors duration-300 dark:bg-[#111] dark:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[500px]">

          {/* =========================
              SHOPLY LOGO
          ========================= */}
          <div className="mb-8 flex justify-center">
            <Link
              to="/"
              className="group flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-[#ffd600] text-black transition-transform duration-300 group-hover:scale-105">
                <span className="text-lg font-black">S</span>
              </div>

              <span className="text-[27px] font-black tracking-[-0.04em] text-gray-950 dark:text-white">
                Shoply
              </span>
            </Link>
          </div>

          {/* =========================
              MAIN CONTAINER
          ========================= */}
          <div className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

            {/* Yellow top line */}
            <div className="h-1 w-full bg-[#ffd600]" />

            <div className="px-6 py-9 sm:px-10 sm:py-11">

              {!sent ? (
                <>
                  {/* =========================
                      HEADER
                  ========================= */}
                  <div className="text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#deded9] bg-[#fafaf8] text-gray-800 dark:border-[#333] dark:bg-[#222] dark:text-[#ffd600]">
                      <FiMail
                        size={24}
                        strokeWidth={2}
                      />
                    </div>

                    <p className="mt-7 text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                      Account Recovery
                    </p>

                    <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-gray-950 dark:text-white sm:text-[34px]">
                      Forgot your password?
                    </h1>

                    <p className="mx-auto mt-4 max-w-[390px] text-sm leading-7 text-gray-500 dark:text-gray-400">
                      No worries. Enter your email address and we'll
                      send you a secure link to reset your password.
                    </p>
                  </div>

                  {/* =========================
                      FORM
                  ========================= */}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-9 space-y-6"
                  >
                    <div>
                      <label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                        Email Address
                      </label>

                      <div className="relative">
                        <FiMail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          size={17}
                        />

                        <input
                          type="email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="Enter your email"
                          autoComplete="email"
                          className="
                            h-13
                            w-full
                            border
                            border-[#d6d6d1]
                            bg-[#fafaf8]
                            pl-11
                            pr-4
                            text-sm
                            text-gray-900
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-gray-400
                            focus:border-black
                            focus:bg-white
                            dark:border-[#333]
                            dark:bg-[#202020]
                            dark:text-white
                            dark:placeholder:text-gray-500
                            dark:focus:border-white
                            dark:focus:bg-[#202020]
                          "
                        />
                      </div>
                    </div>

                    {/* =========================
                        SUBMIT BUTTON
                    ========================= */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        group
                        flex
                        min-h-14
                        w-full
                        items-center
                        justify-center
                        gap-3
                        bg-[#ffd600]
                        px-6
                        py-4
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-black
                        transition-all
                        duration-300
                        hover:bg-[#f3ca00]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link

                          <FiSend
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
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
                    className="
                      mt-7
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.12em]
                      text-gray-500
                      transition-colors
                      duration-200
                      hover:text-black
                      dark:text-gray-400
                      dark:hover:text-white
                    "
                  >
                    <FiArrowLeft size={15} />
                    Back to Login
                  </Link>

                  {/* =========================
                      SECURITY NOTE
                  ========================= */}
                  <div className="mt-8 flex items-center justify-center gap-2 border-t border-[#deded9] pt-6 text-[10px] text-gray-400 dark:border-[#292929]">
                    <FiShield size={14} />

                    <span>
                      Secure password recovery powered by Shoply
                    </span>
                  </div>
                </>
              ) : (
                /* =========================
                   SUCCESS STATE
                ========================= */
                <div className="py-3 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center border border-green-200 bg-green-50 text-green-600 dark:border-green-900/40 dark:bg-green-900/10 dark:text-green-400">
                    <FiCheck
                      size={29}
                      strokeWidth={2.5}
                    />
                  </div>

                  <p className="mt-7 text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                    Email Sent
                  </p>

                  <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-gray-950 dark:text-white">
                    Check your email
                  </h1>

                  <p className="mx-auto mt-4 max-w-[380px] text-sm leading-7 text-gray-500 dark:text-gray-400">
                    If an account exists with this email, we've
                    sent you a secure password reset link.
                  </p>

                  {/* Email info */}
                  <div className="mt-7 border border-[#deded9] bg-[#f8f8f6] px-5 py-5 text-left dark:border-[#292929] dark:bg-[#202020]">
                    <div className="flex gap-4">
                      <FiMail
                        className="mt-0.5 shrink-0 text-gray-400"
                        size={17}
                      />

                      <p className="text-xs leading-6 text-gray-500 dark:text-gray-400">
                        Please check your inbox and spam folder.
                        The reset link will expire after a limited
                        time.
                      </p>
                    </div>
                  </div>

                  {/* Back to login */}
                  <Link
                    to="/login"
                    className="
                      group
                      mt-7
                      flex
                      min-h-14
                      w-full
                      items-center
                      justify-center
                      gap-3
                      bg-[#ffd600]
                      px-6
                      py-4
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-black
                      transition-all
                      duration-300
                      hover:bg-[#f3ca00]
                    "
                  >
                    <FiArrowLeft
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                    />

                    Back to Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bottom brand line */}
          <div className="mt-7 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <span className="h-px w-8 bg-[#d8d8d3] dark:bg-[#292929]" />
            Shoply
            <span className="h-px w-8 bg-[#d8d8d3] dark:bg-[#292929]" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;