import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.image("cloud", "src/assets/cloud.png");
    this.load.image("Old Andrew", "src/assets/oldAndrew.png");
    this.load.image("New Andrew", "src/assets/newAndrew.png");
    this.load.image("placeholderButton", "src/assets/placeholderButton.png");
    this.load.image("healthbar", "src/assets/HealthbarV1.png");
    this.load.image("pixel", "src/assets/pixel.png");
    this.load.image("elmoProfile", "src/assets/elmoProfile.png");
    this.load.image(
      "cookieMonsterProfile",
      "src/assets/cookieMonsterProfile.png"
    );
    this.load.spritesheet("cookiePunch", "src/assets/newAndrewPunch.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet("cookieKick", "src/assets/newAndrewKick.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet("elmoPunch", "src/assets/oldAndrewPunch.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet("elmoKick", "src/assets/oldAndrewKick.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
  }

  create() {
    this.scene.start("MainMenuScene");
  }
}
export default PreloadScene;
