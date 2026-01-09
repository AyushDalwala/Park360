//JS Promises

let promise = new Promise((resolve, reject) => {
    let success = true;

    if(success) {
        resolve("Data loaded");
    } else {
        reject("Error");
    }
});

promise.then(res => console.log(res))
.catch(err => console.log(err))
.finally(() => console.log("Done"));

//Promise + Timeout
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Server data");
        }, 2000);
    });
}

fetchData().then(data => console.log(data));

//Promise Chaining
function step1() {
    return Promise.resolve("Step 1 done");
}

function step2(msg) {
    return Promise.resolve(msg + " -> Step 2 done");
}

function step3(msg) {
    return Promise.resolve(msg + " -> Step 3 done");
}

step1().then(result => step2(result))
.then(result => step3(result))
.then(final => console.log(final))
.catch(err => console.log(err));