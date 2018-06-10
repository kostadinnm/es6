export function myUtil() {
    return "my util";
}

// todo: return value, not lambda on arity overflow(just like normal function)
function curry(f, argsHead = []) {
    return function(...argsTail) {
        return (function(args) {
            return args.length === f.length ? f(...args) : curry(f, args);
        })([...argsHead, ...argsTail]);
    };
}

function reduce(reducer, initial, arr) {
    // shared stuff
    let acc = initial;
    arr.forEach(function(elem) {
        // unique stuff
        acc = reducer(acc, elem);
    });
    return acc;
}

export default Object.assign(myUtil, { reduce, curry });
