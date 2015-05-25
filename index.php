<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Pianist</title>

	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link href="images/favicon.ico" rel="icon" type="image/x-icon">

	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</head>
<body>

	<div class="piano-keybed">
		<ul class="piano-keyboard">
			<?php 
			// list of tones, and whether they have a corresponding sharp tone
			$tones = array(
				'c' => true,
				'd' => true,
				'e' => false,
				'f' => true,
				'g' => true,
				'a' => true,
				'b' => false,
			); 

			// last tone on our keyboard
			$last_tone = 'f8';

			// loop through the octaves
			for ($octave = 1; $octave <= 8; $octave++) {
				// loop through tones in the octave
				foreach ($tones as $tone => $has_sharp) {

					// only A and B are included in the first octave
					if ($octave == 1) {
						if ($tone !== 'a' && $tone !== 'b') {
							continue;
						}
					}

					// the current main tone
					$current_tone = $tone . $octave;

					// the current sharp tone
					if ($has_sharp) {
						$current_tone_sharp = $tone . ($has_sharp ? '#' : '') . $octave;
					}
					?>
					<li>
						<div class="key" data-tone="<?php echo $current_tone; ?>"><em><?php echo $current_tone; ?></em></div>
						<?php if ($has_sharp && $current_tone !== $last_tone): ?>
							<span class="key key-sharp" data-tone="<?php echo $current_tone_sharp; ?>"><em><?php echo $current_tone_sharp; ?></em></span>
						<?php endif; ?>
					</li>
					<?php
					// if this is the last tone, stop displaying tones
					if ( $last_tone === $current_tone || ($has_sharp && $last_tone === $current_tone_sharp) ) {
						break;	
					}
				}
			}
			?>
		</ul>
	</div>

</body>
</html>