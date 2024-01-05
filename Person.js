import { GameObject } from "./GameObject.js";

export class Person extends GameObject {
  constructor(config) {
    super(config);
      this.movingProcessRemaining = 32;

      this.direction = 'right';

      this.directionUpdate = {
        'up': ['y', -1],
        'down': ['y', 1],
        'left': ['x', -1],
        'right': ['x', 1],
      }
  }

  update(state){
    this.updatePosition();
  }

  updatePosition() {
    if(this.movingProcessRemaining > 0){
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProcessRemaining--;
    }
  }
}