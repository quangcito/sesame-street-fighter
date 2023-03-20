import Phaser from 'phaser';

let keyV
let keyB
let keyW;
let keyA;
let keyS;
let keyD;
let keyUp;
let keyLeft;
let keyDown;
let keyRight;

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
        
        this.elmo.setCollideWorldBounds(true);
      }
    
      createCookieMonster() {
        this.cookieMonster = this.physics.add
          .sprite(1050, 200, 'cookieMonster')
          .setScale(0.2)
          .setOrigin(1);
        this.cookieMonster.setCollideWorldBounds(true);
      }
    
      createKeys() {
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
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
        if (keyW.isDown && this.elmo.y == this.config.height) {
          this.elmo.body.velocity.y = -600;
        }
    
        if (keyA.isDown) {
          this.elmo.setX((this.elmo.x -= 3)).setFlipX(true);
        }
    
        if (keyS.isDown) {
          this.elmo.setY((this.elmo.y += 20));
        }
    
        if (keyD.isDown) {
          this.elmo.setX((this.elmo.x += 3)).setFlipX(false);
        }
    
        if (keyUp.isDown && this.cookieMonster.y == this.config.height) {
          this.cookieMonster.body.velocity.y = -600;
        }
    
        if (keyLeft.isDown) {
          this.cookieMonster.setX((this.cookieMonster.x -= 3)).setFlipX(false);
        }
    
        if (keyDown.isDown) {
          this.cookieMonster.setY((this.cookieMonster.y += 20));
        }
    
        if (keyRight.isDown) {
          this.cookieMonster.setX((this.cookieMonster.x += 3)).setFlipX(true);
        }
    }
}

export default PlayScene