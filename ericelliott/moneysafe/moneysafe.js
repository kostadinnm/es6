export function myMoneysafe() {
    return "Util for manipulating currency values";
}

function $(amount, rounder = Math.round) {
    const currency = {
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
        }
    };
    return currency;
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
    }
});

export default Object.assign(myMoneysafe, { $, m$, in$ });
