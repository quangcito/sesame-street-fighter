import Phaser from "phaser";

const initialWidth = 385;

class HealthBar {
  constructor(scene, characterName, isLeftPlayer, config, profile) {
    this.scene = scene;
    this.characterName = characterName;
    this.isLeftPlayer = isLeftPlayer;
    this.config = config;
    this.profile = profile;
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = 45;
    this.y = 14;
    this.currentWidth = initialWidth;
    this.healthValue = 100;
    scene.add.existing(this.bar);

    if (!isLeftPlayer) {
      this.x = this.config.width - 45;
    }
    this.initializeHealthbar(this.x, this.y);
  }

  initializeHealthbar(x, y) {
    this.scene.add.image(this.calculate(this.x, -8), this.y + 22, this.profile);
    this.frame = this.scene.add.image(0, 0, "healthbar").setOrigin(0);
    this.createVertices(x, y);

    this.text = this.scene.add.text(
      this.calculate(this.x, 30),
      this.frame.y + 45,
      this.characterName,
      { fontSize: "30px", color: "0xFFFFFF" }
    );

    if (!this.isLeftPlayer) {
      this.text.setOrigin(1, 0);
      this.frame
        .setOrigin(1, 0)
        .setPosition(this.config.width, 0)
        .setFlipX(true);
    }

    this.updateGraphic();
  }

  updateGraphic() {
    if (this.healthValue >= 0) {
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
    }
  }

  decreaseHealth(amount) {
    this.healthValue -= amount;
    this.currentWidth -= (initialWidth / 100) * amount;
    this.createVertices(this.x, this.y);
    this.updateGraphic();
  }

  createVertices(x, y) {
    this.vertices = [
      [x, y],
      [this.calculate(x, this.currentWidth), y],
      [this.calculate(x, 15, this.currentWidth), y + 21],
      [this.calculate(x, 15), y + 21],
    ];
  }

  calculate(num1, num2, num3 = 0) {
    if (this.isLeftPlayer) {
      return num1 + num2 + num3;
    } else {
      return num1 - num2 - num3;
    }
  }
}

export default HealthBar;