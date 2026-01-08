//conditional statements

let marks = 75;

if (marks > 50) {
    console.log("Pass");
}

if (marks >= 35) {
    console.log("Pass");
} else {
    console.log("Fail");
}

if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 75) {
    console.log("Grade B");
} else if (marks >= 50) {
    console.log("Grade C");
} else {
    console.log("Fail");
}

let day = 2;
switch(day) {
    case 1: console.log("Mon"); break;
    case 2: console.log("Tue"); break;
    case 3: console.log("Wed"); break;
    default: console.log("Invalid");
}