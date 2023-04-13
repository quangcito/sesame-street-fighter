import Phaser from "phaser";
import HealthBar from "../hud/HealthBar";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey, healthBar) {
    super(scene, x, y, characterKey.defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.characterKey = characterKey;

    this.setOrigin(0.5, 1)
      .setSize(characterKey.size[0], characterKey.size[1])
      .setOffset(100, 40);

    this.healthBar = healthBar;
    this.healthBar.setName(characterKey.displayName);

    this.timeFromPreviousAttack = null;
    this.immune = false;
    this.isAttacked = false;
    this.blocking = false;

    this.punchAnim = characterKey.punchAnim;
    this.kickAnim = characterKey.kickAnim;

    this.attackCooldown = 500;
    this.scene = scene;
  }

  punch() {
    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
    ) {
      return;
    }

    this.timeFromPreviousAttack = new Date().getTime();
    this.play(this.punchAnim);

    // What if you change your direction while punching??
    this.scene.time.delayedCall(175, () => {
      // 175 here might belong in constructor params / character config
      if (!this.flipX) {
        console.log("right: " + this.flipX);
        // compute fist position
        let fistPosition = {
          x: this.x + 90,
          y: this.y - 180,
        };
        this.attackCallback(fistPosition);
      } else {
        // ??????????????
        console.log("left: " + this.flipX);
        let fistPosition = {
          x: this.x - 90,
          y: this.y - 180,
        };
        this.attackCallback(fistPosition);
      }
    });
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

  getFrame() {
    return {
      width: this.characterKey.size[0],
      height: this.characterKey.size[1],
      x: this.x,
      topLeft: {
        x: this.x - 40,
        y: this.y - 230,
      },
      botRight: {
        x: this.x + 40,
        y: this.y,
      },
    };
  }
}

export default Player;
