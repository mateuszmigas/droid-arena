import type { Entity, PlayerId } from "./types";

export type GameEvent =
  | {
      type: "collision";
      entity: Entity;
    }
  | {
      type: "player-shot";
      playerId: PlayerId;
    }
  | {
      type: "player-aim";
      playerId: PlayerId;
      angle: number;
      power: number;
    };
