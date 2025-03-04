import { GameObject } from "../../game-object";
import { DOWN, LEFT, RIGHT, UP } from "../../input";
import { Vector2 } from "../../vector2";
import { Sprite } from "../../sprite";
import { resources } from "../../resource";
import { gridCells, isSpaceFree } from "../../helpers/gird";
import { Animations } from "../../animations";
import { FrameIndexPattern } from "../../frame-index-pattern";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./hero-animations";
import { moveTowards } from "../../helpers/move-towards";
import { walls } from "../../levels/level-one";

export class Hero extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });
    this.facingPosition = DOWN;
    this.destinationPosition = this.position.duplicate();
    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8, -18),
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
      position: new Vector2(-8, -17),
    });
    this.addChild(shadow);
    this.addChild(this.body);
  }

  step(delta, root) {
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }
  }

  tryMove(root) {
    const { input } = root;
    if (!input.direction) {
      if (this.facingPosition === LEFT) {
        this.body.animations.play("standLeft");
      }
      if (this.facingPosition === RIGHT) {
        this.body.animations.play("standRight");
      }
      if (this.facingPosition === UP) {
        this.body.animations.play("standUp");
      }
      if (this.facingPosition === DOWN) {
        this.body.animations.play("standDown");
      }
      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    const gridSize = 16;
    // Process input directions
    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations.play("walkDown");
    }
    if (input.direction === UP) {
      nextY -= gridSize;
      this.body.animations.play("walkUp");
    }
    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations.play("walkLeft");
    }
    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations.play("walkRight");
    }

    this.facingPosition = input.direction ?? this.facingPosition;

    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
    //  this.destinationPosition.x = nextX;
    //  this.destinationPosition.y = nextY;
  }
}
