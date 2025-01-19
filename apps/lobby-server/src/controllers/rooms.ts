import { Elysia } from "elysia";
import { logger, redis } from "../plugins";

export const roomsController = new Elysia()
  .use(redis)
  .use(logger)
  .get("/rooms", async ({ redis, log }) => {
    const value = await redis.get("room_requests");
    const newValue = value ? Number(value) + 1 : 1;
    await redis.set("room_requests", newValue.toString());
    log.info(`Room requests count updated from ${value || 0} to ${newValue}`, {
      method: "GET",
      path: "/rooms",
    });
    return value;
  });
