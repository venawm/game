export class GameLoop {
  constructor(update, render) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 144; // Fixed typo

    this.update = update;
    this.render = render;

    this.rafId = null;
    this.running = false;
  }

  mainLoop = (timeStamp) => {
    if (!this.running) return; // Fixed typo

    let deltaTime = timeStamp - this.lastFrameTime;
    this.lastFrameTime = timeStamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.running) {
      this.running = true;
      this.lastFrameTime = performance.now(); // Initialize properly
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.running = false;
    }
  }
}
