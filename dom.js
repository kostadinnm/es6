"use strict";

//note: in order to for the modules to work in firefox a config flag needs to be flipped
// //modules are experimental at the time of writing this comment(8th Feb 2018/FF 58.0.2)

// export default {
//     printAsyncDymmy(arr) {
//         // //asynchronosity expectations broken:
//         // for (var i = 0; i < 3 ; i++) {
//         //     //hoisting of 'i':
//         //     setTimeout(function () {
//         //         console.log('i: ' + i + ', arr[' + i + ']: ' + arr[i]);
//         //     }, 0);
//         // }// Output: i: 3, arr[3]: undefined

//         arr.forEach(function(element) {
//             var elem = element;
//             setTimeout(function() {
//                 console.log(elem);
//             }, 0);
//         }); // Output: 1 2 3
//     }
// };

// let par = {p: "1", q: "2"};
// let {pp: p, qq: q, rr="3"} = par;

// function test({req:required, opt:optional=0} = {req:1, opt:1}) {
//     console.log("required: " + required + ", optional: " + optional);
// }


function test1({title: englishTitle} = {title: 'Scratchpad'}) {
    return "";
}
function test({req:required, opt:optional=0} = {req:1, opt:1}) {
    console.log("required: " + required + ", optional: " + optional);
}
