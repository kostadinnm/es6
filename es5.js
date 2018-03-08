function sumES5() {
    // 'arguments' is an iterable symbol - not an array:
    var argsArray = Array.prototype.slice.call(arguments);
    return argsArray.reduce(function(sum, current) {
        return sum + current;
    }, 0);
}
var s5 = sumES5(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log("ES5 sum:" + s5);
