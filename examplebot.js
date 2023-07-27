// ==UserScript==
// @name         MxoBot Example Bot
// @namespace    http://tampermonkey.net/<3nevin
// @version      1.0
// @description  Demo bot to illustrate LibNevin. MxoBot
// @author       ngixl
// @match        https://pixelplace.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixelplace.io
// @grant        unsafeWindow
// @require      https://greasyfork.org/scripts/457456-libnevin/code/LibNevin.js
// ==/UserScript==
/* global NevinCore, NevinWaitForElm*/

const core = new NevinCore({
    timeout: 25
});

NevinWaitForElm('#canvas').then(function(c) {
    c.addEventListener('click', function() {
        const [sx, sy] = document.getElementById('coordinates').textContent.split(',').map(Number)
        core.picker.requestImageFromFileDialog(core.palette).then(a => {
            console.log(core.nevinWS.ws.readyState)
            a.image.addEventListener('load', function() {
                core.engine.tasks = [...core.engine.tasks, ...a.convertToTasks(sx,sy, core.nevinWS)]
            })
        })
    })
}) 
