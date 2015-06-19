// ==UserScript==
// @name         syllant/BGG decorator
// @homepageURL  https://github.com/syllant/syllant-userscripts
// @version      1.0
// @description  Decorate BoardGameGeek.com
// @author       Sylvain Francois
// @match        https://www.boardgamegeek.com/boardgame/*
// @match        https://boardgamegeek.com/boardgame/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant        none
// ==/UserScript==

var EXTERNAL_SEARCH_LINKS = [
  {
    desc: 'Tric Trac',
    href: 'http://www.trictrac.net/recherche?entities=boardgame&query={}',
    icon: 'http://www.trictrac.net/favicon.ico',
    enabled:true
  },
  {
    desc: 'BoardGamePrices.com',
    href: 'http://www.boardgameprices.com/compare-prices-for-{}',
    icon: 'http://www.boardgameprices.com/favicon.ico',
    enabled:true
  },
  {
    desc: 'Amazon.com',
    href: 'http://www.amazon.com/s/ref=sr_nr_seeall_1?rh=k%3Asun+tzu+board+game%2Ci%3Atoys-and-games&keywords=board+game+{}',
    icon: 'http://www.amazon.com/favicon.ico',
    enabled:true
  },
];

// Add links on board game page, next to the title, to search the game on external sites
decorateBoardgameSearchLinks();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Implementation
  
function decorateBoardgameSearchLinks() {
  var titleEl = $('h1.geekitem_title');
  for (i=0; i<EXTERNAL_SEARCH_LINKS.length; i++) {
    var linkDef = EXTERNAL_SEARCH_LINKS[i];
    if (!linkDef.enabled)
      continue;

    titleEl.append($("<a />", {
      href: linkDef.href.replace('{}', encodeURIComponent(titleEl.find('a').text())),
      target: '_blank',
      title: linkDef.desc,
      style: 'background: url({}) no-repeat; background-size: 16px; padding:0 10px;'.replace('{}', linkDef.icon)
   }));
  }
}