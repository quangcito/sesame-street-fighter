import Phaser from "phaser";

let keyW;
let keyA;
let keyS;
let keyD;
let keyUp;
let keyLeft;
let keyDown;
let keyRight;

class Background extends Phaser.Scene {
  constructor() {
    super("backgroundScene");
  }

  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.image("cloud", "src/assets/cloud.png");
    this.load.image("elmo", "src/assets/elmo.png");
    this.load.image("cookieMonster", "src/assets/cookiemonster.png");
  }

  create() {
    this.createCloud();
    this.createBackground();
    this.createElmo();
    this.createCookieMonster();
    this.createKeys();
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
  }

  createCloud() {
    this.cloud = this.add.tileSprite(
      config.width / 2,
      150,
      config.width,
      500,
      "cloud"
    );
  }

  createBackground() {
    this.background = this.add.image(
      config.width / 2,
      config.height / 2 + 60,
      "background"
    );
    this.background.setScale(1.6);
  }

  createElmo() {
    this.elmo = this.physics.add
      .sprite(100, 200, "elmo")
      .setScale(0.2)
      .setOrigin(1)
      .setFlipX(true);

    this.elmo.setCollideWorldBounds(true);
  }

  createCookieMonster() {
    this.cookieMonster = this.physics.add
      .sprite(1050, 200, "cookieMonster")
      .setScale(0.2)
      .setOrigin(1);
    this.cookieMonster.setCollideWorldBounds(true);
  }

  createKeys() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  handleControls() {
    if (keyW.isDown && this.elmo.y == config.height) {
      this.elmo.body.velocity.y = -600;
    }

    if (keyA.isDown) {
      this.elmo.setX((this.elmo.x -= 3)).setFlipX(false);
    }

    if (keyS.isDown) {
      this.elmo.setY((this.elmo.y += 20));
    }

    if (keyD.isDown) {
      this.elmo.setX((this.elmo.x += 3)).setFlipX(true);
    }

    if (keyUp.isDown && this.cookieMonster.y == config.height) {
      this.cookieMonster.body.velocity.y = -600;
    }

    if (keyLeft.isDown) {
      this.cookieMonster.setX((this.cookieMonster.x -= 3)).setFlipX(false);
    }

    if (keyDown.isDown) {
      this.cookieMonster.setY((this.cookieMonster.y += 20));
    }

    if (keyRight.isDown) {
      this.cookieMonster.setX((this.cookieMonster.x += 3)).setFlipX(true);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1050,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 },
    },
  },
  scene: Background,
};

const game = new Phaser.Game(config);
