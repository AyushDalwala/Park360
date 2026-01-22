//set and map

let set = new Set();

set.add(10);
set.add(20);
set.add(10);

console.log(set);
console.log(set.size);

set.delete(20);
console.log(set.has(10));

for (let val of set) {
    console.log(val);
}

let arr = [...set];
console.log(arr);

let nums = [1,2,2,3,4,4,5];
let unique = [...new Set(nums)];
console.log(unique);

let map = new Map();

map.set("name", "Ayush");
map.set("age", 22);
map.set(1, "One");

console.log(map.get("name"));
console.log(map.size);
console.log(map.has("age"));

map.delete(1);
console.log(map);

for (let [key, value] of map) {
    console.log(key, value);
}