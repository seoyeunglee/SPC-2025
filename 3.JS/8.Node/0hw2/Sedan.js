const Car = require("./Car");

class Sedan extends Car{
    constructor(brand, model, color, trunkSize){
        super(brand, model, color, trunkSize);
    }
    start(){
        console.log(`${this.brand} ${this.model}가 시동을 걸었습니다.`);
    }
    stop(){
        console.log(`${this.brand} ${this.model}가 멈췄습니다.`);
    }
}

module.exports = Sedan;