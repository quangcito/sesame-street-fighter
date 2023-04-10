import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.image("selection", "src/assets/selectionScreen.png");
    this.load.image("cloud", "src/assets/cloud.png");

    this.load.image("elmoSelectionIcon", "src/assets/elmoselection.png");
    this.load.image("cookieSelectionIcon", "src/assets/cookiemonsterselection.png")

    this.load.image("leftCursor", "src/assets/leftCursor.png")
    this.load.image("rightCursor", "src/assets/rightCursor.png")

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

    this.load.spritesheet("cookiePunch", "src/assets/cookie_punching_full.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
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
    this.scene.start("MainMenuScene");
  }
}
export default PreloadScene;
