const	slider = document.getElementById("slider"),
		angleSlider = document.getElementById("angleSlider"),
		phoneDisplay = document.getElementById("phoneDisplay"),
		advancedModeCheckbox = document.getElementById("advancedMode");

var	angle = 0,
	speed = 0,
	friction = 0.99;

var value = +slider.value;

// Phone value is converted to a string
function PhoneNumberToDisplay(value){
	const str = value.toString();
	// (XX) XXX-XXX-XXXX
	return `(${str.substr(0, 2)}) ${str.substr(2, 3)}-${str.substr(5, 3)}-${str.substr(8, 3)}`;
}

// Apply Physics rule to update phone value based on angle and speed
function UpdatePhone(){
	// Get angle and speed from sliders
	angle = +angleSlider.value;
	value = +slider.value;
	
	// Speed is based on angle
	speed += Math.sin(angle * Math.PI / 180) * 1e3;
	
	// Friction
	speed *= friction;
	value += Math.round(speed * 1e5);
	
	// Update phone value
	// Bounce off edges, inverting speed
	if(value > slider.max)
		value = slider.max, speed *= -1;
	else if(value < slider.min)
		value = slider.min, speed *= -1;
	
	slider.value = value;
	
	// Update phone display
	phoneDisplay.innerHTML = PhoneNumberToDisplay(value);
}

// Continuous update
setInterval(UpdatePhone, 10);

// Advanced Mode
advancedModeCheckbox.addEventListener("change", () => {
	if(this.checked){
		// Show advanced controls
		angleSlider.style.display = "block";
		slider.style.width = "100%";
	}else{
		// Hide advanced controls
		slider.style.width = "197px";
		angleSlider.style.display = "none";
		speed = 0;
		angleSlider.value = 0;
		slider.style.transform = "rotate(0deg)";
	}
});

slider.oninput = () => { speed = 0; };

angleSlider.oninput = () => {
	angle = +angleSlider.value;
	slider.style.transform = `rotate(${angle}deg)`;
};

// Advanced Mode  
var advancedMode = false
/* When checked, set a variable */
advancedModeCheckbox.addEventListener("change", () => {
	advancedMode = advancedModeCheckbox.checked;
});

// On submit
document.getElementById("submit").addEventListener("click", (event) => {
	confirm("Is this your Phone Number?\n" + PhoneNumberToDisplay(value))
		// Thank you
		? alert("Thank you for your submission!")
		// Please Contact your phone administrator
		: alert(
			"Please contact your phone administrator to change your phone number to " +
			PhoneNumberToDisplay(value)
		);
	
	// Prevent default form submission
	event.preventDefault();
});
