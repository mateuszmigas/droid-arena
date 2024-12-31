import { Elysia } from "elysia";

const app = new Elysia()
  .get("/rooms", () => "Hello Lobby Server")
  .get("/users", () => [
    { id: 1, name: "user1" },
    { id: 2, name: "user2" },
  ])
  .listen(3001);

export type LobbyServerApp = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
