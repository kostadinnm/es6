import { myUtil } from "../util.js";

export function myLogger() {
    return "my logger";
}

function toLogable(logger, ...obj) {
    return myUtil.curry(function(l, o) {
        return Object.assign({}, o, {
            log(text) {
                // todo: add warn/error behavior
                l(text);
                // return l(text);
                // return text;
            }
        });
    })(logger)(...obj);
}

export default Object.assign(myLogger, { toLogable });
