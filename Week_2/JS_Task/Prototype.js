//without prototype

const person = {
    name: "Ayush",
    greet: function() {
        console.log("Hello");
    }
};

person.greet();

//prototype + constructor
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    console.log("Hello, my name is " + this.name);
};

const p1 = new Person("Ayush");
const p2 = new Person("Vansh");

p1.greet();
p2.greet();

//class
class Car {
    constructor(brand, price) {
        this.brand = brand;
        this.price = price;
    }

    display(){
        console.log(this.brand + " costs Rs." + this.price);
    }
}

const c1 = new Car("BMW", 5000000);
c1.display();

//
class Parent{
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

//
class Bank {
    #balance = 1000;

    getBalance() {
        console.log(this.#balance);
    }
}

const b = new Bank();
b.getBalance();
// console.log(b.#balance);

//
class Shape{

    area() {
        console.log("Calculating area....");
    }
}

class Circle extends Shape {

    area() {
        console.log("Area of circle = πr²");
    }
}

const s = new Circle();
s.area();

class Car1 {
    constructor(name) {
        this.name = name;
    }

    static hello() {
        return "Hello!!";
    }
}

const myCar = new Car1("Ford");
console.log(Car1.hello());