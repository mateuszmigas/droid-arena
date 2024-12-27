import { createServer } from "node:http";
import { WebSocketServer } from "npm:ws";

const server = createServer();
// Since we manually created the HTTP server,
// turn on the noServer mode.
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("socket opened");
  ws.on("message", (data /** Buffer */, isBinary /** bool */) => {
    if (isBinary) {
      console.log("socket message:", data);
    } else {
      console.log("socket message:", data.toString());
    }

    ws.send(data.toString() + " from server1");
    ws.send(data.toString() + " from server2");
  });

  ws.on("error", (err) => {
    console.log("socket errored:", err.message);
  });

  ws.on("close", () => console.log("socket closed"));
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

server.listen(8080);

