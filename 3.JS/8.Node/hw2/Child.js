const Person = require("./Person");

class Child extends Person{
    constructor(name, age, gender, role){
        super(name, age, gender, role);
    }
    getInCar(carInfo){
        console.log(`${this.name}이(가) ${carInfo.brand} ${carInfo.model}에 탑승했습니다.`);
    }
    playInCar(){
        console.log(`${this.name}이(가) 차 안에서 장난을 치고 있습니다.`);
    }
}

module.exports = Child;