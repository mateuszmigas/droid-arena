Bun.serve({
  fetch(req) {
    return new Response("Bun Arena Server!");
  },
  port: 3002,
});

