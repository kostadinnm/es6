import { myUtil } from "./util.js";

// console.log(reduce(function(acc, curr) { return acc + curr; }, 0, [1, 2, 3]));
const filter = function(fn, arr) {
    return myUtil.reduce(
        function(acc, curr) {
            return fn(curr) ? acc.concat([curr]) : acc;
        },
        [],
        arr
    );
};
// console.log(filter(function(x) { return x > 2; }, [1, 2, 3, 4]));
const censor4lettered = function(words) {
    return filter(function(word) {
        return word.length !== 4;
    }, words);
};
console.log(censor4lettered(["demo", "trial", "test"]));
const startsWithS = function(words) {
    return filter(function(word) {
        return word.startsWith("s") || word.startsWith("S");
    }, words);
};
console.log(startsWithS(["sand", "glass", "wood"]));
