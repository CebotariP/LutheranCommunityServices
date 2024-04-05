// --------- validating time duration ---------
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

// function popup
function timeError() {
    popup.classList.toggle("show");
}

//compare calculated duration with user input while they're putting in input
function errorColor() {
    if (durationMinutes == durationTime || (durationTime == 0 && (isNaN(revTimeIn.getTime()) || isNaN(revTimeOut.getTime())))) {
        durationTimeElement.style.color = "black";
    } else {
        durationTimeElement.style.color = "red";
    }
}

// if there's a valid date in revtimein and revtimeout AND durationMinutes = durationTime
// black text
// else if there's an invalid date in retimein OR revtimeout OR duratoinMinutes != durationTime
// red text
if (durationMinutes == durationTime || (durationTime == 0 && (isNaN(revTimeIn.getTime()) || isNaN(revTimeOut.getTime())))) {
    durationTimeElement.style.color = "black";
    popup.classList.toggle("hide");
} else {
    durationTimeElement.style.color = "red";
}

// make popup same as other popups
// DONE make popup only show when it's incorrect
// are there going to be other types of forms where no edits will be currently made and errors need to be checked?
// other possible solution: automatically calculating time duration
// DONE test case: if revtimein = 3:00 PM, and revtimeout = 3:30 pm, duration being 30 is correct and 32 is incorrect