import React, { useState } from "react";
import { updateUser, changePassword } from "../api/userApi";

export default function UserForm({ initialData, onCancel }) {
  const [formData, setFormData] = useState({
    username: initialData?.username || "",
    email: initialData?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSave = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (!formData.oldPassword || !formData.newPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      alert("Password updated successfully.");

      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Failed to change password.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({
        username: formData.username,
        email: formData.email,
      });
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-5 dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Profile</h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Enter username"
          dark-placeholder="text-gray-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Enter email"
          dark-placeholder="text-gray-500"
          required
        />
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-100">
          Change Password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter old password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="button"
            onClick={handlePasswordSave}
            className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Update Password
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}