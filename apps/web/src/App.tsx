import { add } from "@droid-arena/utils";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002/ping");
    ws.onmessage = (event) => {
      console.log(event.data);
    };
    ws.onopen = () => {
      ws.send("Hello from the client!");
    };
  }, []);
  return <div className="bg-red-500">Hello World {add(1, 3)}</div>;
};
