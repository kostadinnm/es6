"use strict";
/*eslint "no-unused-vars":"off"*/

let fs = "";
let baker = "";
function makeACake(cb) {
    fs.readFile("./ingredients", (err, ingredients) => {
        if (err) {
            return cb(err);
        }
        baker.mix(ingredients)
            .then(() => baker.putInOven())
            .then(() => baker.takeOut())
            .then(() => cb());
    });
}
