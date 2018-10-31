// prepending local namespace for name-collision situations(safest):
import * as methods from "./lib.js";
// may be renamed, but should happen rarely:
// import methodz from "./lib.js";
import { methodNS } from "./lib.js";

console.log(methods);
// console.log(methodz);
console.log(methodNS);

const m1 = methods.methodNS("asterik");
const m2 = methods.methodNS.someMethod("asterik");

// const m3 = methodz("default");
const m3 = methodNS("default");
// const m5 = methodz.someMethod("default");
const m5 = methodNS.someMethod("default");
