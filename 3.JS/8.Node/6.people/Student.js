const Person = require('./Person');

class Student{
    // name = "";
    // major = "";

    constructor(name, major){
        this.name = name;
        this.major = major;
    }

    greet(){
        console.log(`안녕하세요. 제 이름은 ${this.name} 이고, ${this.major} 전공입니다.`);
    }

    greet2(){
        console.log(`안녕하세요 ${this.name}입니다.`);
    }
}

// const aStudent = new Student();
// aStudent.name = 'shpark';
// aStudent.major = 'emgineering';
// aStudent.greet();

const aStudent = new Student('shpark', 'engineering');
aStudent.greet();
aStudent.greet2();

module.exports = Student;