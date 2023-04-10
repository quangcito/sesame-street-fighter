import Phaser from 'phaser';

class CharacterIcon extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, imageKey, characterKey) {
        super(scene, x, y, imageKey);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.characterKey = characterKey;
    }  

    getCharacterKey() {
        return this.characterKey;
    }
}
export default CharacterIcon;