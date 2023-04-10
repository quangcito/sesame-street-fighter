import BaseScene from "./BaseScene"

class MainMenuScene extends Phaser.Scene{
    constructor(config) {
        super('MainMenuScene');
        this.config = config;
    }

    create() {
        this.createBackground();
        this.nameLabel = this.add.text(250, -50, 'Sesame Street Fighter',
            { font: '70px Interstate Bold', fill: '#880808' });
        this.startInstruction = this.add.text(400, 500, 'Press SPACE to start!',
            { font: '50px Interstate Bold', fill: '#880808' });
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    createBackground() {
        this.background = this.add.image(
          this.config.width/2,
          this.config.height/2,
          "menuBackground"
        );
        this.background.setScale(0.5);
    }

    update() {
        this.tweens.add({
            targets: this.nameLabel,
            y: 300,
            duration: 100,
            ease: 'bounce.out'
        });
        if (this.spaceKey.isDown) {
            this.scene.start("CharacterSelectScene");
        }
    }

}

export default MainMenuScene
