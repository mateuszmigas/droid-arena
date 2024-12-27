import { createServer } from "http";
import { Buffer } from "buffer";
import { WebSocketServer } from "ws";
import { add } from "@droid-arena/utils";

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data: Buffer) => {
    ws.send(data.toString() + " from server" + add(1, 2));
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

server.listen(8080);

