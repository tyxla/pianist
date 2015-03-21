jQuery(function($) {

	var $body = $('body');

	$('.piano-keyboard .key').each(function() {
		var key = $(this);
		var tone = key.data('tone');
		var toneID = tone.replace('#', '_');
		var player = $('<div id="' + toneID + '" class="hidden"></div>').appendTo($body);
		player.jPlayer({
			ready: function (event) {
				$(this).jPlayer("setMedia", {
					m4a: "audio/mp3/" + encodeURIComponent(tone) + '.mp3',
					oga: "audio/ogg/" + encodeURIComponent(tone) + '.ogg'
				});
			},
			supplied: "m4a, oga"
		}).on($.jPlayer.event.play, function() {
			setTimeout(function() {
				key.removeClass('pressed');
			}, 500);
		});
	});

	$('.piano-keyboard .key').on('mousedown touchstart', function() {
		var tone = $(this).data('tone');
		var toneID = tone.replace('#', '_');
		var player = $('#' + toneID);
		player.jPlayer('stop').jPlayer('play');
		$(this).addClass('pressed');
	});

	var keyMappings = {
		90: 'c4',
		88: 'd4',
		67: 'e4',
		86: 'f4',
		66: 'g4',
		78: 'a4',
		77: 'b4',
		188: 'c5',
		190: 'd5',
		191: 'e5',
		83: 'c#4',
		68: 'd#4',
		71: 'f#4',
		72: 'g#4',
		74: 'a#4',
		76: 'c#5',
		186: 'd#5',
		81: 'c5',
		87: 'd5',
		69: 'e5',
		82: 'f5',
		84: 'g5',
		89: 'a5',
		85: 'b5',
		73: 'c6',
		79: 'd6',
		80: 'e6',
		219: 'f6',
		221: 'g6',
		50: 'c#5',
		51: 'd#5',
		53: 'f#5',
		54: 'g#5',
		55: 'a#5',
		57: 'c#6',
		48: 'd#6',
		187: 'f#6',
	};

	$(document).on('keydown', function(event) {
		if (typeof keyMappings[event.keyCode] !== 'undefined') {
			$('[data-tone="' + keyMappings[event.keyCode] + '"]').trigger('mousedown');
		}
	});

});