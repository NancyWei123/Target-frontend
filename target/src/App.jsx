import { useState } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TaskPage from "./components/TaskPage";
import UserPage from "./components/UserPage";
import SettingsPage from "./components/Settings";
import StatisticPage from "./components/StatisticPage";
import SignupPage from "./components/SignUpPage";
function Sidebar() {
  const location = useLocation();

  const menuClass = (path) =>
    `block px-4 py-3 rounded-xl transition ${
      location.pathname === path
        ? "bg-blue-600 text-white dark:bg-blue-500"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <aside className="w-48 min-h-screen bg-white border-r flex flex-col shrink-0 dark:bg-gray-900 dark:border-gray-700">
      <div className="p-6 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Target
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/index" className={menuClass("/index")}>
          Tasks
        </Link>

        <Link to="/statistics" className={menuClass("/statistics")}>
          Statistics
        </Link>

        <Link to="/user" className={menuClass("/user")}>
          User Profile
        </Link>

        <Link to="/settings" className={menuClass("/settings")}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}
function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-2">
        <div className="bg-white rounded-xl shadow-sm p-4 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}



function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/index" replace />} />
      <Route path="/register" element={<SignupPage />} />

      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/index" replace />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/index"
        element={
          token ? (
            <MainLayout>
              <TaskPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/statistics"
        element={
          token ? (
            <MainLayout>
              <StatisticPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/settings"
        element={
          token ? (
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/user"
        element={
          token ? (
            <MainLayout>
              <UserPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;