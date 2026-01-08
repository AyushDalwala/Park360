//this keyword

console.log(this);

let user = {
    name: "Ayush",
    show() {
        console.log(this.name);
    }
};

user.show();

function test() {
    console.log(this);
}
test();

let obj = {
    name: "Ayush",
    arrow: () => {
        console.log(this.name);
    } 
};
obj.arrow();

function greet(city) {
    console.log(this.name + " from " + city);
}

let person = {name: "Ayush"};

greet.call(person, "Surat");
greet.apply(person, ["Delhi"]);

let bound = greet.bind(person, "Mumbai");
bound();