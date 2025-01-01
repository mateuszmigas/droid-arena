import type { Color, PlayerId } from "./types";

export type Component =
  | {
      type: "position";
      x: number;
      y: number;
    }
  | {
      type: "velocity";
      vx: number;
      vy: number;
    }
  | {
      type: "owned-by";
      player: PlayerId;
    }
  | {
      type: "renderable";
      kind: "robot" | "bullet";
      color: Color;
    }
  | {
      type: "shoot";
      angle: number;
      power: number;
      maxPower: number;
    };

export type ComponentType = Component["type"];

export type GetComponent<T extends ComponentType> = Omit<
  Extract<Component, { type: T }>,
  "type"
>;
