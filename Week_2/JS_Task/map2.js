const employees = [
    {
        id: 1,
        name: "Ayush",
        age: 21,
        department: "IT",
        salary: 30000,
        skills: ["JS", "React"]
    },
    {
        id: 2,
        name: "Vansh",
        age: 22,
        department: "HR",
        salary: 28000,
        skills: ["Communication", "Recuritment"]
    },
    {
        id: 3,
        name: "Neha",
        age: 24,
        department: "IT",
        salary: 32000,
        skills: ["JS", "Node"]
    }
];

//map() on array
const names = employees.map(emp => emp.name);
console.log(names);

//create new objects
const updatedSalary = employees.map(emp => ({
    ...emp,
    salary: emp.salary + 5000
}));

console.log(updatedSalary);


//map() with if
const itEmployees = employees.map(emp => {
    if (emp.department === "IT") {
        return {
            ...emp,
            bonus: 3000
        };
    }
    return emp;
});

console.log(itEmployees);

//map() on nested array inside object

const skillList = employees.map(emp => ({
    name: emp.name,
    skills: emp.skills.map(skill => skill.toUpperCase())
}));

console.log(skillList);

//map() with Object.keys()

const employeeKeys = employees.map(emp => Object.keys(emp));

console.log(employeeKeys);


//map() with Object.values()

const employeeValues = employees.map(emp => Object.values(emp));

console.log(employeeValues);

//map() with Object.entries()

const sanitized = employees.map(emp => {
    return Object.fromEntries(
        Object.entries(emp).map(([key, value]) => {
            if (key === "salary") {
                return [key, "CONFIDENTIAL"];
            }
            return [key, value];
        })
    );
});

console.log(sanitized);

const employee = {
    id: 1,
    name: "Ayush",
    age: 21,
    salary: 30000
};

console.log("-----");

for (let key in employee) {
    console.log(key, employee[key]);
}

console.log("-----");

for (let key of Object.keys(employee)) {
    console.log(key, employee[key]);
}

console.log("-----");

for (let value of Object.values(employee)) {
    console.log(value);
}

console.log("-----");

for (let [key, value] of Object.entries(employee)) {
    console.log(key, value);
}

let arr = [1, 2, 3, 4, 5];
let result = [];

for (let i=0; i<arr.length; i++) {
    let count = 0;
    for (let j=0; j<arr.length; j++) {
        if (arr[i] % arr[j] === 0) {
            count++;
        }
    }
    result.push(count);
}
console.log(result);