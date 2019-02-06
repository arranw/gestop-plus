// ==UserScript==
// @name         gs proto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://home.aeromag2000.com/gestoplight/
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-1.8.24.min.js
// @require      Common.js
// @require      DeicingVM.js
// @require      knockout-3.4.2.js
// @downloadURL  https://raw.githubusercontent.com/arranw/gestop-plus/master/Gs-Plus.js
// ==/UserScript==


(function() {
    'use strict';
    var labelWidth = "85px";
    var inputWidth = "145px";
    var inputMarginTop = "8px";
    var buttonWidth = "80px";
    // *** flight strip addons ***
    var flightBox = document.getElementById('dvFlightStrip');

    var addedComponents = document.createElement("div");
//     addedComponents.style.width = "40%";
    addedComponents.id = "addedComps";

    var inputBase = document.createElement("input");

    // Airline Code Select
    var airlineLabel = document.createElement("div");
    airlineLabel.style.textAlign = "center";
    airlineLabel.style.width = labelWidth;
    airlineLabel.style.float = 'left';
    airlineLabel.style.marginTop = inputMarginTop;
    airlineLabel.innerHTML = "Airline";

    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    selectList.style.marginLeft = "10px";
    selectList.style.width = "152px";
    var array = ["","WJA","WEN","PCO","QXE","TSC"];
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
    }
   
    // flight number
    var flightCodeLabel=document.createElement("div");
    flightCodeLabel.style.width = labelWidth;
    flightCodeLabel.style.textAlign = "center";
    flightCodeLabel.style.float='left';
    flightCodeLabel.style.marginTop = inputMarginTop;
    flightCodeLabel.innerHTML = "Flight";

    var flightCode=document.createElement("input");
    flightCode.style.width = inputWidth;
    flightCode.type="text";
    flightCode.style.marginLeft = "10px";

    // tail number
    var tailCodeLabel=document.createElement("div");
    tailCodeLabel.style.textAlign = "center";
    tailCodeLabel.style.width = labelWidth;
    tailCodeLabel.style.float = 'left';
    tailCodeLabel.style.marginTop = inputMarginTop;
    tailCodeLabel.innerHTML = "Tail";

    var tailCode = document.createElement("input");
    tailCode.style.width = inputWidth;
    tailCode.type="text";
    tailCode.style.marginLeft="10px";

    // gate field
    var gateCodeLabel = document.createElement("div");
    gateCodeLabel.style.textAlign = "center";
    gateCodeLabel.style.width = labelWidth;
    gateCodeLabel.style.float='left';
    gateCodeLabel.style.marginTop = inputMarginTop;
    gateCodeLabel.innerHTML = "Gate";

    var gateCode = document.createElement("input");
    gateCode.style.width = inputWidth;
    gateCode.type="text";
    gateCode.style.marginLeft="10px";

    // t1 button
    var t1Button=document.createElement("input");
    t1Button.style.width = buttonWidth;
    t1Button.type="button";
    t1Button.value="T1";
    t1Button.onclick=selectT1;

    // t4 button
    var t4Button=document.createElement("input");
    t4Button.style.width = buttonWidth;
    t4Button.type="button";
    t4Button.value="T4";
    t4Button.onclick=selectT4;

    // go button
    var goButton=document.createElement("input");
    goButton.type="button";
    goButton.value="Go";
    goButton.style = "background-color: #333 !important";
    goButton.style.width = buttonWidth;
    goButton.onclick = alCode;

    // select t1
    function selectT1() {
        var treatment1 = document.getElementById("Treatment1_Id");
        treatment1.selectedIndex = 1;
    }

    // select t4
    function selectT4() {
        var treatment1 = document.getElementById("Treatment1_Id");
        treatment1.selectedIndex = 2;
    }

    // add components at end in one block for easier reorganizing
    addedComponents.appendChild(airlineLabel);
    addedComponents.appendChild(selectList);
    addedComponents.appendChild(document.createElement("br"));
    addedComponents.appendChild(flightCodeLabel);
    addedComponents.appendChild(flightCode);
    addedComponents.appendChild(document.createElement("br"));
    addedComponents.appendChild(tailCodeLabel);
    addedComponents.appendChild(tailCode);    
    addedComponents.appendChild(document.createElement("br"));
    addedComponents.appendChild(gateCodeLabel);
    addedComponents.appendChild(gateCode);
    addedComponents.appendChild(document.createElement("br"));
    addedComponents.appendChild(t1Button);
    addedComponents.appendChild(t4Button);
    addedComponents.appendChild(goButton);
    flightBox.parentElement.insertBefore(addedComponents, flightBox);

    function alCode() {

        var flightCodeBox = document.getElementById('txtFlightNo');

        var select = document.getElementById('mySelect');
        var regBox = document.getElementById('txtRegistration');
        var oaciDD = document.getElementById('CarrierCdOACI');

        oaciDD.value = tailCode.value;
        regBox.value = flightCode.value;

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

        var acBox = document.getElementById("txtAircraftTypeCd");
        regBox = document.getElementById('txtRegistration');

        for (var j =0; j < 999; j++) {
            if (j == parseInt(regBox.value.substr(3, regBox.value.length))) {
                //                 alert("nonono");
                if (j > 0 && j < 12) {
                    acBox.value = "B73W";
                } else if (j > 201 && j < 266) {
                    acBox.value = "B73W";
                } else if (j > 301 && j < 309) {
                    acBox.value = "B38M";
                } else if (j > 400 && j < 452) {
                    acBox.value = "DH8D";
                } else if (j > 575 && j < 589) {
                    acBox.value = "SF34";
                } else if (j > 601 && j < 615) {
                    acBox.value = "B736";
                } else if (j > 670 && j < 673) {
                    acBox.value = "B76W";
                } else if (j > 801 && j < 853) {
                    acBox.value = "B73H";
                } else {

                }
            }
            if (regBox.value.includes("GTXO")) acBox.value = "A321";
        }

        // Gate Selector
        var gateSelect = document.getElementById("Gate_Id");

        if (gateCode.value == "A2" || gateCode.value == "a2") {
            gateSelect.value = "12778";}
        else if (gateCode.value == "A9" || gateCode.value == "a9") {
            gateSelect.value = "12930";}
        else if (gateCode.value == "1") {
            gateSelect.value = 126;}
        else if (gateCode.value == "110") {
            gateSelect.value = 973;}
        else if (gateCode.value == "111") {
            gateSelect.value = 974;}
        else if (gateCode.value == "2") {
            gateSelect.value = 127;}
        else if (gateCode.value == "3") {
            gateSelect.value = 128;}
        else if (gateCode.value == "4") {
            gateSelect.value = 129;}
        else if (gateCode.value == "5") {
            gateSelect.value = 130;}
        else if (gateCode.value == "6") {
            gateSelect.value = 131;}
        else if (gateCode.value == "11") {
            gateSelect.value = 133;}
        else if (gateCode.value == "12") {
            gateSelect.value = 132;}
        else if (gateCode.value == "13") {
            gateSelect.value = 134;}
        else if (gateCode.value == "14") {
            gateSelect.value = 135;}
        else if (gateCode.value == "15") {
            gateSelect.value = 136;}
        else if (gateCode.value == "16") {
            gateSelect.value = 137;}
        else if (gateCode.value == "17") {
            gateSelect.value = 138;}
        else if (gateCode.value == "18") {
            gateSelect.value = 139;}
        else if (gateCode.value == "19") {
            gateSelect.value = 140;}
        else if (gateCode.value == "20") {
            gateSelect.value = 141;}
        else if (gateCode.value == "21") {
            gateSelect.value = 142;}
        else if (gateCode.value == "22") {
            gateSelect.value = 143;}
        else if (gateCode.value == "23") {
            gateSelect.value = 144;}
        else if (gateCode.value == "24") {
            gateSelect.value = 145;}
        else if (gateCode.value == "31") {
            gateSelect.value = 149;}
        else if (gateCode.value == "32") {
            gateSelect.value = 150;}
        else if (gateCode.value == "33") {
            gateSelect.value = 151;}
        else if (gateCode.value == "34") {
            gateSelect.value = 152;}
        else if (gateCode.value == "35") {
            gateSelect.value = 153;}
        else if (gateCode.value == "36") {
            gateSelect.value = 154;}
        else if (gateCode.value == "37") {
            gateSelect.value = 155;}
        else if (gateCode.value == "38") {
            gateSelect.value = 156;}
        else if (gateCode.value == "39") {
            gateSelect.value = 157;}
        else if (gateCode.value == "40") {
            gateSelect.value = 158;}
        else if (gateCode.value == "50") {
            gateSelect.value = 332;}
        else if (gateCode.value == "51") {
            gateSelect.value = 333;}
        else if (gateCode.value == "52") {
            gateSelect.value = 334;}
        else if (gateCode.value == "53") {
            gateSelect.value = 335;}
        else if (gateCode.value == "54") {
            gateSelect.value = 336;}
        else if (gateCode.value == "55") {
            gateSelect.value = 337;}
        else if (gateCode.value == "56") {
            gateSelect.value = 338;}
        else if (gateCode.value == "57") {
            gateSelect.value = 339;}
        else if (gateCode.value == "58") {
            gateSelect.value = 340;}
        else if (gateCode.value == "59") {
            gateSelect.value = 341;}
        else if (gateCode.value == "61") {
            gateSelect.value = 342;}
        else if (gateCode.value == "62") {
            gateSelect.value = 343;}
        else if (gateCode.value == "63") {
            gateSelect.value = 344;}
        else if (gateCode.value == "64") {
            gateSelect.value = 345;}
        else if (gateCode.value == "65") {
            gateSelect.value = 346;}
        else if (gateCode.value == "70") {
            gateSelect.value = 347;}
        else if (gateCode.value == "71") {
            gateSelect.value = 348;}
        else if (gateCode.value == "72") {
            gateSelect.value = 349;}
        else if (gateCode.value == "73") {
            gateSelect.value = 350;}
        else if (gateCode.value == "74") {
            gateSelect.value = 355;}
        else if (gateCode.value == "75") {
            gateSelect.value = 356;}
        else if (gateCode.value == "76") {
            gateSelect.value = 357;}
        else if (gateCode.value == "77") {
            gateSelect.value = 358;}
        else if (gateCode.value == "78") {
            gateSelect.value = 359;}
        else if (gateCode.value == "79") {
            gateSelect.value = 360;}
        else if (gateCode.value == "80") {
            gateSelect.value = 361;}
        else if (gateCode.value == "81") {
            gateSelect.value = 362;}
        else if (gateCode.value == "82") {
            gateSelect.value = 377;}
        else if (gateCode.value == "83") {
            gateSelect.value = 378;}
        else if (gateCode.value == "84") {
            gateSelect.value = 365;}
        else if (gateCode.value == "85") {
            gateSelect.value = 366;}
        else if (gateCode.value == "86") {
            gateSelect.value = 381;}
        else if (gateCode.value == "87") {
            gateSelect.value = 382;}
        else if (gateCode.value == "88") {
            gateSelect.value = 383;}
        else if (gateCode.value == "89") {
            gateSelect.value = 384;}
        else if (gateCode.value == "90") {
            gateSelect.value = 385;}
        else if (gateCode.value == "91") {
            gateSelect.value = 386;}
        else if (gateCode.value == "92") {
            gateSelect.value = 387;}
        else if (gateCode.value == "93") {
            gateSelect.value = 388;}
        else if (gateCode.value == "94") {
            gateSelect.value = 389;}
        else if (gateCode.value == "95") {
            gateSelect.value = 390;}
        else if (gateCode.value == "96") {
            gateSelect.value = 391;}
        else if (gateCode.value == "392") {
            gateSelect.value = 97;}
        else if(gateCode.value == "126") {
            gateSelect.value = 12776;}
        else if (gateCode.value == "127") {
            gateSelect.value = 12776;
        } else {
            alert("Invalid Gate: " + gateCode.value);
        }

        // clear inputs
        gateCode.value = "";
        flightCode.value = "";
        tailCode.value = "";
    }

    function findFirstDescendant(parent, tagname) {
        parent = document.getElementById(parent);
        var descendants = parent.getElementsByTagName(tagname);
        if ( descendants.length ){
            return descendants[0];
        }
        return null;
    }

    // Your code here...
})();
