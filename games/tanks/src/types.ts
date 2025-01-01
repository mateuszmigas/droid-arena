import type { Component } from "./component";
import type { EntityComponentSystem } from "@droid-arena/game-utils";

export type Entity = number;

export type Position = {
  x: number;
  y: number;
};

export type Velocity = {
  vx: number;
  vy: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Color = `#${string}`;

export type PlayerId = number;

export type CanvasContext = CanvasRenderingContext2D;

export type TerrainHeightMap = number[];

export type Ecs = EntityComponentSystem<Component>;
