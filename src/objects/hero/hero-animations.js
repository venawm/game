const makeWalkingFrames = (rootFrame = 0) => {
  return {
    duration: 400,
    frames: [
      { time: 0, frame: rootFrame + 1 },
      { time: 100, frame: rootFrame },
      { time: 200, frame: rootFrame + 1 },
      { time: 300, frame: rootFrame + 2 },
    ],
  };
};

const makeStandingFrames = (rootFrame = 0) => {
  return {
    duration: 400,
    frames: [{ time: 0, frame: rootFrame }],
  };
};

export const STAND_DOWN = makeStandingFrames(1);
export const STAND_RIGHT = makeStandingFrames(4);
export const STAND_UP = makeStandingFrames(7);
export const STAND_LEFT = makeStandingFrames(10);

export const WALK_DOWN = makeWalkingFrames(0);
export const WALK_UP = makeWalkingFrames(6);
export const WALK_RIGHT = makeWalkingFrames(3);
export const WALK_LEFT = makeWalkingFrames(9);

export const PICK_UP_DOWN = {
  duration: 400,
  frames: [
    {
      time: 0,
      frame: 12,
    },
  ],
};
