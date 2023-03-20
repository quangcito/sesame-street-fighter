import BaseScene from "./BaseScene"

class MapSelectScene extends BaseScene{
    constructor(config){
        super('MapSelectScene')
        this.config = config
    }
    create(){
        this.createTitle('PlaceHolder MapSelect')
        this.createButton('PlayScene','placeholderButton')
    }
}

export default MapSelectScene