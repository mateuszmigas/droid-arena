import type { ISystem } from "./system";

export class PerformanceSystem implements ISystem {
  private fpsRef: HTMLDivElement;
  private elapsedTime = 0;
  constructor(hostElement: HTMLDivElement) {
    this.fpsRef = document.createElement("div");
    this.fpsRef.style.position = "absolute";
    this.fpsRef.style.top = "0";
    this.fpsRef.style.left = "0";
    this.fpsRef.style.color = "white";
    hostElement.appendChild(this.fpsRef);
  }
  update(delta: number) {
    this.elapsedTime += delta;
    if (this.elapsedTime >= 500) {
      this.fpsRef.textContent = `FPS: ${(1000 / delta).toFixed(2)}`;
      this.elapsedTime = 0;
    }
  }
}

