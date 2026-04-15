import { useState } from "react";
import { sendVerificationCode, resetPassword } from "../api/userApi";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCode = async () => {
    if (!form.email.trim()) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendVerificationCode(form.email);
      alert("Verification code sent to your email.");

      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("Failed to send verification code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.code || !form.newPassword || !form.confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword({
        email: form.email,
        code: form.code,
        newPassword: form.newPassword,
      });
      alert("Password reset successful. Please log in.");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Reset your password with email verification
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Verification Code
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="Enter code"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                required
              />

              <button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0}
                className={`px-4 py-2 rounded-xl text-white font-semibold ${
                  countdown > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {countdown > 0 ? `${countdown}s` : "Send Code"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-200 shadow-md"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          <a href="/login" className="text-blue-600 hover:text-blue-700">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}