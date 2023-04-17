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
    this.healthBar.setProfile(characterKey.profilePicture);
    this.healthBar.setName(characterKey.displayName);

    this.timeFromPreviousAttack = null;
    this.immune = false;
    this.isAttacked = false;
    this.blocking = false;

    this.punchAnim = characterKey.punch.anim;
    this.kickAnim = characterKey.kick.anim;
    this.blockAnim = characterKey.block.anim;

    this.attackCooldown = 500;
    this.scene = scene;
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
  }

  kick() {
    this.doAttack(this.characterKey.kick);
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
        x: this.x - this.characterKey.size[0]/2,
        y: this.y - this.characterKey.size[1],
      },
      botRight: {
        x: this.x + this.characterKey.size[0]/2,
        y: this.y,
      },
    };
  }
}

export default Player;
