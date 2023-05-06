import Phaser from 'phaser';

class Cursor extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, imageKey, controlKey, iconArray) {
        super(scene, x, y, imageKey);
        this.scene = scene
        this.scene.add.existing(this);
        this.selectedIconIndex = 0;
        this.chosenIcon = null;
        this.controlKey = controlKey;
        this.createKeys();
        this.iconArray = iconArray;
        this.update();
    }

    createKeys() {
        this.keyLeft = this.scene.input.keyboard.addKey(this.controlKey.left);
        this.keyRight = this.scene.input.keyboard.addKey(this.controlKey.right);
        this.keyDown = this.scene.input.keyboard.addKey(this.controlKey.down);
        this.keyUp = this.scene.input.keyboard.addKey(this.controlKey.up);
    }

    /**
     *
     * @returns This method implements the logic of the key control for selecting map or character
     */
    keyControl() {
        if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {
            this.chosenIcon = null;
            this.setTint();
            this.removeImage();
        }
        if (this.chosenIcon != null) {
            return;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyLeft))
            if (this.selectedIconIndex > 0) {
                this.selectedIconIndex = (this.selectedIconIndex - 1);
            } else {
                this.selectedIconIndex = this.iconArray.length - 1;
            }
        if (Phaser.Input.Keyboard.JustDown(this.keyRight)) {
            this.selectedIconIndex = (this.selectedIconIndex + 1) % this.iconArray.length
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {
            this.chosenIcon = this.iconArray[this.selectedIconIndex];
            this.setTint("#101010");
            this.addImage(this.chosenIcon);
        }
    }

    update() {
        this.keyControl();
        this.selectIcon(this.selectedIconIndex);
    }

    /**
     *
     * @param {*} index
     * This method selects the icon based on its index value
     */
    selectIcon(index) {
        let selectedIcon = this.iconArray[index];
        this.setPosition(selectedIcon.x, selectedIcon.y);
    }

    /**
     * 
     * @returns null if no icon is not chosen, or the character key if otherwise
     * 
     */
    chosenCharacterOrNull() {
        if (this.chosenIcon === null) {
            return null;
        } else {
            return this.chosenIcon.characterKey;
        }
    }
}
export default Cursor;
