import { Elysia, t } from "elysia";

const app = new Elysia()
  .ws("/session", {
    body: t.String(),
    response: t.String(),
    message(ws, message) {
      ws.send(`Elysia says: ${message}`);
    },
  })
  .listen(3002);

export type ArenaServerApp = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
