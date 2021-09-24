"use strict";
// HEADER
const navBtn = document.getElementById("navButton");
const nav = document.getElementById("nav");
// This variable controls icon of navBtn
let icon = false;
function showNav() {
    nav.classList.toggle("header__nav--active");
    rotate();
}
// This and the next function make the navBtn move and change icon
function rotate() {
    navBtn.style.transform = "rotateY(90deg)";
    icon = !icon;
}
navBtn.addEventListener("transitionend", () => {
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
// SLIDER 
const slider = document.getElementById("slider");
const viewbox = document.getElementById("viewbox");
let viewboxWidth = viewbox.clientWidth;
let startPos;
let endPos;
// FOR MOBILE VERSION
if (window.innerWidth < 1065) {
    const controlBtns = document.querySelectorAll(".testimonials__controlButton");
    let currentSlide = 0;
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("touchstart", touchStart);
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("touchmove", touchMove);
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("touchend", touchEnd);
    function touchStart(event) {
        startPos = event.touches[0].clientX;
    }
    function touchMove(event) {
        endPos = event.touches[0].clientX;
    }
    function touchEnd() {
        if ((currentSlide < 3 && startPos - endPos) > 100) {
            currentSlide++;
        }
        if ((currentSlide > 0 && startPos - endPos) < -100) {
            currentSlide--;
        }
        viewbox.style.transform = `translateX(-${currentSlide * viewboxWidth}px)`;
        endPos = undefined;
        markCurrent(controlBtns[currentSlide]);
    }
    // Buttons that move the slides in mobile version
    for (let i = 0; i < controlBtns.length; i++) {
        controlBtns[i].addEventListener("click", function () {
            viewbox.style.transform = `translateX(-${i * viewboxWidth}px)`;
            currentSlide = i;
            markCurrent(this);
        });
    }
    // This function marks the active button
    function markCurrent(button) {
        for (let i = 0; i < controlBtns.length; i++) {
            if (controlBtns[i].classList.contains("testimonials__controlButton--clicked")) {
                controlBtns[i].classList.remove("testimonials__controlButton--clicked");
            }
        }
        button.classList.add("testimonials__controlButton--clicked");
    }
}
// FOR DESKTOP VERSION
if (window.innerWidth >= 1065) {
    const windowWidth = slider.clientWidth;
    let dragging = false;
    let distanceToMiddle = -(0.055 * windowWidth + 48); // Translating by this centers the second slide in the middle of the screen
    let sliderPosition = 0;
    let translation = 0;
    let prevTranslation = distanceToMiddle;
    // This resets the slider
    function resetSlider() {
        viewbox.style.transition = "2s";
        viewbox.style.transform = `translateX(${distanceToMiddle}px)`;
        dragging = false;
        sliderPosition = 0;
        translation = 0;
        prevTranslation = distanceToMiddle;
    }
    resetSlider();
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("mousedown", mouseDown);
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("mousemove", mouseMove);
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("mouseup", mouseUp);
    slider === null || slider === void 0 ? void 0 : slider.addEventListener("mouseleave", resetSlider);
    function mouseDown(event) {
        viewbox.style.transition = "0s";
        viewbox.classList.add("testimonials__slider--grabbing");
        dragging = true;
        startPos = event.clientX;
    }
    function mouseMove(event) {
        if (dragging) {
            endPos = event.clientX;
            translation = (startPos - endPos);
            sliderPosition = prevTranslation - translation;
            viewbox.style.transform = `translateX(${sliderPosition}px)`;
        }
        // prevent sliding too far to left
        if (sliderPosition > 0) {
            viewbox.style.transform = `translateX(0px)`;
            sliderPosition = 0;
        }
        // prevent sliding too far to right
        if (sliderPosition < (-windowWidth / 2 + distanceToMiddle)) {
            viewbox.style.transform = `translateX(${-windowWidth / 2 + distanceToMiddle}px)`;
            sliderPosition = -windowWidth / 2 + distanceToMiddle;
        }
    }
    function mouseUp() {
        dragging = false;
        endPos = undefined;
        prevTranslation = sliderPosition;
        viewbox.classList.remove("testimonials__slider--grabbing");
    }
}
// VERIFY EMAIL FOR SUBSCRIPTION
const inputField = document.querySelector(".footer__input--email");
const pattern = /^\S+@\S+\.\S+$/;
const subscription = document.querySelector(".footer__subscription");
inputField.addEventListener("input", () => {
    let userInput = inputField.value;
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
// RELOAD THE PAGE WHEN WINDOW WIDTH CHANGES (to keep the slider ok)
let windowWidth = window.innerWidth;
window.addEventListener("resize", () => {
    if (windowWidth != window.innerWidth) {
        let address = location.pathname;
        location.replace(address);
    }
});
//# sourceMappingURL=script.js.map