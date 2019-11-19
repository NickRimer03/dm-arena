import { AUTO, Game } from "phaser";
import MainScene from "./src/scenes/main";
import UIScene from "./src/scenes/ui";
import { width, height } from "./src/config";

const config = {
  type: AUTO,
  width,
  height,
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [MainScene, UIScene]
};

const game = new Game(config);
