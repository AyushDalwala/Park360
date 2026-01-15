//Closures, Prototypes and OOP

//Closures
function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const counter = outer();

counter();
counter();
counter();

//Prototypes

function Person (name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    console.log("Hello, my name is " + this.name);
};

let p1 = new Person("Ayush");
p1.sayHello();

//OOP

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hi, I am ${this.name}`);
    }
}

const s1 = new Student("Ayush", 22);
s1.greet();

//
class Person1 {
    constructor(name) {
        this.name = name;
    }

    hello() {
        console.log("hello");
    }
}

class Student1 extends Person1 {
    constructor(name, course) {
        super(name);
        this.course = course;
    }

    study() {
        console.log("Studying " + this.course);
    }
}

let stu = new Student1("Ayush", "JS");
stu.hello();
stu.study();