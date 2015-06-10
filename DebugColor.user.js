// ==UserScript==
// @name         Leek Wars Debug Color
// @downloadURL  https://raw.githubusercontent.com/jogalaxy/DebugColor/master/DebugColor.user.js
// @updateURL    https://raw.githubusercontent.com/jogalaxy/DebugColor/master/DebugColor.user.js
// @version      0.4
// @description  Permet de modifier la couleur des debugs
// @author       jojo123
// @match        http://leekwars.com/fight/*
// @match        http://leekwars.com/report/*
// @grant        none
// ==/UserScript==

function main () {

(function()
{
	LW.on('pageload', function() {
		$('.log').each(function()
		{
			var log = $(this).html();
			var newLog = newLog(log);
			if (newLog[1]) $(this).css("color", newLog[1]);
			$(this).html(newLog[0]);
			function newLog(log)
			{
				var color = null;
				var start = log.indexOf("|||{");
				if (start != -1)
				{
					var end = log.indexOf("}", start);
					if (end > start)
					{
						color = log.substr(start+4, (end-start)-4);
						log = log.replace("|||{"+color+"}", "");
					}
				}
				return [log, color];
			}
		});
	});

})();


};

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
