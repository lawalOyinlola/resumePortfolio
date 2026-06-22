class SoundManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  /** Warm the cache so the first play is instant (no load race). */
  preload(url: string) {
    if (typeof window === "undefined") return;
    if (!this.audioCache.has(url)) {
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.load();
      this.audioCache.set(url, audio);
    }
  }

  playAudio(url: string) {
    if (typeof window === "undefined") return;

    let base = this.audioCache.get(url);
    if (!base) {
      base = new Audio(url);
      base.preload = "auto";
      this.audioCache.set(url, base);
    }

    // Play a fresh clone each time so rapid presses overlap and a stuck/errored
    // element never blocks playback.
    const node = base.cloneNode(true) as HTMLAudioElement;
    node.volume = base.volume;
    node.play().catch((err) => {
      console.warn(`Audio play failed for ${url}:`, err);
    });
  }

  playClick() {
    this.playAudio("/audio/click.wav");
  }

  /** Tactile "keyboard press" used by the brand mark (distinct from the click). */
  playKeyPress() {
    this.playAudio("/audio/keyboard-press.mp3");
  }
}

const soundManager = new SoundManager();

export default soundManager;
