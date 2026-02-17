import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./app/router";
import "./index.css";

// Create a client for TanStack Query to manage API state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    // QueryClientProvider allows all components to use useQuery and useMutation hooks
    <QueryClientProvider client={queryClient}>
      {/* RouterProvider handles navigation and rendering based on your defined routes */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
