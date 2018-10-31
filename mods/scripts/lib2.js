export function methodUnit(param) {
    // const otherStructure = ...
    return {
        // constructor: methodUnit,
        someMethod(param) {
            return "U->someMethod: " + param;
        },
        valueOf(){
            return "mUnit: " + param;
        }
    }
}
export function methodUnit2(param) {
    return {
        someMethod(param) {
            return "U2->someMethod: " + param;
        },
        valueOf(){
            return "mUnit2: " + param;
        }
    }
}
// a bunch of entity units, whose definitions are expected
//  to be copied over to the caller
export default Object.assign({}, methodUnit, methodUnit2);
