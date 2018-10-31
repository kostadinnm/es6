import big_integer from "./big_integer.js";
import big_float from "./big_float.js";

console.log(big_integer.make(100));
console.log(big_float.make(100));
console.log(big_float.make(0.30004));
console.log(big_float.make(big_integer.make(30004), -5));