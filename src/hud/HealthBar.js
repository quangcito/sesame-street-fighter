import Phaser from "phaser";

class HealthBar {
  constructor(scene, characterName, isLeftPlayer, config) {
    this.scene = scene;
    this.characterName = characterName;
    this.isLeftPlayer = isLeftPlayer;
    this.config = config;
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.currentWidth = 385;
    this.initialWidth = 385;
    this.healthValue = 100;
    this.style = { fontSize: "30px", color: "0xFFFFFF" };
    this.vertices = [];
    scene.add.existing(this.bar);
    this.initializeHealthbar();
  }

  initializeHealthbar() {
    this.frame = this.scene.add.image(0, 0, "healthbar").setOrigin(0);
    if (this.isLeftPlayer) {
      this.vertices = [
        45,
        14,
        45 + this.initialWidth,
        14,
        60 + this.initialWidth,
        35,
        60,
        35,
      ];
      this.scene.add.text(
        this.frame.x + 70,
        this.frame.y + 45,
        this.characterName,
        this.style
      );
    } else {
      this.frame
        .setOrigin(1, 0)
        .setPosition(this.config.width, 0)
        .setFlipX(true);
      this.vertices = [
        this.config.width - 45 - this.initialWidth,
        14,
        this.config.width - 45,
        14,
        this.config.width - 60,
        35,
        this.config.width - 60 - this.initialWidth,
        35,
      ];
      this.scene.add
        .text(
          this.frame.x - 70,
          this.frame.y + 45,
          this.characterName,
          this.style
        )
        .setOrigin(1, 0);
    }
    this.draw();
  }

  draw() {
    if (this.healthValue >= 0) {
      this.bar.clear();
      this.bar.beginPath();

      for (let i = 0; i < this.vertices.length; i += 2) {
        this.bar.lineTo(this.vertices[i], this.vertices[i + 1]);
      }

      if (this.currentWidth <= this.initialWidth / 3) {
        this.bar.fillStyle(0xff0000);
      } else if (this.currentWidth <= (this.initialWidth / 3) * 2) {
        this.bar.fillStyle(0xffff00);
      } else {
        this.bar.fillStyle(0x00ff00);
      }
      this.bar.closePath();
      this.bar.fill();
    }
  }

  decreaseHealth(amount) {
    this.healthValue -= amount;
    this.currentWidth -= (this.initialWidth / 100) * amount;

    if (this.isLeftPlayer) {
      this.vertices = [
        45,
        14,
        45 + this.currentWidth,
        14,
        60 + this.currentWidth,
        35,
        60,
        35,
      ];
    } else {
      this.vertices = [
        this.config.width - 45 - this.currentWidth,
        14,
        this.config.width - 45,
        14,
        this.config.width - 60,
        35,
        this.config.width - 60 - this.currentWidth,
        35,
      ];
    }
    this.draw();
  }
}

export default HealthBar;
