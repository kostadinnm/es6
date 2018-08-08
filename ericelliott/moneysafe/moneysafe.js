import { myUtil } from "../util.js";

export function myMoneysafe() {
    return "Util for manipulating currency values";
}
function $(amount, rounder = Math.round, symbol = "$", prefixed = true) {
    const currency = function(value) {
        return $(amount).add(value);
    };
    return Object.assign(currency, {
        constructor: $,
        valueOf() {
            return rounder(amount * 100.0);
        },
        round() {
            return $(this.$);
        },
        get $() {
            return this.cents / 100.0;
        },
        get cents() {
            return Math.round(amount * 100.0);
        },
        add(cur) {
            return $(amount + cur.$);
        },
        subtract(cur) {
            return $(amount - cur.$);
        },
        toString() {
            return prefixed ? `${symbol}${this.$.toFixed(2)}` : `${this.$.toFixed(2)}${symbol}`;
        },
        toJSON() {
            return prefixed ? `${symbol}${this.$.toFixed(2)}` : `${this.$.toFixed(2)}${symbol}`;
        }
    });
}

function m$({ symbol, prefixed = true }) {
    return myUtil.curry(function(amount, rounder = Math.round) {
        return $(amount, rounder, symbol, prefixed);
    });
}

function in$(amount) {
    return $.cents(amount).$;
}

Object.assign($, {
    of(cns) {
        return $(cns / 100.0, function(v) {
            return v;
        });
    },
    cents(cns) {
        return $(Math.round(cns) / 100.0);
    },
    parse(curText) {
        const matcher = "^([^\\.-\\d]{1,4})?((-)?\\d+(\\.\\d+)?)$|^((-)?\\d+(\\.\\d+)?)([^\\.-\\d]{1,4})?$";
        const regEx = new RegExp(matcher);
        const match = regEx.exec(curText);
        if (match) {
            if (match[2]) {
                const prefix = match[1];
                const value = match[2];
                return $(parseFloat(value), Math.round, prefix);
            } else if (match[5]) {
                const value = match[5];
                const suffix = match[8];
                return $(parseFloat(value), Math.round, suffix, false);
            } else {
                throw new Error("Unable to parse expression to a currency value");
            }
        } else {
            throw new TypeError("expression is not a currency value");
        }
    }
});

export default Object.assign(myMoneysafe, { $, m$, in$ });
