//ES6 Syntax

let age = 22;
const country = "India";
// country = "USA" //error

const add = (a, b) => a + b;

//Template Literals
let name = "Ayush";
console.log(`Hello ${name}`);

//Destructing
let user = {name1: "Ayush", age1: 22};
let {name1, age1} = user;

let arr = [10, 20];
let [x, y] = arr;
console.log(x);

//spread and rest
let a1 = [1,2];
let a2 = [...a1,3,4];
console.log(a2);

function sum(...nums){
    return nums.reduce((a,b) => a + b);
}

console.log(sum(1,2,3));

//default parameters
function greet(name="Guest") {
    console.log(name);
}
greet();

//classes and objects
class Person {
    constructor(name) {
        this.name = name;
    }

    show() {
        console.log(this.name);
    }
}

let p = new Person("Ayush");
p.show();