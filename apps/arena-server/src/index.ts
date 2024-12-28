import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Arena Server").listen(3002);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

