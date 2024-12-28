import { treaty } from "@elysiajs/eden";
import { environment } from "./env";
import type { LobbyServerApp } from "@droid-arena/lobby-server/src/index";
import type { ArenaServerApp } from "@droid-arena/arena-server/src/index";

export const lobby = treaty<LobbyServerApp>(environment.LOBBY_URL);
export const arena = treaty<ArenaServerApp>(environment.ARENA_URL);

