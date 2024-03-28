// testing
console.log('hello world')
// document.getElementById("duration").style.color="green"

// --------- validating time duration ---------
// retrieve user input 
var durationTime = document.getElementById("durationTime").value;
var revTimeIn = document.getElementById("revTimeIn").value;
var revTimeOut = document.getElementById("revTimeOut").value;

// parse input values into Date objects
var revTimeIn = new Date('1970-01-01T' + revTimeIn);
var revTimeOut = new Date('1970-01-01T' + revTimeOut);
// calculate duration in ms + min
var durationMilliseconds = revTimeOut - revTimeIn;
var durationMinutes = durationMilliseconds/(1000*60);
var popup = document.getElementById("myPopup");

// function popup
function timeError() {
    popup.classList.toggle("show");
}


//compare calculated duration with user input
function errorColor() {

    if(Math.abs(durationMinutes-durationTime)<1){
        // alert('Matches');
        document.getElementById("durationTime").style.color="black" ;
    } else {
        document.getElementById("durationTime").style.color="red"
    }

}
//(durationMinutes.value == undefined && durationTime == undefined) || 

if(Math.abs(durationMinutes-durationTime)<1){
    // alert('Matches');
    document.getElementById("durationTime").style.color="black"
} else if((durationMinutes.value == undefined && durationTime == undefined) && durationTime == 0) {
    document.getElementById("durationTime").style.color="black"
} else {
    document.getElementById("durationTime").style.color="red";
}

// make popup same as other popups
// are there going to be other types of forms where no edits will be currently made and errors need to be checked?
// other possible solution: automatically calculating time duration