//string

let name = "Ayush";
let msg = `Hello ${name}, welcome!`;
console.log(msg);

let s = "JavaScript Programming";

//length
console.log();
console.log(s.length);

//case change
console.log();
console.log(s.toUpperCase());
console.log(s.toLowerCase());

//search
console.log();
console.log(s.indexOf("Script"));
console.log(s.includes("Java"));
console.log(s.startsWith("Java"));
console.log(s.endsWith("ing"));

//slice & substring
console.log();
console.log(s.slice(0,10));
console.log(s.substring(0,10));

//replace
console.log();
console.log(s.replace("JavaScript", "JS"));
console.log(s.replaceAll("m", "M"));

//trim
console.log();
let t = "    Hello    ";
console.log(t.trim());
console.log(t.trimStart());
console.log(t.trimEnd());

//split array
console.log();
console.log(s.split(" "));

//char access
console.log();
console.log(s.charAt(2));
console.log(s[2]);

//repeat
console.log();
console.log("Hii ".repeat(3));


