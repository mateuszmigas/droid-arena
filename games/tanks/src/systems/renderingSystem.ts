import type { ISystem } from "./system";
import { toRadians } from "@droid-arena/game-utils";
import type { GameStateManager } from "../gameStateManager";
import type { Ecs } from "../types";

export class RenderingSystem implements ISystem {
  private ctx: CanvasRenderingContext2D;
  private terrainCtx: OffscreenCanvasRenderingContext2D;
  private lastHeightMap: number[] | null = null;

  constructor(
    private hostElement: HTMLDivElement,
    private ecs: Ecs,
    private gameStateManager: GameStateManager
  ) {
    const { size } = this.gameStateManager.getGameState();
    const terrainCanvas = new OffscreenCanvas(size.width, size.height);
    const canvas = this.createCanvas();
    this.hostElement.appendChild(canvas);
    this.ctx = canvas.getContext("2d")!;
    this.ctx.translate(0, canvas.height);
    this.ctx.scale(1, -1);
    this.terrainCtx = terrainCanvas.getContext("2d")!;
    this.terrainCtx.translate(0, terrainCanvas.height);
    this.terrainCtx.scale(1, -1);
  }

  private createCanvas() {
    const { size } = this.gameStateManager.getGameState();
    const canvas = document.createElement("canvas");
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
    canvas.className = "border";
    return canvas;
  }

  private renderTerrainToCache() {
    const { size, terrainHeightMap } = this.gameStateManager.getGameState();
    const { width, height } = size;

    if (
      this.lastHeightMap &&
      this.arraysEqual(terrainHeightMap, this.lastHeightMap)
    ) {
      return;
    }

    this.terrainCtx.clearRect(0, 0, width, height);
    this.terrainCtx.beginPath();
    this.terrainCtx.moveTo(0, height);

    terrainHeightMap.forEach((terrainHeight, x) => {
      this.terrainCtx.lineTo(x, height - terrainHeight);
    });

    this.terrainCtx.lineTo(width, height);
    this.terrainCtx.closePath();

    this.terrainCtx.fillStyle = "#3a5a40";
    this.terrainCtx.fill();

    this.lastHeightMap = [...terrainHeightMap];
  }

  update(): void {
    const { size, terrainHeightMap } = this.gameStateManager.getGameState();
    const { width, height } = size;
    this.ctx.clearRect(0, 0, width, height);

    // Check if terrain needs to be redrawn
    if (
      !this.lastHeightMap ||
      !this.arraysEqual(terrainHeightMap, this.lastHeightMap)
    ) {
      this.renderTerrainToCache();
    }

    // Draw the cached terrain
    this.ctx.drawImage(this.terrainCtx.canvas, 0, 0);

    const positions = this.ecs.getComponents("position");
    const renderables = this.ecs.getComponents("renderable");

    for (const [entity, renderable] of renderables) {
      const pos = positions.get(entity);
      if (!pos) {
        continue;
      }
      if (renderable.kind === "robot") {
        this.ctx.fillStyle = renderable.color;
        this.ctx.save();
        this.ctx.translate(pos.x, pos.y);

        // Draw robot body (half rectangle)
        this.ctx.fillRect(-15, -10, 30, 20);

        // Draw gun
        const shoot = this.ecs.getComponent(entity, "shoot");
        if (shoot) {
          this.ctx.fillStyle = "gray";
          this.ctx.translate(0, 10);
          this.ctx.rotate(toRadians(shoot.angle) + Math.PI / 2);
          this.ctx.fillRect(-2.5, -30, 5, 30);
          this.ctx.fillStyle = renderable.color;
          this.ctx.fillRect(-2.5, -30, 5, 30 * shoot.power);
        }
        this.ctx.restore();
      } else if (renderable.kind === "bullet") {
        this.ctx.fillStyle = renderable.color;
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  dispose() {}

  private arraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((val, index) => val === b[index]);
  }
}
