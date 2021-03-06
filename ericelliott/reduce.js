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

const add5ThenMult2 = myUtil.pipe(
    add5,
    mult2
);
console.log(add5ThenMult2(3));

// fb's redux reducer
const ADD_VALUE = "ADD_VALUE";
// reducer(state: Any, action: { type: String, payload: Any}) => newState: Any
const summingReducer = function(state = 0, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case ADD_VALUE:
            return state + payload.value;
            break;
        default:
            return state;
    }
};
const actions = [
    { type: "ADD_VALUE", payload: { value: 1 } },
    { type: "ADD_VALUE", payload: { value: 2 } },
    { type: "ADD_VALUE", payload: { value: 3 } }
];
console.log(myUtil.reduce(summingReducer, 0, actions));
