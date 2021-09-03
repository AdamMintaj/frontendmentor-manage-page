// THIS CONTROLS THE HEADER
var navBtn = document.getElementById("navButton");
var nav = document.getElementById("nav");
// This variable is to control icon of navBtn
var icon = false;
function showNav() {
    nav.classList.toggle("header__nav--active");
    rotate();
}
// This and the next function make the navBtn move and change icon
function rotate() {
    navBtn.style.transform = "rotateY(90deg)";
    icon = !icon;
}
navBtn.addEventListener("transitionend", function () {
    if (icon) {
        navBtn.style.backgroundImage = "url(images/icon-close.svg)";
    }
    else {
        navBtn.style.backgroundImage = "url(images/icon-hamburger.svg)";
    }
    navBtn.style.transform = "rotateY(180deg)";
});
navBtn.addEventListener("click", showNav);
// ----------------------------------------------------------------------------
// THIS CONTROLS THE SLIDER FOR MOBILE VERSION
var controlBtns = document.querySelectorAll(".testimonials__controlButton");
var viewbox = document.getElementById("viewbox");
var viewboxWidth = viewbox.clientWidth;
var _loop_1 = function (i) {
    controlBtns[i].addEventListener("click", function () {
        viewbox.style.transform = "translateX(-" + i * viewboxWidth + "px)";
        mark(this);
    });
};
// This moves the slides
for (var i = 0; i < controlBtns.length; i++) {
    _loop_1(i);
}
// This function marks the active button
function mark(button) {
    for (var i = 0; i < controlBtns.length; i++) {
        if (controlBtns[i].classList.contains("testimonials__controlButton--clicked")) {
            controlBtns[i].classList.remove("testimonials__controlButton--clicked");
        }
    }
    button.classList.add("testimonials__controlButton--clicked");
}
// This makes the slider move when left idle
if (window.innerWidth < 1065) {
    window.setInterval(function cycle() {
        // Next 2 lines are variables that hold viewbox's current position as a string (matrix) and a number value
        var position = window.getComputedStyle(viewbox).getPropertyValue("transform");
        var valueOfX = +position.split(",")[4];
        // This variable follows the index of the next slide to display and button to activate
        var index = Math.abs(valueOfX / viewbox.clientWidth) + 1;
        //Next 4 lines control the active button
        if (index > 3) {
            index = 0;
        }
        mark(controlBtns[index]);
        // Next 4 lines calculate how much the viewbox should be moved next and reset the counter on the last slide or if click event and setInterval are launched at the same time 
        valueOfX = valueOfX - viewboxWidth;
        if (valueOfX / viewboxWidth == -4 || !Number.isInteger(valueOfX % viewboxWidth)) {
            valueOfX = 0;
        }
        // The next 4 lines merge the calculated value into a string and change the viewbox's translation
        position = position.split(",");
        position.splice(4, 1, valueOfX.toString());
        position = position.toString();
        viewbox.style.transform = position;
    }, 6000);
}
// ----------------------------------------------------------------------------
// THIS CONTROLS THE SLIDER FOR DESKTOP VERSION
if (window.innerWidth >= 1065) {
    var slider = document.getElementById("slider");
    var windowWidth_1 = slider.clientWidth;
    var viewbox_1 = document.getElementById("viewbox");
    // This resets the slider
    function resetSlider() {
        var distanceToMiddle = 0.055 * windowWidth_1 + 48;
        viewbox_1.style.transform = "translateX(-" + distanceToMiddle + "px)";
    }
    resetSlider();
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("mouseleave", resetSlider);
    // This function follows the cursor and calculates the slider's overflow
    function calculate(event) {
        var xPos = event.clientX;
        var overflow = viewbox_1.scrollWidth - windowWidth_1;
        moveSlider(xPos, overflow);
    }
    // This function translates the slides by x pixels, relative to the mouse position.
    // If the cursor is 100% to the right slides get translated by 100% of the overflow.
    // if the cursor is 100% to the left slides are translated by 0% of the overflow.
    function moveSlider(XPOS, OVERFLOW) {
        viewbox_1.style.transform = "translateX(-" + OVERFLOW * (XPOS / windowWidth_1) + "px)";
    }
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("mousemove", calculate);
}
// THIS VERIFIES EMAIL FOR SUBSCRIPTION
var inputField = document.querySelector(".footer__input--email");
var pattern = /^\S+@\S+\.\S+$/;
var subscription = document.querySelector(".footer__subscription");
inputField.addEventListener("input", function () {
    var userInput = inputField.value;
    if (pattern.test(userInput)) {
        subscription.classList.remove("footer__subscription--invalid");
        inputField.classList.remove("footer__input--invalid");
        console.log("email");
    }
    else {
        subscription.classList.add("footer__subscription--invalid");
        inputField.classList.add("footer__input--invalid");
        console.log("not email");
    }
});
// THIS RELOADS THE PAGE WHEN WINDOW RESIZES
window.addEventListener("resize", function () {
    var address = location.pathname;
    location.replace(address);
});
