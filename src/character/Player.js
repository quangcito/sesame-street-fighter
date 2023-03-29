import Phaser from "phaser";
import HealthBar from "../hud/HealthBar";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, char, punchAnim, kickAnim, isLeftPlayer) {
    super(scene, x, y, char);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.attacking = false;

    this.punchAnim = punchAnim;
    this.kickAnim = kickAnim;

    this.on(Phaser.Animations.Events.ANIMATION_START, () => {
      this.setSize(140, 230), this.setOffset(100, 40);
    });
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.setSize(100, 230).setOffset(100, 40);
      this.attacking = false;
    });
    this.healthBar = new HealthBar(scene, char, isLeftPlayer);
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
}

export default Player;
