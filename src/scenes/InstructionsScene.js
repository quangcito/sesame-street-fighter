import BaseScene from "./BaseScene"

class EndScene extends BaseScene{
    constructor(config){
        super('InstructionsScene')
        this.config = config
    }

    create(){
        this.createBackground();
        this.createInstructions();
        this.createLabel();

        this.startInstruction = this.add.text(200, 530, 'Press SPACE to continue!', {
            fontSize:"30px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);   

    }

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

        

    createBackground() {
        this.background = this.add.image(
          this.config.width / 2,
          this.config.height /2,
          "selection"
        );
        //this.background.setScale();
    }

    createInstructions() {
        this.instructions = this.add.image(
            (this.config.width / 2) + 15, (this.config.height / 2) + 50, 
            "player instructions");
        this.instructions.setScale(.5);

    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start("PlayScene");
        }
    }
    
}

export default EndScene