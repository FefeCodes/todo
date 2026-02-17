import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, updateTask, deleteTask } from "../services/todo.service";
import { Link } from "@tanstack/react-router";

export default function TodoPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => getTasks(page),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }) =>
      updateTask(id, { completed: !completed }),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  if (isLoading)
    return <div className="p-10 text-center">Loading tasks...</div>;

  const tasks = data?.data || [];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task?.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      statusFilter === "all"
        ? true
        : statusFilter === "complete"
          ? task.completed
          : !task.completed;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
      </header>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-black outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded-lg bg-white shadow-sm outline-none"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleMutation.mutate(task)}
                className="w-5 h-5 accent-black"
              />
              <Link
                to={`/tasks/${task.id}`}
                className={`text-lg font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
              >
                {task.title}
              </Link>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => deleteMutation.mutate(task.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center items-center gap-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-6 py-2 border rounded-full hover:bg-gray-50 disabled:opacity-30"
        >
          Previous
        </button>
        <span className="font-semibold text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-6 py-2 border rounded-full hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
