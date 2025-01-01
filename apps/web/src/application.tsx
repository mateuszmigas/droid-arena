import { useEffect } from "react";
import { lobby, arena } from "./api";
import { GameSession } from "./pages/gameSession";

export const App = () => {
  // test ws
  useEffect(() => {
    const ws = arena.session.subscribe();
    ws.on("message", (event) => {
      console.log(event.data);
    });
    ws.on("open", () => {
      ws.send("Hello from the client!");
    });
  }, []);

  // test api
  useEffect(() => {
    const run = async () => {
      const response = await lobby.rooms.get();
      if (response.data) {
        console.log(response.data);
      }
    };
    run();
  }, []);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <GameSession sessionId="123" />
    </div>
  );
};
