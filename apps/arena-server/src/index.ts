import { Elysia } from "elysia";

const app = new Elysia()
  .ws("/ping", {
    message(ws, message) {
      ws.send(`Elysia says: ${message}`);
    },
  })
  .listen(3002);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

