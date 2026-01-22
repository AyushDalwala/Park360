const arr = ["HTML", "CSS", "JS", "React"];

console.log("Using for loop: ");

for (let i=0; i<arr.length; i++) {
    console.log(arr[i]);
}

console.log("\nUsing while loop: ");

let i=0;
while(i < arr.length) {
    console.log(arr[i]);
    i++;
}

console.log("\nUsing for..in loop");

for (let index in arr) {
    console.log(index, arr[index]);
}

console.log("\nUsing for..of loop:");

for (let value of arr) {
    console.log(value);
}