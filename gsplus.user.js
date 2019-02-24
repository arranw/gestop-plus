// ==UserScript==
// @name         gs+
// @namespace    http://tampermonkey.net/
// @version      1.022401
// @description  try to take over the world!
// @author       You
// @match        https://home.aeromag2000.com/gestoplight/
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/arranw/gestop-plus/master/gsplus.js
// ==/UserScript==


(function() {
    'use strict';
    var flightBox = document.getElementById('dvFlightStrip');

    var hiColor = "#33BBFF";
    var loColor = "#fff";
    var borderColor = "#000";

    const docCont = document.createElement("div");
    docCont.id = "gsplus";
    docCont.style.margin = "0px";
    docCont.style.marginRight = "20px";
    docCont.style.float = "left";
    docCont.style.width = "200px";
    docCont.style.fontFamily = "Consolas";
    docCont.style.border = "1px solid black";
    flightBox.parentElement.insertBefore(docCont, flightBox);

    let airlineInfo = [["WJA"], ["WEN"], ["PCO"], [""]];
    let selectedTreatments = [["T1", false], ["T4", false], ["P", false]];
    let airlineButtons = [];
    let civilRegistrationKey = [["GTXO", "A321"],["GTXV", "A321"],["FTXL","A321"]];


    for (let k = 0; k < airlineInfo.length; k++) {
        airlineInfo[k].push(false);
        let inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.style.textTransform = "uppercase";
        inputEl.maxLength = 3;
        inputEl.style.fontFamily = "Consolas";
        inputEl.style.fontSize = "1.5em";
        inputEl.tabIndex = -1;
        if (k !== airlineInfo.length - 1) {
            inputEl.value = airlineInfo[k][0];
            inputEl.readOnly = true;
        }
        airlineButtons.push(inputEl);
        formatBtn(airlineButtons[k]);
    }

    // last airline box updates when it's changed
    airlineButtons[airlineButtons.length - 1].onchange = updateAirline;

    function updateAirline() {
        airlineInfo[airlineInfo.length - 1][0] = (airlineButtons[airlineButtons.length - 1].value).toUpperCase();
    }


    for (let i = 0; i < airlineButtons.length; i++) {
        airlineButtons[i].innerHTML = airlineInfo[i][0];
        airlineButtons[i].placeholder = "---";
        airlineButtons[i].addEventListener("click", function () {
            for (let j = 0; j < airlineButtons.length; j++) {
                // airlineButtons[j].style.border = "1px solid #000";
                airlineButtons[j].style.backgroundColor = loColor;
                airlineInfo[j][1] = false;
            }
            airlineInfo[i][1] = true;
            if (airlineInfo[i][1]) {
                // airlineButtons[i].style.border = "3px solid #33BBFF";
                airlineButtons[i].style.backgroundColor = hiColor;
            } else {
                // airlineButtons[j].style.border = "1px solid #000";
                airlineButtons[i].style.backgroundColor = loColor;
            }
        }, false);
        docCont.appendChild(airlineButtons[i]);
    }


    var flightLabel = document.createElement("div");
    formatLabel(flightLabel);
    flightLabel.innerHTML = "Flight";

    var flightInput = document.createElement("input");
    flightInput.placeholder = "----";
    formatInput(flightInput);

    var tailLabel = document.createElement("div");
    formatLabel(tailLabel);
    tailLabel.innerHTML = "Tail";

    var tailInput = document.createElement("input");
    tailInput.placeholder = "----";
    formatInput(tailInput);

    var gateLabel = document.createElement("div");
    formatLabel(gateLabel);
    gateLabel.innerHTML = "Gate";

    var gateInput = document.createElement("input");
    gateInput.placeholder = "--";
    formatInput(gateInput);

    var treatmentButtons = document.createElement("div");
    treatmentButtons.style.display = "flex";
    treatmentButtons.id = "treatment-container";

    // t1 button
    var t1Button = document.createElement("div");
    formatTreatmentButton(t1Button);
    t1Button.innerHTML = "T1";
    t1Button.addEventListener("click", function () {
        changeTreatment("T1")
    }, false);
    // t4 button
    var t4Button = document.createElement("div");
    formatTreatmentButton(t4Button);
    t4Button.innerHTML = "T4";
    t4Button.addEventListener("click", function () {
        changeTreatment("T4")
    }, false);
    // props
    var propButton = document.createElement("div");
    formatTreatmentButton(propButton);
    propButton.innerHTML = "Props";
    propButton.addEventListener("click", function () {
        changeTreatment("P")
    }, false);

    // go button
    var goButton = document.createElement("div");
    goButton.style.width = "100%";
    goButton.innerHTML = "Go";
    goButton.style.boxSizing = "border-box";
    goButton.style.border = "1px solid black";
    goButton.style.fontSize = "1.25em";
    goButton.style.textAlign = "center";
    goButton.style.lineHeight = "40px";
    goButton.style.cursor = "pointer";
    goButton.id = "go-button";
    goButton.onclick = go;

    flightLabel.appendChild(flightInput);
    docCont.appendChild(flightLabel);

    tailLabel.appendChild(tailInput);
    docCont.appendChild(tailLabel);

    gateLabel.appendChild(gateInput);
    docCont.appendChild(gateLabel);

    treatmentButtons.appendChild(t1Button);
    treatmentButtons.appendChild(t4Button);
    treatmentButtons.appendChild(propButton);

    docCont.appendChild(treatmentButtons);
    docCont.appendChild(goButton);

    function changeTreatment(treatment) { // needs reformatting
        var i;

        if (treatment === "T1") {
            selectedTreatments[0][1] = true; // enable T1
            selectedTreatments[1][1] = false; // disable T4
            t4Button.style.backgroundColor = loColor;
            t1Button.style.backgroundColor = hiColor;
        } else if (treatment === "T4") {
            selectedTreatments[0][1] = false; // disable T1
            selectedTreatments[1][1] = true; // enable T4
            t4Button.style.backgroundColor = hiColor;
            t1Button.style.backgroundColor = loColor;
        }
        if (treatment === "P") {
            if (selectedTreatments[2][1] === true) {
                propButton.style.backgroundColor = loColor;
                selectedTreatments[2][1] = false; // enable props
            } else {
                propButton.style.backgroundColor = hiColor;
                selectedTreatments[2][1] = true; // enable props
            }
        }

        if (treatment === "") {
            propButton.style.backgroundColor = loColor;
            t4Button.style.backgroundColor = loColor;
            t1Button.style.backgroundColor = loColor;
            selectedTreatments[0][1] = false;
            selectedTreatments[1][1] = false;
            selectedTreatments[2][1] = false;
        }

        for (i = 0; i < selectedTreatments.length; i++) {
            console.log(selectedTreatments[i][0] + " : " + selectedTreatments[i][1]);
        }
    }




    function formatInput(input) {
        input.type = "text";
        input.style.boxSizing = "border-box";
        input.style.float = "right";
        input.style.width = "50.5%";
        input.style.height = "100%";
        input.style.borderLeft = "2px solid black";
        input.style.borderRight = "0px solid black";
        input.style.borderTop = "0px solid black";
        input.style.borderBottom = "0px solid black";
        input.style.fontFamily = "Consolas";
        input.style.fontSize = "1.5em";
        input.style.textAlign = "center";
        input.style.color = hiColor;
        input.style.margin = "0px";
        input.maxLength = "4";
        input.style.textTransform = "uppercase";
        input.classList.add("flight-input");
    }


    function formatLabel(label) {
        label.style.lineHeight = "40px";
        label.style.height = "40px";
        label.style.textAlign = "center";
        label.style.border = "1px solid black";
        label.style.fontSize = "1.25em";
        label.classList.add("input-label");
    }

    function formatBtn(elem) {
        elem.style.boxSizing = "border-box";
        elem.style.textAlign = "center";
        elem.style.width = (100 / airlineInfo.length) + "%";
        elem.style.height = "40px";
        elem.style.border = "1px solid #000";
        elem.style.cursor = "pointer";
        elem.style.margin = "0px";
        elem.classList.add("airline-button");
    }

    function formatTreatmentButton(treatmentButton) {
        treatmentButton.style.boxSizing = "border-box";
        treatmentButton.style.textAlign = "center";
        treatmentButton.style.width = 100 / 3 + "%";
        treatmentButton.style.height = "40px";
        treatmentButton.style.lineHeight = "40px";
        treatmentButton.style.border = "1px solid black";
        treatmentButton.style.fontSize = "1.25em";
        treatmentButton.style.cursor = "pointer";
        treatmentButton.classList.add("treatment-button");
    }

    function go() {
        const flightNumberElem = document.getElementById("txtFlightNo");
        const tailNumberElem = document.getElementById("txtRegistration");
        const aircraftElem = document.getElementById("txtAircraftTypeCd");
        const gateElem = document.getElementById("Gate_Id");
        const carrierElem = document.getElementById("CarrierCdOACI");

        let selectedAirlineCode;
        let airlineIsSelected = false;

        for (var i = 0; i < airlineInfo.length; i++) {
            if (airlineInfo[i][1]) {
                selectedAirlineCode = airlineInfo[i][0];
                airlineIsSelected = true;
            }
        }

        if (airlineIsSelected) {
            aircraftElem.value = parseTailNumber(tailInput.value);
            gateElem.value = parseGateNumber(gateInput.value);

            // ** TODO check tail number against Airline **

            // assign flight and tail numbers to the form
            if (airlineIsSelected) {
                if (flightInput.value != "") {
                    flightNumberElem.value = selectedAirlineCode + flightInput.value;
                }
                if (tailInput.value != "") {
                    if (isNaN(tailInput.value)) {
                        tailNumberElem.value = "C-" + tailInput.value.toUpperCase();
                    } else {
                        tailNumberElem.value = selectedAirlineCode + tailInput.value;
                    }
                }
                carrierElem.value = selectedAirlineCode;
            }

            commitTreatment();

            // clear inputs
            changeTreatment("");
            flightInput.value = "";
            tailInput.value = "";
            gateInput.value = ""
            airlineInfo[0][1] = false;
            airlineInfo[1][1] = false;
            airlineInfo[2][1] = false;
            airlineInfo[3][1] = false;
            airlineButtons[0].style.backgroundColor = loColor;
            airlineButtons[1].style.backgroundColor = loColor;
            airlineButtons[2].style.backgroundColor = loColor;
            airlineButtons[3].style.backgroundColor = loColor;
        }
    }

    function parseGateNumber(input) {
        // gates with non-sequential values
        if (input == 110) {
            return 973;
        } else if (input == 111) {
            return 974;
        } else if (input == 11) {
            return 133;
        } else if (input == 12) {
            return 132;
        } else if (input == 13) {
            return 134;
        } else if (input == 82) {
            return 377;
        } else if (input == 83) {
            return 378;
        } else if (input == 84) {
            return 365;
        } else if (input == 85) {
            return 366;
        } else if (input == 126) {
            return 12776;
        } else if (input == 127) {
            return 12777;
        } else if (input.toUpperCase() == "A2") {
            return 12778;
        } else if (input.toUpperCase() == "A9") {
            return 12930;
        }


        // gates with sequential values
        for (var i = 0; i < 130; i++) {
            if (i == input) {
                if (i >= 1 && i <=6) {
                    return i + 125; // magic numbers provided by Aeromag
                } else if (i >= 14 && i <= 24) {
                    return i + 121;
                } else if (i >= 31 && i <= 40) {
                    return i + 118;
                } else if (i >= 50 && i <= 59) {
                    return i + 282;
                } else if (i >= 61 && i <= 65) {
                    return i + 281;
                } else if (i >= 70 && i <= 73) {
                    return i + 277;
                } else if (i >= 74 && i <= 81) {
                    return i + 281;
                } else if (i >= 86 && i <= 97) {
                    return i + 295;
                }
            }
        }
    }

    function commitTreatment() {
        const treatmentElem1 = document.getElementById("Treatment1_Id");
        const treatmentElem2 = document.getElementById("Treatment2_Id");

        if (selectedTreatments[2][1]) { // props
            treatmentElem1.value = 84;
            if (selectedTreatments[0][1]) { // t1
                treatmentElem2.value = 1;
            } else if (selectedTreatments[1][1]) { // t4
                treatmentElem2.value = 2;
            }
        } else {
            treatmentElem2.value = -1;
            if (selectedTreatments[0][1]) { // t1
                treatmentElem1.value = 1;
            } else if (selectedTreatments[1][1]) { // t4
                treatmentElem1.value = 2;
            }
        }
    }

    function parseTailNumber(input) {
        input = input.toUpperCase();

        for (var i = 0; i < civilRegistrationKey.length; i++) {
            if (input == civilRegistrationKey[i][0]) {
                return civilRegistrationKey[i][1];
            }
        }
        i = 0;

        for (i = 0; i < 999; i++) {
            if (i == parseInt(input)) {
                if (i >= 1 && i <= 15) {
                    return "B73W";
                } else if (i >= 201 && i <= 266) {
                    return "B73W";
                } else if (i >= 300 && i <= 399) {
                    return "B38M";
                } else if (i >= 400 && i <= 460) {
                    return "DH8D";
                } else if (i >= 570 && i <= 589) {
                    return "SF34";
                } else if (i >= 601 && i <= 615) {
                    return "B736";
                } else if (i >= 670 && i <= 673) {
                    return "B76W";
                } else if (i >= 801 && i <= 853) {
                    return "B73H";
                }
            }
        }

        console.log("unknown tail number");
        return "";
    }



    if (true) {
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
        themeTicker.id = "theme-cb";
        //         themeTicker.checked = true;
        document.body.appendChild(themeTicker);

        changeTheme();

        function changeTheme() {
            var dMessage = document.getElementsByClassName("alterbackground")[0];
            dMessage.getElementsByTagName("tbody")[0].style.height = "150px";

            // styling
            findFirstDescendant("body", "table").classList.remove("border1");
            findFirstDescendant("ui-id-2", "td").classList.remove("border1");
            document.getElementById("tdFlightsInColdStorage").classList.remove("border1");
            document.getElementById("tdFlightsInProgress").classList.remove("border1");

            GM_addStyle(".border2 {padding: 5px!important}");
            document.getElementById("tdFlightsInProgress").classList.add("border2");

            if (themeTicker.checked) {
                loColor = "#000";
                borderColor = "#fff";
                GM_addStyle(":not(button):not(.treatment-button):not(.airline-button):not(.time) {background-color: black !important; }");
                GM_addStyle(":not(button):not(.treatment-button):not(.flight-input):not(.time) {color: #DDD !important; }");
            } else {
                loColor = "#fff";
                borderColor = "#000";
                GM_addStyle(":not(button):not(.treatment-button):not(.airline-button):not(.time) {background-color: white !important;}");
                GM_addStyle(":not(button):not(.treatment-button):not(.flight-input):not(.time) {color: #000 !important;}");
            }
            GM_addStyle(".airline-button {border: 1px solid " + borderColor + " !important;}");
            GM_addStyle(".treatment-button {border: 1px solid " + borderColor + " !important;}");
            GM_addStyle("#gsplus {border: 1px solid " + borderColor + " !important;}");
            GM_addStyle(".input-label {border: 1px solid " + borderColor + " !important;}");
            GM_addStyle(".flight-input {border-left: 2px solid " + borderColor + " !important;}");
            GM_addStyle("#go-button {border: 1px solid " + borderColor + " !important;}");
            GM_addStyle("#dvDeicingConditions {font-size: 1.3em}");

            // color airline buttons
            for (let i = 0; i < airlineButtons.length; i++) {
                if (airlineInfo[i][1]) {
                    airlineButtons[i].style.backgroundColor = hiColor;
                } else {
                    airlineButtons[i].style.backgroundColor = loColor;
                }
            }
            // color treatment buttons
            if (selectedTreatments[0][1]){
                t1Button.style.backgroundColor = hiColor;
            } else {
                t1Button.style.backgroundColor = loColor;
            }
            if (selectedTreatments[1][1]){
                t4Button.style.backgroundColor = hiColor;
            } else {
                t4Button.style.backgroundColor = loColor;
            }
            if (selectedTreatments[2][1]){
                propButton.style.backgroundColor = hiColor;
            } else {
                propButton.style.backgroundColor = loColor;
            }
        }

        var coldStorageTd = document.getElementById("tdFlightsInColdStorage");
        var coldStorageCb = document.createElement("input");
        coldStorageCb.type = "checkbox";
        coldStorageCb.onclick = moveColdStorage;
        document.body.appendChild(coldStorageCb);

        function moveColdStorage() {
            GM_addStyle(".top-padding {padding-top: 16%}");
            GM_addStyle(".notop-padding {padding-top: 0}");
            if (coldStorageCb.checked){
                coldStorageTd.classList.add("top-padding");
            } else {
                coldStorageTd.classList.remove("top-padding");
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
    }
    
    var versionNum = document.createElement("p");
    versionNum.innerHTML = "GS+ Updated Feb 24";
    versionNum.style.float = "right";
    versionNum.style.marginRight = "10px";
    document.body.appendChild(versionNum);
})();
