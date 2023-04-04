class HandleInputs {
  constructor(scene, charKey, character) {
    this.scene = scene;
    this.createKeys(charKey);
    this.character = character;
    this.maxJump = 1;
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

  characterControls() {
    if (this.keyLeft.isDown && Phaser.Physics.Arcade.FACING_LEFT) {
      this.character.setVelocityX(-150).setFlipX(true);
    } else if (this.keyRight.isDown && Phaser.Physics.Arcade.FACING_RIGHT) {
      this.character.setVelocityX(150).setFlipX(false);
    } else this.character.setVelocityX(0);

    if (this.keyDown.isDown) {
      this.character.setVelocityY(800);
    }

    if (this.keyUp.isDown && this.jumpCount < this.maxJump) {
      this.jumpCount++;
      this.character.setVelocityY(-700);
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
