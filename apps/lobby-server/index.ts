Bun.serve({
  fetch(req) {
    return new Response("Bun Lobby Server!");
  },
  port: 3001,
});

