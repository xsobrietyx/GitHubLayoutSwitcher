"use strict";

document.addEventListener("DOMContentLoaded", function () {

    function submitUserName() {
        var userNameInput = document.getElementById("userName__text");
        var userName = userNameInput.value;

        const key = "gvsUserName";
        localStorage.removeItem(key);

        chrome.storage.sync.set({gvsUserName: userName}, function () {
        });

        chrome.storage.sync.get(key, function (res) {
            localStorage.setItem(key, res[key]);
        });

        window.close();
    }

    var el = document.getElementById("userName__submit");
    el.addEventListener("click", submitUserName);
});