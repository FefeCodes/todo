import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">The page you’re looking for does not exist.</p>
      <Link
        to="/todos"
        className="text-blue-600 font-medium focus:ring-2 focus:ring-blue-500 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
}
