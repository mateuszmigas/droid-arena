import { Elysia } from "elysia";
import { redisPlugin } from "@droid-arena/api-utils";
const app = new Elysia()
  .use(redisPlugin({ url: process.env.REDIS_URL || "redis://localhost:6379" }))
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

const shutdownPlugin = () =>
  new Elysia().on("start", ({ app }) => {
    const shutdown = async () => {
      console.log("SIGINT or SIGTERM received, shutting down...");
      await app.stop();
      process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  });

app.use(shutdownPlugin());

