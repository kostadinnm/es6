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
    console.log(id);
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

function composeM(method) {
    return function(...ms) {
        return myUtil.reduce(
            myUtil.curry(function(f, g, x) {
                return g(x)[method](f);
            }),
            [],
            ms
        );
    };
}

const composePromises = composeM("then");
const userAuth = composePromises(hasPermission, getUserById);
userAuth(3).then(trace(label));
