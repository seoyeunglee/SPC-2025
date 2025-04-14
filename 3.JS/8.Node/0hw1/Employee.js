const Person = require('./Person');
class Employee extends Person{
    constructor(name, jobTitle){
        super(name);
        this.jobTitle = jobTitle;
    }
    speak(){
        console.log(`안녕하세요 저는 ${this.name}이고, 직급은 ${this.jobTitle} 입니다.`);
    }
}
module.exports = Employee;