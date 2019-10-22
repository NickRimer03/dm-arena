import Phaser from "phaser";

const { AUTO, Game, Math } = Phaser;

const config = {
  type: AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Game(config);
let player;

function preload() {
  this.load.image("sky", "./res/img/sky.png");
  this.load.atlas(
    "vulture",
    "./res/spritesheets/vulture.png",
    "./res/spritesheets/vulture.json"
  );
}

function create() {
  this.add.image(400, 300, "sky");
  player = this.add.sprite(100, 450, "vulture");
}

function update() {}
