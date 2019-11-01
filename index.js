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
  this.load.image("vulture", "./res/img/vulture.png");
  this.load.spritesheet("engines", "./res/spritesheets/vulture-engines-animation.png", {
    frameWidth: 58,
    frameHeight: 58
  });
}

function create() {
  this.add.image(width / 2, height / 2, "sky");

  cursors = this.input.keyboard.createCursorKeys();

  player = this.physics.add.sprite(width / 2, height / 2, "vulture");
  player.setDamping(true);
  player.setDrag(0.985);
  player.setMaxVelocity(200);

  this.anims.create({
    key: "idle",
    frames: [{ key: "vulture" }],
    frameRate: 20
  });
  this.anims.create({
    key: "engines-anim",
    frames: this.anims.generateFrameNumbers("engines", { start: 0, end: 7 }),
    frameRate: 7,
    repeat: -1
  });

  this.cameras.main.startFollow(player);
}

function update() {
  if (cursors.up.isDown) {
    this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
    player.anims.play("engines-anim", true);
  } else {
    player.setAcceleration(0);
    player.anims.play("idle", true);
  }

  if (cursors.left.isDown) {
    player.setAngularVelocity(-150);
  } else if (cursors.right.isDown) {
    player.setAngularVelocity(150);
  } else {
    player.setAngularVelocity(0);
  }
}
