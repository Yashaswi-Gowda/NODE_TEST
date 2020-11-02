const assert = require("chai").assert;

const names = [
    "Michael Daniel Jäger",
    "LINUS HARALD christer WAHLGREN",
    "Pippilotta Viktualia Rullgardina Krusmynta Efraimsdotter LÅNGSTRUMP",
    "Kalle Anka",
    "Ghandi"
];

const expected = [
    { first: "Michael", middle: ["Daniel"], last: "Jäger" },
    { first: "Linus", middle: ["Harald", "Christer"], last: "Wahlgren" },
    { first: "Pippilotta", middle: ["Viktualia", "Rullgardina", "Krusmynta", "Efraimsdotter"], last: "Långstrump" },
    { first: "Kalle", middle: [], last: "Anka" },
    { first: "Ghandi", middle: [], last: null },
];

const validate = (result) => {
    try {
        assert.deepEqual(result, expected);
    } catch (e) {
        console.error("Failed", e);
    }
};

// implement code generating result
const result = [];
splitAndFormatNameList = function() {
    names.forEach(function(name) {
        let arr = name.split(" ");
        let fName = capitalize(arr.splice(0, 1).pop());
        let lName = capitalize(arr.splice(-1, 1).pop());
        let mNames = arr.map(str => capitalize(str));
        result.push({first: fName, middle: mNames , last: lName})
    });
}

capitalize = (value) => {
    if(value) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return null;
}

splitAndFormatNameList();
// At the end call validate
validate(result);