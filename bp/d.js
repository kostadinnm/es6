
//======================= Arrow functions =========================

let numbers = [1, 2, 3, 4, 5];

function logLater(obj) {
  setTimeout(function() {
    console.log(obj);
  }, 1000);
}

function countDummy() {
  //douglas's linter warns me only about these usages of 'for' and 'var':
  for (var i of numbers) {
    console.log(i);
    //function-scoped 'i' will use the value of 'i' when it's called:
    setTimeout(function() {
      console.log(i);
    }, 1000);
  }
}

function countSmart() {
  for (var i of numbers) {
    console.log(i);
    //alleviate this by passing it to named function:
    logLater(i);
  }
}

function countSmarter() {
  for (let i of numbers) {
    console.log(i);
    //the block-scoped 'i' works ok:
    setTimeout(function() {
      console.log(i)
    }, 1000);
  }
}

let objs = [{
        number: 1
    },
    {
        number: 2
    },
    {
        number: 3
    },
    {
        number: 4
    },
    {
        number: 5
    }
];

function countObjects() {
    for (const obj of objs) {
        console.log(obj.number);
    }
}
function scrumbleObjects() {
    objs.forEach(function(obj, i, objs) {
        objs[i] = {
            number: Math.floor((Math.random() * 10) + 1)
        };
    });
}
function scrumbleObjectsDummy() {
    for (const obj of objs) {
        //obj is not accessible destroy/construct - 'TypeError: invalid assignment to const':
        obj = {
            number: Math.floor((Math.random() * 10) + 1)
        }
    }
}

function scrumbleObjectsProps() {
    for (const obj of objs) {
        //obj properties are modifiable though
        obj.number = Math.floor((Math.random() * 10) + 1);
    }
}

//zero argument arrow-functions:
const logTime = () => {
    console.log(new Date());
}
const logTime2 = _ => {
    console.log(new Date());
}
//one-argument arrow-functions:
const log = obj => {
    console.log(obj);
}
const log2 = (obj) => {
    console.log(obj);
}
//multi-argument arrow-function:
const logConcat = (obj1, obj2) => {
    console.log(obj1.toString() + " " + obj2.toString());
}

const sum1 = (num1, num2) => {
    return num1 + num2;
};
//implicit return, if expression:
const sum2 = (num1, num2) => num1 + num2;
//in block it doesn't work(returns 'undefined'):
const sum3 = (num1, num2) => {
    num1 + num2
};

function calculateSum() {
    let n1 = document.getElementById("nm1").valueAsNumber;
    let n2 = document.getElementById("nm2").valueAsNumber;
    let n3 = sum1(n1, n2);
    document.getElementById("nm3").value = n3;
}

function calculateSumImplicit() {
    let n1 = document.getElementById("nm1").valueAsNumber;
    let n2 = document.getElementById("nm2").valueAsNumber;
    let n3 = sum2(n1, n2);
    document.getElementById("nm3").value = n3;
}

function calculateSumDummy() {
    let n1 = document.getElementById("nm1").valueAsNumber;
    let n2 = document.getElementById("nm2").valueAsNumber;
    let n3 = sum3(n1, n2);
    document.getElementById("nm3").value = n3;
}
const sum4 = (num1, num2) => {
    return {
        sum: num1 + num2
    };
};
//evaluation to a json object:
const sum5 = (num1, num2) => ({
    sum: num1 + num2
});
//curly braces treated as a block, though:
const sum6 = (num1, num2) => {
    sum: num1 + num2
};

function calculateSumAgain() {
    let n1 = document.getElementById("nm4").valueAsNumber;
    let n2 = document.getElementById("nm5").valueAsNumber;
    let n3 = sum4(n1, n2);
    document.getElementById("nm6").value = n3.sum;
}

function calculateSumEval() {
    let n1 = document.getElementById("nm4").valueAsNumber;
    let n2 = document.getElementById("nm5").valueAsNumber;
    let n3 = sum5(n1, n2);
    document.getElementById("nm6").value = n3.sum;
}

function calculateSumObjDummy() {
    let n1 = document.getElementById("nm1").valueAsNumber;
    let n2 = document.getElementById("nm2").valueAsNumber;
    let n3 = sum6(n1, n2);
    //TypeError - undefined:
    document.getElementById("nm3").value = n3.sum;
}
