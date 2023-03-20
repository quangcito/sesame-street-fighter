import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene")
    }
    preload(){
        this.load.image('background', 'src/assets/background.png');
        this.load.image('cloud', 'src/assets/cloud.png');
        this.load.image('elmo', 'src/assets/elmo.png');
        this.load.image('cookieMonster', 'src/assets/cookiemonster.png');
        this.load.image('placeholderButton', 'src/assets/placeholderButton.png');
        this.load.spritesheet('elmoPunch','src/assets/elmo_punching_full.png', {frameWidth:300, frameHeight:300})
        this.load.spritesheet('elmoKick','src/assets/elmo_kicking_full.png', {frameWidth:300, frameHeight:300})
    }

    create(){
       this.scene.start("MainMenuScene")
    }
}
export default PreloadScene