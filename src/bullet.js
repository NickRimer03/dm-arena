import { Class, Physics, Math as PMath, Geom } from "phaser";

export default Class({
  Extends: Physics.Arcade.Image,

  initialize: function Bullet(scene) {
    Physics.Arcade.Image.call(this, scene, 0, 0, "blaster");

    this.setBlendMode(1);
    this.setDepth(1);

    this.speed = 1000;
    this.lifespan = 1000;
  },

  fire: function(ship) {
    this.lifespan = 1000;

    const a = PMath.DegToRad(ship.body.rotation);
    const { x: x0, y: y0 } = ship;
    const [x, y] = [x0 + ship.width / 2, y0];
    const [X, Y] = [
      x0 + (x - x0) * Math.cos(a) - (y - y0) * Math.sin(a),
      y0 + (y - y0) * Math.cos(a) + (x - x0) * Math.sin(a)
    ];
    const startPoint = new Geom.Point(X, Y);

    this.setActive(true);
    this.setVisible(true);
    this.setAngle(ship.body.rotation);
    this.setPosition(startPoint.x, startPoint.y);
    this.body.reset(startPoint.x, startPoint.y);

    this.scene.physics.velocityFromRotation(a, this.speed, this.body.velocity);

    this.body.velocity.x *= 2;
    this.body.velocity.y *= 2;
  },

  update: function(time, delta) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
      this.body.stop();
    }
  }
});
