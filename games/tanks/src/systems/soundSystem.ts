import type { GameStateManager } from "../gameStateManager";
import type { ISystem } from "./system";

const soundFiles = {
  shot: "bounce2.mp3",
} as const;

const loadSoundFiles = async (audioContext: AudioContext) => {
  const soundBuffers = new Map<SoundEffect, AudioBuffer>();
  for (const [name, file] of Object.entries(soundFiles)) {
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    soundBuffers.set(name as SoundEffect, audioBuffer);
  }
  return soundBuffers;
};

type SoundEffect = keyof typeof soundFiles;

export class SoundSystem implements ISystem {
  private audioContext: AudioContext | null = null;
  private soundBuffers = new Map<SoundEffect, AudioBuffer>();
  private initialized = false;

  constructor(private gameStateManager: GameStateManager) {
    this.gameStateManager.on("player-shot", () => {
      this.playSound("shot");
    });
  }

  public async initialize() {
    if (this.initialized) return;

    this.audioContext = new AudioContext({ latencyHint: "interactive" });
    this.soundBuffers = await loadSoundFiles(this.audioContext!);
    this.initialized = true;
  }

  private playSound(soundEffect: SoundEffect) {
    if (!this.audioContext) return;

    const buffer = this.soundBuffers.get(soundEffect);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }

  update() {}

  dispose() {
    this.audioContext = null;
    this.soundBuffers.clear();
  }
}
