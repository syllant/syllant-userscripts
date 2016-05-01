// ==UserScript==
// @name         syllant/RealScout
// @homepageURL  https://github.com/syllant/syllant-userscripts
// @version      1.0
// @description  Decorate RealScout site
// @author       Sylvain Francois
// @match        http://*.realscout.com/homesearch/my-homes/*
// @match        http://*.realscout.com/homesearch/listings/matched/*
// @match        http://*.realscout.com/homesearch/my-homes/saved/*
// @require      https://code.jquery.com/jquery-2.2.0.min.js
// @updateURL    https://github.com/syllant/userscripts/raw/master/realscout.user.js
// @updateURL    https://github.com/syllant/userscripts/raw/master/realscout.user.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('a.redfin { padding:12px; border-radius: 50%; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); background: #D3D3D3 no-repeat url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAMGGlDQ1BJQ0MgUHJvZmlsZQAASImVlwdYU8kWx+eWFEJCC0RASuhNkF6ld6nSwUZIAoQSQ0JQsaOLCq5dVLCiqyAKrgWQxYYoFhYBe91YUFHWxYINlTdJAF33le/N9829v5w5c+Z/5s69mQFA2ZElEOSgKgDk8vOFMcF+zKTkFCZJAnCgCJQBAO4stkjgGx0dDhmM3P9e3l0HiPR+xVoa65/t/7WocrgiNgBINOQ0joidC/kIALg2WyDMB4DQCe1GM/MFUn4LWV0IBQJAJEs5Q846Uk6Ts63MJy7GH3IAAGQqiyXMAEBJGp9ZwM6AcZQEkG35HB4f8g7IXuxMFgeyBPK43NwZkJWpkM3TvouT8beYaaMxWayMUZbnIivkAJ5IkMOa/X9Ox/8uuTnikTEMYaVmCkNipDnDeavKnhEmZagdaeanRUZBVoN8nseR+Uv5dqY4JH7Yv48t8odzBhgAoIDDCgiDDOcSZYiz432H2Z4llPWF/mgkLz80bpjThDNihuOjBfycyPDhOMsyuaEjvI0rCowd8UnnBYVChisNPVKYGZco14m2FvASIiErQe4UZceGDfe9X5jpHzniIxTHSDUbQ36bLgyKkftgmrmikbwwGzZLNpYmZJ/8zLgQeV8siStKCh/RwOEGBMo1YBwuP35YGwZXl1/McN9iQU70sD+2jZsTHCOfZ+ygqCB2pG93Plxg8nnAHmaxJkbL9WPvBPnRcXJtOA7CgT8IAEwghjUNzABZgNfR19AHf8lbggALCEEG4ALrYctIj0RZCx9eY0Eh+BMSF4hG+/nJWrmgANq/jFrlV2uQLmstkPXIBk8g5+LauBfugYfDqw+s9rgr7jbSj6k8MioxkBhADCEGES1GdbCh6hxYhYD3b2xh8M6F2Um18Edy+BaP8ITQRXhIuEaQEG6BBPBYFmXYazqvSPiDciaIABIYLWg4uzQYs3fEBzeFqp1wP9wT6ofacQauDaxxR5iJL+4Nc3OC1u8Vike1fZvLH8eTqv4+n2G7kqWS07CKtNEn4z/q9WMU/+/miAPvYT96Ysuww1gbdhq7gDVjDYCJncQasXbsuJRHV8Jj2UoYGS1Gpi0bxuGN+NjW2Pbafv7H6KxhBULZ8wb53Fn50hfCf4ZgtpCXkZnP9IVfZC4zlM+2Gce0t7VzBkD6fZd/Pt4wZN9thHHxmy3vFABuJdCY8c3GMgLg2BMA6O++2Yxew9drNQDHO9liYYHchksvBECB/xvqQAvoASNgDnOyB87AA/iAQDARRIE4kAymwVnPBLlQ9UwwFywCxaAUrAYbQDnYDnaBKnAAHAINoBmcBufAJdAJroE7cG30gBegH7wDgwiCkBAaQke0EH3EBLFC7BFXxAsJRMKRGCQZSUUyED4iRuYii5FSZC1SjuxEqpFfkWPIaeQC0oXcQh4gvchr5BOKoVRUHdVFTdHxqCvqi4ahcehUNAPNQwvRJehKdBNaie5H69HT6CX0GipBX6ADGMAUMQZmgFljrpg/FoWlYOmYEJuPlWBlWCVWizXBZ30Fk2B92EeciNNxJm4N12cIHo+z8Tx8Pr4CL8er8Hq8Fb+CP8D78a8EGkGHYEVwJ4QSkggZhJmEYkIZYQ/hKOEsfHd6CO+IRCKDaEZ0ge9mMjGLOIe4griVWEc8RewiPiIOkEgkLZIVyZMURWKR8knFpM2k/aSTpG5SD+kDWZGsT7YnB5FTyHxyEbmMvI98gtxNfkoeVFBRMFFwV4hS4CjMVlilsFuhSeGyQo/CIEWVYkbxpMRRsiiLKJsotZSzlLuUN4qKioaKboqTFHmKCxU3KR5UPK/4QPEjVY1qSfWnTqGKqSupe6mnqLeob2g0minNh5ZCy6etpFXTztDu0z4o0ZVslEKVOEoLlCqU6pW6lV4qKyibKPsqT1MuVC5TPqx8WblPRUHFVMVfhaUyX6VC5ZjKDZUBVbqqnWqUaq7qCtV9qhdUn6mR1EzVAtU4akvUdqmdUXtEx+hGdH86m76Yvpt+lt6jTlQ3Uw9Vz1IvVT+g3qHer6Gm4aiRoDFLo0LjuIaEgTFMGaGMHMYqxiHGdcanMbpjfMdwxywfUzume8x7zbGaPppczRLNOs1rmp+0mFqBWtlaa7QatO5p49qW2pO0Z2pv0z6r3TdWfazHWPbYkrGHxt7WQXUsdWJ05ujs0mnXGdDV0w3WFehu1j2j26fH0PPRy9Jbr3dCr1efru+lz9Nfr39S/zlTg+nLzGFuYrYy+w10DEIMxAY7DToMBg3NDOMNiwzrDO8ZUYxcjdKN1hu1GPUb6xtHGM81rjG+baJg4mqSabLRpM3kvamZaaLpUtMG02dmmmahZoVmNWZ3zWnm3uZ55pXmVy2IFq4W2RZbLTotUUsny0zLCsvLVqiVsxXPaqtV1zjCOLdx/HGV425YU619rQusa6wf2DBswm2KbBpsXo43Hp8yfs34tvFfbZ1sc2x3296xU7ObaFdk12T32t7Snm1fYX/VgeYQ5LDAodHhlaOVI9dxm+NNJ7pThNNSpxanL84uzkLnWudeF2OXVJctLjdc1V2jXVe4nncjuPm5LXBrdvvo7uye737I/S8Pa49sj30ezyaYTeBO2D3hkaehJ8tzp6fEi+mV6rXDS+Jt4M3yrvR+6GPkw/HZ4/PU18I3y3e/70s/Wz+h31G/9/7u/vP8TwVgAcEBJQEdgWqB8YHlgfeDDIMygmqC+oOdgucEnwohhISFrAm5Eaobyg6tDu2f6DJx3sTWMGpYbFh52MNwy3BheFMEGjExYl3E3UiTSH5kQxSICo1aF3Uv2iw6L/q3ScRJ0ZMqJj2JsYuZG9MWS4+dHrsv9l2cX9yquDvx5vHi+JYE5YQpCdUJ7xMDEtcmSpLGJ81LupSsncxLbkwhpSSk7EkZmBw4ecPknilOU4qnXJ9qNnXW1AvTtKflTDs+XXk6a/rhVEJqYuq+1M+sKFYlayAtNG1LWj/bn72R/YLjw1nP6eV6ctdyn6Z7pq9Nf5bhmbEuozfTO7Mss4/nzyvnvcoKydqe9T47Kntv9lBOYk5dLjk3NfcYX42fzW+doTdj1owugZWgWCDJc8/bkNcvDBPuESGiqaLGfHW41WkXm4t/Ej8o8CqoKPgwM2Hm4Vmqs/iz2mdbzl4++2lhUOEvc/A57Dktcw3mLpr7YJ7vvJ3zkflp81sWGC1YsqBnYfDCqkWURdmLfi+yLVpb9HZx4uKmJbpLFi559FPwTzXFSsXC4htLPZZuX4Yv4y3rWO6wfPPyryWckoultqVlpZ9XsFdc/Nnu500/D61MX9mxynnVttXE1fzV19d4r6laq7q2cO2jdRHr6tcz15esf7th+oYLZY5l2zdSNoo3SjaFb2rcbLx59ebP5Znl1yr8Kuq26GxZvuX9Vs7W7m0+22q3624v3f5pB2/HzZ3BO+srTSvLdhF3Fex6sjthd9svrr9U79HeU7rny17+XklVTFVrtUt19T6dfatq0BpxTe/+Kfs7DwQcaKy1rt1Zx6grPQgOig8+/zX11+uHwg61HHY9XHvE5MiWo/SjJfVI/ez6/obMBkljcmPXsYnHWpo8mo7+ZvPb3maD5orjGsdXnaCcWHJi6GThyYFTglN9pzNOP2qZ3nLnTNKZq62TWjvOhp09fy7o3Jk237aT5z3PN19wv3DsouvFhkvOl+rbndqP/u70+9EO5476yy6XGzvdOpu6JnSd6PbuPn0l4Mq5q6FXL12LvNZ1Pf76zRtTbkhucm4+u5Vz69XtgtuDdxbeJdwtuadyr+y+zv3KPyz+qJM4S44/CHjQ/jD24Z1H7EcvHosef+5Z8oT2pOyp/tPqZ/bPmnuDejufT37e80LwYrCv+E/VP7e8NH955C+fv9r7k/p7XglfDb1e8Ubrzd63jm9bBqIH7r/LfTf4vuSD1oeqj64f2z4lfno6OPMz6fOmLxZfmr6Gfb07lDs0JGAJWbKtAAYrmp4OwOu9ANCS4d4BnuMoSvLzl6wg8jOjjMB/YvkZTVbgzmWvDwDxCwEIh3uUbbCaQKbCu3T7HecDUAeH0TpcROkO9vJYVHiKIXwYGnqjCwCpCYAvwqGhwa1DQ192Q7G3ADiVJz/3SQsR7vF3jJdSZ89L8GP5FyGLbWs2neRDAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KAtiABQAAAphJREFUOBFtkk1rU0EUhs983PQmtkUrbUETm9KFLlwIRRD/gStBqRsVKqKiCxcF6cJFbzfiByJYq1QXVooILfgL3LlTigtdas1XK8GQQtPaJPfOHN9JmmBqB5I7c2bOM+97zggmEoKI51OpEeV5lyOLAJElwcYaE2K+bo34nl/Nfg6INmnX0NON88RsjOd7sSmpJUkcigtJrJnqzLRpLQ2l0/l5Yx6M5/Oz/zJES8GbZPKw0N43knI/W5uN2M4AhCmnpBRnfaWHY1JSpRZOjOczT5AnnVLdohlrpSL2umCoxuL31Wz2cWvv+eDgDPn+BxLeMCmanOvpWRCVSsld7tT+NyxAAaX9xbExNTc66t0qFlcs80cYJS3VgVjvwaRLcvb3BEAa4Bk7trSEkraHQhwMNiSirVZ0TwCTsAFR3YFuLC+Hj7q7B5SQpyTsWbaZUlhYc4Ap7Ldr4AKNG/CVghOvU6mTWkqD2iRZqom41iMKezayc3eKtLVI5BSZDoCzVEfLhBDHerv8T1U3R5ZLrEbRD2b78koh9wxLuuDeCkaHBRhnBZmo1XrVmLcoXNFggTjZsL40nss9xNwltsR2AlyJNADYzV/8uXLJhPW7HtYhINKLXX8xmDqOPQ6aAHB2KWhE8CcEi4BIZwqFhZo1X50qX+u+uC8RbhbPfd3osADvuMvpINsH6wE6EdU4wGukbWutJ9X5V8nkuR0Vjfq1AQbJyNVNCwJvulmka7+y7yMTvvMFWgIlWul7ACfwi/CTcnrHj9J6ADdvVMLwj2FTPgQhAOIyom2zNbkd1VdjAKCdR4ePDN138SmcaRxwiyCd9nvL5YQPJZFS5na5vOHirt9omZnt7z+RiO97CuRpvMZSLQrP3Fxb+/IXqs0kcYXVyZ0AAAAASUVORK5CYII=") 4px 4px;}');
    GM_addStyle('a.redfin:hover { background-color: #ffffff; }');
    GM_addStyle('a.redfin-left { float:left; margin-right: 4px;');
    GM_addStyle('a.redfin-right { float:right; margin-left: 4px;');

    $(document).ready(function () {
        if ($('.my-homes').length === 1) {
            decorateList();
        } else if ($('.listing-detail').length === 1) {
            decorateDetail();
        }

        function decorateList() {
            if ($('.listing-detail-small').length === 0) {
                setTimeout(decorateList, 1000);
                return;
            }

            $('.row .location').each(function() {
                $(this).prepend(buildRedfinLink($(this), 'redfin-left'));
            });
        }


        function decorateDetail() {
            if ($('.listing--hero-tool__container').length === 0) {
                setTimeout(decorateDetail, 1000);
                return;
            }

            $('p.price').before(buildRedfinLink($('.basic-info'), 'redfin-right'));
        }

        function buildRedfinLink(parentDiv, cssClass) {
            var query = parentDiv.find('.address').text().replace(/ /g, '+') + '+' + parentDiv.find('.city').text().replace(/ /g, '+').replace('+|', '');
            return $("<a />", {
                href: 'https://duckduckgo.com/?q=%21+site%3Awww.redfin.com+' + query,
                target: 'realscout-redfin',
                text: ' ',
                class: 'redfin ' + cssClass
            });
        }
    });})();
