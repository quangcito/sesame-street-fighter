import Phaser from "phaser";

/**
 * This class holds the InstructionsScene, displaying the instructions for Sesame Street Fighter. 
 * This scene also comes after the Map Select scene and before the Play scene.
 */
class InstructionsScene extends Phaser.Scene{
    constructor(config){
        super('InstructionsScene')
        this.config = config
    }

     /**
    * This method creates the scene, and runs multiple methods to add the background, 
    * instructions image button, and instructions label.
    */
    create(){
        this.createBackground();
        this.createInstructions();
        this.createLabel();

        this.startInstruction = this.add.text(210, 530, 'Press SPACE to continue!', {
            fontSize:"30px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);   
    }

    /**
   * This creates and adds the flashing label for the instructions on the screen.
   */
    createLabel() {
        this.firstColor = Phaser.Display.Color.HexStringToColor("#FFFFFF");
        this.secondColor = Phaser.Display.Color.HexStringToColor("#0E0E0E");

        this.label = this.add.text(323, 120, "How to Play!")
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
                let value = tween.getValue()
                let color = Phaser.Display.Color.Interpolate.ColorWithColor(
                    this.firstColor,
                    this.secondColor,
                    100,
                    value
                )
                this.label.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
            }
        });
    }

    /**
     * This method creates and adds the backround image to the scene.
     */
    createBackground() {
        this.background = this.add.image(
          this.config.width / 2,
          this.config.height /2,
          "selection"
        );
    }

    /**
    * This method creates and adds the instruction image.
    */
    createInstructions() {
        this.instructions = this.add.image(
            (this.config.width / 2) + 15, (this.config.height / 2) + 50, 
            "player instructions");
        this.instructions.setScale(.5);
    }

    /**
     * This method checks if the space Key has been pressed, 
     * which then triggers the Play Scene to start.
     */
    update() {
        if (this.spaceKey.isDown) {
            this.scene.start("PlayScene");
        }
    }
}

export default InstructionsScene