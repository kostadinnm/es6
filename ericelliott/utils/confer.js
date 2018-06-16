import { myUtil } from "../util.js";
import { myLogger } from "./logger.js";

export function myConfer() {
    return "my configuration manager";
}

function toConfigurable(
    config,
    logger = {
        log(text) {
            console.log("Default message: " + text);
        }
    },
    ...loggable
) {
    return myUtil.curry(function(c, l) {
        return Object.assign({}, l, {
            get(key) {
                return c[key] == undefined
                    //if present, use the object's log()-function, otherwise fall back to the default logger
                    ? (typeof l.log == "function" ? l.log : logger.log)(`Missing config key: ${key}`)
                    : c[key];
            }
        });
    })(config)(...loggable);
}

function toConfigurableExp({ config, logger }, ...obj) {
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

export default Object.assign(myConfer, { toConfigurable, toConfigurableExp });
