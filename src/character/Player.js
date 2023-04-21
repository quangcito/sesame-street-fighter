import Phaser from "phaser";
import HealthBar from "../hud/HealthBar";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey) {
    super(scene, x, y, characterKey.defaultImage);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    // this.KOSound = scene.sound.add("KOsound");
    // this.soundConfig = {
    //   volume: 10,
    //   delay: 0,
    // }

    this.characterKey = characterKey;

    this.setOrigin(0.5, 1)
      .setSize(characterKey.size[0], characterKey.size[1])
      .setOffset(100, 30)
      .setScale(0.5);

    this.healthBar = null;
    // this.healthBar.setProfile(characterKey.profilePicture);
    // this.healthBar.setName(characterKey.displayName);

    this.timeFromPreviousAttack = null;
    this.immune = false;
    this.isAttacked = false;
    this.blocking = false;
    this.isPunching = false;
    this.isHeavyAttacking = false;

    this.punchAnim = characterKey.punch.anim;
    this.kickAnim = characterKey.kick.anim;
    this.blockAnim = characterKey.block.anim;
    this.jumpSound = scene.sound.add('jump');

    this.attackCooldown = 500;
    this.scene = scene;
    // if (this.healthBar.healthValue < 0) {
    //   this.KOSound.play(this.soundConfig);
    // }
  }

  doAttack(attackKey) {
    let animation = attackKey.anim;

    if (
      this.timeFromPreviousAttack && //check to see if the character has attacked atleast once
      this.attackCooldown + this.timeFromPreviousAttack > new Date().getTime() // checks if enough time has passed for the character to attack again.
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
        this.attackCallback(attackPosition);
      } else {
        let attackPosition = {
          x: this.x - attackKey.position[0],
          y: this.y - attackKey.position[1],
        };
        this.attackCallback(attackPosition);
      }
    });
  }

  punch() {
    this.doAttack(this.characterKey.punch);
    //this.isPunching = false;
  }

  kick() {
    this.doAttack(this.characterKey.kick);
    //this.isKicking = false;
  }

  block() {
    if(this.body.onFloor()) {
      this.blocking = true;
      this.anims.play(this.blockAnim, true)
    }
  }

  unblock() {
    if(this.body.onFloor()) {
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
      width: this.characterKey.size[0] / 2,
      height: this.characterKey.size[1] / 2,
      x: this.x,
      topLeft: {
        x: this.x - this.characterKey.size[0] / 4,
        y: this.y - this.characterKey.size[1] / 2 - 15,
      },
      topRight: {
        x: this.x + this.characterKey.size[0] / 4,
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
