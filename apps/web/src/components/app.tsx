import { Outlet } from "react-router";
import { AppHeader } from ".";

export const App = () => {
  return (
    <div className="dark flex flex-col h-screen w-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow bg-black">
        <Outlet />
      </main>
    </div>
  );
};

