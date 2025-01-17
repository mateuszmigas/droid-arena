import { shutdownPlugin } from "@droid-arena/api-utils";
import { Elysia, t } from "elysia";
import { roomsController } from "./controllers/rooms";

const app = new Elysia().use(shutdownPlugin).use(roomsController).listen(3001);

export type LobbyServerApp = typeof app;

console.log(
  `🤖 Lobby server is running at ${app.server?.hostname}:${app.server?.port}`,
);
