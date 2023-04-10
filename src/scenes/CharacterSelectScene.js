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
        this.elmoIcon = new CharacterIcon(this, this.config.width/2 - 150, this.config.height/2, "elmoSelectionIcon", elmo);
        this.cookieIcon = new CharacterIcon(this, this.config.width/2 + 50, this.config.height/2, "cookieSelectionIcon", cookie);
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

export default CharacterSelectScene