import { treaty } from "@elysiajs/eden";
import type { LobbyServerApp } from "@droid-arena/lobby-server/src/index";
import type { ArenaServerApp } from "@droid-arena/arena-server/src/index";

export const lobby = treaty<LobbyServerApp>(
  `${window.location.origin}/api-lobby`
);
export const arena = treaty<ArenaServerApp>(
  `${window.location.origin}/api-arena`
);

