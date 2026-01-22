function findLargest(a, b, c) {
    
    if (a >= b && a >= c) {
        return a;
    }
    else if (b >= a && b >= c) {
        return b;
    }
    else {
        return c;
    }
}

console.log(findLargest(10, 20, 30));
console.log(findLargest(50, 50, 20));
console.log(findLargest(15, 15, 15));
console.log(findLargest(8, 12, 12));