import { myMoneysafe } from "./moneysafe.js";
import { myUtil } from "../util.js";
const $ = myMoneysafe.$;

export function myLedger() {
    return "Helper util for manipulating currency values";
}

function $$(...ms) {
    return myUtil.pipe(...ms)($(0));
}
function addPercent(percent, ...currency) {
    if (percent < 0 || percent > 100) {
        throw new TypeError("percent must be between 0 and 100");
    }

    return myUtil.curry(function(pct, cur) {
        return cur.add($(cur.$ * (pct / 100.0)));
    })(percent)(...currency);
}
function subtractPercent(percent, ...currency) {
    if (percent < 0 || percent > 100) {
        throw new TypeError("percent must be between 0 and 100");
    }
    return myUtil.curry(function(pct, cur) {
        return cur.subtract($(cur.$ * (pct / 100.0)));
    })(percent)(...currency);
}

export default Object.assign(myLedger, { $$, subtractPercent, addPercent });
