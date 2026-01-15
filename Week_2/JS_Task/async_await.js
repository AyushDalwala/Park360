async function firstAsyncDemo() {
    return "Hello from async function";
}

firstAsyncDemo().then(data => console.log(data));

//Promise + async await

function getMessagePromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data loaded successfully");
        }, 2000);
    });
}

async function secondAsyncDemo() {
    const msgResult = await getMessagePromise();
    console.log(msgResult);
}

secondAsyncDemo();

//with await and without await

function loadDataOne() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Done"), 2000);
    });
}

async function thirdAsyncDemo() {
    const response = loadDataOne();
    console.log(response);
}

thirdAsyncDemo();

async function fourthAsyncDemo() {
    const finalData = await loadDataOne();
    console.log(finalData);
}

fourthAsyncDemo();

//

function riskyTask(){
    return new Promise((resolve, reject) => {
        let isError = true;

        if (isError) {
            reject("Something went wrong");
        } else {
            resolve("Task successful");
        }
    });
}

async function fifthAsyncDemo() {
    try {
        const taskOutput = await riskyTask();
        console.log(taskOutput);
    } catch (err) {
        console.log("Error: ", err);
    }
}

fifthAsyncDemo();

//Promise vs async await

function apiCallOne() {
    return Promise.resolve("API success");
}

apiCallOne().then(res => console.log(res))
.catch(err => console.log(err));

async function sixthAsyncDemo() {
    try {
        const apiResult = await apiCallOne();
        console.log(apiResult);
    } catch (err) {
        console.log(err);
    }
}

sixthAsyncDemo();

//sequetional and parellel exectution

//slow way
async function seventhAsyncDemo() {
    const stepA = await new Promise(res => setTimeout(() => res("A done"), 2000));
    console.log(stepA);

    const stepB = await new Promise(res => setTimeout(() => res("B done"), 2000));
    console.log(stepB);
}

seventhAsyncDemo();

//fast way
async function eightAsyncDemo() {
    const promiseOne = new Promise(res => setTimeout(() => res("Task 1 done"), 2000));
    const promiseTwo = new Promise(res => setTimeout(() => res("Task 2 done"), 2000));

    const allResults = await Promise.all([promiseOne, promiseTwo]);
    console.log(allResults);
}

eightAsyncDemo();

//Real API example
async function fetchPostData() {
    try {
        const apiResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const jsonData = await apiResponse.json();
        console.log(jsonData);
    } catch (apiError) {
        console.log("API Error: ", apiError);
    }
}

fetchPostData();