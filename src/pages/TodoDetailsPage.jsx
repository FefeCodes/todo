// src/pages/TodoDetailsPage.jsx
import { useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getTask } from "../services/todo.service";

export default function TodoDetailsPage() {
  const { id } = useParams({ from: "/tasks/$id" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
  });

  if (isLoading)
    return <div className="p-20 text-center">Fetching details...</div>;
  if (isError)
    return <div className="p-20 text-center text-red-500">Task not found.</div>;

  const task = data?.data;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <Link
        to="/tasks"
        className="text-sm font-semibold text-gray-500 hover:text-black mb-6 block"
      >
        ← BACK TO LIST
      </Link>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        {task.title}
      </h1>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 font-medium">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold ${task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
          >
            {task.completed ? "COMPLETED" : "IN PROGRESS"}
          </span>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">Metadata</h3>
          <p className="text-sm text-gray-400">UUID: {task.id}</p>
        </div>
      </div>
    </div>
  );
}
