// testing
console.log('hello world')
// document.getElementById("duration").style.color="green"

// --------- validating time duration ---------
// retrieve user input 
var durationTimeElement = document.getElementById("durationTime");
var revTimeInElement = document.getElementById("revTimeIn").textContent.trim();
var revTimeOutElement = document.getElementById("revTimeOut").textContent.trim();


var durationTime = parseFloat(durationTimeElement.textContent.trim());

// parse input values into Date objects
var revTimeIn = new Date('1970-01-01T' + revTimeInElement);
var revTimeOut = new Date('1970-01-01T' + revTimeOutElement);

// calculate duration in ms + min
var durationMilliseconds = revTimeOut - revTimeIn;
var durationMinutes = durationMilliseconds/(1000*60);
var popup = document.getElementById("myPopup");

// function popup
function timeError() {
    popup.classList.toggle("show");
}
console.log("duration:")
console.log(durationTime);

//compare calculated duration with user input
function errorColor() {
    if ((!isNaN(durationTime) && Math.abs(durationMinutes - durationTime) < 1) || 
        (durationTime === 0 && revTimeInElement === '' && revTimeOutElement === '')) {
        durationTimeElement.style.color = "black";
    } else {
        durationTimeElement.style.color = "red";
    }
}

//(durationMinutes.value == undefined && durationTime == undefined) || 
// else if((durationMinutes.value == undefined && durationTime.value == undefined) && durationTime == 0) {
//     document.getElementById("durationTime").style.color="black"
// }

console.log(Math.abs(durationMinutes-durationTime));
console.log(revTimeIn == "Invalid Date")

    // if ((Math.abs(durationMinutes - durationTime) < 1) || 
    //     (durationTime === 0 && revTimeInElement === '' && revTimeOutElement === '')) {
    //     durationTimeElement.style.color = "black";
    // } else if (durationTime !==  Math.abs(durationMinutes - durationTime) || durationTime !== NaN) {
    //     durationTimeElement.style.color = "red";
    // }
    //--------------//
    // if there's a valid date in revtimein and revtimeout AND durationMinutes = durationTime
        // black text
    // else if there's an invalid date in retimein OR revtimeout OR duratoinMinutes != durationTime
        // red text
if(durationMinutes == durationTime || (durationTime == 0 && (revTimeIn == "Invalid Date" || revTimeOut == "Invalid Date"))) {
    durationTimeElement.style.color = "black";
} else if (revTimeIn == "Invalid Date" || revTimeOut == "Invalid Date" || durationMinutes !== durationTime) {
    durationTimeElement.style.color = "red";
}

// make popup same as other popups
// change error message to invalid date
// are there going to be other types of forms where no edits will be currently made and errors need to be checked?
// other possible solution: automatically calculating time duration
// test case: if revtimein = 3:00 PM, and revtimeout = 3:30 pm, duration being 30 is correct and 32 is incorrect