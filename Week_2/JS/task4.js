//function and callbacks

//Normal Function
function greet() {
    console.log("Hello");
}

greet();

function add(a, b) {
    return a + b;
}

console.log(add(3,3));


//Arrow Function
const multiply = (a, b) => a * b;
console.log(multiply(4,2));


//callback Function
function greetUser(name) {
    console.log("Hello " + name);
}

function processUser(callback){
    let username = "Ayush";
    callback(username);
}

processUser(greetUser);