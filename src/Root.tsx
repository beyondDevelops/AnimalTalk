import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

function Root() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

export default Root;
