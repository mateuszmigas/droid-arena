import { Outlet } from "react-router";
import { AppHeader } from ".";

export const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen text-white">
      <AppHeader />
      <main className="flex-grow bg-black">
        <Outlet />
      </main>
    </div>
  );
};

