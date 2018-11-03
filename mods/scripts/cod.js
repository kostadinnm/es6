// prepending local namespace for name-collision situations:
// import * as methods from "./lib.js";

// renaming - useful for simpler utils:
import methodz from "./lib.js";

// destructuring - useful for complex entities:
// import { methodNS } from "./lib.js";

// dynamic import - async mess:
// const meths = import("./lib.js");
// meths.then(function(methsNS) {
//     console.log(methsNS);
//     console.log(methsNS.default);
// });

import * as units from "./lib2.js";
const { methodUnit, methodUnit2 } = units.default;

// MODULE:
// console.log(methods);
// OBJECT:
console.log("Utils imported: " + methodz);
// FUNCTION:
// console.log("Lib imported: " + methodNS);

// const m1 = methods.methodNS("asterik");
// console.log(m1);
// const m2 = methods.methodNS.someMethod("asterik");
// console.log(m2);

// const m3 = methodz("Wun");
// console.log(m3);
const m4 = methodz.someMethod("Wun");
console.log(m4);
const m5 = methodz.otherMethod("Wun");
console.log(m5);
// const m6 = methodNS("Wun");
// console.log(m6);
// const m7 = methodNS.someMethod("Wun");
// console.log(m7);

console.log("Unit1: " + methodUnit);
const mUnit = methodUnit("Wun");
console.log(mUnit);
console.log(mUnit.someMethod("Wun"));
console.log("Unit2: " + methodUnit2);
const mUnit2 = methodUnit2("Wun");
console.log(mUnit2);
console.log(mUnit2.valueOf());
