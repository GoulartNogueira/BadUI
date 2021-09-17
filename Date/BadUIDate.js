var	date = new Date();		
const	advancedModeCheckbox	= document.getElementById("advancedMode"),
		advancedArea	= document.getElementById("advancedArea"),
		autoModeCheckbox= document.getElementById("autoMode"),
		submitButton	= document.getElementById("submit"),
		startButton	= document.getElementById("start"),
		backButton	= document.getElementById("backward"),
		selectButton	= document.getElementById("select"),
		forwardButton	= document.getElementById("forward"),
		endButton	= document.getElementById("end"),
		fasterButton	= document.getElementById("faster"),
		toggleSlider	= document.getElementById("toggleSlider"),
		dateDisplay	= document.getElementById("dateDisplay");

function setDate(value){
	if(value == 1){
		// Set date to 01/01/0001
		date.setFullYear(1);
		date.setMonth(0);
		date.setDate(1);
	}else if(value == -1){
		// Set date to today
		date.setFullYear(9999);
		date.setMonth(12);
		date.setDate(0);
	}
	updateDateDisplay();
}
function addDate(value){
	date.setDate(date.getDate() + value);
	updateDateDisplay();
}
function pad(num, size){
	// Pad number with 0
	var s = "0000" + num;
	return s.substr(s.length - size);
}
function updateDateDisplay(){
	// Show week day
	var	weekDay = date.getDay(),
		weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		weekDayDisplay = weekDayNames[weekDay];
	
	// show leading zero
	var yearDisplay = date.getFullYear();
	
	// If year is between 0 and 1000, add a leading zero
	if(yearDisplay < 1000 && yearDisplay > -1) {
		yearDisplay = pad(yearDisplay, 4);
	}
	var dateString = `${weekDayDisplay}, ${pad(date.getDate(), 2)}/${pad(date.getMonth() + 1, 2)}/${yearDisplay}`;
	dateDisplay.innerHTML = dateString;
}
// set initial date as today:
setDate(0)

// Advanced Mode
advancedModeCheckbox.addEventListener("change", () => {
	console.log("advancedModeCheckbox.checked: " + advancedModeCheckbox.checked);
	if(this.checked)
		// Show advanced controls
		advancedArea.style.display = "block";
	else
		// Hide advanced controls
		advancedArea.style.display = "none";
});

var	interval = 1000,
	autoMode = false,
	speed = -1;

function intervalFunc(){
	if(advancedModeCheckbox.checked && autoModeCheckbox.checked)
			addDate(speed);
}

// Continuous update
var intervalID = setInterval(intervalFunc, interval);	

// Speed Faster
function autoSpeed(value){
	if(interval <= 1)
		speed *= value;
	else{
		interval /= value;
		
		// Update interval
		clearInterval(intervalID);
		
		intervalID = setInterval(intervalFunc, interval);
	}
}

fasterButton.addEventListener("click", () => {
	autoSpeed(10);
	
	// Add "even faster" to beginning of button
	this.innerHTML = `More ${this.innerHTML}`;
});

// toggle
toggleSlider.addEventListener("change", function(){
	speed = (this.value == 0 ? - 1 : 1) * Math.abs(speed);
});

// On submit
submitButton.addEventListener("click", (event) => {
	event.preventDefault();
	
	// Check if today is user's birthday
	var today = new Date();
	if(date.getDate() == today.getDate() && date.getMonth() == today.getMonth())
		alert("Happy Birthday!");
	
	// If selected date is larger than today
	if(date > today){
		// confirm with user if they were born in the future
		var confirm = window.confirm("You are born in the future. Are you sure?");
		if(confirm)
			alert("Have a nice time-travel!");
		else
			alert(
				"You were born in" + date.toDateString() +
				". But your system says today is " + today.toDateString() +
				". If you are not a time traveler, please fix your system."
			);
	}else{
		// Confirm age
		var diff = today - date;
		var age = Math.ceil(diff / (1000 * 3600 * 24 * 365.25)) - 1;
		
		var confirmAge = window.confirm("You are " + age + " years old. Are you sure?");
		if(confirmAge)
			alert("Thank you!");
		else
			alert("Please fix your birthday.");
	}
});
