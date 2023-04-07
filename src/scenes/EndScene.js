import BaseScene from "./BaseScene"

class EndScene extends BaseScene{
    constructor(config){
        super('EndScene')
        this.config = config
    }

    create(){
        this.createTitle('PlaceHolder End Scene')
    }
    
}

export default EndScene