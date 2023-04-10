import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    //load JSON file of map and pngs used.
    this.load.tilemapTiledJSON("map1", "src/assets/test.json");
    this.load.image("tiles-1", "src/assets/dungeon.png");

    this.load.image("background", "src/assets/background.png");
    this.load.image("cloud", "src/assets/cloud.png");
    this.load.image("Elmo", "src/assets/elmo.png");
    this.load.image("CookieMonster", "src/assets/cookiemonster.png");
    this.load.image("placeholderButton", "src/assets/placeholderButton.png");
    this.load.image("healthbar", "src/assets/HealthbarV1.png");
    this.load.image("pixel", "src/assets/pixel.png");
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
  }

  create() {
    this.scene.start("CharacterSelectScene");
  }
}
export default PreloadScene;
