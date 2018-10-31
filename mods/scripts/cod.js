// prepending local namespace for name-collision situations:
// import * as methods from "./lib.js";

// renaming - useful for simpler utils:
import methodz from "./lib.js";

// destructuring:
// import { methodNS } from "./lib.js";
// useful for complex entities:
import { methodUnit, methodUnit2 } from "./lib2.js";


// MODULE:
//  console.log(methods);
// OBJECT:
console.log("Utils imported: " + methodz);
// FUNCTION:
// console.log("Lib imported: " + methodNS);

// const m1 = methods.methodNS("asterik");
// console.log(m1);
// const m2 = methods.methodNS.someMethod("asterik");
// console.log(m2);

const m3 = methodz("Wun");
console.log(m3);
const m4 = methodz.someMethod("Wun");
console.log(m4);
const m5 = methodz.otherMethod("Wun");
console.log(m5);
// const m6 = methodNS("Wun");
// console.log(m6);
// const m7 = methodNS.someMethod("Wun");
// console.log(m7);

const mUnit = methodUnit("Wun");
console.log(mUnit);
console.log(mUnit.someMethod("Wun"));
const mUnit2 = methodUnit2("Wun");
console.log(mUnit2);
console.log(mUnit2.valueOf());