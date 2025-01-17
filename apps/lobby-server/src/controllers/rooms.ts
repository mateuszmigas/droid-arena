import Elysia from "elysia";
import { redis } from "../plugins";

export const roomsController = new Elysia()
  .use(redis)
  .get("/rooms", async ({ redis, error }) => {
    // return error(502, "Bad Gateway");
    const value = await redis.get("room_requests");
    await redis.set(
      "room_requests",
      (value ? Number(value) + 1 : 1).toString()
    );
    return value;
  });

