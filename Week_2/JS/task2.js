//JS Hoisting

console.log(a);     //undefined
var a = 10;

//console.log(b);   //error
let b = 20;

//console.log(c);   //error
const c = 30;

function test() {
    console.log(x);     //undefined
    var x = 5;

    //console.log(y);   //error
    let y = 6;
}

test();
y = 7;

if(true){
    var username="data";
    username="het";
}

console.log(username);

