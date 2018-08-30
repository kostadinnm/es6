/*global setTimeout*/
"use strict";
/*eslint "no-console":"off"*/

//
// Credits: https://zellwk.com/blog/es6/
//

//
// NOTE: Douglas suggests using WaeakMap and its GC to alleviate standard 'function' cons
// Clarification: in regards to implementing a caching mechanism
//

//======================= Lexical this =========================
// window-object in a browser:
console.log("in global scope this is: " + this);
setTimeout(function () {
    //window-object:
    console.log("in global js-funcion scope this is: " + this);
}, 1000);

function logThis() {
    //'undefined' in strict mode:
    console.log("in global function scope this is: " + this);
}
let obj = {
    logSelfF: function () {
        //'this' is the obj in:
        console.log("in object function-method this is: " + this);
    },
    logSelfF1() {
        // the same:
        console.log("in object function-method this is: " + this);
    },
    //window-object, as arrow-funcs use the surrounding, which is global:
    logSelfA: () => console.log("in object arrow-method this is: " + this)
};
//class definition:
function Person(age) {
    //'this' refers to the object itself:
    console.log("in constructor this is: " + this);
    this.age = age;
}
let persons = [];

function addRandomPerson() {
    persons.push(new Person(Math.floor((Math.random() * 100) + 1)));
}

let btn1 = document.querySelector("#btn1");
btn1.addEventListener("click", function () {
    //'this' is the element 'button':
    console.log("inside an event this is: " + this);
});
let btn2 = document.querySelector("#btn2");
//window-object, as arrow-funcs use the surrounding, which is global:
btn2.addEventListener("click", () => console.log("inside an event this is: " + this));
//get context:
btn2.addEventListener("click", (event) => console.log("event's target: " + event.currentTarget));
let obj1 = {
    but: document.querySelector("#btn3"),
    //this one needs the 'function'-syntax:
    // changeAppearance: function() {
    changeAppearance() {
        console.log("this is: " + this);
        //this doesn't work, though - 'but' is undefined:
        // but.classList.add("activeButton");
        this.but.classList.add("activeButton");
        setTimeout(() => console.log("this is unchanged in arrow-func: " + this), 0);
        setTimeout(() => this.but.classList.remove("activeButton"), 1000);
    },
    logThis: () => console.log("this is window: " + this),
    //this.but is 'undefined', because it uses the surrounding:
    changeAppearanceDummy: () => this.but.classList.add("activeButton")
};

//======================= Default params & Destructuring =========================
const announcePlayer = function(firstName, lastName, nickname = "", teamName = "unaffiliated") {
    console.log(firstName + " " + (nickname ? ("''" + nickname + "' '") : "") + lastName + ", " + teamName);
};

let course = {
    name: "Learning ES6",
    level: "Beginner"
};
//cannot use existing identifier:
//  let { name, level } = course; //syntax error
//would parse as 'let courseName':
let {
    name: courseName
} = course;
console.log("Course name: " + courseName);
//non-existing properties get 'undefined':
let {
    maxApplicants
} = course;
console.log("Max applicants: " + maxApplicants);
//but could be provided with default values:
let {
    //discussion: https://plus.google.com/+%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%D0%9E%D1%80%D0%B5%D1%85%D0%BE%D0%B2/posts/ZrWx6FUPM7x
    //in short: destructuring and defaults are not allowed together
    minApplicants = 5
} = course;
console.log("Min applicants: " + minApplicants);

//defaults and destructuring work ok in conjunction:
let {
    name: cName,
    level,
    maxApplicants: maxAppls,
    minApplicants: minAppls = 5
} = course;
console.log("name: " + cName + ", level: " + level + ", max applicants: " +
    maxAppls + ", min applicants: " + minAppls);

let [one, two] = [1, 2, 3, 4, 5];
console.log("one: " + one + ", two: " + two);
//non-existing items get 'undefined':
let [three, four, five] = [3, 4];
console.log("three: " + three + ", four: " + four + ", five: " + five);
//'...' lisp-style:
let scores = ["98", "95", "93", "87", "85"];
let [first, second, third, ...restOfTheScores] = scores;
console.log("first score: " + first + ", second score: " + second + ", third score: " + third + ", rest of the scores: " + restOfTheScores);
//swaping objects:
let a = 2;
let b = 3;
console.log("a: " + a + ", b: " + b);
[a, b] = [b, a];
console.log("a: " + a + ", b: " + b);
//destructuring function parameters:
function takeFirstThree(scores) {
    let [first, second, third] = scores;
    return {
        first: first,
        second: second,
        third: third
    };
}
let triple = takeFirstThree(scores);
console.log("first score: " + triple.first + ", second score: " + triple.second + ", third score: " + triple.third);

function getFirstThree([first, second, third]) {
    return {
        first: first,
        second: second,
        third: third
    };
}
triple = getFirstThree(scores);
console.log("first score: " + triple.first + ", second score: " + triple.second + ", third score: " + triple.third);

function getNowPlayingString({
    artist = "Unknown artist",
    title = "Unknown title"
} = {}) {
    return artist + " - " + title;
}
console.log(getNowPlayingString());
let favouriteGame = {
    title: "My favourite game"
};
console.log(getNowPlayingString(favouriteGame));
let cardigansFavouriteGame = {
    artist: "The Cardigans",
    title: "My favourite game"
};
console.log(getNowPlayingString(cardigansFavouriteGame));

//======================= '...' - rest parameter and spread operator =========================

function sumES6(...args) {
    //'args' is an array:
    return args.reduce(function (sum, current) {
        return sum + current;
        //the initial value - not providing may result in TypeError:
    }, 0);
}
let s6 = sumES6();
console.log(s6);
s6 = sumES6(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log(s6);

let arr = ["one", "two", "three"];
//the same '...'-expression converts an array into comma-separated list of args:
console.log(...arr);
//in use for array concatenation:
let arr1 = ["one", "two"];
let arr2 = ["three", "four"];
let arr3 = ["five", "six"];
let combinedArr = [...arr1, ...arr2, ...arr3];
console.log(combinedArr);

//======================= object literals =========================
//prop shorthands:
let color = "green";
let height = 1.4;
const grass = {
    color: color,
    height: height
};
console.log("grass - color: " + grass.color + ", height: " + grass.height);
color = "brown";
height = 14;
const autumnTree = {
    color,
    height
};
console.log("autumn tree - color: " + autumnTree.color + ", height: " + autumnTree.height);
//method shorthands:
const anObject = {
    //those are equivalent:
    //es5 way:
    aMethod: function (arg1, arg2) {},
    //es6 way:
    bMethod(arg1, arg2) {}
};
//dynamic prop names:
const newPropName = "prop";
const es5Obj = {};
es5Obj[newPropName + "One"] = "value";
console.log("es5Obj - " + newPropName + "One: " + es5Obj[newPropName + "One"]);
const es6Ojb = {
    [newPropName + "One"]: "value"
}
console.log("es6Obj - " + newPropName + "One: " + es6Ojb[newPropName + "One"]);

//======================= template literals =========================
let firstName = "Wayne";
let lastName = "Gretzky";
let teamName = "New York Rangers";
const playerString = `${firstName} ${lastName}, ${teamName}`;
console.log(playerString);

const multiString = `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt mollit anim id est laborum.`
console.log(multiString);

const container = document.getElementById("div1");
const aListOfItems = `<ul>
    <li>Point number one</li>
    <li>Point number two</li>
    <li>Point number three</li>
    <li>Point number four</li>
    </ul>`
container.innerHTML = aListOfItems;

let animal = "lamb";
let animalSound = "boo";
let message = `${animal} says "${animalSound}"`;
console.log(message);

const animalTag = (literals, animal, animalSound) => {
    console.log("Literals: " + literals);
    console.log("Expressions: " + animal + ", " + animalSound);
    return literals[0] + animal + " says '" + animalSound + "'";
};
animal = "cow";
animalSound = "moo";
message = animalTag `${animal} says ${animalSound}`;
console.log(message);

//Tagged template defined as a nomral 'funcion':
const animalTagF = function(literals, animal, animalSound) {
    console.log("Literals: " + literals);
    console.log("Expressions: " + animal + ", " + animalSound);
    return literals[0] + animal + " says '" + animalSound + "'";
}
animal = "horse";
animalSound = "neigh";
message = animalTagF `${animal} says ${animalSound}`;
console.log(message);

const animalTagDynamic = function(literals, animal, getAnimalSound) {
    return literals[0] + animal + " says '" + getAnimalSound(animal) + "'";
}
animal = "duck";
const getAnimalSound = function(animal) {
    if (animal === "duck") {
        return "quack";
    }
    return "";
}
//getAnimalSound executed at taggedTemplate call:
message = animalTagDynamic `${animal} says ${getAnimalSound}`;
console.log(message);
