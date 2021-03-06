import { myUtil } from "./util.js";
import { myConfer } from "./utils/confer.js";
import { myLogger } from "./utils/logger.js";

const chocolate = {
    hasChocolate() {
        return true;
    }
};
const caramelSwirl = {
    hasCaramelSwirl() {
        return true;
    }
};
const pecans = {
    hasPecans() {
        return true;
    }
};
// const iceCream = Object.assign({}, chocolate, caramelSwirl, pecans);
// todo: figure out this
const iceCream = { ...chocolate, ...caramelSwirl, ...pecans };
console.log(`hasChocolate: ${iceCream.hasChocolate()}
    hasCaramelSwirl: ${iceCream.hasCaramelSwirl()}
    hasPecans: ${iceCream.hasPecans()}`);

//functional inheritance - Crockford kicks in :)
function base(spec) {
    const that = {};
    that.name = spec.name;
    return that;
}
function child(spec) {
    const that = base(spec);
    that.sayHello = function() {
        return "Hello, I'm " + that.name;
    };
    return that;
}
const c = child({ name: "a (not-so-flexible) functional object" });
console.log(c.sayHello());

//functional mixin
const flyable = function(o) {
    let isFlying = false;
    return Object.assign({}, o, {
        fly() {
            isFlying = true;
            //todo: workaround usage of 'this'
            return this;
        },
        isFlying() {
            return isFlying;
        },
        land() {
            isFlying = false;
            return this;
        }
    });
};
const bird = flyable({});
console.log(bird.isFlying());
console.log(bird.fly().isFlying());
const quacking = myUtil.curry(function(quack, o) {
    return Object.assign({}, o, {
        quack() {
            return quack;
        }
    });
});
const quacker = quacking("Quack!")({});
console.log(quacker.quack());
const duck = function(quack) {
    // return quacking(quack)(flyable({}));
    return flyable(quacking(quack, {}));
};
const d1 = duck("Quack!");
console.log(d1.fly().quack());
const createDuck = function(quack) {
    return myUtil.pipe(
        flyable,
        quacking(quack)
    )({});
};
const d2 = createDuck("Quack! Quack!");
console.log(d2.fly().quack());
// todo: explore https://github.com/stampit-org/stamp-specification(sharing and reusing composable factory functions)

// mixins' dependables
const initialConfig = { host: "hokallost" };
function customLogger(t) {
    console.log("Custom message:" + t);
}
//implicit dependency
const c1 = myConfer.toConfigurable(initialConfig)({});
console.log(c1.get("host"));
console.log(c1.get("port"));

const createConfig = function({ config, logger }) {
    return myUtil.pipe(
        myLogger.toLogable(logger),
        myConfer.toConfigurable(config)
        // myLogger.toLogable(logger) //BOOM!
    )({});
};
const c2 = createConfig({ config: initialConfig, logger: customLogger });
console.log(c2.get("host"));
console.log(c2.get("port"));

//explicit dependency
const c3 = myConfer.toConfigurable(initialConfig, {
    log(t) {
        return customLogger(t);
    }
})({});
console.log(c3.get("host"));
console.log(c3.get("port"));

const createConfigExp = function({ config, logger }, obj) {
    return myConfer.toConfigurableExp({ config, logger }, obj);
};
const c4 = createConfigExp({ config: initialConfig, logger: customLogger }, {});
console.log(c4.get("host"));
console.log(c4.get("port"));

// pure functional connotation
const a = Object.defineProperty({}, "a", {
    enumerable: false,
    value: "a"
});
const b = { b: "b" };
console.log({ ...a, ...b });
// todo: add reasonable examples of mixins that discard/maintain non-enumerable object props
//hint: Object.assign({}, obj, ...) vs Object.assign(obj, ...)
