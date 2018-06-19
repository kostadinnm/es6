import test from "ava";
//import { m$ } from "./moneysafe.js"; const $ = m$();
import { $ } from "./moneysafe.js";
import { $$, subtractPercent, addPercent } from "./ledger.js";

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
