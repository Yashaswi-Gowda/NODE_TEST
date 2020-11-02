const assert = require("chai").assert;

const positions = [
    { a: ["C", 2], b: ["D", 4], canAttack: true },
    { a: ["F", 7], b: ["E", 5], canAttack: true },
    { a: ["C", 2], b: ["A", 1], canAttack: true },
    { a: ["A", 6], b: ["B", 4], canAttack: true },
    { a: ["A", 6], b: ["B", 5] },
    { a: ["C", 2], b: ["C", 2] },
    { a: ["A", -1], b: ["B", 1] },
    { a: ["D", 4], b: ["E", 5] },
];

// implement this method to test if two knights threaten eachother
const canAttack = (a, b) => {        
    if ((a[0] >= "A" && a[0] <= "H" && a[1] >=1 && a[1] <= 8) && 
        (b[0] >= "A" && b[0] <= "H" && b[1] >=1 && b[1] <= 8)) {  // validate the input
            let rowDiff = Math.abs(a[0].charCodeAt() - b[0].charCodeAt()) + 1;
            let colDiff = Math.abs(a[1] - b[1]) + 1;            
            if((rowDiff == 2 && colDiff == 3) || (rowDiff == 3 && colDiff == 2)) {
                return true;
            }
            return false;
    }
    return false;
}

positions.forEach(test => {
    try {
        assert.equal(canAttack(test.a, test.b), !!test.canAttack);
    } catch (e) {
        console.error("FAILED", test);
    }
});
