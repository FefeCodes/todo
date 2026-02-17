import { Outlet, Link } from "@tanstack/react-router";
import { Suspense } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Skip to content (Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav
          className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"
          aria-label="Main navigation"
        >
          <Link
            to="/todos"
            className="text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            TaskFlow
          </Link>

          <div className="flex gap-4">
            <Link
              to="/todos"
              className="text-sm font-medium hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Todos
            </Link>

            <Link
              to="/test-error"
              className="text-sm font-medium hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
              Test Error
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        className="flex-1 max-w-6xl mx-auto w-full px-4 py-8"
        tabIndex="-1"
      >
        <ErrorBoundary>
          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
