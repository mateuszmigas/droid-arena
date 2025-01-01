import type { TerrainHeightMap } from "./types";

export class MapGenerator {
  private heightMap: number[] = [];

  constructor(private width: number) {
    this.generateTerrain();
  }

  private generateTerrain() {
    this.heightMap = new Array(this.width).fill(0);
    const getRandomHeight = () => Math.random() * 200 + 50;
    this.heightMap[0] = getRandomHeight();
    this.heightMap[this.width - 1] = getRandomHeight();
    this.subdivide(0, this.width - 1, 100);
  }

  private subdivide(start: number, end: number, roughness: number) {
    const segment = end - start;
    if (segment <= 1) return;

    const mid = Math.floor((start + end) / 2);
    const midHeight = (this.heightMap[start] + this.heightMap[end]) / 2;
    this.heightMap[mid] =
      midHeight + (Math.random() * roughness * 2 - roughness);

    const newRoughness = roughness / 2;
    this.subdivide(start, mid, newRoughness);
    this.subdivide(mid, end, newRoughness);
  }

  getHeightMap(): TerrainHeightMap {
    return this.heightMap;
  }
}
