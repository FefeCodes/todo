import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/todo.service";
import { Link } from "@tanstack/react-router";

export default function TodosPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos", page],
    queryFn: () => getTodos(page),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  let todos = data?.data || [];

  // Search
  todos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Filter
  if (filter === "complete") {
    todos = todos.filter((todo) => todo.completed);
  }

  if (filter === "incomplete") {
    todos = todos.filter((todo) => !todo.completed);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <input
        type="text"
        placeholder="Search todos..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mb-4 space-x-2">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="border p-4 rounded">
            <h2 className="font-semibold">{todo.title}</h2>
            <p>{todo.completed ? "Completed" : "Pending"}</p>

            <Link
              to="/todos/$id"
              params={{ id: todo.id }}
              className="text-blue-500"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
