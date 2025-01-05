import { Elysia, t } from "elysia";
import { shutdownPlugin } from "@droid-arena/api-utils";
const app = new Elysia()
  .use(shutdownPlugin())
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

