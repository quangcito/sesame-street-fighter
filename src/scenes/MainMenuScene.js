import Phaser from "phaser";

class MainMenuScene extends Phaser.Scene{
    constructor(config) {
        super('MainMenuScene');
        this.config = config;
    }

    create() {
        this.createBackground();
        this.createFighterLabel();
        this.createSpaceLabel();

        this.tweens.add({
            targets: this.fighterLabel,
            y: 300,
            duration: 1000,
            ease: 'bounce.out'
        });

        this.tweens.add({
            targets: this.fighterLabel,
            angle: { from: -3, to: 3 },
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        this.tweens.add({
            targets: this.spaceLabel,
            angle: { from: -10, to: 10 },
            scale: 0.5,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });
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

    createFighterLabel() {
        this.fighterLabel = this.add.image(
            500, -50,
            "fighterLabel"
        );
        this.fighterLabel.setScale(0.3);
    }

    createSpaceLabel() {
        this.spaceLabel = this.add.image(
            600, 500,
            "spaceLabel"
        );
        this.spaceLabel.setScale(0.3);
    }


    update() {


        if (this.spaceKey.isDown) {
            this.scene.start("CharacterSelectScene");
        }
    }

}

export default MainMenuScene
