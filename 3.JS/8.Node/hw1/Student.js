const Person = require('./Person');
class Student extends Person{
    constructor(name, subject){
        super(name);
        this.subject = subject;
    }
    speak(){
        console.log(`안녕하세요 저는 ${this.name}이고, 전공은 ${this.subject} 입니다.`);
    }
}
module.exports = Student;