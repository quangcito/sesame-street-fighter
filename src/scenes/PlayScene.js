import Phaser from "phaser";
import HandleInputs from "../mixin/HandleInputs";
import Player from "../character/Player";
import HealthBar from "../hud/HealthBar";
import initAnims from "../character/Animation";
import { leftPlayerKey, rightPlayerKey } from "./CharacterSelectScene";
import { charRightControl, charLeftControl } from "../mixin/KeyBinding";
export let winnerPlayer;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    this.createCloud();
    this.createBackground();
    this.createLeftPlayer();
    this.createRightPlayer();
    this.attackSound = this.sound.add('attack');
    this.KOSound = this.sound.add("KOsound");
    this.soundConfig = {
      volume: 10,
    }
    initAnims(this.anims);

    this.physics.add.collider(this.leftPlayer, this.rightPlayer);

    this.leftPlayer.attackCallback = (attackPosition, damage) => {
      // this.add.circle(attackPosition.x, attackPosition.y, 10, 0x6666ff);
      let targetChoord = this.rightPlayer.getFrame();
      if (this.checkOverlap(attackPosition, targetChoord)) {
        this.attack(this.leftPlayer, this.rightPlayer, damage);
      }
    };
    this.rightPlayer.attackCallback = (attackPosition, damage) => {
      // this.add.circle(attackPosition.x, attackPosition.y, 10, 0x6666ff);
      let targetChoord = this.leftPlayer.getFrame();
      if (this.checkOverlap(attackPosition, targetChoord)) {
        this.attack(this.rightPlayer, this.leftPlayer, damage);
      }
    };

  }

  checkOverlap(attackCoord, targetCoord) {
    let distanceX =
      Math.abs(targetCoord.topLeft.x - attackCoord.x) +
      Math.abs(targetCoord.botRight.x - attackCoord.x);
    let distanceY =
      Math.abs(targetCoord.topLeft.y - attackCoord.y) +
      Math.abs(targetCoord.botRight.y - attackCoord.y);
    if (distanceX === targetCoord.width && distanceY === targetCoord.height) {
      return true;
    }
    return false;
  }

  attack(attacker, target, damage) {
    this.attackSound.play();
    if (
      target.getImmune() ||
      Math.abs(attacker.y - target.y) >= 100 ||
      target.getBlocking()
    ) {
      return;
    }
    /**if (attacker.isPunching) {
      target.healthBar.decreaseHealth(10);
    }
    **/
    target.healthBar.decreaseHealth(damage);


    if (target.healthBar.healthValue <= 0) {
      this.KOSound.play(this.soundConfig);
    }

    console.log("elmo hit!");
    target.isAttacked = true;

    this.createEmitter(target.characterKey.blood).setPosition(target.x, target.y - 200).explode();

    if (!attacker.flipX) {
      this.tweens.add({
        targets: target,
        angle: { from: -1, to: 1 },
        duration: 200,
        yoyo: true,
      });
    }

    if (attacker.flipX) {
      this.tweens.add({
        targets: target,
        angle: { from: 1, to: -1 },
        duration: 200,
        yoyo: true,
      });
    }

    this.time.delayedCall(500, () => (target.isAttacked = false));

    if (target.getBounds().right >= this.config.width) {
      attacker.setPosition(attacker.x - 20, attacker.y);
    } else if (target.getBounds().left <= 0) {
      attacker.setPosition(attacker.x + 20, attacker.y);
    } else if (target.x > attacker.x) {
      target.setPosition(target.x + 20, target.y);
    } else {
      target.setPosition(target.x - 20, target.y);
    }

    target.setImmune(true);
    this.time.delayedCall(500, () => {
      target.setImmune(false);
    });

    this.KOsound(this.leftPlayer, this.rightPlayer);
  }

  createEmitter(color) {
    let particles = this.add.particles("pixel");
    this.emitter = particles.createEmitter({
      quantity: 15,
      speed: { min: -150, max: 150 },
      scale: { start: 2, end: 0.1 },
      lifespan: 800,
      on: false,
    });
    this.emitter.setTint(color)
    console.log(color)
    return this.emitter;
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
    this.detectWin(this.leftPlayer, this.rightPlayer);
  }

  KOsound(char1, char2) {
    if (char1.healthBar.healthValue <= 0 || char2.healthBar.healthValue <= 0) {
      this.KOSound.play(this.soundConfig);

    }
  }

  detectWin(char1, char2) {
    if (char1.healthBar.healthValue <= 0 || char2.healthBar.healthValue <= 0) {
      this.physics.disableUpdate();
      char1.disableAttack();
      char2.disableAttack();
      this.KOImage = this.add.image(550, 100, "KO");
      this.KOImage.setScale(0.8);

      if (char1.healthBar.healthValue <= 0) {
        winnerPlayer = char2;
        this.winner2 = this.add.text(230, 200, "Player 2 Wins!", {
          fontSize:"50px",
          fill: "#E3E3E3",
          fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);
      }
      if (char2.healthBar.healthValue <= 0) {
        winnerPlayer = char1;
        this.winner1 = this.add.text(230, 200, "Player 1 Wins!", {
          fontSize:"50px",
          fill: "#E3E3E3",
          fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);
      }
      this.time.delayedCall(1500, () => this.scene.start("ResultsScene"));
    }
  }

  createCloud() {
    this.cloud = this.add.tileSprite(
      this.config.width / 2,
      150,
      this.config.width,
      500,
      "cloud"
    );
  }

  createBackground() {
    this.background = this.add.image(
      this.config.width / 2,
      this.config.height / 2 + 60,
      "background"
    );
    this.background.setScale(1.6);
  }

  createLeftPlayer() {
    let healthBar = new HealthBar(
      this,
      "Player 1",
      true,
      this.config,
      null
    );
    this.leftPlayer = new Player(this, 100, 200, leftPlayerKey, healthBar);
    this.leftPlayer.setCollideWorldBounds(true);
    this.leftPlayerControl = new HandleInputs(
      this,
      charLeftControl,
      this.leftPlayer
    );
  }

  createRightPlayer() {
    let healthBar = new HealthBar(
      this,
      "Player 2",
      false,
      this.config,
      null
    );
    this.rightPlayer = new Player(
      this,
      1050,
      200,
      rightPlayerKey,
      healthBar
    ).setFlipX(true);
    this.rightPlayer.setCollideWorldBounds(true);
    this.rightPlayerControl = new HandleInputs(
      this,
      charRightControl,
      this.rightPlayer
    );
  }

  handleControls() {
    this.leftPlayerControl.characterControls();
    this.rightPlayerControl.characterControls();
  }
}

export default PlayScene;
