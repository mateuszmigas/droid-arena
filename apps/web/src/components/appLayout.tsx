import { Outlet } from "react-router";
import { AppHeader } from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark flex flex-col h-screen w-screen bg-background text-foreground">
        <AppHeader />
        <main className="flex-grow bg-black">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
};

