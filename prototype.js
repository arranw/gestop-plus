// ==UserScript==
// @name         gsplus
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
    // *** flight strip addons ***
    var flightBox = document.getElementById('dvFlightStrip');

    var addedComponents = document.createElement("div");
    flightBox.parentElement.insertBefore(addedComponents, flightBox);

    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    selectList.style.marginLeft = "2px";
    selectList.style.width = "150px";
    var array = ["","WJA","WEN","PCO","QXE","TSC"];
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
    }
    addedComponents.appendChild(selectList);

    var addAlCode=document.createElement("input");
    addAlCode.type="button";
    addAlCode.value="Go";
    addAlCode.onclick=alCode;
    addAlCode.style.marginLeft="10px";
    addedComponents.appendChild(addAlCode);

    // flight number
    addedComponents.appendChild(document.createElement("br"));

    var flightCodeLabel=document.createElement("div");
    flightCodeLabel.style.width = "50px";
    flightCodeLabel.style.float='left';
    flightCodeLabel.style.marginTop="8px";
    flightCodeLabel.innerHTML = "Flight";
    addedComponents.appendChild(flightCodeLabel);

    var flightCode=document.createElement("input");
    flightCode.style.width = "50px";
    flightCode.type="text";
    flightCode.style.marginRight="10px";
    addedComponents.appendChild(flightCode);

    // tail number
    addedComponents.appendChild(document.createElement("br"));

    var tailCode=document.createElement("input");
    tailCode.style.width = "50px";
    tailCode.type="text";
    tailCode.style.marginRight="10px";
    addedComponents.appendChild(tailCode);

    var tailCodeLabel=document.createElement("div");
    tailCodeLabel.style.width = "50px";
    tailCodeLabel.style.float='left';
    tailCodeLabel.style.marginTop="8px";
    tailCodeLabel.innerHTML = "Tail";
    addedComponents.appendChild(tailCodeLabel);

    // gate field
    addedComponents.appendChild(document.createElement("br"));

    var gateCode=document.createElement("input");
    gateCode.style.width = "50px";
    gateCode.type="text";
    gateCode.style.marginRight="10px";
    addedComponents.appendChild(gateCode);

    var gateCodeLabel=document.createElement("div");
    gateCodeLabel.style.width = "50px";
    gateCodeLabel.style.float='left';
    gateCodeLabel.style.marginTop="8px";
    gateCodeLabel.innerHTML = "Gate";
    addedComponents.appendChild(gateCodeLabel);

    // t1 button
    addedComponents.appendChild(document.createElement("br"));

    var t1Button=document.createElement("input");
    t1Button.style.width = "50px";
    t1Button.type="button";
    t1Button.value="T1";
    t1Button.onclick=selectT1;
    addedComponents.appendChild(t1Button);

    // t4 button
    var t4Button=document.createElement("input");
    t4Button.style.width = "50px";
    t4Button.type="button";
    t4Button.value="T4";
    t4Button.onclick=selectT4;
    addedComponents.appendChild(t4Button);

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


    function alCode() {
        var flightCodeBox = document.getElementById('txtFlightNo');

        var select = document.getElementById('mySelect');
        var regBox = document.getElementById('txtRegistration');
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
        // end

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

        //
        //
        //
        //
        //

        var gateSelect = document.getElemendById("DeicingLocation_Id");

        if (gateCode.value = "") {
            alert("d");
            gateSelect.value = "327";
        }
        //         <option value="327">Taxiway TX IN JULIETT</option>
        // <option value="13023">Gate GATE</option>
        // <option value="973">Gate N110</option>
        // <option value="126">Gate A1</option>
        // <option value="127">Gate A2</option>
        // <option value="974">Gate N111</option>
        // <option value="128">Gate A3</option>
        // <option value="129">Gate A4</option>
        // <option value="130">Gate A5</option>
        // <option value="131">Gate A6</option>
        // <option value="133">Gate A11</option>
        // <option value="132">Gate A12</option>
        // <option value="134">Gate A13</option>
        // <option value="135">Gate A14</option>
        // <option value="136">Gate A15</option>
        // <option value="137">Gate A16</option>
        // <option value="138">Gate A17</option>
        // <option value="139">Gate A18</option>
        // <option value="140">Gate A19</option>
        // <option value="141">Gate A20</option>
        // <option value="142">Gate A21</option>
        // <option value="143">Gate A22</option>
        // <option value="144">Gate A23</option>
        // <option value="145">Gate A24</option>
        // <option value="149">Gate B31</option>
        // <option value="150">Gate B32</option>
        // <option value="151">Gate B33</option>
        // <option value="152">Gate B34</option>
        // <option value="153">Gate B35</option>
        // <option value="154">Gate B36</option>
        // <option value="155">Gate B37</option>
        // <option value="156">Gate B38</option>
        // <option value="157">Gate B39</option>
        // <option value="158">Gate B40</option>
        // <option value="332">Gate C50</option>
        // <option value="333">Gate C51</option>
        // <option value="334">Gate C52</option>
        // <option value="335">Gate C53</option>
        // <option value="336">Gate C54</option>
        // <option value="337">Gate C55</option>
        // <option value="338">Gate C56</option>
        // <option value="339">Gate C57</option>
        // <option value="340">Gate C58</option>
        // <option value="341">Gate C59</option>
        // <option value="342">Gate C61</option>
        // <option value="343">Gate C62</option>
        // <option value="344">Gate C63</option>
        // <option value="345">Gate C64</option>
        // <option value="346">Gate C65</option>
        // <option value="347">Gate C70</option>
        // <option value="348">Gate C71</option>
        // <option value="349">Gate C72</option>
        // <option value="350">Gate C73</option>
        // <option value="355">Gate D74</option>
        // <option value="356">Gate D75</option>
        // <option value="357">Gate C76</option>
        // <option value="358">Gate C77</option>
        // <option value="359">Gate D78</option>
        // <option value="360">Gate D79</option>
        // <option value="361">Gate D80</option>
        // <option value="362">Gate D81</option>
        // <option value="377">Gate E82</option>
        // <option value="378">Gate E83</option>
        // <option value="365">Gate D84</option>
        // <option value="366">Gate D85</option>
        // <option value="381">Gate E86</option>
        // <option value="382">Gate E87</option>
        // <option value="383">Gate D88</option>
        // <option value="384">Gate D89</option>
        // <option value="385">Gate E90</option>
        // <option value="386">Gate E91</option>
        // <option value="387">Gate D92</option>
        // <option value="388">Gate D93</option>
        // <option value="389">Gate E94</option>
        // <option value="390">Gate E95</option>
        // <option value="391">Gate E96</option>
        // <option value="392">Gate E97</option>
        // </select>

        //
        //
        //
        //
        //


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

// old code

// var flightStrip = document.getElementById('frmFlightStrip');
// var fsWrapper = document.createElement("fieldset");
// fsWrapper.classList.add("border1");
// fsWrapper.id="fsWrapper";
// fsWrapper.innerHTML = "<legend style=\"font-size:16px; font-weight:bold;\">Flight Strip</legend>";
// flightStrip.parentNode.insertBefore(fsWrapper, flightStrip);
// fsWrapper.appendChild(flightStrip);

// time boxes

// var t1Start = document.getElementById("DeicingTimes_Type1StartTimeStr");
// t1Start.classList.remove("time");
// t1Start.style = "width: 67px;margin: 0px;padding: 0px; color: #000 !important";
// var t1Stop = document.getElementById("DeicingTimes_Type1FinishTimeStr");
// t1Stop.classList.remove("time");
// t1Stop.style = "width: 67px;margin: 0px;padding: 0px; color: #000 !important";
// var t4Start = document.getElementById("DeicingTimes_Type4StartTimeStr");
// t4Start.classList.remove("time");
// t4Start.style = "width: 67px;margin: 0px;padding: 0px; color: #000 !important";
// var t4Stop = document.getElementById("DeicingTimes_Type4FinishTimeStr");
// t4Stop.classList.remove("time");
// t4Stop.style = "width: 67px;margin: 0px;padding: 0px; color: #000 !important";

// var br = document.createElement("br");
// findFirstDescendant("frmFlightStrip", "th").remove();
// findFirstDescendant("frmFlightStrip", "table").classList.remove("border1");


// time boxes
