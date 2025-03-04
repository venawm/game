import { Camera } from "./src/camera";
import { events } from "./src/events";
import { GameLoop } from "./src/game-loop";
import { GameObject } from "./src/game-object";
import { gridCells } from "./src/helpers/gird";
import { Input } from "./src/input";
import { Hero } from "./src/objects/hero/hero";

import { resources } from "./src/resource";
import { Sprite } from "./src/sprite";
import { Vector2 } from "./src/vector2";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

// mainScene.addChild(skySprite);
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();

mainScene.addChild(camera);

mainScene.input = new Input();

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.draw(ctx, 0, 0);

  ctx.save();

  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);

  ctx.restore();
};

const gameLoop = new GameLoop(update, draw);

gameLoop.start();
