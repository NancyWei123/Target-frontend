import { useEffect, useState } from "react";
import { getTasks,deleteTask,updateTask } from "./api/taskApi";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleComplete = async (task) => {
    const updated = {
      ...task,
      completed: true, // ✅ mark as done
    };
    const res = await updateTask(task.id, updated);
    // update UI
    setTasks(tasks.map((t) => (t.id === task.id ? res : t)));
  };
  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        {isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end">
    
    <div className="w-96 bg-white h-full p-6 shadow-xl">
      
      <h2 className="text-xl font-bold mb-4">
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
        <div className="min-h-screen bg-gray-100 p-6">
  
          <h1 className="text-4xl font-bold text-center mb-8">
            📋 Task List
          </h1>
          <button
            onClick={openAddPanel}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Add
          </button>

          <div className="w-full bg-white shadow-xl rounded-2xl p-6">
            
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                
                {/* Header */}
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Due Time</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">{task.id}</td>
                      <td className="px-6 py-4 font-semibold">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {task.description}
                      </td>
                      <td className="px-6 py-4 text-blue-500">
                        {new Date(task.dueTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {task.completed ? (
                          <span className="text-green-600 font-semibold">
                            ✅ Done
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            ❌ Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEditPanel(task)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          ✏️ Edit
                        </button>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          ❌ Delete
                        </button>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                       <button
                          onClick={() => handleComplete(task)}
                          disabled={task.completed}
                          className={`px-3 py-1 rounded-lg text-sm text-white ${
                            task.completed
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          ✔️ Finish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default App;