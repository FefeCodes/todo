import { Link, Outlet } from "@tanstack/react-router";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b p-4 mb-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/tasks" className="text-xl font-bold text-black">
            TodoApp
          </Link>
          <div className="space-x-4">
            <Link to="/tasks" className="text-gray-600 hover:text-black">
              Tasks
            </Link>
          </div>
        </div>
      </nav>

      <main id="main-content">
        <Outlet />
      </main>
    </div>
  );
}
