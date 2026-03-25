const BASE_URL = "/api/tasks";

// GET all tasks
export async function getTasks() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// CREATE task
export async function createTask(task) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return res.json();
}

// DELETE task
export async function deleteTask(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

// UPDATE task
export async function updateTask(id, task) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return res.json();
}