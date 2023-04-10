import Phaser from 'phaser';

class Cursor extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, imageKey, controlKey, iconArray) {
        super(scene, x, y, imageKey);
        this.scene = scene
        this.scene.add.existing(this);
        this.selectedIcon = 0;
        this.controlKey = controlKey;
        this.createKeys();
    }  

    createKeys() {
        this.keyLeft = this.scene.input.keyboard.addKey(this.controlKey.left);
        this.keyRight = this.scene.input.keyboard.addKey(this.controlKey.left);
    }
}
export default Cursor;