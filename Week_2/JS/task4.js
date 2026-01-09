//function and callbacks

//Normal Function
function greet() {
    console.log("Hello");
}

greet();

function add(a, b) {
    return a + b;
}

console.log(add('3',3));


//Arrow Function
const multiply = (a, b) => a * b;
console.log(multiply('4',2));


//callback Function
function greetUser(name) {
    console.log("Hello " + name);
}

function processUser(callback){
    let username = "Ayush";
    const addition = callback(4,5);
    return addition;
}

const addcallback = processUser(add);
console.log(addcallback);


//
function calc (a, b, operation) {
    return operation(a, b);
}

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    const multi =  x * y;
    return multi;
}

console.log();
console.log(calc(5, 3, add));
console.log(calc(5, 3, mul));