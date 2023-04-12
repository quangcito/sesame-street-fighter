import Phaser from "phaser";
import HealthBar from "../hud/HealthBar";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey, healthBar) {
    super(scene, x, y, characterKey.defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.healthBar = healthBar;
    this.healthBar.setName(characterKey.displayName);

    this.timeFromPreviousAttack = null;
    this.immune = false;
    this.isAttacked = false;
    this.isAttacking = false; //can't return as a global variable so making getter method
    this.blocking = false;

    this.punchAnim = characterKey.punchAnim;
    this.kickAnim = characterKey.kickAnim;

    this.attackCooldown = 500;
    this.scene = scene;
  }

  getAttacking() {
    return this.isAttacking;
  }

  punch() {
    this.isAttacking = true;
    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
    ) {
      return;
    }

    this.timeFromPreviousAttack = new Date().getTime();
    this.play(this.punchAnim);

    // What if you change your direction while punching??
    this.scene.time.delayedCall(175, () => {  // 175 here might belong in constructor params / character config
      if (this.body.facing == Phaser.Physics.Arcade.FACING_RIGHT) {
        // compute fist position



        // this.attackCallback(fistPosition)
      } else if (this.body.facing == Phaser.Physics.Arcade.FACING_LEFT) {
        // ??????????????
      }
    });
    this.scene.time.delayedCall(10, () => {
      this.isAttacking = false;
    });
}

  punchingCoord() {
    if (this.body.facing == Phaser.Physics.Arcade.FACING_RIGHT) {
      // compute fist position
      var fistX = this.x + 35;
      var fistY = this.y + 35;

    } else if (this.body.facing == Phaser.Physics.Arcade.FACING_LEFT) {
      var fistX = this.x - 35;
      var fistY = this.y - 35;
    }

    return {
      x: fistX,
      y: fistY
    }
    }

  kick() {
    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
    ) {
      return;
    } else {
      this.timeFromPreviousAttack = new Date().getTime();
      this.play(this.kickAnim);
    }
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

  getBlocking() {
    return this.blocking;
  }

  setBlocking(blocking) {
    this.blocking = blocking;
  }

  getAttacked() {
    return this.isAttacked;
  }
}

export default Player;
