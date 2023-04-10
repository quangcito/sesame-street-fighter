import Phaser from 'phaser';

class CharacterIcon extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, imageKey, characterKey) {
        super(scene, x, y, imageKey);
        scene.add.existing(this);
        this.characterKey = characterKey;
    }  
}
export default CharacterIcon;