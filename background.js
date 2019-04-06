"use strict";
/*
    Chrome extension that based on current GitHub API and redirects in two particular cases:
    A) https://github.com -> https://github.com/PROFILE_NAME
    B) https://gist.github.com/PROFILE_NAME -> https://gist.github.com/PROFILE_NAME/public
 */
var callback = function (details) {
    console.log("Intercepted url: " + details.url);
    if (details.url.match(/^(.+(gist)).*(xsobrietyx)$/gm)) {
        return {redirectUrl: details.url + "/public"};
    } else if (details.url.match(/^(.+(gist)).*(xsobrietyx\/)$/gm)) {
        return {redirectUrl: details.url + "public"};
    } else if (details.url.match(/.+(github.com)$/gm)) {
        return {redirectUrl: details.url + "/xsobrietyx"};
    } else if (details.url.match(/.+(github.com\/)$/gm)) {
        return {redirectUrl: details.url + "xsobrietyx"};
    }
    return {};
};

var filter = {urls: ["*://*.github.com/*"], types: ["main_frame"]};
var options = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(callback, filter, options);