import BaseScene from "./BaseScene";

<<<<<<< Updated upstream
class CharacterSelectScene extends BaseScene{
    constructor(config){
        super('CharacterSelectScene')
        this.config = config
    }

    create(){
        this.createTitle('PlaceHolder CharacterSelect')
        this.createButton('MapSelectScene','placeholderButton')
    }
}

export default CharacterSelectScene
=======
export let leftPlayerKey;
export let rightPlayerKey;

class CharacterSelectScene extends BaseScene {
  constructor(config) {
    super("CharacterSelectScene");
    this.config = config;
    leftPlayerKey = elmo;
    rightPlayerKey = cookie;
  }

  create() {
    this.createTitle("PlaceHolder CharacterSelect");
    this.createButton("MapSelectScene", "placeholderButton");
  }
}

const elmo = {
  defaultImage: "Elmo",
  punchAnim: "elmopunch",
  kickAnim: "elmokick",
  blockAnim: "elmoblock",
};

const cookie = {
  defaultImage: "CookieMonster",
  punchAnim: "cookiepunch",
  kickAnim: "cookiekick",
  blockAnim: "cookieblock",
};

export default CharacterSelectScene;
>>>>>>> Stashed changes
