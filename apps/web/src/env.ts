const env = (import.meta as unknown as { env: Record<string, string> }).env;

export const environment = {
  LOBBY_URL: env.VITE_LOBBY_URL,
  ARENA_URL: env.VITE_ARENA_URL,
};

