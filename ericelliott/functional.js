import { myUtil } from "./util.js";
import curry from "lodash-es/curry";

const a = "a";
const b = "b";
const oA = { a };
const oB = { b };
const d = Object.assign(oA, oB);
console.log("oA: " + JSON.stringify(oA) + ", oB: " + JSON.stringify(oB));

const blep = { blop: "blop" };
const { blop: bloop } = blep;
console.log("bloop: " + bloop);

const curryArrow = (f, arr = []) => (...args) =>
    (a => (a.length == f.length ? f(...a) : curryArrow(f, a)))([...arr, ...args]);
const addThree = curryArrow((a, b, c) => a + b + c);
console.log(addThree(1, 2, 3));
console.log(addThree(1)(2, 3));

const threeAdd = myUtil.curry(function(a, b, c) {
    return a + b + c;
});
console.log(threeAdd(1, 2)(3));
// returns lambda - see todo in the lib
console.log(threeAdd(1, 2, 3, 4));

const add2 = curry(function(a, b) {
    return a + b;
});
console.log(add2(1)(2));
console.log(add2(1, 2, 3));
function addTwo(a, b) {
    return a + b;
}
console.log(addTwo(1, 2, 3));
