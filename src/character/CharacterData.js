export const elmo = {
  defaultImage: "Elmo",
  displayName: "Elmo",
  profilePicture: "elmoProfile",
  size: [80, 230],
  blood: 0xff0000,
  //maybe like this:
  punch: {
    anim: "elmopunch",
    delay: 175,
    position: [90, 180],
    damage: 20,
  },
  kick: {
    anim: "elmokick",
    delay: 175,
    position: [90, 210],
  },
};

export const cookie = {
  defaultImage: "CookieMonster",
  displayName: "Cookie Monster",
  size: [100, 230],
  blood: 0x0000ff,
  profilePicture: "cookieMonsterProfile",
  punch: {
    anim: "cookiepunch",
    delay: 175,
    position: [90, 180],
    damage: 20,
  },
  kick: {
    anim: "cookiekick",
    delay: 175,
    position: [90, 210],
  },
};
