import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiLock } from "react-icons/fi";
import { toast } from "sonner";
import { resetPassword } from "../Apis/authApi";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#0f0f0f]">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
          <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-[#292929] dark:bg-[#181818]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <FiCheck size={27} />
            </div>

            <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
              Password Updated
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Your password has been changed successfully. You can now log in
              with your new password.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-[#0f0f0f]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-[#292929] dark:bg-[#181818]">
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-black">
              <FiLock size={23} />
            </div>

            <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
              Reset Password
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Create a new password for your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                New Password
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 dark:border-[#333] dark:bg-[#111] dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Confirm Password
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 dark:border-[#333] dark:bg-[#111] dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-400 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>

          <Link
            to="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <FiArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;