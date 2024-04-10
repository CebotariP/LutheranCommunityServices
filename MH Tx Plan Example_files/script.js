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

// function popup
function timeError() {
    popup.classList.toggle("show");
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
var fieldPopup = document.getElementById("fieldPopUp");

function fieldError(){
    fieldPopup.classList.toggle("show");
}

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
        fieldPopup.classList.toggle("hide");
    }
}

// checking without live input
if (inputValue !== "") {
    var linkElement = document.querySelector("#supPhyInput a");
    linkElement.style.color = "red"; 
    linkElement.removeAttribute("href");
} else {
    inputField.style.color = ""; 
    fieldPopup.classList.toggle("hide");
}

//--------------- validating treatment plan target date ------------------// 

var treatmentPopup = document.getElementById("treatmentPopup");
var checkDateElement = document.getElementById("treatPlanTargetDate");
var checkDate = checkDateElement.innerText.trim();


var dateOfVisitCell = document.getElementById("dateOfVisit").nextElementSibling;
var originalDate = dateOfVisitCell.textContent.trim();

function formatDate(dateString) {
    // Split the date string into day, month, and year
    var parts = dateString.split("/");
    var day = parseInt(parts[1]);
    var month = parseInt(parts[0]);
    var year = parseInt(parts[2]);

    // Return the formatted date in the format mm/dd/yyyy
    return month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0') + '/' + year;
}

originalDate = formatDate(originalDate);
checkDate = formatDate(checkDate);

function treatmentError(){
    treatmentPopup.classList.toggle("show");
}

function checkTreatmentDate(){
    if (originalDate !== checkDate) {
        checkDateElement.style.color = "red";
    } else {
       checkDateElement.style.color = "black";
    }
}

if (originalDate === checkDate) {
    checkDateElement.style.color = "red";
} else {
   checkDateElement.style.color = "black";
   treatmentPopup.classList.toggle("hide");
}

// Questions:
// - is this a user input or automatically filled in by the computer?
// - are there times when this isn't 90 days from the date of service?

//--------------- missing target date ------------------// 

var targetDatePopUp = document.getElementById("targetDatePopUp");

function targetDateError(){
    targetDatePopUp.classList.toggle("show");
}

function checkTargetDateInput() {
    var targetDateContent = document.getElementById("targetDateContent");
    var popupContainer = document.getElementById("popup-container");

    if (targetDateContent.textContent.trim() === "") { // Check if the target date is empty
        targetDateError();

        // Create an image element
        var img = document.createElement('img');
        img.src = 'http://127.0.0.1:5500/MH%20Tx%20Plan%20Example_files/xgr.gif'; // Specify the path to your image
        img.alt = 'Error Image'; // Add alternative text for accessibility
        img.classList.add('popup-image'); // Add a class for styling

        // Append the image element to the popup container
        popupContainer.appendChild(img);

        // Ensure the image is visible
        img.style.display = 'inline !important'; // Display as a block element
        img.style.width = '5px !important'; // Adjust width as needed
        img.style.height = '5px !important'; // Adjust height as needed
    } else {
        // If the target date is not empty, reset any error state
        var targetDatePopUp = document.getElementById("targetDatePopUp");
        targetDatePopUp.classList.remove("show");
        
        // Remove any previously added image
        var existingImg = popupContainer.querySelector('img.popup-image');
        if (existingImg) {
            existingImg.remove();
        }
    }
}


var targetDateContent = document.getElementById("targetDateContent");
var popupContainer = document.getElementById("popup-container");
console.log(targetDateContent.textContent.trim())

if (targetDateContent.textContent.trim() === "") { // Check if the target date is empty
    targetDateError();
    // Create an image element
    var img = document.createElement('img');
    img.src = 'http://127.0.0.1:5500/MH%20Tx%20Plan%20Example_files/xgr.gif'; // Specify the path to your image
    img.alt = 'Error Image'; // Add alternative text for accessibility
    img.classList.add('popup-image'); // Add a class for styling

    // Append the image element to the popup container
    popupContainer.appendChild(img);

    // Ensure the image is visible
    img.style.display = 'block !important'; // Display as a block element
    img.style.width = '5px !important'; // Adjust width as needed
    img.style.height = '5px !important'; // Adjust height as needed
} else {
    // If the target date is not empty, reset any error state
    var targetDatePopUp = document.getElementById("targetDatePopUp");
    targetDatePopUp.classList.remove("show");
    
    // Remove any previously added image
    var existingImg = popupContainer.querySelector('img.popup-image');
    if (existingImg) {
        existingImg.remove();
    }
}
// Questions:
// - is this user input or automatically filled in by the computer?
