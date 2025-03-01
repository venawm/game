import { Animations } from "./src/animations";
import { FrameIndexPattern } from "./src/frame-index-pattern";
import { GameLoop } from "./src/game-loop";
import { gridCells, isSpaceFree } from "./src/helpers/gird";
import { moveTowards } from "./src/helpers/move-towards";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/input";
import { walls } from "./src/levels/level-one";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./src/objects/hero/hero-animations";
import { resources } from "./src/resource";
import { Sprite } from "./src/sprite";
import { Vector2 } from "./src/vector2";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(3), gridCells(5)),
  animations: new Animations({
    walkDown: new FrameIndexPattern(WALK_DOWN),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkRight: new FrameIndexPattern(WALK_RIGHT),
    standDown: new FrameIndexPattern(STAND_DOWN),
    standUp: new FrameIndexPattern(STAND_UP),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standRight: new FrameIndexPattern(STAND_RIGHT),
  }),
});
const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroDestinationPosition = hero.position.duplicate();
const input = new Input();

const update = (delta) => {
  // Remove the return statement to allow input handling
  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove();
  }

  // hero animations
  hero.step(delta);
};

const tryMove = () => {
  if (!input.direction) {
    return;
  }

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;

  const gridSize = 16;
  // Process input directions
  if (input.direction === DOWN) {
    nextY += gridSize;
  }
  if (input.direction === UP) {
    nextY -= gridSize;
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
  }

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }
  // heroDestinationPosition.x = nextX;
  // heroDestinationPosition.y = nextY;
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const heroOffset = new Vector2(-6, -19);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosy = hero.position.y + heroOffset.y;

  // Draw shadow first, then hero to ensure proper layering
  shadow.drawImage(ctx, heroPosX, heroPosy);
  hero.drawImage(ctx, heroPosX, heroPosy);
};

const gameLoop = new GameLoop(update, draw);

gameLoop.start();
