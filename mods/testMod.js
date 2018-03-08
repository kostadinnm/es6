import utils from "./utils.js";

utils.log("If you can read this, then JavaScript modules work in this browser...");

//
// access to 'this' and 'window':
//

//NOT present:
console.log("'this' is " + (this === undefined ? "NOT " : "") + "present");
//PRESENT:
console.log("'window' is " + (window === undefined ? "NOT " : "") + "present");

function testF() {
    //NOT present:
    console.log("In function, 'this' is " + (this === undefined ? "NOT " : "") + "present");
}
testF();
setTimeout(function() {
    //PRESENT:
    console.log("In GLOBAL function, 'this' is " + (this === undefined ? "NOT " : "") + "present");
}, 0);


//
// deletion of variables:
//
//This leads to error:
//let x = ""; delete x;


//
// access to 'this' in objects:
//

//in an object:
let obj = {
    logSelfF: function() {
        //'this' is the obj in:
        console.log("in object function-method this is: " + this);
    },
    logSelfF1() {
        // the same:
        console.log("in object function-method this is: " + this);
    }
};

obj.logSelfF();

//in a class definition:
function Person(age) {
    //'this' refers to the object itself:
    console.log("in constructor this is: " + this);
    this.age = age;
}
let persons = [];

function addRandomPerson() {
    persons.push(new Person(Math.floor((Math.random() * 100) + 1)));
}

addRandomPerson();

// Credits: https://hospodarets.com/native-ecmascript-modules-new-features

// Some additional points:
// you can use absolute URLs for the module scripts and for the import statements
//i.e. import utils from "google.com/utils.js" should work ok
// CORS rules are applied for the modules loaded from other origins
//i.e. if Access-Control-Allow-Origin header is set to "*" the module is available to all,
//otherwise only within the same domain or the specified origin(s)
// Mixed content (HTTP / HTTPS) rules are applied for the modules as well
//i.e. cross-sourcing in this regards will

// TO GENERATE THESE USE in PowerShell(credits: http://slproweb.com/products/Win32OpenSSL.html):
// .\openssl.exe req -x509 -days 365 -newkey rsa:2048 -keyout my_key.key -out my_cert.cert -config ".\openssl.cfg"
