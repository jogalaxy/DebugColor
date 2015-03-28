// ==UserScript==
// @name         Leek Wars Debug Color
// @downloadURL  https://raw.githubusercontent.com/jogalaxy/DebugColor/master/DebugColor.user.js
// @updateURL    https://raw.githubusercontent.com/jogalaxy/DebugColor/master/DebugColor.user.js
// @version      0.2
// @description  Permet de modifier la couleur des debugs
// @author       jojo123
// @match        http://leekwars.com/fight/*
// @match        http://leekwars.com/report/*
// @grant        none
// ==/UserScript==

(function()
{
	if (typeof Game !== "undefined")
	{
		var intervalDebugColor = setInterval(function()
		{
			if (game.inited)
			{
				clearInterval(intervalDebugColor);
				game.hud.addPersonalLog = (function(log)
				{
					var leek = game.leeks[log[0]];
					var newLog = newLog(log[2]);
					var div = "<div class='log'>";
					div += "<span style='color: " + newLog[1] + ";'>" + "[" + leek.name + "] " + newLog[0] + "</span>";
					div += "</div><br>";
					$("#logs").append(div);
					if ($("#logs .log").length > 40) {
						$("#logs .log").first().remove();
					}
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
			}
		}, 100);
	}
	else
	{
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
	}
})();
