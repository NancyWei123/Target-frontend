import React, { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    username: "Nancy",
    email: "nancy@email.com",
    darkMode: false,
    emailNotifications: true,
    taskReminders: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account preferences and security
        </p>
      </div>

      <div className="space-y-6">
        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Preferences
          </h2>

          <div className="space-y-4">
           <label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer text-left">
  <div className="flex-1">
    <p className="font-medium text-gray-800">Dark Mode</p>
    <p className="text-sm text-gray-500">
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
    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
  </div>
</label>

<label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer text-left">
  <div className="flex-1">
    <p className="font-medium text-gray-800">Email Notifications</p>
    <p className="text-sm text-gray-500">
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
    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
  </div>
</label>

<label className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer text-left">
  <div className="flex-1">
    <p className="font-medium text-gray-800">Task Reminders</p>
    <p className="text-sm text-gray-500">
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
    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
  </div>
</label>
          </div>
        </div>

        
        {/* Logout */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Logout</h2>
            <p className="text-sm text-gray-500 mt-1">
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
  );
}