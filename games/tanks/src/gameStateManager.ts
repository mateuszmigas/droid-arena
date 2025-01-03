import { EventEmitter } from "@droid-arena/game-utils";
import { createBullet } from "./entities/bulletEntity";
import { createRobot } from "./entities/robotEntity";
import type { GameEvent } from "./gameEvent";
import { MapGenerator } from "./mapGenerator";
import type { Ecs, Entity, PlayerId, Size, TerrainHeightMap } from "./types";

type GameState = {
  currentPlayer: PlayerId;
  otherPlayer: PlayerId;
  currentPlayerRobot: Entity;
  otherPlayerRobot: Entity;
  size: Size;
  terrainHeightMap: TerrainHeightMap;
};

const size = { width: 800, height: 600 };

export class GameStateManager extends EventEmitter<GameEvent> {
  private gameState: GameState;

  constructor(private ecs: Ecs) {
    super();
    const mapGenerator = new MapGenerator(size.width);

    this.gameState = {
      currentPlayer: 0,
      otherPlayer: 1,
      currentPlayerRobot: 0,
      otherPlayerRobot: 1,
      size,
      terrainHeightMap: mapGenerator.getHeightMap(),
    };

    createRobot(
      this.ecs,
      this.gameState.currentPlayerRobot,
      {
        x: 100,
        y: 500,
      },
      "#ff00ff"
    );
    createRobot(
      this.ecs,
      this.gameState.otherPlayerRobot,
      {
        x: size.width - 100,
        y: 520,
      },
      "#ff0000"
    );
  }

  protected onBeforeHandle(event: GameEvent) {
    const { currentPlayerRobot } = this.gameState;

    switch (event.type) {
      case "player-shot": {
        const position = this.ecs.getComponent(currentPlayerRobot, "position");
        const shoot = this.ecs.getComponent(currentPlayerRobot, "shoot");
        if (position && shoot) {
          createBullet(this.ecs, position, shoot);
        }
        break;
      }
      case "player-aim": {
        const { angle, power } = event;
        const shoot = this.ecs.getComponent(currentPlayerRobot, "shoot");
        if (shoot) {
          shoot.angle = angle;
          shoot.power = power;
        }
        break;
      }
    }
  }

  getGameState(): GameState {
    return this.gameState;
  }
}

