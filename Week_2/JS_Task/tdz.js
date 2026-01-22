console.log(a);
var a = 10;

// console.log(b);
let b = 20;

// console.log(c);
const c = 30;

{
    // console.log(x);
    let x = 5;
    console.log(x);
}

{
    let greet = function() { return "Hi"; };
    console.log(greet());
}

{
    console.log(foo());
    function foo() { return "Hello"; }
}