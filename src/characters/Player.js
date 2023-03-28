import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, char) {
        super(scene, x, y, char)
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }
}

export default Player;

