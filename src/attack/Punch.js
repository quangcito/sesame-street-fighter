import Phaser from 'phaser';

class Punch extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, animation) {
        super(scene, x, y, key);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.character = null;
        this.animation = animation;
    }

    attack(character) {
        this.character = character;
        this.body.reset.apply(character.x, character.y);
        this.character.play(this.animation);
    }
}

export default Punch;