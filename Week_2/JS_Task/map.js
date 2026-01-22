//
let numbers = [10, 20, 30, 40];

let updatedNumbers = numbers.map(function (value) {
    return value + 10;
});

console.log(updatedNumbers);

//
let numbers1 = [1, 2, 3];

let results = numbers1.map(n => n * 2);

console.log(results);

//
let users = [
    {id: 1, name: "Ayush", age: 21},
    {id: 2, name: "Vansh", age: 21},
    {id: 3, name: "Rahul", age: 24}
];

let names = users.map(user => user.name);

console.log(names);

//
let updatedUsers = users.map(user => {
    return {
        ...user,
        age: user.age + 1
    };
});

console.log(updatedUsers);

//increase value of objects
let scores = {
    math: 80,
    science: 90,
    english: 85
};

let updatedScores = Object.entries(scores).map(([key, value]) => {
    return [key, value + 5];
});

let finalObject = Object.fromEntries(updatedScores);

console.log(finalObject);

//object key + map()

let student = {
    name: "Ayush",
    age: 21,
    city: "Surat"
};

Object.keys(student).map(key => {
    console.log(key, student[key]);
});

//object value + map()

let prices = {
    pen: 10,
    book: 50,
    bag: 500
};

let discount = Object.values(prices).map(price => price - 5);

console.log(discount);
