import { myUtil } from "./util";

const myReduceRight = function(rFn, initial, [head, ...tail], reversedArr = []) {
    return !head ? myUtil.reduce(rFn, initial, reversedArr) : myReduceRight(rFn, initial, tail, [head, ...reversedArr]);
};
const compose = function(...fns) {
    return function(x) {
        return myReduceRight(
            function(acc, f) {
                return f(acc);
            },
            x,
            fns
        );
    };
};

const trace = myUtil.curry(function(label, value) {
    console.log(`${label}: ${value}`);
    // return value;
});

const label = "API call composition";
// a -> Promise(b)
function getUserById(id) {
    return id == 3 ? Promise.resolve({ name: "Kurt", role: "Author" }) : undefined;
}
// b -> Promise(c)
function hasPermission({ role }) {
    console.log(role);
    return Promise.resolve(role == "Author");
}

const authUser = compose(
    hasPermission,
    getUserById
);
// always false:
authUser(3).then(trace(label));

// const composeM = function(method) {
//     return function(...fns) {
//         return fns.reduce(
//             function(f, g) {
//                 return function(x) {
//                     return g(x)[method](f);
//                 }
//             }
//         });
//     };
// };


const composePromises = composeM("then");
const userAuth = composePromises(hasPermission, getUserById);
userAuth(3).then(trace(label));
