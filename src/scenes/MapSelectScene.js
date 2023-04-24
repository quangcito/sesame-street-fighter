import Cursor from "../selectionScreen/Cursor";
import { charRightControl, charLeftControl } from "../mixin/ControlKey";

class MapSelectScene extends Phaser.Scene{
    constructor(config){
        super('MapSelectScene')
        this.config = config
    }
    create(){
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.image(this.config.width / 2, this.config.height / 2, "selection");
        this.createLabel();
    }

    createLabel() {
        this.firstColor = Phaser.Display.Color.HexStringToColor("#FFFFFF");
        this.secondColor = Phaser.Display.Color.HexStringToColor("#0E0E0E");

        this.label = this.add.text(this.config.width / 2 - 175, this.config.height / 2 - 167, "Select Map")
            .setFontSize(35)
            .setColor("#E3E3E3")
            .setStroke("#0E0E0E", 10)
            .setFontFamily("'8BIT WONDER', sans-serif");

        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: (tween) => {
                let value = tween.getValue()
                let color = Phaser.Display.Color.Interpolate.ColorWithColor(
                    this.firstColor,
                    this.secondColor,
                    100,
                    value
                )
                this.label.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
            }
        });
    }

    update() {
        if (this.spaceKey.isDown) {
            this.toNextScene();
        }
    }

    toNextScene() {
        this.scene.start('PlayScene'); 
    }
}

export default MapSelectScene