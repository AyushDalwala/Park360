//JS Basics

console.log("Hello World");

var a = 10;  //function scope
let b = 20;  //block scope
const c = 30; //constant

let sum = a + b;
console.log("Sum = ", sum);

if(sum > 20) {
    console.log("sum is greater than 20");
} else {
    console.log("sum is less than or equal to 20");
}

for(let i=1; i<=3; i++){
    console.log("Number: ",i);
}