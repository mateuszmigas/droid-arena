import type { Ecs, Color, Position, PlayerId } from "../types";

export const createRobot = (
  ecs: Ecs,
  playerId: PlayerId,
  position: Position,
  color: Color
) => {
  const robot = ecs.createEntity();
  ecs.addComponent(robot, { type: "owned-by", player: playerId });
  ecs.addComponent(robot, { type: "position", ...position });
  ecs.addComponent(robot, { type: "renderable", kind: "robot", color });
  if (playerId === 0) {
    ecs.addComponent(robot, {
      type: "shoot",
      angle: 45,
      power: 0.5,
      maxPower: 100,
    });
  }
  return robot;
};
