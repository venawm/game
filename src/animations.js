export class Animations {
  constructor(patterns) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    // console.log(this.activeKey);
    // console.log(this.patterns[this.activeKey]);
    return this.patterns[this.activeKey].frame;
  }

  play(key, startAtTime = 0) {
    if (this.activeKey === key) {
      return;
    }
    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta) {
    this.patterns[this.activeKey].step(delta);
  }
}
