const timer = 30; //The higher value, the more time it takes to load every letter. The smaller the value, the less time it takes.
var messageStrings; //This array stores the message strings
var dialogbox; //The DOM element
var currMessage; //The current message being displayed/typed
var messageId; //A counter to keep track of messages in the messageStrings array
var applytitlestyle = true; //optional option to make the first and last slide appear different
var loadingComplete = true; // Indicates if current message loading/typing is complete
var skipNextPress = false; // To avoid immediate skipping to next slide after loading a message
let isMessageSkipped = false; // Additional flag to track if the current message display was skipped

//Create the arrow element
var arrow = document.createElement("div");
arrow.id = "arrow";

//After the HTML page loads, this function gets executed
document.addEventListener( "DOMContentLoaded", function(){
	dialogbox = document.getElementById("dialogbox");
	var messageString = dialogbox.innerHTML;
	messageStrings = messageString.split('|'); //Split them by using the '|' character. You might want to change this logic.
	dialogbox.innerHTML = "";//Empty the dialog box
    messageId = 0;//Start with the very first message
	currMessage = messageStrings[messageId];//Current message is the first message
	nextMessage();//Just handles how the messageId changes
	
	document.getElementById("dialogbox").addEventListener("click", function() {//If the user has clicked/tapped
    if (!loadingComplete) { // If currently loading/typing
	//show the full message immediately and mark loading as complete
        clearTimeouts();
        dialogbox.innerHTML = currMessage; // Display the full message immediately
        if (!dialogbox.contains(arrow)) {//Add the arrow
            dialogbox.appendChild(arrow);
        }
        loadingComplete = true;//mark loading as complete
    } else if (!skipNextPress) { // If loading was complete and skip was not due to a previous action...
        nextMessage();//move to the next message
    } else {//if it was due to a previous action
        skipNextPress = false;// Reset skipNextPress
    }
});
}, false);


function titleStyle(){//css for the first and last slides
	dialogbox.style.textAlign = "center";
	dialogbox.style.fontSize = "9.7px";
	dialogbox.style.fontWeight = "700";
	dialogbox.style.lineHeight = "2.9em";
	dialogbox.style.textDecoration = "underline";
}
function normalStyle(){//css for normal slides
	dialogbox.style.textAlign = "left";
	dialogbox.style.fontSize = "8.6px";
	dialogbox.style.fontWeight = "100";
	dialogbox.style.lineHeight = "16px";
	dialogbox.style.textDecoration = "none";
}

function nextMessage() {//handle the messageId/next message to display after keypress
    if (!loadingComplete || skipNextPress) { // Skip if loading is not complete or if it's a subsequent press
        skipNextPress = false; // Reset for the next cycle
        return; // Exit this function to avoid skipping to the next message prematurely
    }

    if (messageId >= messageStrings.length) {//we have reached the end
        messageId = 0; // Reset to start if we've reached the end
    }
    currMessage = messageStrings[messageId];//Current message is whatever messageId we are on
    messageId++;//Move to the next message Id
	
	if (applytitlestyle)//If we are using different style for first and last slides
	{
		if (messageId == 1 || messageId == messageStrings.length)
		//If we are at the very first message (messageId == 1 implies current message is at index 0)
		//Or if we have reached the last message
			{
				titleStyle();//Apply the titleStyle to the message
			}
		else{
			normalStyle();//Apply normal style for messages in between
		}
	}
    loadMessage(currMessage.split(''));//Send an array of letters for the loadmessage to type
}

function loadMessage(dialog) {//Start loading the message with the typewriter effect, 'dialog' here is an array of letters
    loadingComplete = false; //Flag to show that we have started loading
    dialogbox.innerHTML = ""; //Clear the previous message
    for (let i = 0; i < dialog.length; i++) {//run through the array letter by letter
        setTimeout(function() {//Start showing them with delay set in the timer variable
            dialogbox.innerHTML += dialog[i];//append each letter one by one
            if (i === dialog.length - 1) {//if we have reached the end
                dialogbox.appendChild(arrow);//add the arrow
                loadingComplete = true; // Loading complete
            }
        }, timer * i);//every i-th unit of timer will give one letter each iteration of the loop.
    }
}

document.addEventListener('keydown', function(e) {//if a key was pressed
    if ((e.key === 'Enter' || e.key === ' ') && !loadingComplete && !isMessageSkipped) {
		//if the key pressed was enter or space, and loading is not complete, and the message is not just skipped yet...
        clearTimeouts(); // Stop any ongoing animation
        dialogbox.innerHTML = currMessage; // Display the full message immediately
        if (!dialogbox.contains(arrow)) {//add the arrow
            dialogbox.appendChild(arrow);
        }
        loadingComplete = true; // Mark loading as complete
        isMessageSkipped = true; // Indicate that we've just skipped to the end of the message
    }
	//otherwise, if the loading was complete or the message was skipped
	//do nothing while the key is still pressed (see next event listener)
});

document.addEventListener('keyup', function(e) {//a key was lifted
    if ((e.key === 'Enter' || e.key === ' ') && loadingComplete) {
		//if it is enter or space, and the message was loaded
        if (!isMessageSkipped) {//we didn't skip the message
            // Proceed to the next message only if we didn't just skip to the end of the current message
            nextMessage();
        }
        isMessageSkipped = false; // Reset the flag after handling the keyup
    }
});


function clearTimeouts() {
    var highestTimeoutId = setTimeout(";"); // A hacky way to get the highest timeout id, just avoiding making it too complicated
    for (var i = 0; i < highestTimeoutId; i++) {//run through each timeout
        clearTimeout(i);//and clear it one by one
    }
}