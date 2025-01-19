import { createLoggerPlugin, createRedisPlugin } from "@droid-arena/api-utils";

export const redis = await createRedisPlugin({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export const logger = await createLoggerPlugin({ app: "lobby-server" });
