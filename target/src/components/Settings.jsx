import React, { useEffect, useState } from "react";
import { getUser } from "../api/userApi";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    darkMode: false,
    emailNotifications: true,
    taskReminders: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);

  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();

        const darkModeValue = userData.darkMode ?? false;

        setFormData((prev) => ({
          ...prev,
          username: userData.username || "",
          email: userData.email || "",
          darkMode: darkModeValue,
          emailNotifications: userData.emailNotifications ?? userData.email_notifications ?? true,
          taskReminders: userData.taskReminders ?? userData.task_reminders ?? true,
        }));

        applyTheme(darkModeValue);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "darkMode") {
        applyTheme(checked);
      }

      return updated;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto mt-8 px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage your account preferences and security
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Preferences
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 cursor-pointer text-left bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    Dark Mode
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark appearance
                  </p>
                </div>
                <div className="relative inline-flex items-center shrink-0 ml-4">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={formData.darkMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                </div>
              </label>

              <label className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 cursor-pointer text-left bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates by email
                  </p>
                </div>
                <div className="relative inline-flex items-center shrink-0 ml-4">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                </div>
              </label>

              <label className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 cursor-pointer text-left bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    Task Reminders
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get reminders for upcoming tasks
                  </p>
                </div>
                <div className="relative inline-flex items-center shrink-0 ml-4">
                  <input
                    type="checkbox"
                    name="taskReminders"
                    checked={formData.taskReminders}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 flex items-center justify-between border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Logout
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Sign out of your account securely
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}