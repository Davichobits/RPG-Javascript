export class Sprite {
  constructor(config){
  
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.loaded = true;
    }
    
    // Set up the image
    this.shadow = new Image();
    this.useShadow = true; // config.useShadow || false;
    if(this.useShadow){
      this.shadow.src = './images/characters/shadow.png';
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    // Configure Animation & Initial State
    this.animations = config.animations || {
      "idle-down": [ [0,0] ],
      "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
      
      walkDown:[
        [0,0],
        [1,0],
        [2,0],
        [3,0]
      ]
    }
    this.currentAnimation = 'walk-down' // config.currentAnimation || 'idle-down';
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  updateAnimationProgress() {
    if(this.animationFrameProgress > 0){
      this.animationFrameProgress--;
    } else {
      this.animationFrameProgress = this.animationFrameLimit;
      this.currentAnimationFrame = (this.currentAnimationFrame + 1) % this.animations[this.currentAnimation].length;
    }
  }

  draw(ctx){
    const x = this.gameObject.x - 0;
    const y = this.gameObject.y - 12;

    this.isShadowLoaded && ctx.drawImage(
      this.shadow,
      x,y,
    )

    const [frameX, frameY] = this.frame;

    this.loaded && ctx.drawImage(
      this.image,
      frameX, frameY,
      32, 32,
      x, y,
      32, 32
    )
  }
  updateAnimationProgress; // Remove the parentheses from the function call.
}