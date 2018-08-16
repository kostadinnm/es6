import test from "ava";
import { myMoneysafe } from "./moneysafe.js";
import { myLedger } from "./ledger.js";
const $ = myMoneysafe.$;
const $$ = myLedger.$$,
    subtractPercent = myLedger.subtractPercent,
    addPercent = myLedger.addPercent;

test("should total $(x) amounts", function(t) {
    const actual = $$($(40), $(60), $(-5)).$;
    const expected = $(95).$;
    t.is(actual, expected);
});

test("should add percents to the total", function(t) {
    const actual = $$($(50), addPercent(50)).$;
    const expected = $(75).$;
    t.is(actual, expected);
});

test("should subtract percents from the total", function(t) {
    const actual = $$($(50), subtractPercent(50)).$;
    const expected = $(25).$;
    t.is(actual, expected);
});
