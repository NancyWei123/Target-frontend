const BASE_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function getJsonHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

// ✅ REGISTER
export async function registerUser(user) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to register");
  }

  return response.json();
}

// ✅ LOGIN
export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify({
    email,
    password,
  }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to login");
  }

  // backend returns String token
  const token = await response.text();
  localStorage.setItem("token", token);
  return token;
}

// ✅ GET USER INFO
export async function getUser() {
  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to get user");
  }

  return response.json();
}

// ✅ UPDATE USER INFO
export async function updateUser(updatedUser) {
  const response = await fetch(`${BASE_URL}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update user");
  }

  return response.json();
}

// ✅ CHANGE PASSWORD
export async function changePassword( passwordData) {
  const response = await fetch(`${BASE_URL}/password`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(passwordData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to change password");
  }

  return response.text();
}

export async function updateUserSettings(settings) {
  const res = await fetch(`${BASE_URL}/settings`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(settings)
  });
  if (!res.ok) {
    throw new Error("Failed to update settings");
  }
  return res.json();
}

// ✅ DELETE USER
export async function deleteUser() {
  const response = await fetch(`${BASE_URL}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete user");
  }

  return response.text();
}

export async function resetPassword({ email, code, newPassword }) {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify({ email, code, newPassword }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to reset password");
  }

  return response.text();
}

export async function sendVerificationCode(email) {
  const res = await fetch(`${BASE_URL}/send-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(text);
  }
  return text;
}