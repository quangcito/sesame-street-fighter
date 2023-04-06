export default (anims) => {
  //LOOK AT THIS FILE AFTER CREATING CHARACTER SELECT SCENE
  anims.create({
    key: "cookiepunch",
    frames: this.anims.generateFrameNames("cookiePunch", {
      frames: [0, 1, 2],
      yoyo: true,
    }),
    frameRate: 12,
  });
  anims.create({
    key: "cookiekick",
    frames: this.anims.generateFrameNames("cookieKick", {
      frames: [0, 1, 2],
      yoyo: true,
    }),
    frameRate: 10,
  });
};
