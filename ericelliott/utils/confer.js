import { myUtil } from "../util.js";

export function myConfer() {
    return "my configuration manager";
}

function withConfig() {
    return myUtil.curry(function(
        config,
        obj = {
            log(text = "") {
                console.log(text);
            }
        }
    ) {
        return Object.assign({}, obj, {
            get(key) {
                // return config[key] == undefined
                //     ? this.log(`Missing config key: ${key}`) //implicit dependency
                //     : config[key];
                return config.toString();
            }
        });
    });
}

export default Object.assign(myConfer, { withConfig });
