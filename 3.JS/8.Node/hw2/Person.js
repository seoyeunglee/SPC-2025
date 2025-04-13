class Person{
    constructor(name, age, gender, role){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.role = role;
    }
    persontest(){
        console.log(`${this.name}, ${this.age}, ${this.gender}, ${this.role}`);
    }
}

// aPerson = new Person("이순자", 15, "여성", "중학교 1학년");
// console.log(aPerson.persontest());

module.exports = Person;