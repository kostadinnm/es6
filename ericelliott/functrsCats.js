import { myUtil } from "./util.js";

// functors are mappables preserving input structure

const arrFunctr = [1, 2, 3];
console.log(
    arrFunctr.map(function(a) {
        return a * 2;
    })
);

// functor is a mapping between categories(types)
//identity law
console.log(
    arrFunctr.map(function(x) {
        return x;
    })
);
//composition law
function addOne(x) {
    return x + 1;
}
function toThePowerOfTwo(x) {
    return x * x;
}
console.log(arrFunctr.map(addOne).map(toThePowerOfTwo));
// todo: use compose-fuction(morphism) from reduce.js
console.log(
    arrFunctr.map(function(x) {
        return toThePowerOfTwo(addOne(x));
    })
);

// endofunctors(used above), in addition to structure, preserve the category
// array's map() function is category-agnostic
//acting as a NON-endo functor:
console.log(
    arrFunctr.map(function(x) {
        return x.toString(); // category of strings
    })
);

// function trace(x) {
//     console.log(x);
//     return x;
// }
const joinableTwo = myUtil.pointedFunctor(2);
//check identity:
console.log(joinableTwo);
console.log(
    joinableTwo.map(function(x) {
        return x;
    })
);
// .map(trace);
//check composition
function double(x) {
    return x * 2;
}
const j1 = joinableTwo.map(function(x) {
    return double(addOne(x));
});
console.log(j1);
const j2 = joinableTwo.map(addOne).map(double);
console.log(j2);
//other goodies with pointed functors:
const joinableThree = myUtil.pointedFunctor(3);
console.log(joinableTwo + joinableThree);
const joinableH = myUtil.pointedFunctor("h");
const joinableI = myUtil.pointedFunctor("i");
console.log(joinableH + joinableI);
const joinableSix = myUtil.pointedFunctor(6);
const arrFunctr2 = [4, 5, ...joinableSix];
console.log(arrFunctr2);
const primitiveRange = myUtil.constructRange(7, 9);
console.log(primitiveRange);
const pfRange = myUtil.constructRange(myUtil.pointedFunctor(7), 9);
console.log(pfRange);
console.log(myUtil.pointedFunctor.toString());
const joinableTen = myUtil.pointedFunctor(10);
console.log(myUtil.pointedFunctor.is(10));
//array has a map-function, thus it's a pointed functor as well
console.log(myUtil.pointedFunctor.is([10]));
console.log(myUtil.pointedFunctor.is(joinableTen));

function exists(x) {
    return x.valueOf() !== undefined && x.valueOf() !== null;
}
//conditional chaining
const ifExists = function(x) {
    return {
        map(fn) {
            return exists(x) ? x.map(fn) : x;
        }
    };
};
console.log(ifExists(myUtil.pointedFunctor(undefined)).map(addOne));
console.log(ifExists(myUtil.pointedFunctor(null)).map(double));
console.log(
    ifExists(myUtil.pointedFunctor(11))
        .map(addOne)
        .map(double)
);
//mapping-functions' generator
const mapGen = myUtil.curry(function(fn, functr) {
    return functr.map(fn);
});
const toPlusOne = mapGen(addOne);
console.log(toPlusOne(myUtil.pointedFunctor(12)));
const toDouble = mapGen(double);
console.log(toDouble(myUtil.pointedFunctor(13)));
