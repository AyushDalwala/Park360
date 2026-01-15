//Basic class

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hi, I am ${this.name} and I am ${this.age} years old`);
    }
}

const person1 = new Person("Ayush", 22);
person1.greet();

//Inhertiance

class Student extends Person {
    constructor(name, age, course) {
        super(name, age);
        this.course = course;
    }

    study() {
        console.log(`${this.name} is studying ${this.course}`);
    }
}

const student1 = new Student("Rahul", 20, "JavaScript");
student1.greet();
student1.study();

//Encapsulation

class BankAccount {
    #balance;       //private property

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        this.#balance += amount;
        console.log(`Balance: ${this.#balance}`);
    }

    withdraw(amount) {
        if (amount <= this.#balance) {
            this.#balance -= amount;
            console.log(`Balance: ${this.#balance}`);
        } else {
            console.log("Insufficient Funds");
        }
    }
}

const acc = new BankAccount(1000);
acc.deposit(500);
acc.withdraw(200);

//Polymorphism

class Animal {
    speak() {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Dog Barks");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Cat meows");
    }
}

const dog = new Dog();
const cat = new Cat();

dog.speak();
cat.speak();

//Abstraction

class Car {
    constructor(model) {
        this.model = model;
    }

    start() {
        this.#engineOn();
        console.log(`${this.model} started`);
    }

    #engineOn() {
        console.log("Engine is running");
    }
}

const car = new Car("Tesla");
car.start();