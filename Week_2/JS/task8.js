//array

let arr = [10, 20, 30, 40];

arr.push(50);       //add element at end
arr.pop();          //remove element from end
arr.unshift(5);     //add element at start
arr.shift();        //remove element at start

console.log(arr.length);
console.log(arr[1]);

arr.forEach(v => console.log(v));

let doubled = arr.map(v => v * 2);
console.log(doubled);

let filtered = arr.filter(v => v > 20);
console.log(filtered);

let sum = arr.reduce((a, b) => a + b);
console.log(sum);

let found = arr.find(v => v > 20);
console.log(found);

let index = arr.findIndex(v => v === 30);
console.log(index);


let nums = [3, 1, 5, 2, 4, 4, 2];

console.log(nums.sort());
console.log(nums.reverse());

console.log(nums.includes(3));
console.log(nums.indexOf(5));

console.log(nums.join("-"));

console.log(nums.slice(1, 3));

nums.splice(2, 1, 99);
console.log(nums);

let merged = arr.concat(nums);
console.log(merged);

let flatArr = [1, [2, 3], [4, [5]]];
console.log(flatArr.flat(2));

let set = new Set(merged);
console.log([...set]);
