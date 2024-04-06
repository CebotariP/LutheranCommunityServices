// --------- validating time duration ---------//
// retrieve user input 
var durationTimeElement = document.getElementById("durationTime");
var revTimeInElement = document.getElementById("revTimeIn").nextElementSibling.textContent.trim();
var revTimeOutElement = document.getElementById("revTimeOut").nextElementSibling.textContent.trim();

var durationTime = parseFloat(durationTimeElement.textContent.trim());

// parse input values into Date objects
var revTimeInParts = revTimeInElement.split(':');
var revTimeOutParts = revTimeOutElement.split(':');

// Constructing Date objects with today's date and the parsed time
var today = new Date();
var revTimeIn = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(revTimeInParts[0]), parseInt(revTimeInParts[1]));
var revTimeOut = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(revTimeOutParts[0]), parseInt(revTimeOutParts[1]));

// calculate duration in ms + min
var durationMilliseconds = revTimeOut - revTimeIn;
var durationMinutes = durationMilliseconds / (1000 * 60);
var popup = document.getElementById("myPopup");
var fieldPopup = document.getElementById("fieldPopUp");

// function popup
function timeError() {
    popup.classList.toggle("show");
}

function fieldError(){
    fieldPopup.classList.toggle("show");
}

//compare calculated duration with user input while they're putting in input
// if there's a valid date in revtimein and revtimeout AND durationMinutes = durationTime
    // black text
// else if there's an invalid date in retimein OR revtimeout OR duratoinMinutes != durationTime
    // red text
function errorColor() {
    if (durationMinutes == durationTime || (durationTime == 0 && (isNaN(revTimeIn.getTime()) || isNaN(revTimeOut.getTime())))) {
        durationTimeElement.style.color = "black";
        popup.classList.toggle("hide");
    } else {
        durationTimeElement.style.color = "red";
    }
}

// checking without live input
if (durationMinutes == durationTime || (durationTime == 0 && (isNaN(revTimeIn.getTime()) || isNaN(revTimeOut.getTime())))) {
    durationTimeElement.style.color = "black";
    popup.classList.toggle("hide");
} else {
    durationTimeElement.style.color = "red";
}

// Questions about Error 1:
// are there going to be other types of forms where no edits will be currently made and errors need to be checked?
// other possible solution: automatically calculating time duration

//--------------- checking input for supervising physician ------------------// 

 // Get the input field element
 var inputField = document.getElementById("supPhyInput");
 // Get the text content of the input field (inside the <a> tag)
 var inputValue = inputField.querySelector("a").textContent.trim();
 
 function checkInput() {
    // Change text color of the <td> element if there's content
    if (inputValue !== "") {
        var linkElement = document.querySelector("#supPhyInput a");
        // Change the color of the <a> element
        linkElement.style.color = "red"; 
        linkElement.removeAttribute("href");
    } else {
        inputField.style.color = ""; // Reset text color if empty
    }
}

// checking without live input
if (inputValue !== "") {
    var linkElement = document.querySelector("#supPhyInput a");
    linkElement.style.color = "red"; 
    linkElement.removeAttribute("href");
} else {
    inputField.style.color = ""; 
    popup.classList.toggle("hide");
}
