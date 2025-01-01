export interface ISystem {
  initialize?(): void;
  update?(delta: number): void;
  dispose?(): void;
}
