import type { GameStateManager } from "../gameStateManager";
import type { Ecs, PlayerId } from "../types";
import type { ISystem } from "./system";

export class InputSystem implements ISystem {
  constructor(
    private playerId: PlayerId,
    private ecs: Ecs,
    private gameStateManager: GameStateManager
  ) {
    window.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === " ") {
      this.gameStateManager.emit({
        type: "player-shot",
        playerId: this.playerId,
      });
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const shoot = this.ecs.getComponent(
        this.gameStateManager.getGameState().currentPlayerRobot,
        "shoot"
      );
      if (!shoot) return;

      const step = 1;
      this.gameStateManager.emit({
        type: "player-aim",
        playerId: this.playerId,
        power: shoot.power,
        angle: Math.min(
          Math.max(shoot.angle + (event.key === "ArrowLeft" ? step : -step), 0),
          180
        ),
      });
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const shoot = this.ecs.getComponent(
        this.gameStateManager.getGameState().currentPlayerRobot,
        "shoot"
      );
      if (!shoot) return;

      const step = 0.05;
      this.gameStateManager.emit({
        type: "player-aim",
        playerId: this.playerId,
        angle: shoot.angle,
        power: Math.min(
          Math.max(
            shoot.power + (event.key === "ArrowUp" ? step : -step),
            step
          ),
          1
        ),
      });
    }
  }

  update() {}

  dispose() {
    window.removeEventListener("keydown", this.handleKeydown);
  }
}
