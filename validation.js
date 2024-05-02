// next step: learn how to "scrub" the html file for the (non) data i'm looking for to validate it
console.log("Hello world");

// Define the validateTreatmentPlanDate function globally
function validateTreatmentPlanDate(htmlContent) {
    // Define regular expressions to match treatment plan target date and date of visit
    var targetDateRegex = /<td style="vertical-align:top;"><b>Treatment Plan Target Date:<\/b>&nbsp;&nbsp;<span class="Answer">(\d{1,2}\/\d{1,2}\/\d{4})<\/span>&nbsp;<\/td>/i;
    var visitDateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/i;

    // Execute the regular expressions on the HTML content
    var targetDateMatch = targetDateRegex.exec(htmlContent);
    var visitDateMatch = visitDateRegex.exec(htmlContent);

    // Initialize variables for target date and visit date
    var targetDate = null;
    var visitDate = null;

    // Extract visit date if match is found
    if (visitDateMatch && visitDateMatch[1].trim() !== '') {
        visitDate = new Date(visitDateMatch[1].trim());
    }

    // Extract target date if match is found
    if (targetDateMatch && targetDateMatch[1].trim() !== '') {
        targetDate = new Date(targetDateMatch[1].trim());
    }

    // Log extracted dates to console
    console.log("Visit Date:", visitDate);
    console.log("Target Date:", targetDate);

    // Check if both target date and visit date are valid
    if (targetDate !== null && visitDate !== null) {
        // If visit date and target date are the same, log an error and return false
        if (visitDate.getTime() === targetDate.getTime()) {
            console.error("Visit date and treatment plan date cannot be the same.");
            showMessage("Error for LCSWA Treatment Plan: Visit date and treatment plan date cannot be the same.", 'error');
            return false;
        }

        // Calculate the difference in days between target date and visit date
        var differenceInDays = Math.abs((targetDate.getTime() - visitDate.getTime()) / (1000 * 60 * 60 * 24));

        console.log("Difference in days:", differenceInDays);

        // If the treatment date is within the 30-day range of the 90-day mark of the visit date, log a success message
        if (differenceInDays >= 60 && differenceInDays <= 120) {
            if (differenceInDays >= 90 - 30 && differenceInDays <= 90 + 30) {
                console.log("Valid treatment plan date.");
                showMessage("LCSWA Treatment Plan: Valid Treatment Plan Target Date.", 'success');
                return true;
            } else {
                // If the treatment date is outside the 30-day range of the 90-day mark of the visit date, log a warning
                console.warn("It is recommended that the treatment date is 90 days from the visit date.");
                showMessage("Warning for LCSWA Treatment Plan: Target date is typically 90 days from the Visit Date.", 'warning');
                return true;
            }
        } else {
            // If the difference is not within the range of 60 to 120 days, log an error
            console.warn("Target date is not within the range of 60 to 120 days from the visit date.");
            showMessage("Warning for LCSWA Treatment Plan: Target date is typically 90 days from the Visit Date.", 'warning');
            return false;
        }
    } else {
        return false; // Invalid HTML content: Target date or visit date not found
    }
}



// Now define the extractAndValidate function
function extractAndValidate() {
    // Clear the message box
    var messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = '';
    
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
                showMessage("Valid duration under Client Service.", 'success');
            } else {
                // If duration does not match calculated duration, log an error message
                showMessage("Error for Client Service: Invalid Duration.", 'error');
            }
        } else {
            showMessage("Error for Client Service: Invalid Revised Time In, Revised Time Out, or Duration.", 'error');
        }

       // Validate treatment plan date
       var treatmentPlanValid = validateTreatmentPlanDate(htmlContent);

       if (treatmentPlanValid) {
           // Treatment plan date is valid
           console.log("Valid treatment plan date.");
       } else {
           // Treatment plan date is not valid
           console.error("Invalid treatment plan date.");
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
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    if (type === 'error') {
        messageElement.style.color = 'red';
    } else if (type === 'success') {
        messageElement.style.color = 'green';
    } else if (type === 'warning') {
        messageElement.style.color = 'orange';
    }
    messageBox.appendChild(messageElement);
}




// <tr>
//      <td>
//          <table border="0" cellspacing="0" cellpadding="0">
//              <tbody><tr><td>
//                  <img src="./MH Tx Plan Example_files/spacer.gif" width="10" height="5"><img src="./MH Tx Plan Example_files/spacer.gif" width="10" height="5">
//      </td>
//      <td style="vertical-align:top;"><b>Treatment Plan Target Date:</b>&nbsp;&nbsp;
//          <span class="Answer">03/12/2024</span>&nbsp;</td></tr><tr><td><img src="./MH Tx Plan Example_files/spacer.gif" width="10" height="5">
//          <img src="./MH Tx Plan Example_files/spacer.gif" width="10" height="5"></td><td style="vertical-align:top;">
//          <b><b>Provide short information or explanation here.  <i> Use another service type if you need to document an intervention </i></b>:</b>&nbsp;&nbsp;<span class="Answer"></span>&nbsp;</td></tr>
