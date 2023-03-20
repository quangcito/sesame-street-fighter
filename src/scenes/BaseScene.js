import Phaser from "phaser";

class BaseScene extends Phaser.Scene{
    createButton(nextScene,image){
        const placeholderButton = this.add.image(this.config.width/2,this.config.height-100,image).setOrigin(0.5)
        placeholderButton.setInteractive();
        placeholderButton.on('pointerdown', () => this.scene.start(nextScene))
    }

    createTitle(title){
        this.add.text(this.config.width/2,this.config.height/2,title,{fontSize:30, color:'#000000'}).setOrigin(0.5)
    }
}

export default BaseScene