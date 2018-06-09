export function methodNS(param) {
    return "mNamespace: " + param;
}

function someMethod(param) {
    return "someMethod: " + param;
}
// credits: https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65
export default Object.assign(methodNS, { someMethod });
