import test from "ava";
// import { m$, $, in$ } from "./moneysafe.js";

test("should return money with .valueOf() in cents", function(t) {
    const actual = $(10).valueOf();
    const expected = 1000;
    t.is(actual, expected);
});

test("should round during dollar lifts", function(t) {
    const actual = $(0.56).valueOf();
    const expected = 56;
    t.is(actual, expected);
});

test("should return money with x cents", function(t) {
    const actual = $.cents(10).valueOf();
    const expected = 10;
    t.is(actual, expected);
});

test("should round to nearest cent", function(t) {
    const actual = $.cents(10.1).valueOf();
    const expected = 10;
    t.is(actual, expected);
});

test("should return cents rounded to nearest cent", function(t) {
    const actual = $.of(10.1).cents;
    const expected = 10;
    t.is(actual, expected);
});

test("should accurately add values that trip aup IEE 754", function(t) {
    const actual = $(0.1) + $(0.2);
    const expected = 30;
    t.is(actual, expected);
});

test("should retain floating point precision for cent fractions", function(t) {
    const actual = $.of(0.1) + $.of(0.2);
    const expected = $.of(0.30000000000000004).valueOf();
    t.is(actual, expected);
});

test("should return new money object, rounded to the cent", function(t) {
    const actual = $.of(0.6).round().cents;
    const expected = 1;
    t.is(actual, expected);
});

test("should return the amount in dollars, rounded to the penny", function(t) {
    const actual = $.of($.of(0.1) + $.of(0.2)).$;
    const expected = 0;
    t.is(actual, expected);
    t.is($(1).$, 1);
    t.is($(10.101).$, 10.1);
    t.is($(10.106).$, 10.11);
    t.is($(-5).$, -5);
});

test("should return money with .cents == 0", function(t) {
    const actual = $(0).cents;
    const expected = 0;
    t.is(actual, expected);
});

test("should add a + b in cents", function(t) {
    const actual = $(10)($(20)).cents;
    const expected = 3000;
    t.is(actual, expected);
});

test("should be == $(a)", function(t) {
    const actual = $(10)($(0)).cents;
    const expected = $(10).cents;
    t.is(actual, expected);
});

test("should sum a + -b in cents", function(t) {
    const actual = $(10)($(-5)).cents;
    const expected = $(5).cents;
    t.is(actual, expected);
});

test("should be == to $(a)($(x))", function(t) {
    const actual = $(10).add($(10)).$;
    const expected = 20;
    t.is(actual, expected);
});

test("should be == $.of($(a) - $(b))", function(t) {
    const actual = $(10).subtract($(5)).$;
    const expected = 5;
    t.is(actual, expected);
});

test("should == $", function(t) {
    const actual = $(10).constructor;
    const expected = $;
    t.deepEqual(actual, expected);
});

test("should == nCents", function(t) {
    const nCents = 100;
    const actual = $(10).constructor.of(nCents).cents;
    const expected = nCents;
    t.deepEqual(actual, expected);
});

test("should return string representing the value", function(t) {
    const actual = $(10.1).toString();
    const expected = "$10.10";
    t.is(actual, expected);
});

test("should return JSON representation of the value", function(t) {
    const actual = $(10.1).toJSON();
    const expected = "$10.10";
    t.is(actual, expected);
});

// watch out: stringify may not need the key quot marks or return double quotes
test("should return JSON representation of an object containing money object", function(t) {
    const actual = JSON.stringify({ money: $(10.1) });
    const expected = "{'money': '$10.10'}";
    t.is(actual, expected);
});

test("should return deserialized money object", function(t) {
    const actual1 = $.parse("$3.18").toString();
    const expected1 = "$3.18";
    t.is(actual1, expected1);

    const actual2 = $.parse("65").toString();
    const expected2 = "$65.00";
    t.is(actual2, expected2);

    // todo:
    // const actual3 = $.parse("E115.26")
    // const actual4 = $.parse("ẟ1000")
});

test("should throw error on invalid money format", function(t) {
    t.throws(function() {
        $.parse("100 USD");
    }, Error);
});

test("should return string with custom currency symbol", function(t) {
    const p = m$({ symbol: "#" });
    const actual = p(10.1).toString();
    const expected = "#10.10";
    t.is(actual, expected);
});

test("should convert cents to dollars", function(t) {
    const actual = in$(1010);
    const expected = 10.1;
    t.is(actual, expected);
});
