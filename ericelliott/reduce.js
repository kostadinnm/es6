
import { myUtil } from "./util.js";

console.log(
    [2, 4, 6].reduce(function(acc, n) {
        return acc + n;
    }, 0)
);
const sumReducer = function(acc, n) {
    return acc + n;
};
console.log([2, 4, 6].reduce(sumReducer, 0));

const map = function(fn, arr) {
    return arr.reduce(function(acc, item, index, arr) {
        return acc.concat(fn(item, index, arr));
    }, []);
};
console.log(
    map(
        function(item) {
            return item * 2;
        },
        [1, 2, 3]
    )
);
const itemDesc = function(item, index, arr) {
    return arr.length + "Item(s)Arr[pos" + index + "]=" + item;
};
console.log(map(itemDesc, [1, 2, 3]));

const myReduceRight = function(rFn, initial, [head, ...tail], reversedArr = []) {
    return !head ? myUtil.reduce(rFn, initial, reversedArr) : myReduceRight(rFn, initial, tail, [head, ...reversedArr]);
};
const compose = function(...fns) {
    return function(x) {
        return myReduceRight(
            function(acc, f) {
                return f(acc);
            },
            x,
            fns
        );
    };
};
const mult2 = function(x) {
    return x * 2;
};
const add5 = function(x) {
    return x + 5;
};
const mult2ThenAdd5 = compose(
    add5,
    mult2
);
console.log(mult2ThenAdd5(3));

const pipe = function(...fns) {
    return function(x) {
        return myUtil.reduce(
            function(acc, f) {
                return f(acc);
            },
            x,
            fns
        );
    };
};
const add5ThenMult2 = pipe(add5, mult2);
console.log(add5ThenMult2(3));
