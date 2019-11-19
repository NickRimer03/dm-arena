export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene", active: true });
  }

  create() {
    const gameScene = this.scene.get("GameScene");
    const ammoText = this.add.text(16, 16, "AMMO: ********** (10)", { fontSize: "32px", fill: "#eee" });

    gameScene.events.on(
      "updAmmo",
      newAmmoCount => {
        ammoText.setText(`AMMO: ${"*".repeat(newAmmoCount)} (${newAmmoCount})`);
      },
      this
    );
  }
}
