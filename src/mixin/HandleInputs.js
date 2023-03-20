class HandleInputs {
    constructor(scene, charKey) {
        this.scene = scene;
        this.createKeys(charKey);
    }

    createKeys(charKey) {
        this.keyUp = this.scene.input.keyboard.addKey(charKey.up);
        this.keyDown = this.scene.input.keyboard.addKey(charKey.down);
        this.keyLeft = this.scene.input.keyboard.addKey(charKey.left);
        this.keyRight = this.scene.input.keyboard.addKey(charKey.right);
    }

    characterControls(character) {
        if (this.keyUp.isDown && character.y == this.scene.height) {
            character.body.velocity.y = -600;
        }
    
        if (this.keyLeft.isDown) {
            character.setX((character.x -= 3)).setFlipX(false);
        }

        if (this.keyDown.isDown) {
            character.setY((character.y += 20));
        }

        if (this.keyRight.isDown) {
            character.setX((character.x += 3)).setFlipX(true);
        }
    }
};

export default HandleInputs;