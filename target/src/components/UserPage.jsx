import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/userApi";
import UserForm from "../components/UserForm";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateUser = async (updatedData) => {
    try {
      const savedUser = await updateUser(updatedData);
      setUser(savedUser);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 dark:bg-gray-950 rounded-2xl shadow-md p-6 transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 dark:text-gray-100">User Profile</h2>

      {editing ? (
        <UserForm
          initialData={user}
          onSubmit={handleUpdateUser}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300 dark:bg-gray-900">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center space-x-4 dark:text-gray-300">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {user.username}
                </h3>
                <p className="text-gray-500 dark:text-gray-200">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Edit
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 dark:text-gray-200">User ID</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{user.id}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 dark:text-gray-200">Username</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{user.username}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 dark:text-gray-200">Email</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{user.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 dark:text-gray-200">Account Status</span>
              <span className="font-medium text-green-600">
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {user.createdAt && (
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-200">Created At</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}