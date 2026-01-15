//syntax

/*
    new Promise((resolve, reject) => {
        //    
    });
*/

const myPromise = new Promise((reslove, reject) => {
    let success = true;

    if (success) {
        reslove("Task completed successfully");
    } else {
        reject("Task Failed");
    }
});

myPromise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

//setTimeout

const myPromise1 = new Promise((resolve, reject) => {
    console.log("Fetching data...");

    setTimeout(() => {
        resolve("Data fetched successfully");
    }, 3000);
});

myPromise1.then((data) => {
    console.log(data);
});

//
const myPromise2 = new Promise((resolve, reject) => {
    resolve("Success!");
});

myPromise2.then(data => console.log(data))
.catch(err => console.log(err))
.finally(() => console.log("Task completed"));

//promise chaining
new Promise((resolve) => {
    resolve(10);
})
.then(num => {
    console.log(num);
    return num * 2;
})
.then(num => {
    console.log(num);
    return num * 2;
})
.then(num => {
    console.log(num);
});

//Promise all

const p1 = Promise.resolve("First done");
const p2 = Promise.resolve("Second done");
const p3 = Promise.resolve("Third done");

Promise.all([p1, p2, p3]).then(results => {
    console.log(results);
});

//Promise race

const c1 = new Promise(res => setTimeout(res, 3000, "Three seconds"));
const c2 = new Promise(res => setTimeout(res, 1000, "One second"));

Promise.race([c1, c2]).then(result => console.log(result));

//Promise any

const c3 = Promise.reject("Error 1");
const c4 = Promise.resolve("Success");
const c5 = Promise.reject("Error 2");

Promise.any([c3, c4, c5]).then(result => console.log(result));

//Promise all settled

const c6 = Promise.resolve("OK");
const c7 = Promise.reject("Failed");

Promise.allSettled([c6, c7]).then(res => console.log(res));