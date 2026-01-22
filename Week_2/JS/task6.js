//operators

//Arithmetic

let a = 10;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);

console.log(a ** b);


//Assignment

let x = 5;

x += 2;
x -= 1;
x *= 3;
x /= 2;

console.log();
console.log(x);

//comparison

console.log();
console.log(5 == "5");
console.log(5 === "5");
console.log(5 != 4);
console.log(5 > 3);
console.log(5 <= 5);

//Logical

console.log();
let p = true;
let q = false;

console.log(p && q);
console.log(p || q);
console.log(!p);

//Ternary

console.log();
let age = 18;
let result = (age >= 18) ? "Adult" : "Minor";
console.log(result);

age >= 18 ? (age >= 24 ? "Eligible" : "Not") : (age <= 16 ? "Less" : "Not" );

//Increment / Decrement

console.log();
let n = 5;
console.log(++n);
console.log(n++);
console.log(n--);
console.log(--n);
console.log(n);