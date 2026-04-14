import React, { useEffect, useState } from "react";
import { registerUser,sendVerificationCode } from "../api/userApi";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const validateBeforeSendCode = () => {
    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password;

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/;

    if (!username) {
      alert("Please enter username first.");
      return false;
    }

    if (!usernameRegex.test(username)) {
      alert(
        "Username must be 3-20 characters and can only contain letters, numbers, and underscores."
      );
      return false;
    }

    if (!email) {
      alert("Please enter email first.");
      return false;
    }

    if (!password) {
      alert("Please enter password first.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be 6-20 characters and contain at least one letter and one number."
      );
      return false;
    }

    return true;
  };

  const onSendCode = async () => {
    if (countdown > 0) return;

    if (!validateBeforeSendCode()) return;

    try {
      await sendVerificationCode(formData.email);
      setCountdown(60);
      alert("Verification code sent.");
    } catch (error) {
      console.error("Failed to send verification code:", error);
      alert("Failed to send verification code.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    registerUser(formData)
      .then(() => {
        alert("Registration successful! Please log in.");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="space-y-3">
            <label
              htmlFor="code"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Verification Code
            </label>

            <div className="flex gap-3">
              <input
                id="code"
                name="code"
                type="text"
                placeholder="Enter verification code"
                value={formData.code}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
              />

              <button
                type="button"
                onClick={onSendCode}
                disabled={countdown > 0}
                className={`px-5 py-3 rounded-2xl font-semibold whitespace-nowrap transition duration-200 shadow-sm ${
                  countdown > 0
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {countdown > 0 ? `${countdown}s` : "Send Code"}
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              We’ll send a verification code to your email.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}