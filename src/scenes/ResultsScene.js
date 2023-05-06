import Phaser from 'phaser';
import { winnerPlayer } from './PlayScene';

/**
 * This class holds the Results scene, displaying the background results image 
 * and displaying a specific win scene dialogue to each character.
 * This scene also comes after the Play scene and before the End scene.
 */
class ResultsScene extends Phaser.Scene {
    constructor(config) {
      super('ResultsScene')
      this.config = config
    }

    /**
    * This method creates the scene, and runs multiple methods to add the specific win image,
    * and proceed to the End scene after a delayed call.
    */
    create() {
      this.add.image(
        this.config.width/2,
        this.config.height/2-350,
        "background"
      ).setScale(3.6);
      this.add.image(this.config.width*0.2, this.config.height/2, winnerPlayer.characterKey.defaultImage)
        .setScale(2.5);
      this.add.image(this.config.width/2, this.config.height/2, 'dialogue');
      
      this.label = this.add.text(120, this.config.height/2-70, '')
          .setWordWrapWidth(600)
          .setColor("#E3E3E3")
          .setStroke("#0E0E0E", 5)
          .setScale(1.2)
          .setFontFamily("'8BIT WONDER', sans-serif");
      this.quote = winnerPlayer.characterKey.quote;
      this.typingEffect(this.quote);
      this.time.delayedCall(6500, () => this.scene.start("EndScene"));
    }

    /**
     *
     * @param {*} text for the dialogue box
     * This method adds typing effect for the text in the end game's dialogue box
     *
     */
    typingEffect(text) {
      const lines = this.label.getWrappedText(text);
      const wrappedText = lines.join('\n');
      const length = wrappedText.length;
      let i = 0;

      this.time.addEvent({
        callback: () => {
          this.label.text += wrappedText[i];
          ++i;
        },
        repeat: length - 1,
        delay: 40
      });
    }
}

export default ResultsScene
