import { add } from "@droid-arena/utils";
import { useEffect, useState } from "react";
import { environment } from "./env";

export const App = () => {
  const [apiResponse, setApiResponse] = useState("");
  const [wsResponse, setWsResponse] = useState("");
  useEffect(() => {
    const ws = new WebSocket(environment.ARENA_URL);
    ws.onmessage = (event) => {
      setWsResponse(event.data);
    };
    ws.onopen = () => {
      ws.send("Hello from the client!");
    };
  }, []);

  useEffect(() => {
    const run = async () => {
      const response = await fetch(environment.LOBBY_URL);
      setApiResponse(await response.text());
    };
    run();
  }, []);
  return (
    <div className="bg-red-500">
      <div>{apiResponse}</div>
      <div>{wsResponse}</div>
    </div>
  );
};
