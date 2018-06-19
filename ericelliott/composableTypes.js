import { myUtil } from "./util.js";
import { $ } from "moneysafe";
import { $$, subtractPercent, addPercent } from "moneysafe/ledger";

const t = function(value) {
    // const fn = function() {
    //     return value;
    // };
    // fn.toString = function() {
    //     return `t(${value})`;
    // };
    // return fn;
    const add = function(n) {
        return t(value + n);
    };
    return Object.assign(add, {
        toString() {
            return `t(${value})`;
        },
        valueOf() {
            return value;
        }
    });
};
const someValue = t(2);
console.log(someValue.toString());

const assert = {
    same(actual, expected, msg) {
        if (actual.toString() != expected.toString()) {
            throw new Error(`NOT OK: ${msg}
                Expected: ${expected}
                Actual: ${actual}`);
        }
        console.log(`OK: ${msg}`);
    }
};
const msg1 = "a value t(x) composed with t(0) == t(x)";
const x1 = 20;
const a1 = t(x1)(t(0));
const b1 = t(x1);
assert.same(a1, b1, msg1);
const msg2 = "a value t(x) composed with t(1) == t(x + 1)";
const x2 = 20;
const a2 = t(x2)(t(1));
const b2 = t(x2 + 1);
assert.same(a2, b2, msg2);
//composing t's
const sumT = function(...fns) {
    return myUtil.pipe(...fns)(t(0));
};

console.log(sumT(t(2), t(4), t(-1)).valueOf());

console.log(0.1 + 0.2 == 0.3);
console.log($(0.1) + $(0.2) == $(0.3));
console.log($$($(40), $(60), subtractPercent(20), addPercent(10)).$);
