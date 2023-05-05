import BaseScene from "./BaseScene";
export let mapData = null;

class MapSelectScene extends Phaser.Scene {
  constructor(config) {
    super("MapSelectScene");
    this.config = config;
  }

  create() {
    const birdlandMap = this.add
      .image(this.config.width / 4, this.config.height - 300, "birdlandIcon")
      .setOrigin(0.5)
      .setScale(0.25);
    birdlandMap.setInteractive();
    birdlandMap.on("pointerdown", () => {
      mapData = birdland;
      this.scene.start("PlayScene");
    });

    const castlesMap = this.add
      .image(
        (this.config.width / 4) * 3,
        this.config.height - 300,
        "castlesIcon"
      )
      .setScale(0.25)
      .setOrigin(0.5);
    castlesMap.setInteractive();
    castlesMap.on("pointerdown", () => {
      mapData = castles;
      this.scene.start("PlayScene");
    });
  }
}

const birdland = {
  data: "birdland",
  tilesetName: "birdlandTilesetImage",
  image: "birdlandTiles",
};

const castles = {
  data: "castles",
  tilesetName: "castlesTilesetImage",
  image: "castlesTiles",
};

export default MapSelectScene;
