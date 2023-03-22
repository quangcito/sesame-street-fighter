import Phaser from "phaser";

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
var cookiePunchingHand;
let elmoPunchingLocation;
let cookiePunchingLocation;
let elmoX;
let elmoY;
let cookieX;
let cookieY;

class Background extends Phaser.Scene {
  constructor() {
    super("backgroundScene");
  }

  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.image("cloud", "src/assets/cloud.png");
    this.load.image("elmo", "src/assets/elmo.png");
    this.load.image("cookieMonster", "src/assets/cookiemonster.png");
    this.load.spritesheet("elmoPunch","src/assets/elmo_punching_full.png", {frameWidth:300, frameHeight:300})
    this.load.spritesheet("elmoKick","src/assets/elmo_kicking_full.png", {frameWidth:300, frameHeight:300})
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
      frameRate:3
    })
    this.anims.create({
      key:'kick',
      frames: this.anims.generateFrameNames('elmoKick', { frames:[0,1,2,1,0]}),
      frameRate:3
    })

    cookiePunchingHand = this.physics.add.image();
    cookiePunchingHand.body.setCircle(50);
    cookiePunchingHand.setDebugBodyColor(0xffffff);
    cookiePunchingHand.setPosition(this.cookieMonster.x, this.cookieMonster.y);
    cookiePunchingHand.setCollideWorldBounds(true);
    cookiePunchingHand.body.setGravityY(0);

    var cookieContainer = this.add.container(200, 200);
    cookieContainer.add(cookiePunchingHand, this.cookieMonster); 

    
    // cookieContainer.setInteractive(new Phaser.Geom.circle(0, 0, radius), Phaser.Geom.Circle.Contains);   
    // cookieContainer.add(cookieMonster);

    // secondCircle = this.physics.add.image();
    // secondCircle.setDebugBodyColor(0xffffff);
    // secondCircle.setCollideWorldBounds(true);
    // secondCircle.body.setGravityY(0);

    

    // elmoPunchingHand = this.physics.add.image();
    // elmoPunchingHand.body.setCircle(200);
    // elmoPunchingHand.setBounce(1, 1);
    // elmoPunchingHand.setDebugBodyColor(0xffffff);
    // elmoPunchingHand.setPosition(elmo.x, elmo.y);
    // elmoPunchingHand.setCollideWorldBounds(true);

    // this.physics.add.overlap(elmo, this.cookieMonster, function (elmo, cookieMonster) {
    //   if (!collision) {
    //     cookieMonster.destroy();
    //   }
    //   collision = true;
    // });
    
    
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
    this.punchingHand(cookiePunchingHand, this.cookieMonster);
    // this.punchingHand(secondCircle, this.elmo);
    this.detectPunch();
  }

  createCloud() {
    this.cloud = this.add.tileSprite(
      config.width / 2,
      150,
      config.width,
      500,
      "cloud"
    );
  }

  createBackground() {
    this.background = this.add.image(
      config.width / 2,
      config.height / 2 + 60,
      "background"
    );
    this.background.setScale(1.6);
  }

  createElmo() {
    this.elmo = this.physics.add
      .sprite(100, 200, "elmo")
      .setOrigin(1)
      // .setBodySize(175, 210)
    
    this.elmo.setCollideWorldBounds(true);
  }

  createCookieMonster() {
    this.cookieMonster = this.physics.add
      .sprite(1050, 200, "cookieMonster")
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

  punchingHand(circle, player) {
    // circle.setOrigin(player.x, player.y);
    circle.body.reset(player.x - 250, player.y - 250);
  }

  detectPunch() {
    elmoX = this.elmo.x;
    elmoY = this.elmo.y;
    cookieX = this.cookieMonster.x;
    cookieY = this.cookieMonster.y;
    //console.log(cookieY)
    // elmoPunchingLocation.setPosition(200, 200);
    // cookiePunchingLocation.setPosition(200, 200);
    // if (cookiePunchingHand.x === elmoPunchingLocation.x) {
    //   console.log("punch has occurred!!");
    // }
    // console.log("x var is:" + elmoPunchingLocation.x);


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
    if (keyW.isDown && this.elmo.y == config.height) {
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

    if (keyUp.isDown && this.cookieMonster.y == config.height) {
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

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1050,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 900 }
    },
  },
  scene: Background,
};

const game = new Phaser.Game(config);
