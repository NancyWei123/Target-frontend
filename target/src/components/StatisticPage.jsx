import React, { useEffect, useMemo, useState } from "react";
import { getTasks } from "../api/taskApi";

export default function StatisticPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const stats = useMemo(() => {
    const now = new Date();

    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    const high = tasks.filter((task) => task.priority === "HIGH").length;
    const medium = tasks.filter((task) => task.priority === "MEDIUM").length;
    const low = tasks.filter((task) => task.priority === "LOW").length;

    const overdue = tasks.filter(
      (task) => !task.completed && task.dueTime && new Date(task.dueTime) < now
    ).length;

    const upcoming = tasks.filter((task) => {
      if (!task.dueTime || task.completed) return false;
      const due = new Date(task.dueTime);
      const diff = due - now;
      const days = diff / (1000 * 60 * 60 * 24);
      return days >= 0 && days <= 7;
    }).length;

    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pending,
      high,
      medium,
      low,
      overdue,
      upcoming,
      completionRate,
    };
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Statistics</h1>
        <p className="text-gray-500 mt-2">
          Overview of your task progress and priorities
        </p>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tasks" value={stats.total} />
        <StatCard title="Completed" value={stats.completed} />
        <StatCard title="Pending" value={stats.pending} />
        <StatCard title="Completion Rate" value={`${stats.completionRate}%`} />
      </div>

      {/* Middle section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Priority breakdown */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Priority Breakdown
          </h2>

          <div className="space-y-4">
            <ProgressRow
              label="High"
              value={stats.high}
              total={stats.total}
              barClass="bg-red-500"
            />
            <ProgressRow
              label="Medium"
              value={stats.medium}
              total={stats.total}
              barClass="bg-yellow-500"
            />
            <ProgressRow
              label="Low"
              value={stats.low}
              total={stats.total}
              barClass="bg-green-500"
            />
          </div>
        </div>

        {/* Deadline insights */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Deadline Insights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoBox
              title="Overdue Tasks"
              value={stats.overdue}
              valueClass="text-red-600"
            />
            <InfoBox
              title="Due in 7 Days"
              value={stats.upcoming}
              valueClass="text-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Task status overview */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Task Status Overview
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="bg-green-500 h-6 text-xs text-white flex items-center justify-center"
            style={{ width: `${stats.completionRate}%` }}
          >
            {stats.completionRate > 8 ? `${stats.completionRate}%` : ""}
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-3">
          <span>Completed: {stats.completed}</span>
          <span>Pending: {stats.pending}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
    </div>
  );
}

function InfoBox({ title, value, valueClass = "text-gray-800" }) {
  return (
    <div className="border rounded-2xl p-5 bg-gray-50">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-2xl font-bold mt-2 ${valueClass}`}>{value}</h3>
    </div>
  );
}

function ProgressRow({ label, value, total, barClass }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex justify-between mb-1 text-sm text-gray-600">
        <span>{label}</span>
        <span>
          {value} ({percent}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${barClass} h-3`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}