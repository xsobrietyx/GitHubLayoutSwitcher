"use strict";

const userName = "xsobrietyx";

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({gvsUserName: userName}, function () {
    });

    chrome.storage.sync.get(["gvsUserName"], function (result) {
        localStorage.setItem("gvsUserName", result.gvsUserName);
    });
});
