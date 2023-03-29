import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, char, punchAnim, kickAnim) {
        super(scene, x, y, char);
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.attacking = false;

        this.punchAnim = punchAnim;
        this.kickAnim = kickAnim;

        this.on(Phaser.Animations.Events.ANIMATION_START, () => {this.setSize(140, 230), this.setOffset(100, 40)});
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {this.setSize(100, 230)
            .setOffset(100, 40); this.attacking = false;});
    }

    punch() {
        this.attacking = true
        this.play(this.punchAnim);
    }

    kick() {
        this.attacking = true;
        this.play(this.kickAnim);
    }

    isAttacking() {
        return this.attacking;
    }

    setAttacking(attacking) {
        this.attacking = attacking; 
    }
}

export default Player;