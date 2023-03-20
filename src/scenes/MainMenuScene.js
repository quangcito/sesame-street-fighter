import BaseScene from "./BaseScene"

class MainMenuScene extends BaseScene{
    constructor(config){
        super('MainMenuScene')
        this.config = config
    }

    create(){
        this.createTitle('PlaceHolder MainMenu')
        this.createButton('CharacterSelectScene','placeholderButton')
    }
    
}

export default MainMenuScene