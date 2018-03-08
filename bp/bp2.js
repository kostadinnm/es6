"use strict";
/*eslint "no-unused-vars":"off"*/

function test({c:lorem, d:ipsum} = {e: {f: 42}, g: true}) {
    return "";
}

function getNowPlayingString({
    artist = "Unknown artist",
    title = "Unknown title"
} = {}) {
    return artist + " - " + title;
}
