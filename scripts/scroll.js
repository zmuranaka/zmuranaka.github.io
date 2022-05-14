"use strict";

/*
File: scroll.js
Zachary Muranaka
Handles the scrolling in my portfolio
*/

var navLinks = C("navLink"); // Array of the nav links
var downArrows = C("downArrow"); // Array of the down arrows
var upArrows = C("upArrow"); // Array of the up arrows
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
    var onePageHeight = O("landingPage").offsetHeight; // The height of one page in the website
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
for (let i = 0; i < navLinks.length; i++)
{
    navLinks[i].addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        determineScrollPosition(this);
        smoothScroll(upOrDown());
    });
}

// Add event listeners to the down arrows
for (let i = 0; i < downArrows.length; i++)
{
    downArrows[i].addEventListener("mouseenter", function() { this.src = "images/blueDownArrow.png"; });
    downArrows[i].addEventListener("mouseleave", function() { this.src = "images/blackDownArrow.png"; });
    downArrows[i].addEventListener("mousedown", function() { this.src = "images/yellowDownArrow.png"; });
    downArrows[i].addEventListener("mouseup", function() { this.src = "images/blueDownArrow.png"; });
    downArrows[i].addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        determineScrollPosition(this);
        smoothScroll(upOrDown());
    });
}

// Add event listeners to the up arrows
for (let i = 0; i < upArrows.length; i++)
{
    upArrows[i].addEventListener("mouseenter", function() { this.src = "images/blueUpArrow.png"; });
    upArrows[i].addEventListener("mouseleave", function() { this.src = "images/blackUpArrow.png"; });
    upArrows[i].addEventListener("mousedown", function() { this.src = "images/yellowUpArrow.png"; });
    upArrows[i].addEventListener("mouseup", function() { this.src = "images/blueUpArrow.png"; });
    upArrows[i].addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        positionToScrollTo = 0;
        smoothScroll(upOrDown());
    });
}

// Determines where we need to scroll based on what was clicked
function determineScrollPosition(object)
{
    if (object === navLinks[0] || object === downArrows[0]) positionToScrollTo = aboutMePosition;
    else if (object === navLinks[1] || object === downArrows[1]) positionToScrollTo = project1Position;
    else if (object === navLinks[2] || object === downArrows[2]) positionToScrollTo = project2Position;
    else if (object === navLinks[3] || object === downArrows[3]) positionToScrollTo = project3Position;
    else if (object === navLinks[4] || object === downArrows[4]) positionToScrollTo = project4Position;
    else if (object === navLinks[5] || object === downArrows[5]) positionToScrollTo = contactPosition;
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
    return O("burgerNav").offsetHeight ?
    window.pageYOffset < positionToScrollTo - 45 :
    window.pageYOffset < positionToScrollTo;
}

// Returns whether we need to scroll again or not (true means we do)
function isScrollAgainNecessary()
{
    return O("burgerNav").offsetHeight ?
    (window.pageYOffset < positionToScrollTo - 57 || window.pageYOffset > positionToScrollTo - 45) && !isAtTop() :
    (window.pageYOffset < positionToScrollTo - 12 || window.pageYOffset > positionToScrollTo) && !isAtTop();
}

// Returns whether we are at the top of the page or not (true means we are)
function isAtTop() { return positionToScrollTo === 0 && window.pageYOffset === 0; }
