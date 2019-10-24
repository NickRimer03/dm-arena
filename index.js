import Phaser from "phaser";

const { AUTO, Game } = Phaser;
const [width, height] = [800, 600];

const config = {
  type: AUTO,
  width,
  height,
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Game(config);
let player;
let cursors;

function preload() {
  this.load.image("sky", "./res/img/sky.png");
  this.load.atlas("vulture", "./res/spritesheets/vulture.png", "./res/spritesheets/vulture.json");
}

function create() {
  this.add.image(width / 2, height / 2, "sky");

  cursors = this.input.keyboard.createCursorKeys();

  player = this.physics.add.image(100, 100, "vulture");
  player.setDamping(true);
  player.setDrag(0.975);
  player.setMaxVelocity(200);
}

function update() {
  if (cursors.up.isDown) {
    if (cursors.left.isDown) {
      player.angle -= 2;
    } else if (cursors.right.isDown) {
      player.angle += 2;
    }

    this.physics.velocityFromRotation(player.rotation, 200, player.body.velocity);
  }
}
