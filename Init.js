import { Overworld } from "./Overworld.js";

const initGame = () => {
  const overworld = new Overworld({
    element: document.querySelector('.game-container')
  });
  overworld.init();
}

initGame()