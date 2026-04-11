const BASE_URL = "/api/tasks";

export async function getTasks() {
  const token = localStorage.getItem("token");
  console.log("Fetching tasks with token:", token);
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tasks: ${res.status}`);
  }

  return res.json();
}
export async function finishTask(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/finish/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to finish task");
  }

  return res.json();
}

export async function undoTask(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/undo/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to undo task");
  }

  return res.json();
}
// CREATE task
export async function createTask(task) {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return res.json();
}

// DELETE task
export async function deleteTask(id) {
  const token = localStorage.getItem("token");
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}

// UPDATE task
export async function updateTask(id, task) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return res.json();
}