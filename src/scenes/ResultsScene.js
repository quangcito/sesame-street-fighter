import Phaser from 'phaser';

class ResultsScene extends Phaser.Scene{
    constructor(config){
        
        super('ResultsScene')
        this.config = config
    }

    create(){
        this.add.image(this.config.width/2, this.config.height/2, 'dialogue')
        this.label = this.add.text(62, this.config.height/2, '')
            .setWordWrapWidth(300)
            .setColor(0x101010)
            .setScale(2);
        this.typingEffect("YOU WIN THIS TIME >< BUT I'LL WIN NEXT TIME")
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