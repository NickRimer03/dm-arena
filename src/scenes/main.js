import { Input } from "phaser";
import Bullet from "../bullet";
import { width, height, ships } from "../config";

let bullets, vulture;
let cursors, fire;

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("sky", "./res/img/sky.png");
    this.load.image("vulture", "./res/img/vulture.png");
    // this.load.image("blaster", "./res/img/blaster.png");
    this.load.image("blaster", "./res/img/blaster_small.png");
    this.load.spritesheet("engines", "./res/spritesheets/vulture-engines-animation.png", {
      frameWidth: 58,
      frameHeight: 58
    });
  }

  create() {
    this.add.image(width / 2, height / 2, "sky");

    cursors = this.input.keyboard.createCursorKeys();
    fire = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);

    bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true
    });

    vulture = this.physics.add.sprite(width / 2, height / 2, "vulture");
    vulture.body.useDamping = true;
    vulture.body.setDrag(ships.vulture.damping, 0.99);
    vulture.body.setMaxSpeed(ships.vulture.speed.linear);
    vulture.body.setAngularDrag(0.95);

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

    this.events.emit("updAmmo", ships.vulture.ammo);

    this.cameras.main.startFollow(vulture);
  }

  update(time) {
    if (cursors.up.isDown) {
      this.physics.velocityFromRotation(vulture.rotation, ships.vulture.speed.linear, vulture.body.acceleration);
      vulture.anims.play("engines-anim", true);
    } else {
      vulture.setAcceleration(0);
      vulture.anims.play("idle", true);
    }

    if (cursors.left.isDown) {
      vulture.setAngularVelocity(-ships.vulture.speed.angular);
    } else if (cursors.right.isDown) {
      vulture.setAngularVelocity(ships.vulture.speed.angular);
    } else {
      vulture.setAngularVelocity(0);
    }

    if (fire.isDown && time > ships.vulture.lastFired && ships.vulture.ammo) {
      const bullet = bullets.get();

      if (bullet) {
        bullet.fire(vulture);
        ships.vulture.lastFired = time + ships.vulture.fireRate;
        ships.vulture.ammo--;
        this.events.emit("updAmmo", ships.vulture.ammo);
      }
    }
  }
}
