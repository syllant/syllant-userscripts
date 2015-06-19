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

// Since BGG uses HTTPS, external favicon loaded in HTTP will cause security warnings. Therefore they are encoded in
// base64, e.g. using http://www.askapache.com/online-tools/base64-image-converter/
var EXTERNAL_SEARCH_LINKS = [
  {
    desc: 'Tric Trac',
    href: 'http://www.trictrac.net/recherche?entities=boardgame&query={}',
    icon: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////ALipqf+LhYX/e1JS/3tSUv+LhYX/uKmp/////wD///8A////AP///wD///8A////AP///wD///8A4dvb/14yMv+LOzb/o0xK/7hcWv+4XFr/o0xK/4s7Nv9eMjL/4dvb/////wD///8A////AP///wD///8AysXF/3IcD//FZ2T/v2Jf/7hcWv+jTEr/o0xK/7hcWv+/Yl//xWdk/3IcD//KxcX/////AP///wD///8A////AHotJf+jTEr/ahAH/0wAAP9cBgD/ei0l/3otJf9cBgD/TAAA/2oQB/+jTEr/ei0l/////wD///8A////ALipqf9yHA//TAAA/4s7Nv+/Yl//03Ju/9Nybv/Tcm7/03Ju/79iX/+LOzb/TAAA/3IcD/+4qan/////AP///wBkSUn/chwP/8VnZP/Tcm7/03Ju/5tIQ//Tcm7/03Ju/5tIQ//Tcm7/03Ju/8VnZP9yHA//ZElJ/////wD///8Ae1JS/79iX//Tcm7/03Ju/7hcWv9MAAD/zGxp/8xsaf9MAAD/uFxa/9Nybv/Tcm7/v2Jf/3tSUv////8A////AHNhYf+jTEr/03Ju/9Nybv/Tcm7/o0xK/9Nybv/Tcm7/o0xK/9Nybv/Tcm7/03Ju/6NMSv9zYWH/////AP///wDKxcX/chwP/9Nybv/Tcm7/03Ju/9Nybv/Tcm7/03Ju/9Nybv/Tcm7/03Ju/9Nybv9yHA//ysXF/////wD///8Ai4WF/14yMv9qEAf/zGxp/9Nybv/Tcm7/03Ju/9Nybv/Tcm7/03Ju/8xsaf9qEAf/XjIy/4uFhf////8A1NLS/y0eHv+LhYX/XjIy/1MFAP+jTEr/v2Jf/9Nybv/Tcm7/v2Jf/6NMSv9TBQD/XjIy/4uFhf8tHh7/1NLS/2RJSf+moaH/Qzc3/4+Jif9zYWH/f3h4/0wAAP9MAAD/TAAA/0wAAP9/eHj/c2Fh/4+Jif9DNzf/pqGh/2RJSf/U0tL/ysXF/0M3N/9/eHj/sq6u/////wD///8A397e/9/e3v////8A////ALKurv9/eHj/Qzc3/8rFxf/U0tL/////AH94eP+ZlJT/Qzc3/9TS0v////8A////AP///wD///8A////AP///wDU0tL/Qzc3/5mUlP9/eHj/////AP///wAtHh7/ysXF/y0eHv////8A////AP///wD///8A////AP///wD///8A////AC0eHv/KxcX/LR4e/////wD///8Asq6u/9/e3v9/eHj/////AP///wD///8A////AP///wD///8A////AP///wB/eHj/397e/7Kurv////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    enabled:true
  },
  {
    desc: 'BoardGamePrices.com',
    href: 'http://www.boardgameprices.com/compare-prices-for-{}',
    icon: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAMMOAADDDgAAAAAAAAAAAACx0Z04oMSBvZ2/dvijvnX/pbxx/6m7bv+tuWz/sbhq/7S3Z/+4tWP/vLRg/8C0X//ArVP/w6pN+8yyXsnWv3hHmsmJro6/dP7F3LT/7/To//D06P/w9Of/8fPn//Lz5v/y8+b/8/Pl//Py5f/08+X/0sqQ/7uqTf/Bqkz/y7RgxYrFge6Gv3X/vNqw//7//v///////////////////////////////////////f38/8vIi/+1rFD/uqxQ/8CsUPp9w37+gcF6/4/Gg/+52q7/yeG+/9Tmyf/c6dD/3unS/97nzv/a48X/1t65/8nQnP+xtWT/srBX/7StU/+4rFD/eMaC/3zFf/9+wnv/qNSh/8bfvP++2q//udSk/7jRnv++0qD/xdWm/9Hbs//Fz5n/qLRf/62zXf+wsFj/s65V/3LIhf96yIf/g8mI/5LNlP/P6M7/8/nz/////v/+/v3//v7+//7//v//////4ejP/6K2Y/+mtF//qrNe/62xWv9wy43/ueTE/9Xt2P+Qz5b/f8WC/53Qmv/g8N7//v/+/////////////////9znzP+ct2f/oLZj/6W2Yv+ns17/cM+V/93z5v//////5/Xp/8Plx/+X0Jr/pdWl//n8+f/////////////////V5Mb/lblr/5q4af+fuGb/orZi/2LPlP+s5cX//f79////////////7vjw/8/q0v/6/fr/////////////////wtuy/5nBe/+hwn7/l7ho/5y3Zv9a0Jb/a9Od/sru2//+////////////////////////////////////8/ny/67Uo/++27L/w9ux/5vAeP+Wumv/VdKa/1jRl/9516f/6/ny/////////////////////////////f79/7/hv/+VzJH/stir/8bgvf+72Kr/kbxw/1HVn/9T05z/WdGa/8nv3P//////////////////////9Pv2/7/myP+AyYr/gMaE/7PbsP/Q58v/sNWl/4y/dP9K16P/Ttah/1HUnv9z2qz/3PXq///////e9en/rOPD/43Xp/9xy4z/b8eE/6DYqv/L6M3/qtiq/4fEf/+GwXj/S9qq9kfXpP9M1qL/TtSd/5blw//Z9ej/edio/1/Okv9izI7/aMuN/2rJif+L0p7/w+bJ/8Lkxv+a0Zz/iceF7Vvgt69E2qr9Rtmm/0rXo/9e2an/bdqt/1XSmv9a0Zf/Xs+V/2LNkf9mzI7/acqK/4rToP+a16j/eseG/I7Ok52B6copXOK5llzgtdJb3bHdW9qs3V/Zqt1l2ajdaNel3WvVot1w1aHddNSf3XbRm9180Zreg9Ga1IfQmJal2q4jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    enabled:true
  },
  {
    desc: 'Amazon.com',
    href: 'http://www.amazon.com/s/ref=sr_nr_seeall_1?rh=k%3Asun+tzu+board+game%2Ci%3Atoys-and-games&keywords=board+game+{}',
    icon: 'data:image/png;base64,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',
    enabled:true
  },
  {
    desc: 'Cardhaus games',
    href: 'http://www.cardhaus.com/products/search?query={}',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACKFBMVEX////+/v764z3/5Tbj4cf83zD78r767zX/5zPn5NH/3CfZu1JWRDf//ez/3EGykyzO0MbwsjLLlyuUdm+MgiKYlWH84Cz88C/jyCr8/PrrwCuWdT+zmW344rTiwKqbgSHQyc+bnIRwZiz/yjb+1T2ZZQm6gwK4iQq/mxr/1p3/+//XvqH/0USGfWX/+KjDu3B6eFd3YhjLigOYcgekelf/3q5nQAD52aj3263/7OtDIjW8nCWBZEn5+fiHWAqBcg793a7/69j97t7/7tfz6W/87d//9uO4q5pnPiFmWEVdTfj8/fmRlj3/6+7+79//7tp5al76/t1YPApRNgCkiyT/5DCtkjCTlYHf57/16jjl4/mThf1JNNrBo5j848T+8N3/9uT59Nj/+urZmhySZw75xDnXszr4/+zInh/s9MxRQbR9UQCLaR/5yY762bCEjVjg9ff7////59GXlXSykTl/Yh2QciOtiQaPZRL/4StmVP+VeR3AkSz7z4i0pZnG6v/f8/3h7/ssNh/P0fLo3vexhxubcxXOnCG6jxScehhhS/bV1vOAaoeu2uW/5/y34/ba8f/Z8fzD6f7b8v////fx8/pcWivMlQ44MSJFMAi3hgOXeiNhTO/Fu/+55fu97v/C5vzH6f1qY4uQf/xnTP+Xl+p5bHKbmpeNXwHDvaXFwpheTfzA7PV1mKfi9//d8vza9v/W3ceDb/9HO6pPQZX6/8j2+s7d59j3l++1AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAASAAAAEgARslrPgAAAGFJREFUGNOtjr0RQFAQBr81JzHjL5RSgTY0rAAN6EALRCLzBDd4xDa63fmCkxz0PRI4wh0IKcB+BUIGAKtkkhRqd+ShgSfQETPLitgnyfLIR0kMvLHqt7CVLK0H/6OE3hcnWiANYHtrJbkAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMDQtMzBUMjM6MDc6MDArMDA6MDBHixfzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTA0LTMwVDIzOjA3OjAwKzAwOjAwNtavTwAAAABJRU5ErkJggg==',
    enabled:true
  },
  {
    desc: 'Bdml',
    href: 'http://bdml.free.fr/jeux_filtre.php?titre={}',
    icon: 'data:image/x-icon;base64,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jv80YIT/RWuD/zVcbv8eh5v/I4iZ/yOImf8jiJn/I4iZ/yiUtf9Gpsv/Rnae/1KCqv9Ga5r/RGm0/0RptP9EabT/R2yu/12HrP9cjK3/XYqm/1mEof9TgqT/T3+q/1WFs/9OfbH/T4Gz/1KCqv9bh6b/ZJO1/22gwf9YhJf/WISX/1iEl/9hi5r/WISX/0ulsv9LpbL/S6Wy/0ulsv9KpKz/SqSs/0uNvP9Fc53/Ommb/zBSrP80V7H/MVKv/yhKqf85XZf/RXSW/1OCpP9bh6b/Wn2a/0x0lP9MdJT/Q2yO/zppm/86baj/PWuS/1J9o/9djLX/XYy1/0x6lf9KboX/Rmx9/1N0hv8+bIf/Opek/zqXpP84naz/OJ2s/zidrP9DhI//RXSW/0Jymv8yXpb/HT2c/zFSr/8dPqL/HUGa/zNchP8zXIT/O2WL/0t2nP9SepX/Q2yO/ztli/8zXIT/N2KK/zNchP87ZYv/PWuS/09/qv9WirP/Un+m/ztfc/87X3P/Sm6F/0B0m/8zd5f/MYub/yiUtf8hjrj/KZe5/0puhf9Nc4b/Snmi/zJelv8dP5X/IkGk/x09nP8kRpf/M1yE/ydUgv80Wnn/Q26V/0x5nP9Ldpz/Q2yO/zRghP83Yor/N2KK/zNchP9Fc53/Un6p/1KCqv9UhKv/O2SG/z1ke/9FdJb/R4a5/zmLtv81eJL/RqbL/z212f9Dp9P/O2WL/0Rnev9FdZz/THmc/77z9v/D9/n/w/f5/8b4+P++8/b/d6e8/zNchP95p77/w/X3/8b4+P/G+Pj/w/f5/7Tq7v8+bIf/vvP2/4a3yv9SfaP/apu8/8b5+v9yn7b/PWR7/3Kcqv/D9/n/VLLU/5fb5P/G+fr/x/v9/8T8/P+Ww83/RGd6/0Z2nv9Ldpz/uevv/8r+/f/K/v3/yv79/83+/f/D9vf/O2WL/6DS3f/L/vz/yv79/8r+/f/K/v3/xvn6/059pf+97vL/lsPN/zpmjv9Whqf/yvz7/4y7zf9Fa4P/WISX/8v+/P9kvNz/hc/i/8T8/P/K/v3/zf79/6na4/9Fa4P/PWyU/0Nulf+p2uP/ve7y/3mnvv9yn7b/ntHc/83+/f9bh6b/nM3a/8r8+/93p7z/ZZap/4y7zf/L/vz/YY6u/67j6v+p2uP/OmaO/059pf/D9ff/nM3a/1J6lf9KboX/yvz7/3TB0f9rt8f/zf79/2uxuP9llqn/ZZap/z1idP9SfJ3/Q26V/5fI2f/D9/n/THmc/0p5ov9qnLb/yv79/3mnvv+UxNT/xvn6/1J9o/86ZJL/YYyt/8r+/f93qsT/ntHc/73u8v8zXIT/Q26V/7Tm7f+u4+r/Un+m/ztfc//D9ff/h8TK/1WZo//N/v3/TJWc/ztsff9GbH3/Sm6F/1OCpP9TgqT/hrfK/8r+/f9bh6b/Tn2l/2qctv/N/v3/jLvN/4a3yv/K/v3/ZZW6/0Jznv9FdJb/yv79/4O30f+PwdP/xvn6/zdiiv86Zo7/oNLd/7Ts8v9Yhrn/PmyH/67j6v+Z3N7/PJmn/8r+/f9rt8f/R3qd/1uKsv9cjbv/THmc/1OCpP93qsT/yv79/8r+/f/N/v3/yv79/8v+/P+Gt8r/cKC7/83+/f9woLv/PWyU/0V0lv/D9vf/l8jZ/4O30f/L/vz/U4Kk/y9chf+Mu83/xvn6/2WVuv9GeqL/l9vk/7Tq7v84psn/xPz8/4rY6f9clLv/XJXE/1yVxP80YIT/RXSW/3GduP/K/v3/y/78/8r+/f/K/v3/y/78/5TE1P9cjK3/yv79/5TE1P9Sgqr/PWuS/7Tq7v+p2uP/d6rE/83+/f99sMX/Q3OW/4y7zf/N/v3/d6rE/1yUu/+q6fP/xPz8/2bH5f+69vn/oOPw/1uZw/9mmsz/ZprM/z1slP9FdZz/XYqm/8r+/f+UxNT/YY6u/2qctv+05u3/tOzy/1KCqv/D9vf/yv79/8v+/P+e0dz/qdrj/7Tm7f9mmr7/yv79/8r+/f/K/v3/yv79/8v+/P/K/v3/yv79/83+/f/E/Pz/Zsfl/7Ts8v+07PL/W5nD/2md0P9llbr/PWuS/0Jymv9Ldpz/jLvN/2GOrv9Gdp7/Rnqi/5fI2f/D9vf/UoKq/5fI2f/H+/3/zf79/7Tm7f+UxNT/vvP2/1yUu//G+fr/tObt/8b5+v/K/v3/w/X3/57R3P/H+/3/y/78/7r2+f9Jttv/nubx/77z9v9Vi7v/XJXE/1WLu/8zXIT/PWuS/0Nzlv9biqf/U4Kk/1uKp/9cjK3/nM3a/8r8+/9cjK3/U4Kk/2qbvP9qlbP/YY6u/32wxf/K/Pv/XI27/22gwf9llbr/ZZW6/2STtf9Gc5r/QnKa/0qZvP9Cq8z/Q67U/0Ou1P+K2On/yv79/12Mtf9Vi7v/VYu7/yxWff86Zo7/THmc/6na4//L/vz/yv79/8r+/f/K/v3/yv79/2qctv9PgqX/UoKq/059pf9FdZz/apy2/8v+/P9kk7X/VYWz/2KPtP9ij7T/VYWz/z1slP86ZJL/OYu2/z2t0v8+sdX/O6nN/3DK3f/N/v3/Yo+0/059sf9CdKL/LFZ9/z1rkv9SfaP/nM3a/8r+/f/K/v3/y/78/8r+/f++8/b/W4qn/0d6nf9Me6T/UoKq/0J0ov9biqf/yv79/3envP9ahrL/ZZW6/12Mtf9WirP/Tn2l/z1rkv8rfqL/LprA/0KrzP9DrtT/XLnY/8r+/f93qsT/VYWz/1qGsv87ZYv/O2WL/1J9o/9MeZz/Tn2l/1aGp/9dh6z/W4qy/1SEq/9TgqT/VISr/1SEq/9Pf6r/Rnae/0Jymv9MeZz/PWuS/1KCqv9djLX/XIyt/1uKsv9cjK3/Q3OW/zN3l/8pl7n/N6XK/zupzf87qc3/VKXG/12Mtf9Yhrn/UoKq/0Nulf87ZIb/OmaO/zpmjv9DbpX/QW6Z/0Jznv9FdZz/Snmi/059pf9OfaX/THuk/0p5ov9Ngav/Tn2l/z1rkv8vXIX/Rnae/1aGp/9Whqf/Voan/2KPtP9PgqX/KoSp/ymXuf9DrtT/Sbbb/z6x1f89nsT/VISr/1qGsv9ahrL/PmyH/yxWff8lT33/M1yE/zpmjv9DbpX/RnOa/0p5ov9KeaL/Rnqi/0Jznv9Gd6H/Snmi/1KCqv9Ngav/QnOe/zZjjf9Gc5r/XYes/1yMrf9Whqf/YY6u/1uKp/85i7b/OpS5/zupzf9Jttv/VL3f/0amy/9hjq7/ZJO1/2GOrv8oTGv/LFZ9/yVLdf83Yor/QW6Z/0Zzmv9Gc5r/QW6Z/z1slP9FdZz/Rnae/0p5ov9KeaL/S3ai/0x7pP9Cc57/N2KK/zpmjv9OfaX/XIyt/12Kpv9cjK3/W4qn/zmYuP8olLX/PZ7E/1y52P9Uvd//VKXG/2WVuv9qm7z/ZZW6/ydRe/8nUXv/J1F7/y9chf86ZJL/PWyU/z1slP89bJT/Rnqi/0x7pP9Gdp7/QnOe/0x7pP9Hep3/S3ai/0Nulf89bJT/OmaO/0x5nP9TgqT/Youj/2GMrf9diqb/RoWn/yt+ov8qhKn/N53E/0Ou1P9Kmbz/Zpq+/2aavv9mmr7/Ommb/ydUgv8sVn3/LFZ9/zRghP89bJT/QnKa/0Z3of9Gd6H/RnOa/0Jymv9Gdp7/S3ai/0Z2nv9Fc53/QW6Z/ztli/83Yor/O2WL/0x5nP9ii6P/XYqm/1OCpP9dh6z/U4Kk/0Nzlv9Ngav/SJW4/2agxv9clLv/XJS7/2WVuv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    enabled:true
  },
  {
    desc: 'Vin d\'jeu',
    href: 'http://www.vindjeu.eu/?s={}',
    icon: 'data:image/png;base64,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',
    enabled:true
  }
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
      style: 'background: url({}) 0 8px no-repeat; background-size: 16px; padding:0 10px;'.replace('{}', linkDef.icon)
   }));
  }
}