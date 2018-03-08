// const profiles = [
//     {id: 0, avatarUrl: 'images/demo.jpg'},
//     {id: 1, avatarUrl: 'images/butterfly.jpg'},
//     {id: 2, avatarUrl: 'images/cone.jpg'}
// ];
let arr = [1, 2, 3];


// //'let' adds locality of the variable
// for (let i = 0 ; i < 3 ; i++) {
//     setTimeout(function () {
//         console.log(arr[i]);
//     }, 0);
// }// Output: 1 2 3

// //same as above
// for (let i of arr) {
//     setTimeout(function () {
//         console.log(i);
//     }, 0);
// }// Output: 1 2 3

//best is using 'forEach' for looping:
arr.forEach(function(i) {
    setTimeout(function() {
        console.log(i);
    }, 0);
}); // Output: 1 2 3
