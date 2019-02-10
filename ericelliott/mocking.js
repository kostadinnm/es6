import { myUtil } from "./util.js";

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

const doStuffBetter = myUtil.pipe(
    g,
    f
);
console.log(doStuffBadly(20), doStuffBetter(20));

const signInUser = function(user) {
    return (user.isSignedIn = true);
};
const foo = {
    name: "Foo",
    isSignedIn: false
};
console.log(signInUser(foo), foo);

const userSignIn = function(user) {
    return { ...user, isSignedIn: true };
};
const bar = {
    name: "Bar",
    isSignedIn: false
};
console.log(userSignIn(bar), bar);

const user = "123";
const folder = "456";
const files = ["a", "b", "c"];
const log = function(...args) {
    return console.log(...args);
};

const readUser = function({ user, ...obj }) {
    const result = { user, dbUser: "User1", ...obj };
    return Promise.resolve(result);
};
const getFolderInfo = function({ folder, ...obj }) {
    const result = { folder, folderInfo: "Folder1", ...obj };
    return Promise.resolve(result);
};
const haveWriteAccess = function({ dbUser, folderInfo, ...obj }) {
    //if(dbUser.hasWriteAccess(folderInfo)
    return Promise.resolve({ dbUser, folderInfo, ...obj });
};
const uploadToFolder = function({ dbUser, folderInfo, files, ...obj }) {
    //folderInfo.uploadFiles(files, userDetails);
    return Promise.resolve("Success!");
};
const uploadFiles = myUtil.asyncPipe(readUser, getFolderInfo, haveWriteAccess, uploadToFolder);
uploadFiles({ user, folder, files }).then(log);
