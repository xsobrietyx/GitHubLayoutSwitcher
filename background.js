/*
    BSD 3-Clause License

    Copyright (c) 2019, Vadym Serdiuk
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this
       list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its
       contributors may be used to endorse or promote products derived from
       this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";
/*
    Chrome extension that based on current GitHub API and redirects in two particular cases:
    (A) https://github.com -> https://github.com/PROFILE_NAME
    (B) https://gist.github.com/PROFILE_NAME -> https://gist.github.com/PROFILE_NAME/public
 */

let callback = function (request) {
    const key = "gvsUserName";

    let matchers = createMatchers(localStorage.getItem(key));

    for (let i = 1; i < matchers.length; i++) {
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