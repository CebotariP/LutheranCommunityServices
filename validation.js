// next step: learn how to "scrub" the html file for the (non) data i'm looking for to validate it
console.log("Hello world");
// next step: learn how to "scrub" the html file for the (non) data i'm looking for to validate it
console.log("Hello world");

function extractAndValidate() {
    // Get the uploaded file
    var file = document.getElementById('fileInput').files[0];
    if (!file) {
        showMessage('Please select a file.', 'error');
        return;
    }

    var reader = new FileReader();

    reader.onload = function(e) {
        var htmlContent = e.target.result;

        // Define regular expressions to match the time in, time out, and duration values
        var timeInRegex = /<td[^>]*>\s*<b>\s*Revised Time In:\s*<\/b>\s*<\/td>\s*<td[^>]*>\s*(\d{1,2}:\d{2}\s*[APap][Mm])\s*&nbsp;<\/td>/i;
        var timeOutRegex = /<td[^>]*>\s*<b>\s*Revised Time Out:\s*<\/b>\s*<\/td>\s*<td[^>]*>\s*(\d{1,2}:\d{2}\s*[APap][Mm])\s*&nbsp;<\/td>/i;
        var durationRegex = /<td[^>]*>\s*<b>\s*Duration:\s*<\/b>\s*<\/td>\s*<td[^>]*>\s*(\d+)\s*&nbsp;<\/td>/i;

        // Execute the regular expressions on the HTML content
        var timeInMatch = timeInRegex.exec(htmlContent);
        var timeOutMatch = timeOutRegex.exec(htmlContent);
        var durationMatch = durationRegex.exec(htmlContent);

        // Log matched values for debugging
        console.log("Matched Time In:", timeInMatch ? timeInMatch[1] : null);
        console.log("Matched Time Out:", timeOutMatch ? timeOutMatch[1] : null);
        console.log("Matched Duration:", durationMatch ? durationMatch[1] : null);

        // Initialize time in, time out, and duration variables
        var timeIn = null;
        var timeOut = null;
        var duration = null;

        // Check if matches are found for time in, time out, and duration
        if (timeInMatch) {
            timeIn = timeInMatch[1].trim();
            if (timeIn === '') {
                timeIn = '0:00 AM'; // Set to 0 if time in is empty
            }
        }
        if (timeOutMatch) {
            timeOut = timeOutMatch[1].trim();
            if (timeOut === '') {
                timeOut = '0:00 AM'; // Set to 0 if time out is empty
            }
        }
        if (durationMatch && durationMatch[1].trim() !== '') {
            duration = parseInt(durationMatch[1].trim());
        }

        // Log processed values for debugging
        console.log("Processed Time In:", timeIn);
        console.log("Processed Time Out:", timeOut);
        console.log("Processed Duration:", duration);

        // Handle null values by setting them to 0
        timeIn = timeIn || '0:00 AM';
        timeOut = timeOut || '0:00 AM';
        duration = duration || 0;

        // Convert time in and time out to minutes
        var timeInMinutes = convertToMinutes(timeIn);
        var timeOutMinutes = convertToMinutes(timeOut);

        // Validate duration based on time in and time out
        if (timeIn !== null && timeOut !== null && duration !== null) {
            // Calculate the duration based on time in and time out
            var calculatedDuration = timeOutMinutes - timeInMinutes;
            // Check if duration matches calculated duration
            if (duration === calculatedDuration) {
                // If duration matches calculated duration, log a success message
                showMessage("Valid duration.", 'success');
            } else {
                // If duration does not match calculated duration, log an error message
                showMessage("Invalid duration.", 'error');
            }
        } else {
            showMessage("Invalid HTML content: Time In, Time Out, or Duration not found.", 'error');
        }
    };

    reader.readAsText(file);
}



// Function to convert time in format "hh:mm AM/PM" to minutes
// Function to convert time in format "hh:mm AM/PM" to minutes
function convertToMinutes(timeString) {
    // Check if timeString is empty, null, or undefined
    if (!timeString && timeString !== 0) {
        return 0; // Return 0 if timeString is empty, null, or undefined
    }

    var timeComponents = timeString.split(/[\s:]+/);
    var hours = parseInt(timeComponents[0]);
    var minutes = parseInt(timeComponents[1]);
    var meridian = timeComponents[2].toLowerCase();
    
    if (meridian === 'pm' && hours !== 12) {
        hours += 12;
    } else if (meridian === 'am' && hours === 12) {
        hours = 0;
    }

    return (hours * 60) + minutes;
}

// Function to display message on webpage
function showMessage(message, type) {
    var messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = message;
    if (type === 'error') {
        messageBox.style.color = 'red';
    } else if (type === 'success') {
        messageBox.style.color = 'green';
    }
}
