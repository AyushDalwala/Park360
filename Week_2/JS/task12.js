//Regular Expression

let text = "My email is test123@gmail.com";

let pattern = /gmail/;
console.log(pattern.test(text));

let digits = "abc123xyz456";
console.log(digits.match(/\d+/g));

let msg = "Hello World";
console.log(msg.replace(/World/, "JS"));

let email = "abc@gmail.com";
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(regex.test(email));