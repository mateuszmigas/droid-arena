import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (data: Buffer) => {
    const message = JSON.parse(data.toString());
    ws.send(
      JSON.stringify({
        content: message.content + " from server",
      })
    );
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

