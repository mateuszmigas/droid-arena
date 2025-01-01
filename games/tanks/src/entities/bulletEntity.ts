import { toRadians } from "@droid-arena/game-utils";
import type { GetComponent } from "../component";
import type { Ecs } from "../types";

export const createBullet = (
  ecs: Ecs,
  position: GetComponent<"position">,
  shot: GetComponent<"shoot">
) => {
  const bullet = ecs.createEntity();
  ecs.addComponent(bullet, {
    type: "position",
    x: position.x,
    y: position.y + 10,
  });
  ecs.addComponent(bullet, {
    type: "velocity",
    vx: Math.cos(toRadians(shot.angle)) * shot.power,
    vy: Math.sin(toRadians(shot.angle)) * shot.power,
  });
  ecs.addComponent(bullet, {
    type: "renderable",
    kind: "bullet",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  });
  return bullet;
};
