import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "../pages/Layout";
import TodoPage from "../pages/TodoPage";
import TodoDetailsPage from "../pages/TodoDetailsPage";
import NotFound from "../pages/NotFound";

// Define the root of the application with the persistent Layout
const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});

// Main Task List Route
const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "tasks",
  component: TodoPage,
});

// Individual Task Detail Route (Nested)
const taskDetailsRoute = createRoute({
  getParentRoute: () => tasksRoute,
  path: "$id",
  component: TodoDetailsPage,
});

// Create the tree and the router instance
const routeTree = rootRoute.addChildren([
  tasksRoute.addChildren([taskDetailsRoute]),
]);

export const router = createRouter({ routeTree });
