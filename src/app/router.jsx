import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import Layout from "../pages/Layout";
import TodoPage from "../pages/TodoPage";
import TodoDetailsPage from "../pages/TodoDetailsPage";
import NotFound from "../pages/NotFound";

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/tasks" });
  },
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "tasks",
  component: TodoPage,
});

const taskDetailsRoute = createRoute({
  getParentRoute: () => tasksRoute,
  path: "$id",
  component: TodoDetailsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  tasksRoute.addChildren([taskDetailsRoute]),
]);

export const router = createRouter({ routeTree });
