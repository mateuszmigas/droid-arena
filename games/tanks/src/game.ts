import type { ISystem } from "./systems/system";
import { PhysicsSystem } from "./systems/physicsSystem";
import { RenderingSystem } from "./systems/renderingSystem";
import { InputSystem } from "./systems/inputSystem";
import { SoundSystem } from "./systems/soundSystem";
import { GameStateManager } from "./gameStateManager";
import { EntityComponentSystem } from "@droid-arena/game-utils";
import type { Component } from "./component";
import { PerformanceSystem } from "./systems/performanceSystem";
import type { Game } from "@droid-arena/game-utils";

type GameOptions = {
  enableSound: boolean;
  debug: boolean;
};

export class TanksGame implements Game {
  private ecs = new EntityComponentSystem<Component>();
  private systems: ISystem[] = [];

  constructor(
    private hostElement: HTMLDivElement,
    private options: GameOptions
  ) {
    const gameStateManager = new GameStateManager(this.ecs);

    //todo synchronize game state manager with server

    const systems: ISystem[] = [
      new PhysicsSystem(this.ecs, gameStateManager),
      new RenderingSystem(this.hostElement, this.ecs, gameStateManager),
      new InputSystem(
        gameStateManager.getGameState().currentPlayerRobot,
        this.ecs,
        gameStateManager
      ),
    ];

    if (this.options.enableSound) {
      systems.push(new SoundSystem(gameStateManager));
    }
    if (this.options.debug) {
      systems.push(new PerformanceSystem(this.hostElement));
    }

    this.systems.push(...systems);
  }

  initialize() {
    for (const system of this.systems) {
      system.initialize?.();
    }
  }

  runGameLoop() {
    let lastTime = performance.now();

    const runGameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      this.update(deltaTime);
      requestAnimationFrame(runGameLoop);
    };

    runGameLoop(0);
  }

  update(delta: number) {
    for (const system of this.systems) {
      system.update?.(delta);
    }
  }

  dispose() {
    for (const system of this.systems) {
      system.dispose?.();
    }
    this.hostElement.innerHTML = "";
  }
}
