import Phaser from 'phaser';
import HandleInputs from '../mixin/HandleInputs';

let keyV
let keyB

class PlayScene extends Phaser.Scene{
    constructor(config){
        super('PlayScene')
        this.config = config
    }

    create() {
        this.createCloud();
        this.createBackground();
        this.createElmo();
        this.createCookieMonster();
        this.createKeys();

        this.anims.create({
          key:'punch',
          frames: this.anims.generateFrameNames('elmoPunch', { frames:[0,1,2,1,0]}),
          frameRate:12
        })
        this.anims.create({
          key:'kick',
          frames: this.anims.generateFrameNames('elmoKick', { frames:[0,1,2,1,0]}),
          frameRate:10
        })
      }
    
      update() {
        this.cloud.tilePositionX += 0.5;
        this.handleControls();
      }
    
      createCloud() {
        this.cloud = this.add.tileSprite(
          this.config.width / 2,
          150,
          this.config.width,
          500,
          'cloud'
        );
      }
    
      createBackground() {
        this.background = this.add.image(
          this.config.width / 2,
          this.config.height / 2 + 60,
          'background'
        );
        this.background.setScale(1.6);
      }
    
      createElmo() {
        this.elmo = this.physics.add
          .sprite(100, 200, 'elmo')
          .setOrigin(1)
          .setCollideWorldBounds(true);
        
        // this.elmoPunch = this.physics.add
        //   .image(100, 200)
        //   .setCollideWorldBounds(true)
        //   .setDebugBodyColor("#000000");
         
        // this.elmoPunch.body.setCircle(50);

        // this.elmoGroup = this.add.container(100, 200);
        // this.elmoGroup.add(this.elmo)
        // this.elmoGroup.setSize(200, 300);
      
        // this.physics.world.enable(this.elmoGroup);
        // this.elmoGroup.body.setCollideWorldBounds(true);

        this.leftCharControl = new HandleInputs(this, charLeft, this.elmo);
      }
    
      createCookieMonster() {
        this.cookieMonster = this.physics.add
          .sprite(1050, 200, 'cookieMonster')
          .setScale(0.2)
          .setOrigin(1)
          .setFlipX(true);
        this.cookieMonster.setCollideWorldBounds(true);
        this.rightCharControl = new HandleInputs(this, charRight, this.cookieMonster);
      }
    
      createKeys() {
        keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
      }
    
      punch(){
        this.elmo.play('punch')
      }
    
      kick(){
        this.elmo.play('kick')
      }
      
      handleControls() {
        if(keyB.isDown){
          this.kick()
        }
        if(keyV.isDown) {
          this.punch()
        }
        this.leftCharControl.characterControls();
        this.rightCharControl.characterControls();
    }
}

const charRight = {
  up: Phaser.Input.Keyboard.KeyCodes.UP,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  down: Phaser.Input.Keyboard.KeyCodes.DOWN,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
};

const charLeft = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  right: Phaser.Input.Keyboard.KeyCodes.D,
};

export default PlayScene;