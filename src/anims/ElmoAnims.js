export default (anims) => {
  //LOOK AT THIS FILE AFTER CREATING CHARACTER SELECT SCENE
  anims.create({
    key: "elmopunch",
    frames: this.anims.generateFrameNames("elmoPunch", {
      frames: [0, 1, 2],
      yoyo: true,
    }),
    frameRate: 12,
  });
  anims.create({
    key: "elmokick",
    frames: this.anims.generateFrameNames("elmoKick", {
      frames: [0, 1, 2, 1, 0],
      yoyo: true,
    }),
    frameRate: 10,
  });
};
