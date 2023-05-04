import Cursor from "../selectionScreen/Cursor";
import { charRightControl, charLeftControl } from "../mixin/ControlKey";

class MapSelectScene extends Phaser.Scene {
  constructor(config) {
    super("MapSelectScene");
    this.config = config;
  }
  create() {
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.add.image(this.config.width / 2, this.config.height / 2, "selection");
    this.createLabel();
    this.createMap();
    this.setUpCamera();
    this.createSecondCamera();
  }

  createLabel() {
    this.firstColor = Phaser.Display.Color.HexStringToColor("#FFFFFF");
    this.secondColor = Phaser.Display.Color.HexStringToColor("#0E0E0E");

    this.label = this.add
      .text(
        this.config.width / 2 - 175,
        this.config.height / 2 - 167,
        "Select Map"
      )
      .setFontSize(35)
      .setColor("#E3E3E3")
      .setStroke("#0E0E0E", 10)
      .setFontFamily("'8BIT WONDER', sans-serif");

    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: (tween) => {
        let value = tween.getValue();
        let color = Phaser.Display.Color.Interpolate.ColorWithColor(
          this.firstColor,
          this.secondColor,
          100,
          value
        );
        this.label.setTint(
          Phaser.Display.Color.GetColor(color.r, color.g, color.b)
        );
      },
    });
  }

  update() {
    if (this.spaceKey.isDown) {
      this.toNextScene();
    }
  }

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
    const environment = map.createLayer("environment", tileset);
    const misc = map.createLayer("misc", tileset);
    const characters = map.createLayer("characters", tileset);
    const platformsColliders = map.createLayer("platforms_colliders", tileset);
    const platforms = map.createLayer("platforms", tileset);
    // const spawns = map.getObjectLayer("spawn_points");

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
      environment,
      misc,
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
      this.leftPlayer,
      this.rightPlayer,
      this.cloud,
      this.background,
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

  toNextScene() {
    this.scene.start("InstructionsScene");
  }
}

export default MapSelectScene;
