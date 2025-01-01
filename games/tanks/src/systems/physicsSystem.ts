import planck from "planck";
import type { ISystem } from "./system";
import type { Ecs, Entity, Position, Velocity } from "../types";
import { Vec2 } from "planck";
import type { GameStateManager } from "../gameStateManager";

const shape = new planck.Circle(10);

planck.Settings.lengthUnitsPerMeter = 100;

export class PhysicsSystem implements ISystem {
  private world = new planck.World({
    gravity: new planck.Vec2(0, -0.001),
  });
  private entityBodies = new Map<Entity, planck.Body>();

  constructor(private ecs: Ecs, private gameStateManager: GameStateManager) {
    const ground = this.world.createBody({ type: "static" });

    const wallFD = {
      friction: 0.3,
      // restitution: 0.8,
      // userData: "rail",
    };

    const size = this.gameStateManager.getGameState().size;

    //right
    ground.createFixture(
      planck.Edge(
        planck.Vec2(size.width, 0),
        planck.Vec2(size.width, size.height)
      ),
      wallFD
    );

    //bottom
    ground.createFixture(
      planck.Edge(planck.Vec2(-size.width, 0), planck.Vec2(size.width, 0)),
      wallFD
    );

    //left
    ground.createFixture(
      planck.Edge(planck.Vec2(0, 0), planck.Vec2(0, size.height)),
      wallFD
    );

    //top
    ground.createFixture(
      planck.Edge(
        planck.Vec2(0, size.height),
        planck.Vec2(size.width, size.height)
      ),
      wallFD
    );

    const terrainVectors = this.gameStateManager
      .getGameState()
      .terrainHeightMap.map((height, x) => new planck.Vec2(x, height));
    ground.createFixture(planck.Chain(terrainVectors), wallFD);
  }

  private addIfNeeded(e: Entity, position: Position, velocity: Velocity) {
    if (!this.entityBodies.has(e)) {
      const body = this.world.createDynamicBody({
        linearDamping: 0,
        position: new Vec2(position.x, position.y),
        linearVelocity: new Vec2(velocity.vx, velocity.vy),
      });
      body.createFixture({ shape });
      body.setSleepingAllowed(false);
      this.entityBodies.set(e, body);
    }
  }

  update(delta: number): void {
    const positions = this.ecs.getComponents("position");
    const velocities = this.ecs.getComponents("velocity");

    for (const [e, pos] of positions) {
      const vel = velocities.get(e);
      this.addIfNeeded(e, pos, vel ?? { vx: 0, vy: 0 });
    }

    this.world?.step(delta);

    for (const [e, body] of this.entityBodies) {
      const pos = positions.get(e);
      if (pos) {
        pos.x = body.getPosition().x;
        pos.y = body.getPosition().y;
      }
      const vel = velocities.get(e);
      if (vel) {
        vel.vx = body.getLinearVelocity().x;
        vel.vy = body.getLinearVelocity().y;
      }
    }
  }

  dispose() {
    this.entityBodies.clear();
  }
}
