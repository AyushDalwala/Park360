//JS Objects

let student = {
    name: "Ayush",
    age: 21,
    city: "Surat"
};

//display objects
console.log(student.name);
console.log(student["city"]);


//adding and updating values
student.course = "MCA";
student.age = 20;

console.log(student);

//nested objects
let user = {
    name: "Ayush",
    address: {
        city: "Surat",
        pincode: 395007
    }   
};
console.log(user.address.city);


//Array objects
let products = [
    {name: "Laptop", price: 50000},
    {name: "Phone", price: 20000}
];

console.log(products[0].name);
console.log(products[1].price);