import { useEffect, useState } from "react";
import { lobby, arena } from "./api";

export const App = () => {
  const [apiResponse, setApiResponse] = useState("");
  const [wsResponse, setWsResponse] = useState("");
  useEffect(() => {
    const ws = arena.session.subscribe();
    ws.on("message", (event) => {
      setWsResponse(event.data);
    });
    ws.on("open", () => {
      ws.send("Hello from the client!");
    });
  }, []);

  useEffect(() => {
    const run = async () => {
      const response = await lobby.rooms.get();
      if (response.data) {
        setApiResponse(response.data);
      }
    };
    run();
  }, []);
  return (
    <div className="bg-red-500">
      <div>Hello 2!</div>
      <div>{apiResponse}</div>
      <div>{wsResponse}</div>
    </div>
  );
};
