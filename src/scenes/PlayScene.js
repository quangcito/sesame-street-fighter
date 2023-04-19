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
    this.map = this.createMap();
    this.mapOffset = Math.abs(this.map.widthInPixels - this.config.width) / 2;
    this.layers = this.createLayers(this.map);

    this.createLeftPlayer();
    this.createRightPlayer();

    console.log(!this.rightPlayer.body.blocked.left);
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
    // ^ maybe should be this.rightPlayer.receiveAttack(attackPosition)
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

    this.leftFloorCollider = this.physics.add.collider(
      this.leftPlayer,
      this.layers.floor
    );

    this.rightCollider = this.physics.add.collider(
      this.rightPlayer,
      this.layers.platformsColliders
    );

    this.rightFloorCollider = this.physics.add.collider(
      this.rightPlayer,
      this.layers.floor
    );
    this.setUpCamera();

    this.cameras.main.startFollow(this.rightPlayer);
  }

  setUpCamera() {
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.config.height
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

    target.healthBar.decreaseHealth(10);
    console.log("elmo hit!");
    target.isAttacked = true;

    this.createEmitter(target.characterKey.blood)
      .setPosition(target.x, target.y - 200 / 2)
      .explode();

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
    this.emitter.setTint(color);
    console.log(color);
    return this.emitter;
  }

  checkCoords(player) {
    setInterval(() => {
      const graphics = this.add.graphics();
      const rect = new Phaser.Geom.Rectangle(
        player.getFrame().topRight.x,
        player.getFrame().topRight.y - 12,
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
    }
    //player can fall onto a platform after going under a different platform
    else if (
      this.checkBottomOfBoundingBox(player) ||
      player.body.velocity.y >= 0
    ) {
      collideLayer.active = true;
      //Players can jump onto platforms
    } else if (player.body.velocity.y < 0) {
      collideLayer.active = false;
    }
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
    const platformsColliders = map.createLayer("platforms_colliders", tileset);
    // console.log(tileset);
    // platformsColliders.forEachTile((tile) => {
    //   console.log(tile);
    // }, platformsColliders);

    const platforms = map.createLayer("platforms", tileset);
    const spawns = map.getObjectLayer("spawn_points");

    floor.setCollisionByExclusion(-1, true);
    platformsColliders.setCollisionByExclusion(-1, true);
    return { floor, platforms, spawns, platformsColliders };
  }

  update() {
    this.handleControls();
    this.detectWin(this.leftPlayer, this.rightPlayer);
    // this.checkCoords(this.rightPlayer);
    this.platformCheck(this.rightPlayer, this.rightCollider);
    this.platformCheck(this.leftPlayer, this.leftCollider);
    // !player.body.blocked && player.body.touching.left;
  }

  detectWin(char1, char2) {
    if (char1.healthBar.healthValue <= 0 || char2.healthBar.healthValue <= 0) {
      this.physics.disableUpdate();
      this.KOImage = this.add.image(400, 100, "KO");
      this.KOImage.setScale(0.8);
      //this.KO = this.add.text(300, 50, 'K.O.',
      //{ font: '90px Interstate Bold', fill: '#8B0000' });
      if (char1.healthBar.healthValue <= 0) {
        this.winner2 = this.add.text(200, 180, "Player 2 Wins!", {
          font: "70px Interstate Bold",
          fill: "#000000",
        });
      }
      if (char2.healthBar.healthValue <= 0) {
        this.winner1 = this.add.text(200, 180, "Player 1 Wins!", {
          font: "70px Interstate Bold",
          fill: "#000000",
        });
      }
      this.time.delayedCall(5300, () => this.scene.start("EndScene"));
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
