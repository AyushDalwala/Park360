//async-await

// function fetchData() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve("Data received");
//         }, 2000);
//     });
// }

// async function getData() {
//     try {
//         let res = await fetchData();
//         console.log(res);
//     } catch(err) {
//         console.log(err);
//     }
// }

// getData();


//Promise vs async-await
function getPromiseData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received Promise");
        }, 2000);
    });
}

getPromiseData().then((result) => {
    console.log(result);
});

async function getAsyncData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received Async");
        }, 2000);
    });
}

async function showAsyncData() {
    const result = await getAsyncData();
    console.log(result);
}

showAsyncData();

//
async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await response.json();
    console.log(data);
}

fetchUsers();