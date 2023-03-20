class HandleInputs {
    constructor(scene, charKey, character) {
        this.scene = scene;
        this.createKeys(charKey);
        this.character = character;
    }

    createKeys(charKey) {
        this.keyUp = this.scene.input.keyboard.addKey(charKey.up);
        this.keyDown = this.scene.input.keyboard.addKey(charKey.down);
        this.keyLeft = this.scene.input.keyboard.addKey(charKey.left);
        this.keyRight = this.scene.input.keyboard.addKey(charKey.right);
    }

    characterControls() {
        if (this.keyUp.isDown && this.character.y == this.scene.config.height) {
            this.character.body.velocity.y = -600;
        }
    
        if (this.keyLeft.isDown) {
            this.character.setX((this.character.x -= 3)).setFlipX(true);
        }

        if (this.keyDown.isDown) {
            this.character.setY((this.character.y += 20));
        }

        if (this.keyRight.isDown) {
            this.character.setX((this.character.x += 3)).setFlipX(false);
        }
    }
};

export default HandleInputs;