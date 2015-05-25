jQuery(function($) {

	var $body = $('body');
	var $doc = $(document);

	// initialize the sound player of each key
	$('.piano-keyboard .key').each(function() {
		var key = $(this);
		var tone = key.data('tone');
		var _tone = encodeURIComponent(tone);
		var toneID = tone.replace('#', '_');
		var player = $('<div id="' + toneID + '" class="hidden"></div>').appendTo($body);

		player.jPlayer({
			ready: function (event) {
				$(this).jPlayer("setMedia", {
					m4a: "audio/mp3/" + _tone + '.mp3',
					oga: "audio/ogg/" + _tone + '.ogg'
				});
			},
			supplied: "m4a, oga"
		}).on($.jPlayer.event.play, function() {
			setTimeout(function() {
				key.removeClass('pressed');
			}, 300);
		});
	});

	// handler for mousedown/touchstart for each key
	$('.piano-keyboard .key').on('mousedown touchstart', function() {
		var tone = $(this).data('tone');
		var toneID = tone.replace('#', '_');
		var player = $('#' + toneID);
		player.jPlayer('stop').jPlayer('play');
		$(this).addClass('pressed');
	});

	// piano keyboard to computer keyboard key mappings 
	var keyMappings = {
		90: 'c4', // Z
		88: 'd4', // X
		67: 'e4', // C
		86: 'f4', // V
		66: 'g4', // B
		78: 'a4', // N
		77: 'b4', // M
		188: 'c5', // ,
		190: 'd5', // .
		191: 'e5', // /

		83: 'c#4', // S
		68: 'd#4', // D
		71: 'f#4', // G
		72: 'g#4', // H
		74: 'a#4', // J
		76: 'c#5', // L
		186: 'd#5', // ;

		81: 'c5', // Q
		87: 'd5', // W
		69: 'e5', // E
		82: 'f5', // R
		84: 'g5', // T
		89: 'a5', // Y
		85: 'b5', // U
		73: 'c6', // I
		79: 'd6', // O
		80: 'e6', // P
		219: 'f6', // [
		221: 'g6', // ]

		50: 'c#5', // 2
		51: 'd#5', // 3
		53: 'f#5', // 5
		54: 'g#5', // 6
		55: 'a#5', // 7
		57: 'c#6', // 9
		48: 'd#6', // 0
		187: 'f#6', // =
	};

	// handle keydown to allow playing with keyboard
	var keyIsDown = {};
	$doc.on('keydown', function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);

		// disallow repetitive keydown event
		if ( !keyIsDown[keycode] ) {
			if (typeof keyMappings[keycode] !== 'undefined') {
				$('[data-tone="' + keyMappings[keycode] + '"]').trigger('mousedown');
			}

			keyIsDown[keycode] = true;
		}
	});

	// handle keyup to reset the keydown event flag
	$doc.on('keyup', function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);

		keyIsDown[keycode] = false;
	});

});