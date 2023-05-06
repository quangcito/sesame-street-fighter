import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  preload() {
    this.load.tilemapTiledJSON("castles", "src/assets/castlesData.json");
    this.load.tilemapTiledJSON("birdland", "src/assets/birdlandData.json");

    this.load.image("castlesTiles", "src/assets/castlesTilesetImage.png");
    this.load.image("birdlandTiles", "src/assets/birdlandTilesetImage.png");
    this.load.image("castlesBg", "src/assets/castlesBg.png");

    this.load.image("birdlandIcon", "src/assets/birdlandIcon.png");
    this.load.image("castlesIcon", "src/assets/castlesIcon.png");

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
    this.load.image("dialogue", "src/assets/dialogueBox.png");

    this.load.audio("soundtrack", [
      "src/assets/Sesame-Street-Fighter-theme.ogg",
      "src/assets/Sesame Street Fighter theme.mp3",
    ]);
    this.load.audio("attack", [
      "src/assets/attack.ogg",
      "src/assets/attack.mp3",
    ]);
    this.load.audio("jump", [
      "src/assets/SFX_Jump_09.ogg",
      "src/assets/SFX_Jump_09.mp3",
    ]);
    this.load.audio("KOsound", [
      "src/assets/KO_isaiah.ogg",
      "src/assets/KO_isaiah.mp3",
    ]);

    this.load.image("elmoSelectionIcon", "src/assets/elmoselection.png");
    this.load.image(
      "cookieSelectionIcon",
      "src/assets/cookiemonsterselection.png"
    );

    this.load.image("leftCursor", "src/assets/leftCursor.png");
    this.load.image("rightCursor", "src/assets/rightCursor.png");
    this.load.image("mapCursor", "src/assets/mapCursor.png");

    this.load.image("Elmo", "src/assets/elmo.png");
    this.load.image("CookieMonster", "src/assets/cookiemonster.png");

    this.load.image("player instructions", "src/assets/Player Controls.png");
    this.load.image("select controls", "src/assets/characterSelectInstructions.png");
    this.load.image("map select controls", "src/assets/mapSelectInstructions.png");

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
    this.load.spritesheet(
      "cookieBlock",
      "src/assets/cookie_blocking_full.png",
      {
        frameWidth: 300,
        frameHeight: 300,
      }
    );

    this.load.spritesheet("elmoPunch", "src/assets/elmo_punching_full.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet("elmoKick", "src/assets/elmo_kicking_full.png", {
      frameWidth: 300,
      frameHeight: 300,
    });
    this.load.spritesheet("elmoBlock", "src/assets/elmo_blocking_full.png", {
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

  // Loading progress of the game
  progress(value) {
    let percentage = Math.round(value * 100) + "%";
    this.loadLabel.setText("loading\n" + percentage);
  }

  create() {
    this.soundtrack = this.sound.add("soundtrack");
    var musicConfig = {
      mute: 0,
      volume: 0.1,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.soundtrack.play(musicConfig);
  }

  update() {
    this.scene.start("MainMenuScene", { music: this.soundtrack });
  }
}
export default PreloadScene;
