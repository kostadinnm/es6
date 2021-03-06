// would help tree shaking, but not interchangable with node's commonjs:
// export function methodUnit(param) {
const methodUnit = function(param) {
    // const otherStructure = ...
    return {
        // constructor: methodUnit,
        someMethod(param) {
            return "U->someMethod: " + param;
        },
        valueOf() {
            return "mUnit: " + param;
        }
    };
};
const methodUnit2 = function(param) {
    return {
        someMethod(param) {
            return "U2->someMethod: " + param;
        },
        valueOf() {
            return "mUnit2: " + param;
        }
    };
};
// a bunch of entity units, whose definitions are expected
//  to be copied over to the caller
export default Object.assign({}, { methodUnit, methodUnit2 });
