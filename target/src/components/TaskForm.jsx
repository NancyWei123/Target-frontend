import { useState } from "react";
import { createTask, updateTask } from "../api/taskApi";

function TaskForm({ task, onClose, setTasks, tasks }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueTime: task?.dueTime || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task) {
      // update
      const updated = await updateTask(task.id, {
        ...task,
        ...form,
      });

      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } else {
      // create
      const created = await createTask({
        ...form,
        completed: false,
      });

      setTasks([...tasks, created]);
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="datetime-local"
        name="dueTime"
        value={form.dueTime}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {task ? "Update" : "Create"}
        </button>
      </div>

    </form>
  );
}

export default TaskForm;