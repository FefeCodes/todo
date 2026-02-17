import { useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/todo.service";

export default function TodoDetailsPage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTasks(id),
  });

  if (isLoading) return <p>Loading...</p>;

  const todo = data?.data;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{todo.title}</h1>
      <p>Status: {todo.completed ? "Completed" : "Pending"}</p>

      <Link to="/tasks" className="text-blue-500">
        Back
      </Link>
    </div>
  );
}
