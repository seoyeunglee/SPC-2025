const Person = require('./Person');
const Student = require('./Student');
const Employee = require('./Employee');

const aPerson = new Person("Jammy");
console.log(aPerson.speak());

const bPerson = new Student("jay","math");
console.log(bPerson.speak());

const cPerson = new Employee("lala","master");
console.log(cPerson.speak());
