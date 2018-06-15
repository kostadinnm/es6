import { myUtil } from "../util.js";
import { myLogger } from "./logger.js";

export function myConfer() {
    return "my configuration manager";
}

function toConfigurableDummy(
    config,
    logger = {
        log(text) {
            console.log("DEFAULT MESSAGE: " + text);
        }
    },
    ...obj
) {
    return myUtil.curry(function(c, o) {
        return Object.assign({}, o, {
            get(key) {
                return c[key] == undefined
                //todo:
                    ? logger.log(`Missing config key: ${key}`)//o.log(`Missing config key: ${key}`) //implicit dependency
                    : c[key];
            }
        });
    })(config)(...obj);
}
function toConfigurableFlat(
    config,
    loggable = {
        log(text) {
            console.log(text);
        }
    }
) {
    return Object.assign({}, config, {
        get(key) {
            return config[key] == undefined
                ? loggable.log(`Missing config key: ${key}`) //implicit dependency
                : config[key];
        }
    });
}

function toConfigurable({ config, logger }, ...obj) {
    return myUtil.pipe(
        myLogger.toLogable(logger),
        myUtil.curry(function(c, o) {
            return Object.assign({}, o, {
                get(key) {
                    return c[key] == undefined
                        ? o.log(`Missing config key: ${key}`) //explicit dependency
                        : c[key];
                }
            });
        })(config)
    )(...obj);
}

export default Object.assign(myConfer, { toConfigurableDummy, toConfigurable, toConfigurableFlat });
