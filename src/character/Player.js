import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, defaultImage, punchAnim, kickAnim, healthBar) {
    super(scene, x, y, defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.attacking = false;
    this.immune = false;

    this.punchAnim = punchAnim;
    this.kickAnim = kickAnim;

    this.on(Phaser.Animations.Events.ANIMATION_START, () => {
      if (this.body.facing == Phaser.Physics.Arcade.FACING_RIGHT) {
        scene.time.delayedCall(350, () => {
          console.log('delayed')
          this.setSize(130, 230), this.setOffset(90, 40);
        });
        // this.setSize(80, 230), this.setOffset(100, 40);
      }
      else if (this.body.facing == Phaser.Physics.Arcade.FACING_LEFT) {
        scene.time.delayedCall(350, () => {
          this.setSize(130, 230), this.setOffset(70, 40);
        });
      }
    });
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.setSize(80, 230).setOffset(100, 40);
      this.attacking = false;
    });
  }

  punch() {
    this.attacking = true;
    this.play(this.punchAnim);
  }

  kick() {
    this.attacking = true;
    this.play(this.kickAnim);
  }

  isAttacking() {
    return this.attacking;
  }

  setAttacking(attacking) {
    this.attacking = attacking;
  }

  setImmune(immune) {
    this.immune = immune;
  }

  playerIsImmune(time) {
    this.immune = true;
    scene.time.delayedCall(time, () => {
      this.immune = false;
    });
  }

  getImmune() {
    return this.immune;
  }
}

export default Player;
