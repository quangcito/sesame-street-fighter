import Phaser from "phaser";
import HealthBar from "../hud/HealthBar";
import Weapon from "../weapons/punch";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey, healthBar) {
    super(scene, x, y, characterKey.defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.healthBar = healthBar;
    this.healthBar.setName(characterKey.displayName);

    this.timeFromPreviousAttack = null;
    this.attacking = false;
    this.immune = false;
    this.isAttacked = false;
    this.blocking = false;
    this.weapon = new Weapon(this.scene, this.x - 50, this.y - 300, this);

    this.punchAnim = characterKey.punchAnim;
    this.kickAnim = characterKey.kickAnim;

    this.attackCooldown = 500;
    this.scene = scene;

    this.on(Phaser.Animations.Events.ANIMATION_START, () => {
      if (this.body.facing == Phaser.Physics.Arcade.FACING_RIGHT) {
        scene.time.delayedCall(175, () => {
          console.log("delayed");
          // this.setSize(130, 230), this.setOffset(90, 40);
          // this.weapon.setActive(false);
        });
        // this.setSize(80, 230), this.setOffset(100, 40);
      } else if (this.body.facing == Phaser.Physics.Arcade.FACING_LEFT) {
        scene.time.delayedCall(175, () => {
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
    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
    ) {
      return;
    }

    this.timeFromPreviousAttack = new Date().getTime();
    this.attacking = true;
    this.play(this.punchAnim);
    this.weapon.attack();
  }

  kick() {
    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
    ) {
      return;
    } else {
      this.timeFromPreviousAttack = new Date().getTime();
      this.attacking = true;
      this.play(this.kickAnim);
    }
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
