// ==UserScript==
// @name         Themes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  themes
// @author       You
// @match        https://home.aeromag2000.com/gestoplight/
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-1.8.24.min.js
// @require      Common.js
// @require      DeicingVM.js
// @require      knockout-3.4.2.js
// ==/UserScript==

// remove aeromag logo until dark version is created
var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
    images[0].parentNode.removeChild(images[0]);
}

// create tickers for theme selection
var themeTicker = document.createElement("input");
themeTicker.type = "checkbox";
// themeTicker.checked = true;
themeTicker.onclick = changeTheme;
document.body.appendChild(themeTicker);

var xmasTicker = document.createElement("input");
xmasTicker.type = "checkbox";
// xmasTicker.checked = true;
xmasTicker.onclick = changeTheme;
document.body.appendChild(xmasTicker);

changeTheme();
function changeTheme() {
    var bgBlack = "#000";
    var black = "#000";
    var white = "#FFF";
    var magBlue = "#33BBFF";
    var green = "#00FF3E";
    var darkGreen = "#00B32C";
    var red = "#Fd4a3e";
    var darkRed = "#B3000C";
    var themeBg;
    var themeFg;

    findFirstDescendant("body", "table").classList.remove("border1");
    findFirstDescendant("ui-id-2", "td").classList.remove("border1");
    document.getElementById("tdFlightsInColdStorage").classList.remove("border1");
    document.getElementById("tdFlightsInProgress").classList.remove("border1");

    GM_addStyle(".border2 {padding: 5px!important}");
    document.getElementById("tdFlightsInProgress").classList.add("border2");


    if (themeTicker.checked) {
        if (xmasTicker.checked) {
            themeBg = "{background-color: " + black + " !important}";
            themeFg = "{color: " + magBlue + " !important}";

            var bgDarkGreen = "{background-color: " + darkGreen + " !important}";
            var fgDarkGreen = "{color: " + darkGreen + " !important}";

            var bgGreen = "{background-color: " + green + " !important}";
            var fgGreen = "{color: " + green + " !important}";

            var bgDarkRed = "{background-color: " + darkRed + " !important}";
            var fgDarkRed = "{color: " + darkRed + " !important}";

            var bgRed = "{background-color: " + red + " !important}";
            var fgRed = "{color: " + red + " !important}";

            GM_addStyle("body, tr, th, tbody {border: 0px solid #fff !important}");
            GM_addStyle(".ui-state-default {background: " + darkRed + " !important}");
            GM_addStyle(".ui-state-default {color: " + black + " !important}");

            GM_addStyle("body, div, header, th, tr, td, footer, section " + bgDarkGreen);
            GM_addStyle("body, div, header, th, tr, td, footer, section, a " + fgDarkRed);

            GM_addStyle("input, select, textarea, button, html " + bgDarkRed);
            GM_addStyle("input, select, textarea, button " + fgDarkGreen);
        } else {
            themeBg = "{background-color: " + black + " !important}";
            themeFg = "{color: " + magBlue + " !important}";

            GM_addStyle(".ui-state-default {background: " + bgBlack + " !important}");
            GM_addStyle(".ui-state-default {color: " + white + "!important}");
            GM_addStyle("fieldset {border: 0px !important}");

            GM_addStyle("body, html, footer, div, th, tr, td, section, select, input, textarea, button, li " + themeBg);
            GM_addStyle("body, html, h3, footer, div, th, tr, td, select, section, input, textarea, button, a " + themeFg);
        }
    } else {
        themeBg = "{background-color: #fff !important}";
        themeFg = "{color: #000 !important}";
        GM_addStyle("body, tr, th, tbody {border: 0px solid #fff !important}");
        GM_addStyle(".ui-state-default {background: #9399a0 !important}");
        GM_addStyle(".ui-state-default {color: #e0e0e0 !important}");
        GM_addStyle("body, html, footer, div, th, tr, td, section, select, button, input, textarea, li " + themeBg);
        GM_addStyle("body, html, h3, footer, div, th, tr, td, select, button, section, input, textarea, a " + themeFg);
    }
    GM_addStyle(".ui-state-active {border: 1px solid  #d3dce0 !important}");

}

function findFirstDescendant(parent, tagname) {
   parent = document.getElementById(parent);
   var descendants = parent.getElementsByTagName(tagname);
   if ( descendants.length ){
      return descendants[0];
   }
   return null;
}
