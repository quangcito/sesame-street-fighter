import BaseScene from "./BaseScene"

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