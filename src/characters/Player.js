import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, char, punchAnim, kickAnim) {
        super(scene, x, y, char)
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.punchAnim = punchAnim;
        this.kickAnim = kickAnim;
    }

    punch() {
        this.play(this.punchAnim);
    }

    kick() {
        this.play(this.kickAnim);
    }
}

export default Player;

