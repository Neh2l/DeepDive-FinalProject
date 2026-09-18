import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiSend } from "react-icons/fi";
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
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#0f0f0f]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-[#292929] dark:bg-[#181818]">
          {!sent ? (
            <>
              <div className="mb-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <FiMail size={23} />
                </div>

                <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
                  Forgot Password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 dark:border-[#333] dark:bg-[#111] dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <FiSend size={17} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>

              <Link
                to="/login"
                className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                <FiArrowLeft size={16} />
                Back to Login
              </Link>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                <FiMail size={25} />
              </div>

              <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
                Check Your Email
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                If an account exists with this email, we've sent you a password
                reset link.
              </p>

              <Link
                to="/login"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
              >
                <FiArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;