// ==UserScript==
// @name         syllant/Trello decorator
// @homepageURL  https://github.com/syllant/syllant-userscripts
// @version      1.0
// @description  Decorate trello.com
// @author       Sylvain Francois
// @match        https://trello.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant        none
// ==/UserScript==

// Hide "add" column which is only useful when initializing boards!
$( document ).ready(function() {
  hideAddColumn();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Implementation
  
function hideAddColumn() {
    // Column is update dynamically when page is loaded, need to wait before hiding it
    setTimeout(function() { $('.list.mod-add.is-idle').hide(); }, 500);
}