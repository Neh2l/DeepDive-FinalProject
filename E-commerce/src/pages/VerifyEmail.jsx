import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiMail,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";

import { verifyEmail } from "../redux/authSlice";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const email = location.state?.email || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);

    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedCode) return;

    const newCode = [...code];

    pastedCode.split("").forEach((digit, index) => {
      newCode[index] = digit;
    });

    setCode(newCode);

    const nextIndex = Math.min(pastedCode.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      return;
    }

    try {
      await dispatch(
        verifyEmail({
          email,
          code: verificationCode,
        })
      ).unwrap();

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || resendLoading) return;

    /*
      The backend currently has register + verify-email.
      Resend-code endpoint is not available yet,
      so this button only resets the timer for now.
    */

    setResendLoading(true);

    setTimeout(() => {
      setTimeLeft(60);
      setResendLoading(false);
    }, 700);
  };

  const formattedTime = `00:${String(timeLeft).padStart(2, "0")}`;

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f7f7f7] px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-md">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="mb-7 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-gray-950"
        >
          <FiArrowLeft size={18} />
          Back to Sign Up
        </button>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

          {/* Top Brand Area */}
          <div className="border-b border-gray-100 px-6 pb-7 pt-8 text-center sm:px-10">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff3c4]">
              {success ? (
                <FiCheckCircle
                  size={34}
                  className="text-green-600"
                />
              ) : (
                <FiMail
                  size={32}
                  className="text-[#f5c400]"
                />
              )}
            </div>

            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffd814]">
                <FiShoppingBag
                  size={18}
                  className="text-gray-950"
                />
              </div>

              <span className="text-2xl font-black tracking-tight text-gray-950">
                Shoply
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-gray-950">
              {success ? "Email Verified!" : "Verify Your Email"}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              {success
                ? "Your account has been successfully verified. Redirecting you to Shoply..."
                : "We've sent a 6-digit verification code to your email address."}
            </p>

            {!success && (
              <p className="mt-2 break-all text-sm font-bold text-gray-900">
                {email}
              </p>
            )}
          </div>

          {!success && (
            <form
              onSubmit={handleVerify}
              className="px-6 py-7 sm:px-10"
            >

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              {/* OTP */}
              <div>
                <label className="mb-4 block text-center text-sm font-bold text-gray-800">
                  Enter verification code
                </label>

                <div
                  className="flex justify-center gap-2 sm:gap-3"
                  onPaste={handlePaste}
                >
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleChange(e.target.value, index)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, index)
                      }
                      className="h-12 w-11 rounded-xl border border-gray-300 bg-white text-center text-xl font-black text-gray-950 outline-none transition-all focus:border-[#ffd814] focus:ring-4 focus:ring-[#ffd814]/20 sm:h-14 sm:w-12"
                    />
                  ))}
                </div>
              </div>

              {/* Timer */}
              <div className="mt-7 text-center">
                {timeLeft > 0 ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Code expires in</span>

                    <span className="font-black text-gray-950">
                      {formattedTime}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-gray-500">
                    Didn't receive the code?
                  </p>
                )}
              </div>

              {/* Resend */}
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0 || resendLoading}
                className={`mx-auto mt-3 flex items-center gap-2 text-sm font-black transition ${
                  timeLeft > 0
                    ? "cursor-not-allowed text-gray-300"
                    : "text-gray-950 hover:text-[#d6a900]"
                }`}
              >
                <FiRefreshCw
                  size={16}
                  className={
                    resendLoading ? "animate-spin" : ""
                  }
                />

                {resendLoading
                  ? "Sending..."
                  : "Resend Code"}
              </button>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || code.join("").length !== 6}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#ffd814] px-6 py-4 text-sm font-black text-gray-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7c900] hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-gray-950" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Email
                    <FiArrowLeft className="rotate-180" size={18} />
                  </>
                )}
              </button>

              {/* Security */}
              <div className="mt-7 flex items-start gap-3 rounded-2xl bg-[#fafafa] p-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <FiShield
                    size={18}
                    className="text-gray-700"
                  />
                </div>

                <div>
                  <p className="text-xs font-black text-gray-900">
                    Your account is secure
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Never share your verification code with anyone.
                  </p>
                </div>
              </div>

            </form>
          )}

          {/* Success */}
          {success && (
            <div className="px-6 pb-10 pt-5 text-center sm:px-10">

              <div className="mx-auto flex max-w-xs items-center justify-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                <FiCheckCircle size={18} />
                Verification completed successfully
              </div>

              <div className="mt-6 flex justify-center">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-full origin-left animate-pulse rounded-full bg-[#ffd814]" />
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Shoply. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default VerifyEmail;