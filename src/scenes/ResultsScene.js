import Phaser from 'phaser';
import {winnerPlayer} from './PlayScene';

class ResultsScene extends Phaser.Scene{
    constructor(config){
      super('ResultsScene')
      this.config = config
    }

    create(){
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
          .setStroke("#0E0E0E", 3)
          .setScale(1.6)
          .setFontFamily("'8BIT WONDER', sans-serif")
      this.typingEffect("Looks like you need to learn some new moves!");
      this.time.delayedCall(7000, () => this.scene.start("EndScene"));
    }

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
        delay: 90
      });
    }
}

export default ResultsScene