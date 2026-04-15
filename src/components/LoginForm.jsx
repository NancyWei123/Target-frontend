import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password)
      .then((token) => {
        onLogin(token);
        navigate("/index");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Login failed: " + err.message);
      });
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
        Sign in to your account
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Remember me
          </label>
          <a
            href="/forget-password"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-200 shadow-md"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        <span className="mx-3 text-gray-400 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
        >
          Sign up
        </a>
      </p>
    </div>
  </div>
);
};

export default LoginForm;