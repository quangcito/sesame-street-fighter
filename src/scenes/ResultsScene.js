import Phaser from 'phaser';
import {winnerPlayer} from './PlayScene';

class ResultsScene extends Phaser.Scene{
    constructor(config){
      super('ResultsScene')
      this.config = config
    }

    create(){
      this.add.image(this.config.width*0.2, this.config.height/2, winnerPlayer.characterKey.defaultImage)
        .setScale(2.5);
      this.add.image(this.config.width/2, this.config.height/2, 'dialogue');
      this.label = this.add.text(120, this.config.height/2-70, '')
          .setWordWrapWidth(400)
          .setColor("#FFFFFF")
          .setStroke("#DCB8A3", 3)
          .setScale(1.3)
          .setFontFamily("'8BIT WONDER', sans-serif")
      this.typingEffect("Looks like you need to learn some new moves!");
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
        delay: 140
      });
    }
}

export default ResultsScene