"use strict";

var menuIsOpen = false; // Keeps track of if the nav is open or not. It begins closed and can be opened with JavaScript.
var oldAspectRatio = window.innerWidth / window.innerHeight;

function setLayout(isWide)
{
    for (let i = 0, topOffset = isWide ? 0 : 3; i < NAV_LINKS.length; i++, topOffset+=2)
        NAV_LINKS[i].style.top = `${topOffset}em`;
}

function closeNavMenu()
{
    PAGE_NAV.style.display = "none";
    return false; // The menu is now closed
}

function openNavMenu()
{
    PAGE_NAV.style.display = "block";
    return true; // The menus is now open
}

// Changes the nav styles if the viewport's aspect ratio has changed to below or above 22/15
function changeStyles()
{
    let newAspectRatio = window.innerWidth / window.innerHeight;
    if (newAspectRatio === oldAspectRatio) return;

    if (newAspectRatio >= ASPECT_RATIO_TO_CHANGE_LAYOUT && oldAspectRatio < ASPECT_RATIO_TO_CHANGE_LAYOUT)
    {
        setLayout(true);
        if (!menuIsOpen) menuIsOpen = openNavMenu();
    }
    else if (newAspectRatio < ASPECT_RATIO_TO_CHANGE_LAYOUT && oldAspectRatio >= ASPECT_RATIO_TO_CHANGE_LAYOUT)
    {
        setLayout(false);
        if (menuIsOpen) menuIsOpen = closeNavMenu();
    }
    oldAspectRatio = newAspectRatio;
}

// Set initial layout when loading this script
if (oldAspectRatio >= ASPECT_RATIO_TO_CHANGE_LAYOUT)
{
    setLayout(true);
    menuIsOpen = openNavMenu();
}
else setLayout(false);

// The styles may need to be changed when the window changes orientation or is resized
window.addEventListener("orientationchange", changeStyles);
window.addEventListener("resize", changeStyles);

BURGER_NAV.addEventListener("mouseenter", function()
{
    this.src = "images/blackBurgerNav.png";
    this.style.background = "rgb(216, 216, 255)";
});
BURGER_NAV.addEventListener("mouseleave", function()
{
    this.src = "images/whiteBurgerNav.png";
    this.style.background = "blue";
});
BURGER_NAV.addEventListener("mousedown", function() { this.style.background = "yellow"; });
BURGER_NAV.addEventListener("mouseup", function() { this.style.background = "rgb(216, 216, 255)"; });
BURGER_NAV.addEventListener("click", function() { menuIsOpen = menuIsOpen ? closeNavMenu() : openNavMenu(); });
