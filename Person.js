import { GameObject } from "./GameObject.js";

export class Person extends GameObject {
  constructor(config) {
    super(config);
      this.movingProcessRemaining = 0;

      this.isPlayerControlled = config.isPlayerControlled || false;

      this.directionUpdate = {
        'up': ['y', -1],
        'down': ['y', 1],
        'left': ['x', -1],
        'right': ['x', 1],
      }
  }

  update(state){
    this.updatePosition();
    this.updateSprite(state);

    if(this.isPlayerControlled && this.movingProcessRemaining=== 0 && state.arrow){
      this.direction = state.arrow;
      this.movingProcessRemaining = 16;
    }
  }

  updatePosition() {
    if(this.movingProcessRemaining > 0){
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProcessRemaining--;
    }
  }

  updateSprite(state){
    if(this.isPlayerControlled && this.movingProcessRemaining === 0 && !state.arrow){
      this.sprite.setAnimation(`idle-${this.direction}`);    
      return;
    }
  
    if(this.movingProcessRemaining > 0){
      this.sprite.setAnimation(`walk-${this.direction}`);
    }
  }
}