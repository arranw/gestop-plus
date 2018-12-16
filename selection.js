// ==UserScript==
// @name         Section Selection Buttons
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://home.aeromag2000.com/gestoplight/Deicing/SelectAirportSection*
// @grant        none
// ==/UserScript==

var container = document.getElementById("frmSelectAirportSection");

var itbButton = document.createElement("input");
itbButton.type = "button";
itbButton.value = "ITB";
itbButton.onclick = checkItb;
container.parentNode.insertBefore(itbButton, container);

var dtbButton = document.createElement("input");
dtbButton.type = "button";
dtbButton.value="DTB";
dtbButton.onclick=checkDtb;
container.parentNode.insertBefore(dtbButton, container);

var allButton = document.createElement("input");
allButton.type="button";
allButton.value="ALL";
allButton.onclick=checkAll;
container.parentNode.insertBefore(allButton, container);

var clearButton = document.createElement("input");
clearButton.type="button";
clearButton.value="CLEAR";
clearButton.onclick=clearAll;
container.parentNode.insertBefore(clearButton, container);


var checkboxList = [];
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox") {
        console.log(inputs[i].value);
        checkboxList.push(inputs[i]);
    }
}

// [0] 105 Terminal - A
// [1] 112 Apron 9
// [2] 123 Terminal - B
// [3] 124 Terminal - C
// [4] 125 Terminal - D
// [5] 126 Terminal - E
// [6] 160 North Pad
// [7] 176 EAST Pad
// [8] 177 Apron 2
// [9] 178 West Pad

function check(selection) {
    console.log(selection);
    for (var i = 0; i > selection.length; i++) {
        console.log(selection.charAt(i));
        checkboxList[parseInt(selection.charAt(i))].checked = true;
    }
}

function checkItb() {
    for (var j = 0; j < checkboxList.length; j++){
        checkboxList[j].checked = false;
    }
    checkboxList[3].checked = true;
    checkboxList[4].checked = true;
    checkboxList[5].checked = true;
}

function checkDtb() {
    for (var j = 0; j < checkboxList.length; j++){
        checkboxList[j].checked = false;
    }
    checkboxList[0].checked = true;
    checkboxList[2].checked = true;
    checkboxList[6].checked = true;
}

function checkAll() {
    for (var j = 0; j < checkboxList.length; j++){
        checkboxList[j].checked = false;
    }
    // dtb
    checkboxList[0].checked = true;
    checkboxList[2].checked = true;
    checkboxList[6].checked = true;
    // itb
    checkboxList[3].checked = true;
    checkboxList[4].checked = true;
    checkboxList[5].checked = true;
    // etc
    checkboxList[1].checked = true;
}

function clearAll() {
    for (var j = 0; j < checkboxList.length; j++){
        checkboxList[j].checked = false;
    }
}

function findFirstDescendant(parent, tagname) {
    parent = document.getElementById(parent);
    var descendants = parent.getElementsByTagName(tagname);
    if ( descendants.length ){
        return descendants[0];
    }
    return null;
}
