const Parent = require('./Parent');
const Child = require('./Child');
const Sedan = require('./Sedan');

const dad = new Parent("철수", 45, "남성", "회사원");
const daughter = new Child("지연", 10, "여성", "초등학교 4학년");
const son = new Child("민수", 8, "남성", "초등학교 2학년");

const familyCar = new Sedan("현대", "그랜저", "검정", 500);

familyCar.start();
dad.getInCar(familyCar);
dad.driveCar(familyCar);
daughter.getInCar(familyCar);
son.getInCar(familyCar);
daughter.playInCar();
son.playInCar();
familyCar.stop();

