import type { ArenaServerApp } from "@droid-arena/arena-server/src/index";
import type { LobbyServerApp } from "@droid-arena/lobby-server/src/index";
import { treaty } from "@elysiajs/eden";

export const lobby = treaty<LobbyServerApp>(
  `${window.location.origin}/api-lobby`,
);
export const arena = treaty<ArenaServerApp>(
  `${window.location.origin}/api-arena`,
);
