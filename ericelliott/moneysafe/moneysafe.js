export function myMoneysafe() {
    return "Util for manipulating currency values";
}
function $(amount, rounder = Math.round, prefix = "$") {
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
            return `${prefix}${this.$.toFixed(2)}`;
        },
        toJSON() {
            return `${prefix}${this.$.toFixed(2)}`;
        }
    });
}

function m$() {}
function in$() {}

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
        // todo: add the suffix implementation
        const prefMatcher = "^([^\\.\\d-]{1,4})?((-)?\\d+(\\.\\d+)?)$";
        const prefRegEx = new RegExp(prefMatcher);
        const match = prefRegEx.exec(curText);
        if (match) {
            const prefix = match[1];
            const value = match[2];
            return $(parseFloat(value), Math.round, prefix);
        } else {
            throw new Error();
        }
    }
});

export default Object.assign(myMoneysafe, { $, m$, in$ });
