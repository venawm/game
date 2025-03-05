import { events } from "../../events";
import { GameObject } from "../../game-object";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class Inventory extends GameObject {
  constructor() {
    super({
      position: new Vector2(2, 2),
    });
    this.nextId = 0;

    this.items = [];

    events.on("HERO_PICKKS_UP_ITEM", this, (data) => {
      console.log("first");
      this.nextId += 1;
      this.items.push({
        id: this.nextId,
        image: resources.images.rod,
      });
      this.renderInventory();
    });
    this.renderInventory();
  }

  renderInventory() {
    this.children.forEach((child) => child.destroy());

    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index * 12, 0),
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}
