export function myUtil() {
    return "my util";
}

// todo: return value, not lambda on arity-overflow(like lodash's implementation)
function curry(f, argsHead = []) {
    return function(...argsTail) {
        return (function(args) {
            return args.length === f.length ? f(...args) : curry(f, args);
        })([...argsHead, ...argsTail]);
    };
}

// accumulator-like function(todo: expose synonym - accum(fn, inVal, iterable))
function reduce(reducer, initial, arr) {
    // shared stuff
    let acc = initial;
    arr.forEach(function(elem) {
        // unique stuff
        acc = reducer(acc, elem);
    });
    return acc;
}

// pointed functor(credits: https://medium.com/@dmitri145/to-functor-or-not-to-functor-43c46c72145c):
function pointedFunctor(value) {
    return {
        //looks like specifying a constructor takes precedence in the range factory(constructRange)
        constructor: pointedFunctor,
        map(fn) {
            return pointedFunctor(fn(value));
        },
        valueOf() {
            return value;
        },
        toString() {
            return `pointedFunctr(${value})`;
        },
        inspect() {
            return `pointedFunctr(${value})`;
        },
        [Symbol.iterator]() {
            //todo: make this smarter:
            let step = 0;
            const iterator = {
                next() {
                    if (step <= 1) {
                        step++;
                    }
                    switch (step) {
                        case 1:
                            return { value: value, done: false };
                        default:
                            return { value: undefined, done: true };
                    }
                }
            };
            return iterator;
        }
    };
}
// todo: figure out how this gets the static-notion(instance functions get precedence)
Object.assign(pointedFunctor, {
    toString() {
        return "pointedFunctr";
    },
    is(x) {
        return typeof x.map === "function";
    }
});

// todo: replace 'end' with 'length' or 'size'
function constructRange(constructableStart, end) {
    return Array.from({ length: end - constructableStart + 1 }, function(x, i) {
        // return pointedFunctor(i + start);
        return constructableStart.constructor(i + constructableStart);
    });
}
function pipe(...fns) {
    return function(x) {
        return myUtil.reduce(
            function(acc, f) {
                return f(acc);
            },
            x,
            fns
        );
    };
}

function withConstructor(constructor, ...obj) {
    return myUtil.curry(function(c, o) {
        // todo: dig in Object.getPrototypeOf() and Object.create()
        const proto = Object.assign({}, Object.getPrototypeOf(o), { constructor: c });
        return Object.assign(Object.create(proto), o);
    })(constructor)(...obj);
}

export default Object.assign(myUtil, { reduce, curry, pointedFunctor, constructRange, pipe, withConstructor });
