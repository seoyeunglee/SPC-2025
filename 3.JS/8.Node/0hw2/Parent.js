const Person = require('./Person');

class Parent extends Person{
    constructor(name, age, gender, role){
        super(name, age, gender, role);
    }
    parentTest(){
        console.log(`${this.name}, ${this.age}, ${this.gender}, ${this.role}`);
    }
    getInCar(carInfo){
        console.log(`${this.name}이(가) ${carInfo.brand} ${carInfo.model}에 탑승했습니다.`);
    }
    driveCar(carInfo){
        console.log(`${this.name}이(가) ${carInfo.brand} ${carInfo.model}를 운전하고 있습니다.`);
    }
}

aPerson = new Parent("박수만", 55, "남성", "중학교 1학년");
console.log(aPerson.parentTest());

module.exports = Parent;