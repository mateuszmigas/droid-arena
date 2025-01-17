import { Elysia } from "elysia";

export const shutdownPlugin = new Elysia().on("start", ({ app }) => {
  const shutdown = async () => {
    console.log("SIGINT or SIGTERM received, shutting down...");
    await app.stop();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
});

