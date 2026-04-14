import { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  finishTask,
  undoTask,
  searchTasks,
} from "../api/taskApi";
import TaskForm from "./TaskForm";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [form, setForm] = useState({
    keyword: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

 useEffect(() => {
    getTasks()
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  const fetchAllTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const data = await searchTasks({
        keyword: form.keyword,
        startDate: form.startDate,
        endDate: form.endDate,
        priority: form.priority,
      });

      setTasks(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleReset = async () => {
    setForm({
      keyword: "",
      startDate: "",
      endDate: "",
      priority: "",
    });
    setCurrentPage(1);
    await fetchAllTasks();
  };

  const openAddPanel = () => {
    setEditingTask(null);
    setIsOpen(true);
  };

  const openEditPanel = (task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      let updatedTask;

      if (task.completed) {
        updatedTask = await undoTask(task.id);
      } else {
        updatedTask = await finishTask(task.id);
      }

      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Failed to change task status:", error);
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500";
      case "MEDIUM":
        return "bg-yellow-400";
      case "LOW":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  // Pagination
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTasksPerPageChange = (e) => {
    setTasksPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-start p-8 text-gray-900 dark:text-gray-100">
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
          <div className="w-96 bg-white dark:bg-gray-900 h-full p-6 shadow-xl border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingTask ? "Edit Task" : "Add Task"}
            </h2>

            <TaskForm
              task={editingTask}
              onClose={closePanel}
              setTasks={setTasks}
              tasks={tasks}
            />
          </div>
        </div>
      )}

      <div className="min-h-screen w-full max-w-7xl bg-gray-100 dark:bg-gray-950 p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          📋 Task List
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={openAddPanel}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Add
          </button>

          <input
            type="text"
            name="keyword"
            placeholder="Search by title or description..."
            value={form.keyword}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2 min-w-[220px]"
          />

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2"
          />

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2"
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="NONE">None</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Search
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Reset
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Tasks per page:
            </label>
            <select
              value={tasksPerPage}
              onChange={handleTasksPerPageChange}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-3 py-2"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Priority</th>
                  <th className="px-6 py-3 text-left">Due Time</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition"
                  >
                    <td className="px-6 py-4">{task.id}</td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {task.title}
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {task.description}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${getPriorityDot(
                            task.priority
                          )}`}
                        ></span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {task.priority || "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-blue-500 dark:text-blue-400">
                      {task.dueTime
                        ? new Date(task.dueTime).toLocaleString()
                        : "No due date"}
                    </td>

                    <td className="px-6 py-4">
                      {task.completed ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          ✅ Done
                        </span>
                      ) : (
                        <span className="text-red-500 dark:text-red-400 font-semibold">
                          ❌ Pending
                        </span>
                      )}
                    </td>

                    <td className="px-1 py-1">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => openEditPanel(task)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          ❌ Delete
                        </button>

                        <button
                          onClick={() => handleToggleStatus(task)}
                          className={`px-3 py-1 rounded-lg text-sm text-white ${
                            task.completed
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {task.completed ? "↩ Undo" : "✔️ Finish"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {tasks.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No tasks found.
              </div>
            )}
          </div>

          {tasks.length > 0 && (
            <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1} to {Math.min(endIndex, tasks.length)} of{" "}
                {tasks.length} tasks
              </p>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-lg border ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}