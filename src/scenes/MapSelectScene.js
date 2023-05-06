import Phaser from "phaser";
import Cursor from "../selectionGraphics/Cursor";
import SelectionIcon from "../selectionGraphics/SelectionIcon";
import { charRightControl, charLeftControl } from "../mixin/KeyBinding";

export let mapKey = null;

/**
 * This class holds the MapSelectScene, giving players the choice between maps.
 * This scene also comes after the Player Select scene and before the Instructions scene.
 */
class MapSelectScene extends Phaser.Scene {
  constructor(config) {
    super("MapSelectScene");
    this.config = config;
  }

  /**
   * /**
   * This method creates the scene, and runs multiple methods to add the 
   * label, cursor, instructions, etc. to the scene. 
   * Additionally this method handles the selection and unselection
   * of characters.
   */
  create() {
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.add.image(this.config.width / 2, this.config.height / 2, "selection");
    this.createLabel();
    this.createCharacterIcon();
    this.createCursor();
    this.createInstructions();
    this.cursor.addImage = (chosenIcon) => {
      return;
    };
    this.cursor.removeImage = () => {
      return;
    };
  }

  createCharacterIcon() {
    this.birdLandIcon = new SelectionIcon(
      this,
      this.config.width / 2 - 120,
      this.config.height / 2 + 70,
      "birdlandIcon",
      birdland
    );
    this.castlesIcon = new SelectionIcon(
      this,
      this.config.width / 2 + 120,
      this.config.height / 2 + 70,
      "castlesIcon",
      castles
    );
    this.iconArray = [this.birdLandIcon, this.castlesIcon];
  }

  createCursor() {
    this.cursor = new Cursor(
      this,
      0,
      0,
      "mapCursor",
      charRightControl,
      this.iconArray
    );
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

  createInstructions() {
    this.instructions = this.add.image(
      this.config.width / 2,
      this.config.height / 2 + 190,
      "map select controls"
    );
    this.instructions.setScale(0.8);

    this.startInstruction = this.add
      .text(210, 530, "Press SPACE to continue!", {
        fontSize: "30px",
        fill: "#E3E3E3",
        fontFamily: "'8BIT WONDER', sans-serif",
      })
      .setStroke("#0E0E0E", 10)
      .setVisible(false);
  }

  update() {
    this.cursor.update();

    mapKey = this.cursor.chosenCharacterOrNull();

    if (mapKey != null) {
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
    if (mapKey != null) {
      this.scene.start("InstructionsScene");
    }
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
