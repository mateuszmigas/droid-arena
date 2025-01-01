export interface Game {
  initialize(): void;
  runGameLoop(): void;
  update(delta: number): void;
  dispose(): void;
}

