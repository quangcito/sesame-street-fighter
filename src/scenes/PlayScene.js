import Phaser from "phaser";
import HandleInputs from "../mixin/HandleInputs";
import Player from "../character/Player";
import HealthBar from "../hud/HealthBar";
import initAnims from "../character/Animation";
import Timer from "../hud/Timer";
import { leftPlayerKey, rightPlayerKey } from "./CharacterSelectScene";
import { mapData } from "./MapSelectScene";
export let winnerPlayer;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    // this.createCloud();
    // this.createBackground();
    console.log(mapData);
    this.map = this.createMap();
    this.mapOffset = Math.abs(this.map.widthInPixels - this.config.width) / 2;
    this.layers = this.createLayers(this.map);
    console.log(this.layers);

    this.createLeftPlayer();
    this.createRightPlayer();
    this.attackSound = this.sound.add("attack");
    this.KOSound = this.sound.add("KOsound");
    this.soundConfig = {
      volume: 10,
    };
    initAnims(this.anims);

    this.physics.add.collider(this.leftPlayer, this.rightPlayer);

    this.leftPlayer.attackCallback = (attackPosition) => {
      // this.add.circle(attackPosition.x, attackPosition.y, 10, 0x6666ff);

      let targetChoord = this.rightPlayer.getFrame();
      console.log(targetChoord);
      console.log("atk: " + attackPosition);
      if (this.checkOverlap(attackPosition, targetChoord)) {
        this.attack(this.leftPlayer, this.rightPlayer);
      }
    };
    this.rightPlayer.attackCallback = (attackPosition) => {
      // this.add.circle(attackPosition.x, attackPosition.y, 10, 0x6666ff);
      let targetChoord = this.leftPlayer.getFrame();
      if (this.checkOverlap(attackPosition, targetChoord)) {
        this.attack(this.rightPlayer, this.leftPlayer);
      }
    };

    this.leftCollider = this.physics.add.collider(
      this.leftPlayer,
      this.layers.platformsColliders
    );

    this.rightCollider = this.physics.add.collider(
      this.rightPlayer,
      this.layers.platformsColliders
    );

    // this.createTimer();
    this.setUpCamera();
    this.createSecondCamera();
  }

  createTimer() {
    this.timer = new Timer(this, this.config.width / 2, 14);
  }

  createBackground() {
    this.background = this.add.image(
      this.config.width / 2,
      this.config.height / 2 + 60,
      "background"
    );
    this.background.setScale(1.6);
    // this.HUDCamera.ignore(this.background);
  }

  setUpCamera() {
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels - 16
    );
    this.cameras.main
      .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .setSize(this.config.width, this.config.height)
      .fadeIn(2000, 0, 0, 0);
  }

  checkOverlap(attackCoord, targetCoord) {
    // this.add.circle(attackCoord.x, attackCoord.y, "#BDBDBD");
    // this.add.circle(targetCoord.topLeft.x, targetCoord.topLeft.y, "#00FFFF");
    // this.add.circle(targetCoord.botRight.x, targetCoord.botRight.y, "#00FFFF");
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

  attack(attacker, target) {
    if (
      target.getImmune() ||
      Math.abs(attacker.y - target.y) >= 100 ||
      target.getBlocking()
    ) {
      return;
    }
    this.attackSound.play();
    /**if (attacker.isPunching) {
      target.healthBar.decreaseHealth(10);
    }
    **/
    target.healthBar.decreaseHealth(10);

    if (target.healthBar.healthValue <= 0) {
      this.KOSound.play(this.soundConfig);
    }

    console.log("elmo hit!");
    target.isAttacked = true;

    this.createEmitter(target.characterKey.blood)
      .setPosition(target.x, target.y - 200 / 2)
      .explode();

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
    this.HUDCamera.ignore(particles);
    this.emitter.setTint(color);
    console.log(color);
    return this.emitter;
  }

  checkCoords(player) {
    setInterval(() => {
      const graphics = this.add.graphics();
      const rect = new Phaser.Geom.Rectangle(
        player.getFrame().botRight.x,
        player.getFrame().botRight.y,
        1,
        1
      );
      graphics.lineStyle(5, 0xfff);
      graphics.strokeRectShape(rect);
    }, 2000);
  }

  //Checks if there is a tile at either the bottom left or bottom right of the bounding box.
  checkBottomOfBoundingBox(player) {
    let tileAtBottomLeft = this.layers.platformsColliders.hasTileAtWorldXY(
      player.getFrame().botLeft.x,
      player.getFrame().botLeft.y
    );

    let tileAtBottomRight = this.layers.platformsColliders.hasTileAtWorldXY(
      player.getFrame().botRight.x,
      player.getFrame().botRight.y
    );
    if (tileAtBottomLeft || tileAtBottomRight) {
      return true;
    }
  }

  platformCheck(player, collideLayer) {
    //When fast falling player can't go under platform
    if (
      !player.body.onFloor() &&
      Phaser.Input.Keyboard.JustDown(player.controls.keyDown)
    ) {
      collideLayer.active = true;
      //Player can go under platform if they are standing on a platform.
    } else if (
      this.checkBottomOfBoundingBox(player) &&
      Phaser.Input.Keyboard.JustDown(player.controls.keyDown)
    ) {
      collideLayer.active = false;
    } else {
      collideLayer.active = true;
    }
  }

  //creates TileMap and images from JSON file.
  createMap() {
    //adds tilemap to background
    const map = this.make.tilemap({ key: mapData.data });
    //first parameter is name of png file in Tiled. second parameter is key of loaded image
    map.addTilesetImage(mapData.tilesetName, mapData.image);

    return map;
  }

  //creates layers in Tiled.
  createLayers(map) {
    const tileset = map.getTileset(mapData.tilesetName);

    const spawns = map.getObjectLayer("spawn_points");
    const environmentBack = map.createLayer("environment_back", tileset);
    const characters = map.createLayer("characters", tileset);
    const environmentFront = map.createLayer("environment_front", tileset);
    const floor = map.createLayer("floor", tileset);

    const platformsColliders = map.createLayer("platforms_colliders", tileset);
    const platforms = map.createLayer("platforms", tileset);

    floor.setCollisionByExclusion(-1, true);
    platformsColliders.setCollisionByExclusion(-1, true).forEachTile((tile) => {
      tile.collideRight = false;
      tile.collideLeft = false;
      tile.collideDown = false;
    });
    return {
      floor,
      platforms,
      spawns,
      platformsColliders,
      environmentBack,
      environmentFront,
      characters,
    };
  }
  createSecondCamera() {
    this.cameras.main.ignore([
      this.leftPlayer.healthBar,
      this.rightPlayer.healthBar,
    ]);
    this.HUDCamera = this.cameras.add(
      this.cameras.main.x,
      this.cameras.main.y,
      this.config.width,
      this.config.height
    );
    this.HUDCamera.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    ).setSize(this.config.width, this.config.height);
    // HUDCamera.scrollX = this.cameras.main.scrollX;
    // HUDCamera.scrollY = this.cameras.main.scrollY;

    this.cameras.main.on("ZOOM_START", () =>
      HUDCamera.zoomTo(
        this.cameraZoomMultiplier,
        200,
        Phaser.Math.Easing.Quadratic.InOut,
        true
      )
    );
    this.HUDCamera.ignore([
      this.layers.floor,
      this.layers.platforms,
      this.layers.platformsColliders,
      this.layers.characters,
      this.layers.environmentBack,
      this.layers.environmentFront,
      this.leftPlayer,
      this.rightPlayer,
    ]);
    // this.leftPlayer.body.setIgnore(HUDCamera);
    // this.rightPlayer.active = false;
    // this.rightPlayer.visible = false;
  }

  cameraZoom() {
    let xDistanceBetweenPlayers = Math.abs(
      this.leftPlayer.x - this.rightPlayer.x
    );

    let yDistanceBetweenPlayers = Math.abs(
      this.leftPlayer.y - this.rightPlayer.y
    );

    // if (
    //   xDistanceBetweenPlayers > this.config.width * 0.8 ||
    //   yDistanceBetweenPlayers > this.config.height * 0.8
    // ) {
    //   this.cameraZoomMultiplier = 0.667;
    // } else if (
    //   xDistanceBetweenPlayers > (this.config.width / 3) * 2 ||
    //   yDistanceBetweenPlayers > (this.config.height / 3) * 2
    // ) {
    //   this.cameraZoomMultiplier = 1;
    // } else {
    //   this.cameraZoomMultiplier = 1.333;
    // }

    //small map
    // if (
    //   xDistanceBetweenPlayers > (this.config.width / 3) * 2 ||
    //   yDistanceBetweenPlayers > (this.config.height / 3) * 2
    // ) {
    //   this.cameraZoomMultiplier = 1;
    // } else {
    //   this.cameraZoomMultiplier = 1.333;
    // }

    //big map
    if (
      xDistanceBetweenPlayers > this.config.width * 0.8 ||
      yDistanceBetweenPlayers > this.config.height * 0.8
    ) {
      this.cameraZoomMultiplier = 0.667;
    } else {
      this.cameraZoomMultiplier = 1;
    }

    this.cameras.main.zoomTo(
      this.cameraZoomMultiplier,
      150,
      Phaser.Math.Easing.Quadratic.InOut,
      true
    );
  }

  cameraPan() {
    this.cameras.main.pan(
      Math.abs(this.leftPlayer.x + this.rightPlayer.x) / 2,
      Math.abs(this.leftPlayer.y + this.rightPlayer.y) / 2,
      300,
      "Quad",
      true
    );
    if ((this.cameras.main.dirty = true)) {
      this.cameraZoom();
    }
  }

  update() {
    this.cameraPan();
    // this.cloud.tilePositionX += 0.5;
    this.handleControls();
    this.detectWin(this.leftPlayer, this.rightPlayer);
    // this.checkCoords(this.rightPlayer);
    this.platformCheck(this.rightPlayer, this.rightCollider);
    // if (parseInt(this.timer.text) > 0) {
    //   this.timer.updateText();
    // }

    this.platformCheck(this.leftPlayer, this.leftCollider);
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
      this.cameras.main.ignore(this.KOImage);
      //this.KO = this.add.text(300, 50, 'K.O.',
      //{ font: '90px Interstate Bold', fill: '#8B0000' });
      if (char1.healthBar.healthValue <= 0) {
        winnerPlayer = char2;
        this.winner2 = this.add
          .text(230, 200, "Player 2 Wins!", {
            fontSize: "50px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
          })
          .setStroke("#0E0E0E", 10);
        this.cameras.main.ignore(this.winner2);
      }
      if (char2.healthBar.healthValue <= 0) {
        winnerPlayer = char1;
        this.winner1 = this.add
          .text(230, 200, "Player 1 Wins!", {
            fontSize: "50px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
          })
          .setStroke("#0E0E0E", 10);
        this.cameras.main.ignore(this.winner1);
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
    // this.HUDCamera.ignore(this.cloud);
  }

  createLeftPlayer() {
    this.leftPlayer = new Player(
      this,
      this.layers.spawns.objects[1].x,
      this.layers.spawns.objects[1].y,
      leftPlayerKey
    );
    this.leftPlayer.healthBar = new HealthBar(
      this,
      true,
      this.config,
      this.leftPlayer
    );
    this.leftPlayer.setCollideWorldBounds(true);
    this.leftPlayer.controls = new HandleInputs(
      this,
      charLeftControl,
      this.leftPlayer
    );
  }

  createRightPlayer() {
    this.rightPlayer = new Player(
      this,
      this.layers.spawns.objects[0].x,
      this.layers.spawns.objects[0].y,
      rightPlayerKey
    ).setFlipX(true);
    this.rightPlayer.healthBar = new HealthBar(
      this,
      false,
      this.config,
      this.rightPlayer
    );
    this.rightPlayer.setCollideWorldBounds(true);
    this.rightPlayer.controls = new HandleInputs(
      this,
      charRightControl,
      this.rightPlayer
    );
  }

  handleControls() {
    this.leftPlayer.controls.characterControls();
    this.rightPlayer.controls.characterControls();
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
