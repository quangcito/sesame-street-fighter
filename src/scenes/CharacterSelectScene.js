import Phaser from "phaser";
import SelectionIcon from "../selectionGraphics/SelectionIcon";
import Cursor from "../selectionGraphics/Cursor";
import { charRightControl, charLeftControl } from "../mixin/KeyBinding";

export let leftPlayerKey = null;
export let rightPlayerKey = null;

let leftPlayerImage, rightPlayerImage;

class CharacterSelectScene extends Phaser.Scene {
  constructor(config) {
    super("CharacterSelectScene");
    this.config = config;
  }

  create() {
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.add.image(this.config.width / 2, this.config.height / 2, "selection");
    this.createLabel();
    this.createInstructions();
    this.createCharacterIcon();
    this.createCursor();
    this.createHand();
    this.leftCursor.addImage = (chosenIcon) => {
      leftPlayerImage = this.add.image(
        this.config.width * 0.2,
        this.config.height * 0.7,
        chosenIcon.characterKey.defaultImage
      );
      this.leftHand.setVisible(false);
    };

    this.leftCursor.removeImage = () => {
      try {
        leftPlayerImage.destroy();
        this.leftHand.setVisible(true);
      } finally {
        return;
      }
    };

    this.rightCursor.addImage = (chosenIcon) => {
      rightPlayerImage = this.add
        .image(
          this.config.width * 0.8,
          this.config.height * 0.7,
          chosenIcon.characterKey.defaultImage
        )
        .setFlipX(true);
      this.rightHand.setVisible(false);
    };

    this.rightCursor.removeImage = () => {
      try {
        rightPlayerImage.destroy();
        this.rightHand.setVisible(true);
      } finally {
        return;
      }
    };

    this.startInstruction = this.add
      .text(210, 530, "Press SPACE to continue!", {
        fontSize: "30px",
        fill: "#E3E3E3",
        fontFamily: "'8BIT WONDER', sans-serif",
      })
      .setStroke("#0E0E0E", 10);
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.startInstruction.setVisible(false);
  }

  createLabel() {
    this.firstColor = Phaser.Display.Color.HexStringToColor("#FFFFFF");
    this.secondColor = Phaser.Display.Color.HexStringToColor("#0E0E0E");

    this.label = this.add
      .text(
        this.config.width / 2 - 230,
        this.config.height / 2 - 167,
        "Select Fighter"
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

  createInstructions() {
    this.instructions = this.add.image(
      this.config.width / 2,
      this.config.height / 2 + 190,
      "select controls"
    );
    this.instructions.setScale(0.8);
  }

  createCharacterIcon() {
    this.elmoIcon = new SelectionIcon(
      this,
      this.config.width / 2 - 100,
      this.config.height / 2 + 70,
      "elmoSelectionIcon",
      elmo
    );
    this.cookieIcon = new SelectionIcon(
      this,
      this.config.width / 2 + 100,
      this.config.height / 2 + 70,
      "cookieSelectionIcon",
      cookie
    );
    this.iconArray = [this.elmoIcon, this.cookieIcon];
  }

  createCursor() {
    this.leftCursor = new Cursor(
      this,
      0,
      0,
      "leftCursor",
      charLeftControl,
      this.iconArray
    );
    this.rightCursor = new Cursor(
      this,
      0,
      0,
      "rightCursor",
      charRightControl,
      this.iconArray
    );
  }

  createHand() {
    this.leftHand = this.add
      .image(this.config.width * 0.2, this.config.height * 0.7, "hand")
      .setFlipX(true);
    this.rightHand = this.add.image(
      this.config.width * 0.8,
      this.config.height * 0.7,
      "hand"
    );
    this.tweens.add({
      targets: this.leftHand,
      y: { from: this.config.height * 0.7, to: this.config.height * 0.5 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
    this.tweens.add({
      targets: this.rightHand,
      y: { from: this.config.height * 0.7, to: this.config.height * 0.5 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  update() {
    this.leftCursor.update();
    this.rightCursor.update();

    leftPlayerKey = this.leftCursor.chosenCharacterOrNull();
    rightPlayerKey = this.rightCursor.chosenCharacterOrNull();

    if (leftPlayerKey != null && rightPlayerKey != null) {
      this.startInstruction.setVisible(true);
      this.instructions.setVisible(false);
    } else {
      this.startInstruction.setVisible(false);
      this.instructions.setVisible(true);
    }

    if (this.spaceKey.isDown) {
      this.toNextScene();
    }
  }

  toNextScene() {
    if (leftPlayerKey != null && rightPlayerKey != null) {
      this.scene.start("MapSelectScene");
    }
  }
}

const elmo = {
  defaultImage: "Elmo",
  displayName: "Elmo",
  profilePicture: "elmoProfile",
  size: [80, 230],
  blood: 0xff0000,
  quote:
    "Elmo thinks you should keep praticing, because you can't keep living like a loser like that.",
  punch: {
    anim: "elmopunch",
    delay: 175,
    position: [45, 90],
    damage: 10,
    cooldown: 500,
  },
  kick: {
    anim: "elmokick",
    delay: 175,
    position: [45, 105],
    damage: 20,
    cooldown: 750,
  },
  block: {
    anim: "elmoblock",
  },
};

const cookie = {
  defaultImage: "CookieMonster",
  displayName: "Cookie Monster",
  profilePicture: "cookieMonsterProfile",
  size: [100, 230],
  blood: 0x0000ff,
  quote: "Om nom nom nom. C is for cookie, and B is for you, you little B****.",
  punch: {
    anim: "cookiepunch",
    delay: 175,
    position: [45, 90],
    damage: 10,
    cooldown: 500,
  },
  kick: {
    anim: "cookiekick",
    delay: 175,
    position: [45, 105],
    damage: 20,
    cooldown: 750,
  },
  block: {
    anim: "cookieblock",
  },
};

export default CharacterSelectScene;
