import BaseScene from "./BaseScene"
import CharacterIcon from "../selectionScreen/CharacterIcon";

export let leftPlayerKey;
export let rightPlayerKey;

class CharacterSelectScene extends BaseScene{
    constructor(config){
        super('CharacterSelectScene');
        this.config = config;
    }

    create(){
        this.createTitle('PlaceHolder CharacterSelect');
        this.add.image(this.config.width / 2, this.config.height / 2, "selection");
        this.createButton('MapSelectScene','placeholderButton');
        this.createCharacterIcon();
        leftPlayerKey = this.elmoIcon.characterKey;
        rightPlayerKey = this.cookieIcon.characterKey;
    }

    createCharacterIcon() {
        this.elmoIcon = new CharacterIcon(this, this.config.width/2 - 100, this.config.height/2 + 70, "elmoSelectionIcon", elmo);
        this.cookieIcon = new CharacterIcon(this, this.config.width/2 + 100, this.config.height/2 + 70, "cookieSelectionIcon", cookie);
    }
}

const elmo = {
    defaultImage: 'Elmo',
    punchAnim: 'elmopunch',
    kickAnim: 'elmokick'
}

const cookie = {
    defaultImage: 'CookieMonster',
    punchAnim: 'cookiepunch',
    kickAnim: 'cookiekick'
}

const charRightControl = {
    up: Phaser.Input.Keyboard.KeyCodes.UP,
    left: Phaser.Input.Keyboard.KeyCodes.LEFT,
    down: Phaser.Input.Keyboard.KeyCodes.DOWN,
    right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  };
  
  const charLeftControl = {
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  };

export default CharacterSelectScene