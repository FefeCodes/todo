import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import Layout from "./pages/Layout";
import TodosPage from "./pages/TodosPage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import NotFound from "./pages/NotFound";
import TestError from "./pages/TestError";

const rootRoute = createRootRoute({
  component: Layout,
});

const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todos",
  component: TodosPage,
});

const todoDetailsRoute = createRoute({
  getParentRoute: () => todosRoute,
  path: "$id",
  component: TodoDetailsPage,
});

const testErrorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/test-error",
  component: TestError,
});

const routeTree = rootRoute.addChildren([
  todosRoute.addChildren([todoDetailsRoute]),
  testErrorRoute,
]);

export const router = createRouter({ routeTree });
