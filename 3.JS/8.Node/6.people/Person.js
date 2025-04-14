class Person{
    // name = "";

    constructor(name){
        this.name = name;
    }

    greet(){
        console.log("안녕하세요. 저는 "+this.name+"입니다.");
    }
}

// const jhon = new Person();
// jhon.name = "John";
// jhon.greet();

// const smith = new Person();
// smith.name = 'Smith';
// smith.greet();

module.exports = Person;