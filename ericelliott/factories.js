import { myUtil } from "./util.js";

function createUser({ userName = "anonymous", avatar = "anon.jpg" } = {}) {
    return {
        userName,
        avatar,
        setUserName(userName) {
            this.userName = userName;
            return this;
        }
    };
}
console.log(createUser({ userName: "bot", avatar: "botFace.jpg" }));
console.log(createUser());

function arrToObj([key, value]) {
    return { [key]: value };
}
console.log(arrToObj(["foo", "bar"]));

// todo: add examples of type inference(typescript, flow, rtype)

const toUser = myUtil.withConstructor(createUser);
const user = toUser({});
console.log(user.constructor());

//flyable mixin
const flyable = function(obj) {
    let isFlying = false;
    return {
        ...obj,
        fly() {
            isFlying = true;
            return this;
        },
        land() {
            isFlying = false;
            return this;
        },
        isFlying() {
            return isFlying;
        }
    };
};
//withBattery mixin
const withBattery = myUtil.curry(function({ capacity }, obj) {
    let percentCharged = 100;
    return {
        ...obj,
        draw(percent) {
            const remaining = percentCharged - percent;
            percentCharged = remaining > 0 ? remaining : 0;
            return this;
        },
        getCharge() {
            return percentCharged;
        },
        get capacity() {
            return capacity;
        }
    };
});
//crateDrone factory
const createDrone = function({ capacity = "3000mAh" }) {
    return myUtil.pipe(
        // myUtil.withConstructor(createDrone), //that actually works - already starting to look like FRP
        flyable,
        withBattery({ capacity }),
        myUtil.withConstructor(createDrone)
    )({});
};
const myDrone = createDrone({ capacity: "5500mAh" });
console.log(`
    can fly: ${myDrone.fly().isFlying() == true}
    can land: ${myDrone.land().isFlying() == false}
    battery capacity: ${myDrone.capacity}
    battery status: ${myDrone.draw(50).getCharge()}
    battery drained: ${myDrone.draw(75).getCharge()}`);
console.log(`
    constructor linked: ${myDrone.constructor == createDrone}`);
