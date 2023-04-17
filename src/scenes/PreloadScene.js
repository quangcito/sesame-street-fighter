import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.tilemapTiledJSON("map1", "src/assets/test.json");
    this.load.image("tiles-1", "src/assets/dungeon.png");

    this.load.image("background", "src/assets/background.png");
    this.load.image("menuBackground", "src/assets/sesame-street.jpg");
    this.load.image("endBackground", "src/assets/endArt.jpg");
    this.load.image(
      "fighterLabel",
      "src/assets/fighter-logo-png-transparent.png"
    );
    this.load.image("spaceLabel", "src/assets/space.png");
    this.load.image("selection", "src/assets/selectionScreen.png");
    this.load.image("cloud", "src/assets/cloud.png");
    this.load.image("KO", "src/assets/KO.png");
    this.load.image("hand", "src/assets/hand.png");

    this.load.image("elmoSelectionIcon", "src/assets/elmoselection.png");
    this.load.image(
      "cookieSelectionIcon",
      "src/assets/cookiemonsterselection.png"
    );

    this.load.image("leftCursor", "src/assets/leftCursor.png");
    this.load.image("rightCursor", "src/assets/rightCursor.png");

    this.load.image("Elmo", "src/assets/elmo.png");
    this.load.image("CookieMonster", "src/assets/cookiemonster.png");

    this.load.image("placeholderButton", "src/assets/placeholderButton.png");

    this.load.image("healthbar", "src/assets/HealthbarV1.png");
    this.load.image("pixel", "src/assets/pixel.png");
    this.load.image("bluePixel", "src/assets/bluePixel.png");
    this.load.image("elmoProfile", "src/assets/elmoProfile.png");
    this.load.image(
      "cookieMonsterProfile",
      "src/assets/cookieMonsterProfile.png"
    );

    this.load.spritesheet(
      "cookiePunch",
      "src/assets/cookie_punching_full.png",
      {
        frameWidth: 300,
        frameHeight: 300,
      }
    );
    this.load.spritesheet("cookieKick", "src/assets/cookie_kicking_full.png", {
      frameWidth: 300,
      frameHeight: 300,
    });

    this.load.spritesheet("elmoPunch", "src/assets/elmo_punching_full.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet("elmoKick", "src/assets/elmo_kicking_full.png", {
      frameWidth: 300,
      frameHeight: 300,
    });

    this.loadLabel = this.add.text(500, 250, "loading\n0%", {
      font: "60px Interstate Bold",
      fill: "#fff",
      align: "center",
    });
    this.loadLabel.setOrigin(0.5, 0.5);
    this.load.on("progress", this.progress, this);
  }

  progress(value) {
    let percentage = Math.round(value * 100) + "%";
    this.loadLabel.setText("loading\n" + percentage);
  }

  update() {
    this.scene.start("MainMenuScene");
  }
}
export default PreloadScene;
