"use strict";
/*
    Chrome extension that based on current GitHub API and redirects in two particular cases:
    (A) https://github.com -> https://github.com/PROFILE_NAME
    (B) https://gist.github.com/PROFILE_NAME -> https://gist.github.com/PROFILE_NAME/public
 */

let callback = function (request) {
    const key = "gvsUserName";

    let matchers = createMatchers(localStorage.getItem(key));

    for (var i = 1; i < matchers.length; i++) {
        if (request.url.match(matchers[i][0])) {
            return {redirectUrl: request.url + matchers[i][1]};
        }
    }

    return {};
};

function createMatchers(a) {
    let flags = "gm";
    let cases = ["^(.+(gist)).*(" + a + ")$", "^(.+(gist)).*(" + a + "/)$", ".+(github.com)$", ".+(github.com/)$"];
    return [a,
        [new RegExp(cases[0], flags), "/public"], [new RegExp(cases[1], flags), "public"],
        [new RegExp(cases[2], flags), "/" + a], [new RegExp(cases[3], flags), a]
    ];
}

let filter = {urls: ["*://*.github.com/*"], types: ["main_frame"]};
let options = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(callback, filter, options);