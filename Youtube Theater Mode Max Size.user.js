// ==UserScript==
// @name         Youtube Theater Mode Max Size
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Set the maximum size of Youtube video player in theater mode. Usefull if you player window is slightly bigger than a typical video resolution to prevent resampling. This might make your playback look more crisp.
// @author       Paul Hoefler
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==


(function() {
    GM_config.init(
        {
            'id': 'Youtube Theater Mode Max Size Settings', // The id used for this instance of GM_config
            'fields':
            {
                'maxHeight':
                {
                    'label': 'Max Height (in px)',
                    'type': 'text',
                    'default': '1080'
                },
                'maxWidth':
                {
                    'label': 'Max Width (in px)',
                    'type': 'text',
                    'default': '1920'
                }
            }
        });

    const menu_command_id = GM_registerMenuCommand('Set Max Sizes',  function() {
        GM_config.open()
    }, '')

    function setMaxSize(theater, fullscreen) {
        const element = document.getElementsByClassName("html5-main-video")[0];
        const outerElement = document.getElementById("full-bleed-container");
        if(theater == true && ( fullscreen == false || fullscreen == undefined))
        {
            element.style.maxHeight = GM_config.get('maxHeight') + "px";
            element.style.maxWidth = GM_config.get('maxWidth') + "px";
            outerElement.style.maxHeight = GM_config.get('maxHeight') + "px";
        }
        else
        {
            element.style.removeProperty('max-height');
            element.style.removeProperty('max-width');
            outerElement.style.removeProperty('max-height');
        }
    }

    document.onclick = function (e) {
        var timesRun = 0;
        var interval = setInterval(function(){
            timesRun += 1;
            if(timesRun === 10){
                clearInterval(interval);
            }
            setMaxSize(document.getElementsByTagName('ytd-watch-flexy').item(0).theater, document.getElementsByTagName('ytd-watch-flexy').item(0).fullscreen);
        }, 100);
    };

    setTimeout(() => {
        var timesRun = 0;
        var interval = setInterval(function(){
            timesRun += 1;
            if(timesRun === 10){
                clearInterval(interval);
            }
            setMaxSize(document.getElementsByTagName('ytd-watch-flexy').item(0).theater, document.getElementsByTagName('ytd-watch-flexy').item(0).fullscreen);
        }, 100);
    }, 500);

})();
