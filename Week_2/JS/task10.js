//loop

for (let i=1; i<=5; i++) {
    if (i==3) continue;
    if (i==5) break;
    console.log(i);
}

let i = 1;
while(i <= 5) {
    ++i;
    console.log(i);
    
}

let n = 1;
do {
    console.log(n);
    n++;
} while(n <= 3);

let arr2 = ["HTML", "CSS", "JS"];
for(let val of arr2) {
    console.log(val);
}

let student = {name: "Ayush", age: 22};
for(let key in student) {
    console.log(key ,"=", student[key]);
}


student.map()