"use strict";
/*
    Chrome extension that based on current GitHub API and redirects in two particular cases:
    A) https://github.com -> https://github.com/PROFILE_NAME
    B) https://gist.github.com/PROFILE_NAME -> https://gist.github.com/PROFILE_NAME/public
 */
var callback = function (request) {
    var matchers = createMatchers("xsobrietyx"); //TODO move to the localStorage

    for (var i = 1; i < matchers.length; i++) {
        if (request.url.match(matchers[i][0])) {
            return {redirectUrl: request.url + matchers[i][1]};
        }
    }

    return {};
};

function createMatchers(a) {
    var flags = "gm";
    var cases = ["^(.+(gist)).*(" + a + ")$", "^(.+(gist)).*(" + a + "/)$", ".+(github.com)$", ".+(github.com/)$"];
    return [a,
        [new RegExp(cases[0], flags), "/public"], [new RegExp(cases[1], flags), "public"],
        [new RegExp(cases[2], flags), "/" + a], [new RegExp(cases[3], flags), a]
    ];
}

var filter = {urls: ["*://*.github.com/*"], types: ["main_frame"]};
var options = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(callback, filter, options);