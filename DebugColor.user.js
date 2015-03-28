// ==UserScript==
// @name         Leek Wars Debug Color
// @downloadURL  https://raw.githubusercontent.com/jogalaxy/DebugColor/master/DebugColor.user.js
// @updateURL    https://raw.githubusercontent.com/jogalaxy/DebugColor/master/DebugColor.user.js
// @version      0.1
// @description  Permet de modifier la couleur des debugs
// @author       jojo123
// @match        http://leekwars.com/report/*
// @grant        none
// ==/UserScript==

$('.log').each(function()
{
	var log = $(this).html();
	var start = log.indexOf("|||{");
	if (start != -1)
	{
		var end = log.indexOf("}", start);
		if (end > start)
		{
			var color = log.substr(start+4, (end-start)-4);
			$(this).css("color", color);
			$(this).html(log.replace("|||{"+color+"}", ""));
		}
	}
});