export function methodNS(param) {
    return "mNamespace: " + param;
}

function someMethod(param) {
    return "someMethod: " + param;
}
function otherMethod(param) {
    return "otherMethod: " + param;
}
// methodNS is the first-class thing carrying the static methods library
//  less deep-copy protection
export default Object.assign(methodNS, { someMethod, otherMethod });

// credits: https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65