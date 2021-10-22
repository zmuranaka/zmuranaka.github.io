/*
File: functions.js
Zachary Muranaka
Functions that simplify my JavaScript without using a library like jQuery
*/

function O(object) { return typeof object === "object" ? object : document.getElementById(object); }

function C(objects) { return document.getElementsByClassName(objects); }

function T(objects) { return document.getElementsByTagName(objects); }

function S(object) { return O(object).style; }
