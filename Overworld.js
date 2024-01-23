import { GameObject } from "./GameObject.js";
import { OverworldMap } from "./OverworldMap.js";
import { DirectionInput } from "./DirectionInput.js";

export class Overworld {
  constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.map = null;
  }

  startGameLoop(){
    const step = () => {
      // Clear off the canvas
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

      // Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      // Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });
      });

      // Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      // Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(()=>step());
    }
    step();
  }

  init(){
    this.map = new OverworldMap(window.OverworldMap.DemoRoom);

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    // this.directionInput.direction;
    this.startGameLoop();
  }
}