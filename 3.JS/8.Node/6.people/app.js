const Person = require('./Person');
const Student = require('./Student');

const jhon = new Person();
jhon.name = "John";
jhon.greet();

const smith = new Person();
smith.name = 'Smith';
smith.greet();

const jane = new Student('Jane', 'art');
jane.greet();

const june = new Student('June', 'law');
june.greet();