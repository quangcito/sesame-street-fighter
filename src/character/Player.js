import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey) {
    super(scene, x, y, characterKey.defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.characterKey = characterKey;

    this.setOrigin(0.5, 1)
      .setSize(characterKey.size[0], characterKey.size[1])
      .setOffset(100, 30)
      .setScale(0.5);

    this.healthBar = null;

    this.timeFromPreviousAttack = null;
    this.immune = false;
    this.isAttacked = false;
    this.isPunching = false;
    this.isHeavyAttacking = false;

    this.punchAnim = characterKey.punch.anim;
    this.kickAnim = characterKey.kick.anim;
    this.jumpSound = scene.sound.add("jump");

    this.scene = scene;
  }

  /**
   *
   * @param {*} attackKey: the keyboard key for attacking
   * @returns
   * This method execute the attack animation and attack callback function when the attack key is down
   */
  doAttack(attackKey) {
    let animation = attackKey.anim;
    let attackCooldown = attackKey.cooldown;

    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
    ) {
      return;
    }

    this.timeFromPreviousAttack = new Date().getTime();
    this.play(animation);

    this.scene.time.delayedCall(attackKey.delay, () => {
      if (!this.flipX) {
        let attackPosition = {
          x: this.x + attackKey.position[0],
          y: this.y - attackKey.position[1],
        };
        this.attackCallback(attackPosition, attackKey.damage);
      } else {
        let attackPosition = {
          x: this.x - attackKey.position[0],
          y: this.y - attackKey.position[1],
        };
        this.attackCallback(attackPosition, attackKey.damage);
      }
    });
  }

  punch() {
    this.doAttack(this.characterKey.punch);
  }

  kick() {
    this.doAttack(this.characterKey.kick);
  }

  jump() {
    this.jumpSound.play();
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

  disableAttack() {
    this.immune = true;
  }

  /**
   *
   * @returns The data for the frame of the player's bounding box
   */
  getFrame() {
    return {
      width: this.characterKey.size[0] / 2,
      height: this.characterKey.size[1] / 2,
      x: this.x,
      topLeft: {
        x: this.x - this.characterKey.size[0] / 4,
        y: this.y - this.characterKey.size[1] / 2 - 15,
      },
      botLeft: {
        x: this.x - this.characterKey.size[0] / 4,
        y: this.y - 15,
      },
      botRight: {
        x: this.x + this.characterKey.size[0] / 4,
        y: this.y - 15,
      },
    };
  }
}

export default Player;
