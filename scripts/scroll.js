"use strict";

/*
File: scroll.js
Zachary Muranaka
Handles the scrolling in my portfolio
*/

var aboutMePosition;
var project1Position;
var project2Position;
var project3Position;
var project4Position;
var contactPosition;
var positionToScrollTo;
var scrollTime; // This keeps track of the setTimeout while scrolling

// When we load or resize the window we have to set the positions
window.addEventListener("load", setPositions);
window.addEventListener("resize", setPositions);

// Sets the variables that keep track of where objects are in the website
function setPositions()
{
    var onePageHeight = document.getElementById("landingPage").offsetHeight; // The height of one page in the website
    aboutMePosition = onePageHeight;
    project1Position = onePageHeight * 2;
    project2Position = onePageHeight * 3;
    project3Position = onePageHeight * 4;
    project4Position = onePageHeight * 5;
    contactPosition = onePageHeight * 6;
}

// We stop scrolling if the window changes orientation
window.addEventListener("orientationchange", function() { clearTimeout(scrollTime); });

// Add event listeners to the nav links
for (let i = 0; i < NAV_LINKS.length; i++)
{
    NAV_LINKS[i].addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        determineScrollPosition(this);
        smoothScroll(upOrDown());
    });
}

// Add event listeners to the down arrows
for (let i = 0; i < DOWN_ARROWS.length; i++)
{
    DOWN_ARROWS[i].addEventListener("mouseenter", function() { this.src = "images/blueDownArrow.png"; });
    DOWN_ARROWS[i].addEventListener("mouseleave", function() { this.src = "images/blackDownArrow.png"; });
    DOWN_ARROWS[i].addEventListener("mousedown", function() { this.src = "images/yellowDownArrow.png"; });
    DOWN_ARROWS[i].addEventListener("mouseup", function() { this.src = "images/blueDownArrow.png"; });
    DOWN_ARROWS[i].addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        determineScrollPosition(this);
        smoothScroll(upOrDown());
    });
}

// Add event listeners to the up arrows
for (let i = 0; i < UP_ARROWS.length; i++)
{
    UP_ARROWS[i].addEventListener("mouseenter", function() { this.src = "images/blueUpArrow.png"; });
    UP_ARROWS[i].addEventListener("mouseleave", function() { this.src = "images/blackUpArrow.png"; });
    UP_ARROWS[i].addEventListener("mousedown", function() { this.src = "images/yellowUpArrow.png"; });
    UP_ARROWS[i].addEventListener("mouseup", function() { this.src = "images/blueUpArrow.png"; });
    UP_ARROWS[i].addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        positionToScrollTo = 0;
        smoothScroll(upOrDown());
    });
}

// Determines where we need to scroll based on what was clicked
function determineScrollPosition(object)
{
    if (object === NAV_LINKS[0] || object === DOWN_ARROWS[0]) positionToScrollTo = aboutMePosition;
    else if (object === NAV_LINKS[1] || object === DOWN_ARROWS[1]) positionToScrollTo = project1Position;
    else if (object === NAV_LINKS[2] || object === DOWN_ARROWS[2]) positionToScrollTo = project2Position;
    else if (object === NAV_LINKS[3] || object === DOWN_ARROWS[3]) positionToScrollTo = project3Position;
    else if (object === NAV_LINKS[4] || object === DOWN_ARROWS[4]) positionToScrollTo = project4Position;
    else if (object === NAV_LINKS[5] || object === DOWN_ARROWS[5]) positionToScrollTo = contactPosition;
}

// Recursive function that does a smooth scroll
function smoothScroll(direction)
{
    if (isScrollAgainNecessary())
    {
        // The setTimeout creates the smooth scroll effect
        scrollTime = setTimeout(function()
        {
            window.scrollBy(0, direction ? 12 : -12); // Scroll by 12 pixels
            smoothScroll(direction); // Recursively call this function
        }, 0);
    }
}

// Returns whether we need to scroll up or down (true means down)
function upOrDown()
{
    return document.getElementById("burgerNav").offsetHeight ?
    window.pageYOffset < positionToScrollTo - 45 :
    window.pageYOffset < positionToScrollTo;
}

// Returns whether we need to scroll again or not (true means we do)
function isScrollAgainNecessary()
{
    return document.getElementById("burgerNav").offsetHeight ?
    (window.pageYOffset < positionToScrollTo - 57 || window.pageYOffset > positionToScrollTo - 45) && !isAtTop() :
    (window.pageYOffset < positionToScrollTo - 12 || window.pageYOffset > positionToScrollTo) && !isAtTop();
}

// Returns whether we are at the top of the page or not (true means we are)
function isAtTop() { return positionToScrollTo === 0 && window.pageYOffset === 0; }
