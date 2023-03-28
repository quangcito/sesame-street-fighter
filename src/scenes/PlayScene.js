import Phaser from "phaser";
import HandleInputs from "../mixin/HandleInputs";

let keyV;
let keyB;
let isAttacking = false;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
    this.currentWidth = 385;
    this.initialWidth = 385;
    this.healthValue = 100;
    this.style = { fontSize: "30px", color: "0xFFFFFF" };
    this.vertices = [];
    this.damage = 1;
  }

  create() {
    this.createCloud();
    this.createBackground();
    this.createElmo();
    this.createCookieMonster();
    this.createKeys();
    this.physics.add.collider(this.elmo, this.cookieMonster, this.attack);

    this.anims.create({
      key: "punch",
      frames: this.anims.generateFrameNames("elmoPunch", {
        frames: [0, 1, 2, 1, 0],
      }),
      frameRate: 12,
    });
    this.anims.create({
      key: "kick",
      frames: this.anims.generateFrameNames("elmoKick", {
        frames: [0, 1, 2, 1, 0],
      }),
      frameRate: 10,
    });

    let particles = this.add.particles('pixel');
    this.emitter = particles.createEmitter({
      quantity: 15,
      speed: { min: -150, max: 150 },
      scale: { start: 2, end: 0.1 },
      lifespan: 800,
      on: false,
    });
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
  }

  attack() {
    if (isAttacking) {
      console.log("Hit!");
      isAttacking = false;
    }
    this.decreaseHealth(this.damage);
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
    this.elmo = this.physics.add
      .sprite(100, 200, "elmo")
      .setOrigin(1)
      .setSize(100, 230)
      .setOffset(100, 40);

    this.elmo.on(Phaser.Animations.Events.ANIMATION_START, () => {
      this.elmo.setSize(300, 300);
    });
    this.elmo.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.elmo.setSize(100, 230).setOffset(100, 40);
    });

    this.elmo.setCollideWorldBounds(true);
    this.leftCharControl = new HandleInputs(this, charLeft, this.elmo);
  }

  createCookieMonster() {
    this.cookieMonster = this.physics.add
      .sprite(1050, 200, "cookieMonster")
      .setScale(0.2)
      .setOrigin(1)
      .setFlipX(true);
    this.cookieMonster.setCollideWorldBounds(true);
    this.rightCharControl = new HandleInputs(
      this,
      charRight,
      this.cookieMonster
    );
  }

  createKeys() {
    keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
  }

  punch() {
    isAttacking = true;
    this.elmo.play("punch");
    this.emitter.setPosition(this.elmo.x, this.elmo.y);
    this.emitter.explode();
  }

  kick() {
    isAttacking = false;
    this.elmo.play("kick");
    this.emitter.setPosition(this.elmo.x, this.elmo.y);
    this.emitter.explode();
  }

  handleControls() {
    if (keyB.isDown) {
      this.kick();
    }
    if (keyV.isDown) {
      this.punch();
    }
    this.leftCharControl.characterControls();
    this.rightCharControl.characterControls();
  }
}

const charRight = {
  up: Phaser.Input.Keyboard.KeyCodes.UP,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  down: Phaser.Input.Keyboard.KeyCodes.DOWN,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
};

const charLeft = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  right: Phaser.Input.Keyboard.KeyCodes.D,
};

export default PlayScene;
