import Phaser from "phaser";

const initialWidth = 385;

class HealthBar extends Phaser.GameObjects.Container {
  constructor(scene, isLeftPlayer, config, player) {
    super(scene);
    this.scene = scene;
    this.characterName = player.characterKey.displayName;
    this.profilePicture = player.characterKey.profilePicture;
    this.isLeftPlayer = isLeftPlayer;
    this.config = config;
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = 45;
    this.y = 14;
    this.currentWidth = initialWidth;
    this.healthValue = 100;

    if (!isLeftPlayer) {
      this.x = this.config.width;
    }
    this.initializeHealthbar(this.x, this.y);
    scene.add.existing(this);
    this.setScrollFactor(0);
  }

  /**
   *
   * @param {*} x coordinate
   * @param {*} y coordinate
   * Create healthbar with specified character name and frame
   */
  initializeHealthbar(x, y) {
    this.frame = this.scene.add.image(-this.x, 0, "healthbar").setOrigin(0); //creates healthbar frame
    this.profile = this.scene.add.image(
      this.calculate(this.frame.x, +40),
      this.y + 22,
      this.profilePicture
    ); //creates character profile picture
    this.createVertices(0, this.y); //creates the healtbar based on how much health the character has.

    //adds character name below the frame
    this.text = this.scene.add.text(
      this.calculate(this.frame.x, 60),
      this.frame.y + 45,
      this.characterName,
      {
        fontSize: "20px",
        color: "#E3E3E3",
        fontFamily: "'8BIT WONDER', sans-serif",
      }
    );

    if (!this.isLeftPlayer) {
      this.text.setOrigin(1, 0).setPosition(-60, this.frame.y + 45);
      this.frame.setOrigin(1, 0).setFlipX(true).setPosition(0, 0);
      this.profile.setOrigin(1, 0).setPosition(0, 0);
    }

    this.add(this.profile);
    this.add(this.frame);
    this.add(this.text);
    //creates the healtbar based on how much health the character has.
    this.updateHealthBar(); //draws the healthbar and changes color based on how much health the character has left.
  }

  /**
   * Update health bar graphics based on the change of player's health value
   */
  updateHealthBar() {
    if (this.healthValue > 0) {
      this.bar.clear();
      this.bar.beginPath();

      for (let i = 0; i < this.vertices.length; i++) {
        this.bar.lineTo(this.vertices[i][0], this.vertices[i][1]);
      }

      if (this.currentWidth <= initialWidth / 3) {
        this.bar.fillStyle(0xff0000);
      } else if (this.currentWidth <= (initialWidth / 3) * 2) {
        this.bar.fillStyle(0xffff00);
      } else {
        this.bar.fillStyle(0x00ff00);
      }

      this.bar.closePath();
      this.bar.fill();
      this.add(this.bar);
    }
  }

  /**
   *
   * @param {*} amount of health
   * decreases health value and updates the healthbar to have less length.
   */
  decreaseHealth(amount) {
    this.currentWidth -= (initialWidth / 100) * amount;
    this.createVertices(0, this.y);
    this.updateHealthBar();
    this.healthValue -= amount;
  }

  /**
   *
   * @param {*} x
   * @param {*} y
   * adds in the four vertices that makes the health bar graphic.
   */
  createVertices(x, y) {
    if (!this.isLeftPlayer) {
      x = x - 45;
    }
    this.vertices = [
      [x, y],
      [this.calculate(x, this.currentWidth), y],
      [this.calculate(x, 15, this.currentWidth), y + 21],
      [this.calculate(x, 15), y + 21],
    ];
  }

  /**
   *
   * @param {*} num1
   * @param {*} num2
   * @param {*} num3 (default value, 0)
   * @returns
   * adds or subtract numbers depending on whether or not the character spawns on the left side of screen.
   */

  calculate(num1, num2, num3 = 0) {
    if (this.isLeftPlayer) {
      return num1 + num2 + num3;
    } else {
      return num1 - num2 - num3;
    }
  }
}

export default HealthBar;
