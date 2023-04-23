class Timer {
  constructor(scene, x, y) {
    this.currentTime = 90;
    this.timeText = scene.add.text(x, y, this.currentTime);
    scene.add.existing(this);
  }

  updateText() {
    setInterval(() => {
      this.currentTime -= 1;
      this.timeText.setText(this.currentTime);
      console.log("1 second");
    }, 1000);
  }
}

export default Timer;
