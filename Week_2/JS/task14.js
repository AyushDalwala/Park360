//Date Function

let d = new Date();
console.log(d);

console.log(d.getFullYear());
console.log(d.getMonth());
console.log(d.getDate());
console.log(d.getDay());
console.log(d.getHours());
console.log(d.getMinutes());
console.log(d.getSeconds());

d.setFullYear(2026);
d.setMonth(5);
d.setDate(15);
console.log();
console.log(d);

console.log();
let dob = new Date("2004-05-18");
console.log(dob.toDateString());
console.log(dob.toLocaleDateString());

console.log();
console.log(Date.now());