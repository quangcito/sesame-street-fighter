import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, defaultImage, punchAnim, kickAnim, healthBar) {
    super(scene, x, y, defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.timeFromPreviousAttack = null;
    this.attacking = false;
<<<<<<< Updated upstream
    this.isAttacked = false;
    this.blocking = false;
    this.lightAttackDamage = 5;
    this.heavyAttackDamage = 10;
=======
    this.immune = false;
    this.attacked = false;
    this.blocking = false;

    this.punchAnim = characterKey.punchAnim;
    this.kickAnim = characterKey.kickAnim;
    this.blockAnim = characterKey.blockAnim;

>>>>>>> Stashed changes
    this.attackCooldown = 500;
    this.punchAnim = punchAnim;
    this.kickAnim = kickAnim;
    this.scene = scene;

    this.on(Phaser.Animations.Events.ANIMATION_START, () => {
      if (this.body.facing == Phaser.Physics.Arcade.FACING_RIGHT) {
        scene.time.delayedCall(350, () => {
          console.log("delayed");
          this.setSize(120, 230), this.setOffset(100, 40);
        });
        this.setSize(80, 230), this.setOffset(100, 40);
      } else if (this.body.facing == Phaser.Physics.Arcade.FACING_LEFT) {
        this.setSize(120, 230), this.setOffset(60, 40);
      }
    });
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.setSize(80, 230).setOffset(100, 40);
      this.attacking = false;
    });
  }

  punch() {
    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
    ) {
      return;
    } else {
      this.timeFromPreviousAttack = new Date().getTime();
      this.attacking = true;
      this.play(this.punchAnim);
    }
  }

  kick() {
    if (
      this.timeFromPreviousAttack &&
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() //The time in milliseconds starting at January 1, 19
    ) {
      return;
    } else {
      this.timeFromPreviousAttack = new Date().getTime();
      this.attacking = true;
      this.play(this.kickAnim);
    }
  }

  // blocking() {
  // if (this.blocking) {
  //   this.anims.get(this.blockAnim).setCurrentFrame(1);
  // } else {
  //   this.anims.get(this.blockAnim).setCurrentFrame(0);
  // }
  // }

  isAttacking() {
    return this.attacking;
  }

  setAttacking(attacking) {
    this.attacking = attacking;
  }

<<<<<<< Updated upstream
  getBlocking() {
    return this.blocking;
=======
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
>>>>>>> Stashed changes
  }

  setBlocking(blocking) {
    this.blocking = blocking;
  }

  isAttacked() {
    return this.attacked;
  }
}

export default Player;
