import Phaser from "phaser";
import HandleInputs from "../mixin/HandleInputs";
import Player from "../character/Player";
import HealthBar from "../hud/HealthBar";
import initAnims from "../character/Animation";
import {leftPlayerKey, rightPlayerKey} from "./CharacterSelectScene";

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    this.createCloud();
    this.createBackground();
    this.createElmo();
    this.createCookieMonster();
    initAnims(this.anims);

    this.physics.add.collider(this.leftPlayer, this.rightPlayer, () =>
      this.attack(this.leftPlayer, this.rightPlayer)
    );

    let particles = this.add.particles("pixel");
    this.emitter = particles.createEmitter({
      quantity: 15,
      speed: { min: -150, max: 150 },
      scale: { start: 2, end: 0.1 },
      lifespan: 800,
      on: false,
    });
  }

  attack(char1, char2) {
    if (
      char1.isAttacking() &&
      !char2.getImmune() &&
      Math.abs(char1.y - char2.y) < 100 &&
      !char2.getBlocking()
    ) {
      this.healthBar2.decreaseHealth(10);
      console.log("elmo hit!");
      char2.isAttacked = true;
      this.time.delayedCall(3000, () => (char2.isAttacked = false));
      this.emitter.setPosition(char1.x + 10, char1.y - 200);
      this.emitter.explode();
      this.tweens.add({
        targets: char2,
        angle: { from: -2, to: 2 },
        duration: 200,
        yoyo: true,
      });
      if (char2.x > char1.x) {
        char2.setPosition(char2.x + 10, char2.y);
      } else {
        char2.setPosition(char2.x - 10, char2.y);
      }
      char2.setImmune(true);
      this.time.delayedCall(500, () => {
        char2.setImmune(false);
      });
    }

    if (
      char2.isAttacking() &&
      !char1.getImmune() &&
      Math.abs(char1.y - char2.y) < 100
    ) {
      this.healthBar1.decreaseHealth(10);
      console.log("cookie hit!");
      this.emitter.setPosition(char2.x, char2.y);
      this.emitter.explode();
      if (char1.x > char2.x) {
        char1.setPosition(char1.x + 50, char1.y);
      } else {
        char1.setPosition(char1.x - 50, char1.y);
      }
      char1.setImmune(true);
      this.time.delayedCall(500, () => {
        char1.setImmune(false);
      });
    }

    /*else {
      this.healthBar1.decreaseHealth(10);
      this.healthBar2.decreaseHealth(10);
      console.log("both hit!");
      //emmitter?
      if (char2.x > char1.x) {
        char2.setPosition(char2.x + 50, char2.y);
        char1.setPosition(char1.x - 50, char1.y);
      }
      if (char2.x < char1.x) {
        char2.setPosition(char2.x - 50, char2.y);
        char1.setPosition(char1.x + 50, char1.y);
      }
    } */
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
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

  createElmo() {
    this.healthBar1 = new HealthBar(
      this,
      "Elmo",
      true,
      this.config,
      "elmoProfile"
    );
    this.leftPlayer = new Player(
      this,
      100,
      200,
      leftPlayerKey
    )
      .setOrigin(1)
      .setSize(80, 230)
      .setOffset(100, 40);

    this.leftPlayer.setCollideWorldBounds(true);
    this.leftPlayerControl = new HandleInputs(this, charLeft, this.leftPlayer);
  }

  createCookieMonster() {
    this.healthBar2 = new HealthBar(
      this,
      "Cookie Monster",
      false,
      this.config,
      "cookieMonsterProfile"
    );
    this.rightPlayer = new Player(
      this,
      1050,
      200,
      rightPlayerKey
    )
      .setOrigin(1)
      .setSize(100, 230)
      .setOffset(100, 40)
      .setFlipX(true);
    this.rightPlayer.setCollideWorldBounds(true);
    this.rightPlayerControl = new HandleInputs(
      this,
      charRight,
      this.rightPlayer
    );
  }

  handleControls() {
    this.leftPlayerControl.characterControls();
    this.rightPlayerControl.characterControls();
  }
}

const charRight = {
  up: Phaser.Input.Keyboard.KeyCodes.UP,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  down: Phaser.Input.Keyboard.KeyCodes.DOWN,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  punch: Phaser.Input.Keyboard.KeyCodes.O,
  kick: Phaser.Input.Keyboard.KeyCodes.P,
};

const charLeft = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  right: Phaser.Input.Keyboard.KeyCodes.D,
  punch: Phaser.Input.Keyboard.KeyCodes.C,
  kick: Phaser.Input.Keyboard.KeyCodes.V,
};

export default PlayScene;
