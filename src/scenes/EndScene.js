import Phaser from "phaser";

/**
 * This class holds the EndScene, displaying the end scene image 
 * and giving players an option to return to the player select scene.
 * This scene also comes after the Results scene and returns to the Player Select scene.
 */
class EndScene extends Phaser.Scene{
    constructor(config){
        super('EndScene')
        this.config = config
    }

    /**
    * This method creates the scene, and runs multiple methods to add the background, and restart button.
    */
    create(){
        this.createBackground();
        this.nameLabel = this.add.text(150, 130, 'Thanks for Playing!',{
            fontSize:"40px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);

        this.startInstruction = this.add.text(250, 400, 'Press SPACE to restart!', {
            fontSize:"30px",
            fill: "#E3E3E3",
            fontFamily: "'8BIT WONDER', sans-serif",
        }).setStroke("#0E0E0E", 10);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    }
    
    /**
     * This method creates and adds the background for the end scene.
     */
    createBackground() {
        this.background = this.add.image(
          this.config.width/2,
          this.config.height/2,
          "endBackground"
        );
    }

    /**
     * This method checks if the space Key has been pressed, 
     * which then triggers the CharacterSelect Scene to start.
     */
    update() {
        if (this.spaceKey.isDown) {
            this.scene.start("CharacterSelectScene");
        }
    }
}

export default EndScene