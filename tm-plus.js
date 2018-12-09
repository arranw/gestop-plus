// ==UserScript==
// @name         Live
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://home.aeromag2000.com/gestoplight/
// @grant        none
// @require http://code.jquery.com/jquery-1.8.24.min.js
// ==/UserScript==
// update test
var $ = window.jQuery;

var flightBox = document.getElementById('dvFlightStrip');

var flightCodeBox = document.getElementById('txtFlightNo');
flightCodeBox.classList.remove("setCarrier");
var t1Time = document.getElementById("DeicingTimes_Type1FinishTimeStr");
t1Time.classList.remove("time");
t1Time.classList.add("timetest");

var array = ["","WJA","WEN","PCO","QXE","TSC"];

var selectList = document.createElement("select");
selectList.id = "mySelect";
selectList.style.width = "150px";
flightBox.parentElement.insertBefore(selectList, flightBox);

for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.value = array[i];
    option.text = array[i];
    selectList.appendChild(option);
}

var addAlCode=document.createElement("input");
addAlCode.type="button";
addAlCode.value="Go";
addAlCode.onclick=alCode;
addAlCode.style.marginLeft="10px";
flightBox.parentElement.insertBefore(addAlCode, flightBox);

var addAcType = document.createElement("input");
addAcType.type="button";
addAcType.value="AC";
addAcType.onclick=addAc;
addAcType.style.marginLeft="10px";
flightBox.parentElement.insertBefore(addAcType, flightBox);

function addAc() {
    var acBox = document.getElementById("txtAircraftTypeCd");
    var regBox = document.getElementById('txtRegistration');

    for (var i =0; i < 999; i++) {
        if (i == parseInt(regBox.value.substr(3, regBox.value.length))) {
            if (i > 0 && i < 12) {
                acBox.value = "B73W";
            } else if (i > 201 && i < 266) { acBox.value = "B73W";
            } else if (i > 301 && i < 309) { acBox.value = "B38M";
            } else if (i > 400 && i < 452) { acBox.value = "DH8D";
            } else if (i > 575 && i < 589) { acBox.value = "SF34";
            } else if (i > 601 && i < 615) { acBox.value = "B736";
            } else if (i > 670 && i < 673) { acBox.value = "B76W";
            } else if (i > 801 && i < 853) { acBox.value = "B73H"; };
        }
        if (regBox.value.includes("GTXO")) acBox.value = "A321";
    }
}

function alCode() {
    var select = document.getElementById('mySelect');
    var regBox = document.getElementById('txtRegistration');
    var flightCodeBox = document.getElementById('txtFlightNo');
    var oaciDD = document.getElementById('CarrierCdOACI');

    var hasFlightCode = false;
    var hasRegCode = false;

    var flightTextValue = flightCodeBox.value.toUpperCase();
    var regTextValue = regBox.value.toUpperCase();

    // begin loop at 1 to avoid searching for "" in array
    for (var i = 1; i < array.length; i++) {
        if (flightTextValue.includes(array[i])) {
            hasFlightCode = true;
        }
        if (regTextValue.includes(array[i])) {
            hasRegCode = true;
        }
    }

    if (hasFlightCode) {
        flightCodeBox.value = select.value + flightCodeBox.value.substr(3, flightCodeBox.value.length);
    } else {
        flightCodeBox.value = select.value + flightCodeBox.value;
    }
    if (hasRegCode) {
        regBox.value = select.value + regBox.value.substr(3, regBox.value.length);
    } else {
        regBox.value = select.value + regBox.value;
    }

    oaciDD.value = select.value;
}
