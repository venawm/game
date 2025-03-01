export class FrameIndexPattern {
  constructor(animationConfig) {
    this.currentTime = 0;

    this.animationConfig = animationConfig;
    this.duration = animationConfig.duration ?? 500;
  }

  get frame() {
    const { frames } = this.animationConfig;
    // Calculate which frame to show based on currentTime
    const progress = this.currentTime / this.duration;
    const frameIndex = Math.floor(progress * frames.length);
    return frames[frameIndex].frame;
  }
  step(delta) {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
