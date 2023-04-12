import BaseScene from "./BaseScene"

class EndScene extends BaseScene{
    constructor(config){
        super('EndScene')
        this.config = config
    }

    create(){
        this.createBackground();
        this.nameLabel = this.add.text(200, 130, 'Thanks for Playing!',
        { font: '70px Interstate Bold', fill: '#000000' });        this.startInstruction = this.add.text(300, 400, 'Press SPACE to restart!',
            { font: '50px Interstate Bold', fill: '#000000' });
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    }

    createBackground() {
        this.background = this.add.image(
          this.config.width/2,
          this.config.height/2,
          "endBackground"
        );
        //this.background.setScale(0.8);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start("CharacterSelectScene");
        }
    }
    
}

export default EndScene