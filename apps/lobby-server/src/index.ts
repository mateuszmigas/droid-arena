import { Elysia } from "elysia";
import { createRedisPlugin } from "./redisPlugin";

const app = new Elysia()
  .use(createRedisPlugin())
  .get("/rooms", async ({ redis }) => {
    const value = await redis.get("room_requests");
    await redis.set(
      "room_requests",
      (value ? Number(value) + 1 : 1).toString()
    );
    return value;
  })
  .listen(3001);

export type LobbyServerApp = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
