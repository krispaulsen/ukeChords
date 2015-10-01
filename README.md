# ukeChords
ukeChords is a jQuery plugin that builds and displays *ukulele* chord diagrams on a canvas element.

## Usage
First, load jQuery and the plugin:
```html
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="ukeChords/jquery.ukeChord.js"></script>
```

### Method 1:
```html
<div class="chordDiagram" data-name="Em" data-chord="0432"></div>

<script>
	$('.chordDiagram').ukeChord();
</script>
```
This is using data attributes to define the chord name and fingering.

### Method 2:
```html
<div id="myChord"></div>

<script>
	$('#myChord').ukeChord({
		name: "Em",
		chord: "0432",
		markerColor: "#0ff",
		stringColor: "black"
	});
</script>
```
This is passing the name, fingering, and other parameters in an options object. See options below.

### Method 3:
```html
<style>
	/* allows the chord diagram to float over the content, displayed on hover via jQuery. */
	.floatingChordDiagram{
		position: absolute;
		top: -4px;
		left: 50%;
		z-index: 100;
		margin: 0 0 0 -25px;
	}
</style>

<div class="chords">
	<span>C</span>
	<span>F</span>
	<span>G7</span>
</div>

<script>
var chords = {
	C:		"0003",
	F:		"2010",
	G7:		"0212"
	//...
};

$(function(){
	$('.chords span').each(function(){
		//get the name and fingering from the text
		chordName = $(this).text();
		chordDesc = chords[chordName];
		//create a new div element to hold the chord diagram
		chordDiagram = $('<div>');
		$(chordDiagram).addClass('chordDiagram floatingChordDiagram');
		$(chordDiagram).hide();
		//turn it into a ukeChord
		$(chordDiagram).ukeChord({
			name: chordName,
			chord: chordDesc
		});
		//attach it to the span
		$(this).append(chordDiagram);
	}).hover(function(){
		//reveal on hover
		$(this).find('.floatingChordDiagram').stop().slideToggle("fast");
	});
});
</script>
```

## Options

<dl>
	<dt>name</dt>
	<dd>The label that goes at the top of the diagram. If the option is omitted, a data attribute must be used on the dom element. See the first usage example.</dd>

	<dt>chord</dt>
	<dd>A 4-digit string representing the held fret for each string. This is also required and must be set in the options object or in a data attribute on the dom element.</dd>

	<dt>markerColor</dt>
	<dd>The color to use for the fret markers. Can be hexidecimal or named color. Default is "yellow".</dd>

	<dt>markerSize</dt>
	<dd>The diameter of the fret markers, in pixels. Default is 10.</dd>

	<dt>htmlMarkers</dt>
	<dd>Set to true to use html and css to display the fret markers rather than drawing on the canvas. Default is false.</dd>

	<dt>stringColor</dt>
	<dd>The color to use for the strings. Can be hexidecimal or named color. Default is "white".</dd>

	<dt>fretboardColor</dt>
	<dd>The color of the fret board. Can be hexidecimal or named color. Default is "rosybrown".</dd>
</dl>
