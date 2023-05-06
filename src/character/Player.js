import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey) {
    super(scene, x, y, characterKey.defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.characterKey = characterKey;

    this.setOrigin(0.5, 1)
      .setSize(characterKey.size[0], characterKey.size[1])
      .setOffset(100, 40);

    this.healthBar = null;

    this.timeFromPreviousAttack = null;
    this.immune = false;
    this.isAttacked = false;
    this.blocking = false;
    this.isPunching = false;
    this.isHeavyAttacking = false;

    this.punchAnim = characterKey.punch.anim;
    this.kickAnim = characterKey.kick.anim;
    this.blockAnim = characterKey.block.anim;
    this.jumpSound = scene.sound.add("jump");

    this.scene = scene;
    // if (this.healthBar.healthValue < 0) {
    //   this.KOSound.play(this.soundConfig);
    // }
  }

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

  block() {
    if (this.body.onFloor()) {
      this.blocking = true;
      this.anims.play(this.blockAnim, true);
    }
  }

  unblock() {
    if (this.body.onFloor()) {
      if (this.blocking) {
        this.blocking = false;
        this.anims.currentAnim.getFrameByProgress(0);
      }
    }
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

  getBlocking() {
    return this.blocking;
  }

  setBlocking(blocking) {
    this.blocking = blocking;
  }

  disableAttack() {
    this.immune = true;
  }

  getFrame() {
    return {
      width: this.characterKey.size[0],
      height: this.characterKey.size[1],
      x: this.x,
      topLeft: {
        x: this.x - this.characterKey.size[0] / 2,
        y: this.y - this.characterKey.size[1],
      },
      botLeft: {
        x: this.x - this.characterKey.size[0] / 4,
        y: this.y - 15,
      },
      botRight: {
        x: this.x + this.characterKey.size[0] / 2,
        y: this.y,
      },
    };
  }
}

export default Player;
