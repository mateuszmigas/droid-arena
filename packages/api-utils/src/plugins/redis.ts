import { Elysia } from "elysia";
import { createClient, type RedisClientOptions } from "@redis/client";

export const redisPlugin = async (options?: RedisClientOptions) => {
  const redis = await createClient(options);
  await redis.connect();

  return new Elysia()
    .decorate("redis", redis)
    .on("stop", () => redis.disconnect());
};

