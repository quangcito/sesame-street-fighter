import Phaser from "phaser";

class punch extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, character) {
    super(scene, x, y, 100, 10);
    this.character = character;
    // this.setActive(false);
    this.visible = false;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    console.log(
      "punch exists " + this.displayHeight + " and " + this.displayWidth
    );
    this.body.setAllowGravity(false);
  }

  attack() {
    this.body.reset(this.character.x, this.character.y);
    this.setActive(true);
  }
}

export default punch;
