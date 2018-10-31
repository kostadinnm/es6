import {myUtil} from "./util.js";

const g = function(n) {
    return n + 1;
};
const f = function(n) {
    return n * 2;
};
const doStuffBadly = function(x) {
    const afterG = g(x);
    const afterF = f(afterG);
    return afterF;
};

const doStuffBetter = myUtil.pipe(g, f);
console.log(doStuffBadly(20), doStuffBetter(20));

const signInUser = function(user) {
    return user.isSignedIn = true;
};
const foo = {
    name: "Foo",
    isSignedIn: false
};
console.log(signInUser(foo), foo);

const userSignIn = function(user) {
    return {...user, isSignedIn: true};
};
const bar = {
    name: "Bar",
    isSignedIn: false
};
console.log(userSignIn(bar), bar);
