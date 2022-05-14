"use strict";

/*
File: scroll.js
Zachary Muranaka
Handles the scrolling in my portfolio
*/

var positions = [0, 0, 0, 0, 0, 0]
var positionToScrollTo;
var scrollTime; // This keeps track of the setTimeout while scrolling

// Sets the variables that keep track of where objects are in the website
function setPositions()
{
    let onePageHeight = document.getElementById("landingPage").offsetHeight; // The height of one page in the website

    for (let i = 0; i < positions.length; i++)
        positions[i] = onePageHeight * (i+1);
}

// Determines where we need to scroll based on what was clicked
function determineScrollPosition(object)
{
    for (let i = 0; i < positions.length; i++)
    {
        if (object === NAV_LINKS[i] || object === DOWN_ARROWS[i])
            positionToScrollTo = positions[i];
    }
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

// Set initial positions when loading this script
setPositions();
window.addEventListener("resize", setPositions);

// We stop scrolling if the window changes orientation
window.addEventListener("orientationchange", function() { clearTimeout(scrollTime); });

// Add event listeners to the nav links
for (let navLink of NAV_LINKS)
{
    navLink.addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        determineScrollPosition(this);
        smoothScroll(upOrDown());
    });

}

// Add event listeners to the down arrows
for (let downArrow of DOWN_ARROWS)
{
    downArrow.addEventListener("mouseenter", function() { this.src = "images/blueDownArrow.png"; })
    downArrow.addEventListener("mouseleave", function() { this.src = "images/blackDownArrow.png"; });
    downArrow.addEventListener("mousedown", function() { this.src = "images/yellowDownArrow.png"; });
    downArrow.addEventListener("mouseenter", function() { this.src = "images/blueDownArrow.png"; })
    downArrow.addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        determineScrollPosition(this);
        smoothScroll(upOrDown());
    });
}

// Add event listeners to the up arrows
for (let upArrow of UP_ARROWS)
{
    upArrow.addEventListener("mouseenter", function() { this.src = "images/blueUpArrow.png"; })
    upArrow.addEventListener("mouseleave", function() { this.src = "images/blackUpArrow.png"; });
    upArrow.addEventListener("mousedown", function() { this.src = "images/yellowUpArrow.png"; });
    upArrow.addEventListener("mouseup", function() { this.src = "images/blueUpArrow.png"; })
    upArrow.addEventListener("click", function()
    {
        clearTimeout(scrollTime); // We have a new place to scroll so any previous scroll scrollTimes are cleared
        positionToScrollTo = 0;
        smoothScroll(upOrDown());
    });
}
