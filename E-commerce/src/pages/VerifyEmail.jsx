
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiMail,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";
import { toast } from "sonner";

import {
  verifyEmail,
  resendVerificationCode,
} from "../redux/authSlice";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const inputRefs = useRef([]);

  const { loading } = useSelector((state) => state.auth);

  const email =
    location.state?.email ||
    localStorage.getItem("pendingVerificationEmail") ||
    "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resending, setResending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);

  /* =========================
     COUNTDOWN
  ========================= */

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  /* =========================
     AUTO FOCUS
  ========================= */

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    newCode[index] = value.slice(-1);

    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* =========================
     HANDLE KEY DOWN
  ========================= */

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* =========================
     HANDLE PASTE
  ========================= */

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newCode = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newCode[index] = digit;
    });

    setCode(newCode);

    const nextIndex = Math.min(pastedData.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  /* =========================
     VERIFY EMAIL
  ========================= */

  const handleVerify = async (e) => {
    e.preventDefault();

    const verificationCode = code.join("");

    if (!email) {
      toast.error("Email address is missing.");
      navigate("/signup");
      return;
    }

    if (verificationCode.length !== 6) {
      toast.error("Please enter the 6-digit verification code.");
      return;
    }

    try {
      const result = await dispatch(
        verifyEmail({
          email,
          code: verificationCode,
        }),
      );

      if (verifyEmail.fulfilled.match(result)) {
        setSuccess(true);

        localStorage.removeItem("pendingVerificationEmail");

        toast.success("Email verified successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1800);
      } else {
        toast.error(
          result.payload ||
            "Invalid or expired verification code.",
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  /* =========================
     RESEND CODE
  ========================= */

  const handleResend = async () => {
    if (!email) {
      toast.error("Email address is missing.");
      return;
    }

    if (countdown > 0 || resending) return;

    try {
      setResending(true);

      const result = await dispatch(
        resendVerificationCode(email)
      );

      if (resendVerificationCode.fulfilled.match(result)) {
        toast.success(
          "A new verification code has been sent to your email."
        );

        setCountdown(60);

        setCode(["", "", "", "", "", ""]);

        inputRefs.current[0]?.focus();
      } else {
        toast.error(
          result.payload ||
            "Failed to resend verification code."
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to resend verification code."
      );
    } finally {
      setResending(false);
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

            <div className="mb-8 flex justify-center">
              <Link
                to="/"
                className="group flex items-center gap-3"
              >
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

            <div className="border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">
              <div className="h-1.5 w-full bg-[#ffd600]" />

              <div className="px-7 py-11 text-center sm:px-10 sm:py-13">

                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400">
                  <FiCheckCircle
                    size={30}
                    strokeWidth={1.8}
                  />
                </div>

                <p className="mt-8 text-[9px] font-black uppercase tracking-[0.28em] text-green-600 dark:text-green-400">
                  Email Verified
                </p>

                <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl">
                  You're all set.
                </h1>

                <p className="mx-auto mt-4 max-w-[370px] text-sm leading-7 text-gray-500 dark:text-gray-400">
                  Your email has been verified successfully.
                  Welcome to Shoply.
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <FiShoppingBag size={15} />
                  Taking you to Shoply...
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  /* =========================
     MAIN PAGE
  ========================= */

  return (
    <main className="min-h-screen bg-[#f5f5f3] px-5 py-10 dark:bg-[#111] sm:px-8 sm:py-14">

      <div className="mx-auto flex min-h-[85vh] max-w-[500px] items-center justify-center">

        <div className="w-full">

          {/* SHOPLY LOGO */}
          <div className="mb-8 flex justify-center">
            <Link
              to="/"
              className="group flex items-center gap-3"
            >
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

          <div className="border border-gray-200 bg-white dark:border-[#2a2a2a] dark:bg-[#171717]">

            <div className="h-1.5 w-full bg-[#ffd600]" />

            <div className="px-7 py-10 sm:px-10 sm:py-12">

              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center bg-[#fff8d6] text-black dark:bg-[#332f17] dark:text-[#ffd600]">
                  <FiShield
                    size={25}
                    strokeWidth={1.7}
                  />
                </div>
              </div>

              <div className="mt-7 text-center">

                <p className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">
                  Account Security
                </p>

                <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl">
                  Verify your email
                </h1>

                <p className="mx-auto mt-4 max-w-[390px] text-sm leading-7 text-gray-500 dark:text-gray-400">
                  We've sent a 6-digit verification code to
                </p>

                <p className="mt-1 break-all text-sm font-bold text-gray-900 dark:text-white">
                  {email || "your email address"}
                </p>

              </div>

              <form
                onSubmit={handleVerify}
                className="mt-9"
              >

                <div
                  className="flex justify-center gap-2.5 sm:gap-3"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleChange(
                          index,
                          e.target.value,
                        )
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, index)
                      }
                      className="
                        h-12
                        w-10
                        border
                        border-gray-200
                        bg-gray-50
                        text-center
                        text-lg
                        font-black
                        text-gray-950
                        outline-none
                        transition-all
                        focus:border-black
                        focus:bg-white
                        focus:ring-1
                        focus:ring-black
                        dark:border-[#333]
                        dark:bg-[#222]
                        dark:text-white
                        dark:focus:border-white
                        dark:focus:bg-[#1b1b1b]
                        dark:focus:ring-white
                        sm:h-14
                        sm:w-12
                        sm:text-xl
                      "
                      aria-label={`Verification digit ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    code.join("").length !== 6
                  }
                  className="
                    group
                    mt-8
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    bg-[#ffd600]
                    px-6
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-black
                    transition-all
                    duration-300
                    hover:bg-[#f5c900]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading ? (
                    <>
                      <FiRefreshCw
                        className="animate-spin"
                        size={15}
                      />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify email
                      <FiCheckCircle
                        size={15}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </>
                  )}
                </button>

              </form>

              <div className="mt-7 text-center">

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Didn't receive the code?
                </p>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={
                    countdown > 0 || resending
                  }
                  className="
                    mt-2
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    font-bold
                    text-gray-900
                    transition
                    hover:text-[#b49500]
                    disabled:cursor-not-allowed
                    disabled:text-gray-400
                    dark:text-white
                    dark:hover:text-[#ffd600]
                    dark:disabled:text-gray-600
                  "
                >
                  <FiRefreshCw
                    size={13}
                    className={
                      resending
                        ? "animate-spin"
                        : ""
                    }
                  />

                  {countdown > 0
                    ? `Resend code in ${countdown}s`
                    : "Resend verification code"}
                </button>

              </div>

              <div className="mt-8 border-t border-gray-100 pt-6 text-center dark:border-[#2a2a2a]">

                <Link
                  to="/register"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-gray-500
                    transition
                    hover:text-black
                    dark:text-gray-400
                    dark:hover:text-white
                  "
                >
                  <FiArrowLeft size={13} />
                  Back to registration
                </Link>

              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 dark:text-gray-600">
            <FiMail size={13} />
            <span>Check your inbox and spam folder</span>
          </div>

        </div>
      </div>
    </main>
  );
}

export default VerifyEmail;
