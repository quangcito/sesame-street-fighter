class HandleInputs {
    constructor(scene, charKey, character) {
        this.scene = scene;
        this.createKeys(charKey);
        this.character = character;
        this.maxJump = 1;
        this.jumpCount = 0;
    }

    createKeys(charKey) {
        this.keyUp = this.scene.input.keyboard.addKey(charKey.up);
        this.keyDown = this.scene.input.keyboard.addKey(charKey.down);
        this.keyLeft = this.scene.input.keyboard.addKey(charKey.left);
        this.keyRight = this.scene.input.keyboard.addKey(charKey.right);
    }

    characterControls() {
        if (this.keyLeft.isDown) {
            this.character.setVelocityX(-180).setFlipX(true);
        } else if (this.keyRight.isDown) {
            this.character.setVelocityX(180).setFlipX(false);
        } else(this.character.setVelocityX(0))
        if (this.keyDown.isDown) {
            this.character.setVelocityY(800);
        }

        if (this.keyUp.isDown && this.jumpCount < this.maxJump) {
            
            this.jumpCount++
            console.log(this.jumpCount)
            this.character.setVelocityY(-850);
        }
        
        if(this.character.body.onFloor()){
            this.jumpCount = 0;
        }
    }
};

export default HandleInputs;