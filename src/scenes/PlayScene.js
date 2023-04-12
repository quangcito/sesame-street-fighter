import Phaser from "phaser";
import HandleInputs from "../mixin/HandleInputs";
import Player from "../character/Player";
import HealthBar from "../hud/HealthBar";
import initAnims from "../character/Animation";
import { leftPlayerKey, rightPlayerKey } from "./CharacterSelectScene";

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

    let particles = this.add.particles("pixel");
    this.emitter = particles.createEmitter({
      quantity: 15,
      speed: { min: -150, max: 150 },
      scale: { start: 2, end: 0.1 },
      lifespan: 800,
      on: false,
    });
  }

  detectHit(punchingCoord, target) {
    console.log(punchingCoord.x + ";" + punchingCoord.y);
    if ((target.x - 300 <= punchingCoord.x <= target.x + 300) || (target.y - 200 <= punchingCoord.y <= target.y + 200)) {
      return true;

    }
    return;
  }

  attack(punchingCoord, attacker, target) {
    console.log("someone is attacking");
    if (
      target.getImmune() ||
      target.getBlocking()
    ) {
      return;
    }
    if (this.detectHit(punchingCoord, target)) {
      target.healthBar.decreaseHealth(10);
      console.log("elmo hit!");
      target.isAttacked = true;

      this.emitter.setPosition(target.x - 150, target.y - 200);
      this.emitter.explode();

      if (attacker.body.facing == Phaser.Physics.Arcade.FACING_RIGHT) {
        this.tweens.add({
          targets: target,
          angle: { from: -1, to: 1 },
          duration: 200,
          yoyo: true,
        });
      }

      if (attacker.body.facing == Phaser.Physics.Arcade.FACING_LEFT) {
        this.tweens.add({
          targets: target,
          angle: { from: 1, to: -1 },
          duration: 200,
          yoyo: true,
        });
    }

    }

    //this.time.delayedCall(500, () => (target.isAttacked = false)); called already in player class let's see if works

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
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
    this.detectWin(this.leftPlayer, this.rightPlayer);
    this.checkAttacking(this.leftPlayer, this.rightPlayer);
  }

  checkAttacking (leftPlayer, rightPlayer) {

    if (leftPlayer.getAttacking() === false || rightPlayer.getAttacking() === false ) {
      return
    }
    this.attack(this.leftPlayer.punchingCoord(), this.leftPlayer, this.rightPlayer);
    // ^ maybe should be this.rightPlayer.receiveAttack(attackPosition)
    this.attack(this.rightPlayer.punchingCoord(), this.rightPlayer, this.leftPlayer);
  }

  detectWin(char1, char2) {
    if ((char1.healthBar.healthValue <= 0) || (char2.healthBar.healthValue <= 0)) {
      this.physics.disableUpdate();
      this.KOImage = this.add.image(400, 100, "KO");
      this.KOImage.setScale(0.8);
      //this.KO = this.add.text(300, 50, 'K.O.',
      //{ font: '90px Interstate Bold', fill: '#8B0000' });
      if (char1.healthBar.healthValue <= 0) {
        this.winner2 = this.add.text(200, 180, 'Player 2 Wins!',
          { font: '70px Interstate Bold', fill: '#000000' });
      }
      if (char2.healthBar.healthValue <= 0) {
        this.winner1 = this.add.text(200, 180, 'Player 1 Wins!',
        { font: '70px Interstate Bold', fill: '#000000' });
      }
      this.time.delayedCall(5300, () => (
      this.scene.start("EndScene")));
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

  createPlayer() {

  }

  createElmo() {
    let healthBar = new HealthBar(
      this,
      "Player 1",
      true,
      this.config,
      "elmoProfile"
    );
    this.leftPlayer = new Player(this, 100, 200, leftPlayerKey, healthBar)
      .setOrigin(1)
      .setSize(80, 230)
      .setOffset(100, 40);

    this.leftPlayer.setCollideWorldBounds(true);
    this.leftPlayerControl = new HandleInputs(this, charLeftControl, this.leftPlayer);
  }

  createCookieMonster() {
    let healthBar = new HealthBar(
      this,
      "Player 2",
      false,
      this.config,
      "cookieMonsterProfile"
    );
    this.rightPlayer = new Player(this, 1050, 200, rightPlayerKey, healthBar)
      .setOrigin(1)
      .setSize(100, 230)
      .setOffset(100, 40)
      .setFlipX(true);
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

const charRightControl = {
  up: Phaser.Input.Keyboard.KeyCodes.UP,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  down: Phaser.Input.Keyboard.KeyCodes.DOWN,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  punch: Phaser.Input.Keyboard.KeyCodes.O,
  kick: Phaser.Input.Keyboard.KeyCodes.P,
};

const charLeftControl = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  right: Phaser.Input.Keyboard.KeyCodes.D,
  punch: Phaser.Input.Keyboard.KeyCodes.C,
  kick: Phaser.Input.Keyboard.KeyCodes.V,
};

export default PlayScene;
