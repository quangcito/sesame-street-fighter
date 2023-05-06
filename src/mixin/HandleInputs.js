class HandleInputs {
  constructor(scene, charKey, character) {
    this.scene = scene;
    this.createKeys(charKey);
    this.character = character;
    this.additionalJumps = 1;
    this.jumpCount = 0;
  }

  createKeys(charKey) {
    this.keyUp = this.scene.input.keyboard.addKey(charKey.up);
    this.keyDown = this.scene.input.keyboard.addKey(charKey.down);
    this.keyLeft = this.scene.input.keyboard.addKey(charKey.left);
    this.keyRight = this.scene.input.keyboard.addKey(charKey.right);
    this.keyPunch = this.scene.input.keyboard.addKey(charKey.punch);
    this.keyKick = this.scene.input.keyboard.addKey(charKey.kick);
  }


  /**
   *
   * @returns
   * This method bind each character control keys with the according execution
   */
  characterControls() {
    if (
      this.character.isAttacked ||
      this.character.healthBar.healthValue <= 0
    ) {
      return;
    }

    if (this.keyDown.isDown) {
      this.character.setVelocityY(800);
    }

    if (this.keyLeft.isDown) {
      this.character.setVelocityX(-500).setFlipX(true);
    } else if (this.keyRight.isDown) {
      this.character.setVelocityX(500).setFlipX(false);
    } else this.character.setVelocityX(0);

    if (
      Phaser.Input.Keyboard.JustDown(this.keyUp) &&
      this.jumpCount < this.additionalJumps
    ) {
      this.jumpCount++;
      this.character.setVelocityY(-875);
      this.character.jump();
    }

    if (this.character.body.onFloor()) {
      this.jumpCount = 0;
    }

    if (this.keyPunch.isDown) {
      this.character.punch();
    }

    if (this.keyKick.isDown) {
      this.character.kick();
    }
  }
}

export default HandleInputs;
