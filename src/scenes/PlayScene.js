import Phaser from "phaser";
import HandleInputs from "../mixin/HandleInputs";
import Player from "../character/Player";
import HealthBar from "../hud/HealthBar";
import initAnims from "../character/Animation";
import { leftPlayerKey, rightPlayerKey } from "./CharacterSelectScene";
import { charRightControl, charLeftControl } from "../mixin/KeyBinding";
import { mapKey } from "./MapSelectScene";
export let winnerPlayer;

/**
 * This scene handles the actual fighting gameplay of Sesame Street Fighter.
 */
class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  /**
   * This method adds the players, map, sounds, physics, etc. to run the game.
   */
  create() {
    this.map = this.createMap();
    this.mapOffset = Math.abs(this.map.widthInPixels - this.config.width) / 2;
    this.layers = this.createLayers(this.map);
    this.createLeftPlayer();
    this.createRightPlayer();
    this.attackSound = this.sound.add("attack");
    this.KOSound = this.sound.add("KOsound");
    this.soundConfig = {
      volume: 10,
    };
    initAnims(this.anims);

    this.physics.add.collider(this.leftPlayer, this.rightPlayer);

    // The callback method that checks overlap between
    // attack position and the target body coordinate for the left player
    this.leftPlayer.attackCallback = (attackPosition, damage) => {
      let targetChoord = this.rightPlayer.getFrame();
      if (this.checkOverlap(attackPosition, targetChoord)) {
        this.attack(this.leftPlayer, this.rightPlayer, damage);
      }
    };

    // The callback method that checks overlap between
    // attack position and the target body coordinate for the right player
    this.rightPlayer.attackCallback = (attackPosition, damage) => {
      let targetChoord = this.leftPlayer.getFrame();
      if (this.checkOverlap(attackPosition, targetChoord)) {
        this.attack(this.rightPlayer, this.leftPlayer, damage);
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

    this.setUpCamera();
    this.createSecondCamera();

    this.createBackground();
  }

  createBackground() {
    if (mapKey.data == "castles") {
      this.background = this.add
        .image(
          this.map.widthInPixels / 2,
          this.map.heightInPixels / 2,
          "castlesBg"
        )
        .setDepth(-10);
      this.HUDCamera.ignore(this.background);
    }
  }

  setUpCamera() {
    this.cameras.main.setBackgroundColor("#000");
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels - 32
    );
    this.cameras.main
      .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .setSize(this.config.width, this.config.height)
      .fadeIn(2000, 0, 0, 0);
  }

  /**
   *
   * @param {*} player
   * @returns Checks if there is a tile at either the bottom left or bottom right of the bounding box.
   *
   */
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

  /**
   *
   * @param {*} player
   * @param {*} collideLayer
   * Check if the player collides with platform to excute the collider effect
   */
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

  /**
   *
   * @returns This method creates TileMap and images from JSON file.
   */
  createMap() {
    //adds tilemap to background
    const map = this.make.tilemap({ key: mapKey.data });
    //first parameter is name of png file in Tiled. second parameter is key of loaded image
    map.addTilesetImage(mapKey.tilesetName, mapKey.image);
    return map;
  }

  /**
   *
   * @param {*} map
   * @returns layers in of the map created in Tiled.
   */
  createLayers(map) {
    const tileset = map.getTileset(mapKey.tilesetName);
    const platformsColliders = map.createLayer("platforms_colliders", tileset);

    const background = map.createLayer("background", tileset);
    const spawns = map.getObjectLayer("spawn_points");
    const characters = map.createLayer("characters", tileset);
    const environmentBack = map.createLayer("environment_back", tileset);

    const environmentFront = map.createLayer("environment_front", tileset);
    const floor = map.createLayer("floor", tileset);

    const platforms = map.createLayer("platforms", tileset);

    floor.setCollisionByExclusion(-1, true);
    platformsColliders.setCollisionByExclusion(-1, true).forEachTile((tile) => {
      tile.collideRight = false;
      tile.collideLeft = false;
      tile.collideDown = false;
    });

    return {
      floor,
      background,
      platforms,
      spawns,
      platformsColliders,
      environmentBack,
      environmentFront,
      characters,
    };
  }

  /**
   * Create the second camera that focuses on the scene and ignore the health bar
   */
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
      this.layers.background,
      this.layers.platforms,
      this.layers.platformsColliders,
      this.layers.characters,
      this.layers.environmentBack,
      this.layers.environmentFront,
      this.leftPlayer,
      this.rightPlayer,
    ]);
  }

  /**
   * This method zooms the camera in and out
   */
  cameraZoom() {
    let xDistanceBetweenPlayers = Math.abs(
      this.leftPlayer.x - this.rightPlayer.x
    );

    let yDistanceBetweenPlayers = Math.abs(
      this.leftPlayer.y - this.rightPlayer.y
    );

    if (mapKey.data == "birdland") {
      if (
        xDistanceBetweenPlayers > (this.config.width / 3) * 2 ||
        yDistanceBetweenPlayers > (this.config.height / 3) * 2
      ) {
        this.cameraZoomMultiplier = 1.1;
      } else {
        this.cameraZoomMultiplier = 1.4;
      }
    }

    if (mapKey.data == "castles") {
      if (
        xDistanceBetweenPlayers > this.config.width * 0.8 ||
        yDistanceBetweenPlayers > this.config.height * 0.8
      ) {
        this.cameraZoomMultiplier = 0.75;
      } else {
        this.cameraZoomMultiplier = 1.1;
      }
    }
    this.cameras.main.zoomTo(
      this.cameraZoomMultiplier,
      200,
      Phaser.Math.Easing.Quadratic.InOut,
      true
    );
  }

  /**
   * This method expand the camera
   */
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

  /**
   *
   * @param {*} attackCoord
   * @param {*} targetCoord
   * @returns
   */
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

  /**
   *
   * @param {*} attacker
   * @param {*} target
   * @param {*} damage
   * @returns
   * This method handle the attack mechanism in terms of both animation and game
   * logic when 2 players hit each other successfully
   */
  attack(attacker, target, damage) {
    this.attackSound.play();
    if (target.getImmune() || Math.abs(attacker.y - target.y) >= 100) {
      return;
    }

    if (target.healthBar.healthValue < damage) {
      damage = target.healthBar.healthValue;
    }
    target.healthBar.decreaseHealth(damage);

    if (target.healthBar.healthValue <= 0) {
      this.KOSound.play(this.soundConfig);
    }

    target.isAttacked = true;

    // Create paricle effect based on target's blood color
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

  /**
   *
   * @param {*} color
   * @returns the emitter that emits the particle effect that
   * represent blood in the game when a player is attacked
   */
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
    return this.emitter;
  }

  /**
   * Update checks for keyboard input and moves the characters around the screen, 
   * as well as adjusting the camera and checking for a win or loss.
   */
  update() {
    this.cameraPan();
    this.handleControls();
    this.detectWin(this.leftPlayer, this.rightPlayer);
    this.platformCheck(this.rightPlayer, this.rightCollider);
    this.platformCheck(this.leftPlayer, this.leftCollider);
  }

  /**
   * This method checks if the value if a player health bar is 0, which if that occurs will play the KO sound.
   */
  KOsound(char1, char2) {
    if (char1.healthBar.healthValue <= 0 || char2.healthBar.healthValue <= 0) {
      this.KOSound.play(this.soundConfig);
    }
  }

  /**
   * This method checks if the value of a player health bar is 0, 
   * which if it occurs will disable the attacks of each player, display the win image and play the Results scene.
   */
  detectWin(char1, char2) {
    if (char1.healthBar.healthValue <= 0 || char2.healthBar.healthValue <= 0) {
      this.physics.disableUpdate();
      char1.disableAttack();
      char2.disableAttack();
      this.KOImage = this.add.image(550, 100, "KO");
      this.KOImage.setScale(0.8);
      this.cameras.main.ignore(this.KOImage);

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

export default PlayScene;
