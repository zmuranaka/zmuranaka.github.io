"use strict";

/*
File: descriptions.js
Zachary Muranaka
Handles how the descriptions display depending on the viewport
*/

var videos = T("video"); // Array of the videos
var descriptions = C("description"); // Array of the descriptions

// Add event listeners to the window
window.addEventListener("load", checkDescriptions);
window.addEventListener("resize", checkDescriptions);

// Displays the corresponding description if the video is not displayed or the window is tall enough
function checkDescriptions()
{
    for (let i = 0; i < videos.length; i++)
    {
        if (!videos[i].offsetHeight) // The video is not displaying
        {
            S(descriptions[i]).display = "flex";
            S(descriptions[i]).fontSize = "3vh";
            S(videos[i]).marginTop = "0";
        }
        else if (window.innerHeight > 599) // The window is tall enough
        {
            S(descriptions[i]).display = "flex";
            S(descriptions[i]).fontSize = "2vh";
            S(videos[i]).marginTop = "0";
        }
        else
        {
            S(descriptions[i]).display = "none";
            S(videos[i]).marginTop = "1vh";
        }
    }
}
