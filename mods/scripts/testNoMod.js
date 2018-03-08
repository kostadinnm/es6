
//
// access to 'this' and 'window':
//

//present
console.log("'this' is " + (this === undefined ? "NOT " : "") + "present");
function test() {
    //present
    console.log("In function, 'this' is " + (this === undefined ? "NOT " : "") + "present");
}
test();
function testS() {
    "use strict";
    //NOT present
    console.log("In STRICT function, 'this' is " + (this === undefined ? "NOT " : "") + "present");
    //present
    console.log("In STRICT function, 'window' is " + (window === undefined ? "NOT " : "") + "present");
}
testS();


//
// deletion of variables:
//
x = "";
delete x;

function testDeletion() {
    "use strict";
    //This leads to error:
    // y = ""; delete y;
}
testDeletion();


//
// access to 'this' in objects:
//

//in an object:
let obj = {
    logSelfF: function () {
        //'this' is the obj in:
        console.log("in object function-method this is: " + this);
    },
    logSelfF1() {
        // the same:
        console.log("in object function-method this is: " + this);
    }
};
obj.logSelfF();

//in a class definition:
function Person(age) {
    //'this' refers to the object itself:
    console.log("in constructor this is: " + this);
    this.age = age;
}
let persons = [];

function addRandomPerson() {
    persons.push(new Person(Math.floor((Math.random() * 100) + 1)));
}

addRandomPerson();
