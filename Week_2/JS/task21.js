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

//without prototype and with prototype
const person = {
    name: "Ayush",
    greet: function() {
        console.log("Hello.......");
    }
};

person.greet();

function PR1(name) {
    this.name = name;
}

PR1.prototype.greet = function() {
    console.log("Hello my name is " + this.name);
};

const pr1 = new PR1("Ayush");
const pr2 = new PR1("Vansh");

pr1.greet();
pr2.greet();

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

//super
class Parent {
    constructor(name) {
        this.name = name;
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name);
        this.age = age;
    }

    show(){
        console.log(this.name, this.age);
    }
}

const c = new Child("Ayush", 21);
c.show();


//encapsulation
class Bank{
    #balance = 1000;

    getBalance() {
        console.log(this.#balance);
    }
}

const b = new Bank();
b.getBalance();