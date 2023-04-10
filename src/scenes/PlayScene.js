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
    var KO;
  }

  create() {
    this.createCloud();
    const map = this.createMap();
    this.layers = this.createLayers(map);

    this.createElmo();
    this.createCookieMonster();
    initAnims(this.anims);

    this.physics.add.collider(this.leftPlayer, this.rightPlayer, () => {
      if (this.leftPlayer.isAttacking()) {
        this.attack(this.leftPlayer, this.rightPlayer);
      } else if (this.rightPlayer.isAttacking()) {
        this.attack(this.rightPlayer, this.leftPlayer);
      }
    });

    console.log(this.layers.platforms);
    this.physics.add.collider(this.leftPlayer, this.layers.platforms);

    // this.physics.add.collider(this.rightPlayer, this.layers.platforms, () => {
    //   // this.layers.platforms.forEach( => {

    //   // });
    //   if (this.rightPlayer.y < this.layers.platforms.displayHeight) {
    //     this.layers.platforms.setCollisionByExclusion(323);
    //   } else {
    //     this.layers.platforms.setCollisionByExclusion(-1);
    //   }
    // });

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
      !char2.getImmune() &&
      Math.abs(char1.y - char2.y) < 100 &&
      !char2.getBlocking()
    ) {
      char2.healthBar.decreaseHealth(10);
      console.log("elmo hit!");
      char2.isAttacked = true;

      this.emitter.setPosition(char2.x - 150, char2.y - 200);
      this.emitter.explode();

      if (char1.body.facing == Phaser.Physics.Arcade.FACING_RIGHT) {
        this.tweens.add({
          targets: char2,
          angle: { from: -1, to: 1 },
          duration: 200,
          yoyo: true,
        });
      }

      if (char1.body.facing == Phaser.Physics.Arcade.FACING_LEFT) {
        this.tweens.add({
          targets: char2,
          angle: { from: 1, to: -1 },
          duration: 200,
          yoyo: true,
        });
      }

      this.time.delayedCall(500, () => (char2.isAttacked = false));

      if (char2.getBounds().right >= this.config.width) {
        char1.setPosition(char1.x - 20, char1.y);
      } else if (char2.getBounds().left <= 0) {
        char1.setPosition(char1.x + 20, char1.y);
      } else if (char2.x > char1.x) {
        char2.setPosition(char2.x + 20, char2.y);
      } else {
        char2.setPosition(char2.x - 20, char2.y);
      }

      char2.setImmune(true);
      this.time.delayedCall(500, () => {
        char2.setImmune(false);
      });
    }

    // this.cameras.main.setBounds(300, 0, 1000, 600);
    // this.cameras.main.startFollow(this.elmo);
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
    this.detectWin(this.leftPlayer, this.rightPlayer);
    this.time.delayedCall(1000, () => {
      console.log("body: " + this.rightPlayer.y);
      console.log("display: " + this.rightPlayer.displayOriginY);
      console.log(
        "platform y " +
          this.layers.platforms.getTileAtWorldXY(
            this.rightPlayer.x,
            this.rightPlayer.y
          )
      );
    });
  }

  detectWin(char1, char2) {
    // console.log("Healthbar is " + char2.healthBar.healthValue);
    if (char1.healthBar.healthValue <= 0 || char2.healthBar.healthValue <= 0) {
      //KO = this.add.bitmapText(250, 250, null, 'K.O.', 64);
      this.time.delayedCall(3000, () => this.scene.start("EndScene"));
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

  //creates TileMap and images from JSON file.
  createMap() {
    //adds tilemap to background
    const map = this.make.tilemap({ key: "map1" });
    //first parameter is name of png file in Tiled. second parameter is key of loaded image
    map.addTilesetImage("Dungeon", "tiles-1");
    return map;
  }

  //creates layers in Tiled.
  createLayers(map) {
    const tileset = map.getTileset("Dungeon");
    const floor = map.createLayer("floor", tileset);
    const platforms = map.createLayer("platforms", tileset);

    platforms.setCollisionByExclusion(-1, true);
    return { floor, platforms };
  }

  createElmo() {
    let healthBar = new HealthBar(
      this,
      "Elmo",
      true,
      this.config,
      "elmoProfile"
    );
    this.leftPlayer = new Player(this, 100, 200, leftPlayerKey, healthBar)
      .setOrigin(1)
      .setSize(80, 230)
      .setOffset(100, 40)
      .setScale(0.5);

    this.leftPlayer.setCollideWorldBounds(true);
    this.leftPlayerControl = new HandleInputs(this, charLeft, this.leftPlayer);
  }

  createCookieMonster() {
    let healthBar = new HealthBar(
      this,
      "Cookie Monster",
      false,
      this.config,
      "cookieMonsterProfile"
    );
    this.rightPlayer = new Player(this, 1050, 200, rightPlayerKey, healthBar)
      .setOrigin(1)
      .setSize(100, 230)
      .setOffset(100, 40)
      .setFlipX(true)
      .setScale(0.5);
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
