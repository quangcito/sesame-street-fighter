import BaseScene from "./BaseScene"

class EndScene extends BaseScene{
    constructor(config){
        super('InstructionsScene')
        this.config = config
    }

    create(){
        this.createBackground();
        this.nameLabel = this.add.text(150, 130, 'How to Play!',{
            fontSize:"40px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);

        this.startInstruction = this.add.text(250, 400, 'Press SPACE to continue!', {
            fontSize:"30px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    }

    createBackground() {
        this.background = this.add.image(
          this.config.width/2,
          this.config.height/2,
          "player instructions"
        );
        this.background.setScale(0.5);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start("CharacterSelectScene");
        }
    }
    
}

export default EndScene