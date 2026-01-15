function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}
const counter = outer();

counter();
counter();
counter();

//
function bankAccount() {
    let balance = 1000;

    return function() {
        console.log("Your balance is: ", balance);
    };
}

const checkBalance = bankAccount();
checkBalance();