/**
 * Animation configuration for the game characters
 */
export default (anims) => {
  anims.create({
    key: "elmopunch",
    frames: anims.generateFrameNames("elmoPunch", {
      frames: [0, 1, 2, 1, 0],
    }),
    frameRate: 12,
  });
  anims.create({
    key: "elmokick",
    frames: anims.generateFrameNames("elmoKick", {
      frames: [0, 1, 2, 1, 0],
    }),
    frameRate: 10,
  });

  anims.create({
    key: "cookiepunch",
    frames: anims.generateFrameNames("cookiePunch", {
      frames: [0, 1, 2, 1, 0],
    }),
    frameRate: 12,
  });
  anims.create({
    key: "cookiekick",
    frames: anims.generateFrameNames("cookieKick", {
      frames: [0, 1, 2, 1, 0],
    }),
    frameRate: 10,
  });
};
