/* Copyright (c) Kris Paulsen, 2015
 *
 * Usage:
 *
 *	<div class="chordDiagram" data-name="Em" data-chord="0432"></div>
 *	<script>
 *		$('.chordDiagram').ukeChord();
 *	</script>
 *
 *	<div id="myChord"></div>
 *	<script>
 *		$('#myChord').ukeChord({
 *			name: "Em",
 *			chord: "0432",
 *			markerColor: "#0ff",
 *			stringColor: "black"
 *		});
 *	</script>
 *
 *
 * Options:
 *
 *	@param {String} name		The label that goes at the top of the diagram.
 *								If the option is omitted, a data attribute must
 *								be used on the dom element. See the first usage
 *								example.
 *	@param {String} chord		A 4-digit string representing the held fret for
 *								each string. This is also required and must be
 *								set in the options object or in a data attribute
 *								on the dom element.
 *	@param {String} markerColor	The color to use for the fret markers.
 *								Can be hexidecimal or named color.
 *	@param {Number} markerSize	The diameter of the fret markers, in pixels.
 *	@param {Boolean} htmlMarkers	Set to true to use html and css to display
 *									the fret markers rather than drawing on the
 *									canvas.
 *	@param {String} stringColor	The color to use for the strings.
 *								Can be hexidecimal or named color.
 */

;(function($){
	$.fn.ukeChord = function(options){

		this.each(function(){
			var defaults = {
				name: $(this).data('name'),
				chord: $(this).data('chord'),
				markerColor: "yellow",
				markerSize: 10,
				htmlMarkers: false,
				stringColor: "white",
				fretboardColor: "rosybrown"
			};
			var settings = $.extend( {}, defaults, options );

			this.chordName = document.createElement("div");
			$(this.chordName).addClass("ukeChord-name").text(settings.name);
			$(this).append(this.chordName);

			this.canvas = document.createElement('canvas');
			$.fn.ukeChord.drawFretBoard(this.canvas, settings);
			$(this).append(this.canvas);

			frets = ("" + settings.chord).split('');
			if(settings.htmlMarkers){
				this.markers = [];
				$(this).css("position","relative");
				topOffset = $(this.canvas).position().top;
				radius = settings.markerSize / 2;
				for(i in frets){
					//place markers with html/css
					this.markers[i] = document.createElement('div');
					$(this.markers[i]).addClass("ukeChord-marker string"+i + " fret"+frets[i]);
					/*$(this.markers[i]).css({
						position: "absolute",
						top: frets[i] * 30 + topOffset + 17 - radius,
						left: i * 25 + 12 - radius,
						width: settings.markerSize,
						height: settings.markerSize,
						borderRadius: radius,
						backgroundColor: settings.markerColor
					});*/
					$(this).append(this.markers[i]);
				}
				if($('#ukeChord-style').length === 0){
					style = "<style id='ukeChord-style'>.ukeChord-marker{position: absolute;width: "+ settings.markerSize +"px;height: "+ settings.markerSize +"px;border-radius: "+ radius +"px;background-color: "+ settings.markerColor +";}.ukeChord-marker.fret0{top: "+ (topOffset + 17 - radius) +"px;background-color: transparent;border: 1px solid "+ settings.markerColor +";}.ukeChord-marker.fret1{top: "+ (30 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret2{top: "+ (60 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret3{top: "+ (90 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret4{top: "+ (120 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret5{top: "+ (150 + topOffset + 17 - radius) +"px;}.ukeChord-marker.string0{left: "+ (12 - radius) +"px;}.ukeChord-marker.string1{left: "+ (25 + 12 - radius) +"px;}.ukeChord-marker.string2{left: "+ (50 + 12 - radius) +"px;}.ukeChord-marker.string3{left: "+ (75 + 12 - radius) +"px;}</style>";
					document.write(style);
				}
			}
			else{
				//place markers with canvas
				for(i in frets){
					$.fn.ukeChord.placeMarker(this.canvas, i, frets[i], settings);
				}
			}

		});

		return this;
	};

	/**
	 * drawFretBoard draws the background fretboard graphic onto the given
	 * canvas.
	 *
	 * @param {Element} canvas The canvas onto which to draw.
	 * @param {Object} settings The settings object, containing the string
	 *                          color.
	 */
	$.fn.ukeChord.drawFretBoard = function(canvas, settings){

		drawLine = function(ctx, startX, startY, endX, endY, width, color){
			if(color){
				ctx.strokeStyle=color;
			}
			ctx.beginPath();
			ctx.lineWidth=width;
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
			ctx.stroke();
		};

		$(canvas).attr("width", 48);
		$(canvas).attr("height", 76);
		//$(canvas).css("background-color", "rosybrown");

		var ctx = canvas.getContext("2d");

		//fred board
		ctx.rect(0, 0, 48, 76);
		ctx.fillStyle=settings.fretboardColor;
		ctx.fill();
		//fret bars
		ctx.strokeStyle="silver";
		drawLine(ctx, 0, 30, 48, 30, 2);
		drawLine(ctx, 0, 45, 48, 45, 2);
		drawLine(ctx, 0, 60, 48, 60, 2);
		drawLine(ctx, 0, 75, 48, 75, 2);
		//drawLine(ctx, 0, 90, 48, 90, 2);
		//string shadows
		ctx.strokeStyle="rgba(0,0,0,0.2)";
		drawLine(ctx, 8, 0, 8, 91, 2);
		drawLine(ctx, 20, 0, 20, 91, 4);
		drawLine(ctx, 32.5, 0, 32.5, 91, 3);
		drawLine(ctx, 44.5, 0, 44.5, 91, 1);
		//nut
		drawLine(ctx, 0, 17, 48, 17, 5, "rgba(0,0,0,0.2)");	//nut shadow
		drawLine(ctx, 0, 15.5, 48, 15.5, 5, "ivory");
		drawLine(ctx, 7, 13, 7, 18, 1, "rgba(0,0,0,0.4)");	//string shadows on the nut
		drawLine(ctx, 20, 13, 20, 18, 1, "rgba(0,0,0,0.4)");
		drawLine(ctx, 32, 13, 32, 18, 1, "rgba(0,0,0,0.4)");
		drawLine(ctx, 43, 13, 43, 18, 1, "rgba(0,0,0,0.4)");
		//strings
		ctx.strokeStyle=settings.stringColor;
		drawLine(ctx, 6, 0, 6, 91, 2);
		drawLine(ctx, 18, 0, 18, 91, 4);
		drawLine(ctx, 30.5, 0, 30.5, 91, 3);
		drawLine(ctx, 42.5, 0, 42.5, 91, 1);

		//return canvas;
	};

	/**
	 * Places a finger marker on the fretboard.
	 * @param  {Element} canvas   The canvas element on which to place the marker.
	 * @param  {integer} string   The string number.
	 * @param  {integer} fret     The fret number.
	 * @param  {Object} settings  Specifies the size and color of the marker.
	 */
	$.fn.ukeChord.placeMarker = function(canvas, string, fret, settings){
		var ctx = canvas.getContext("2d");

		var x = string * 12 + 6;
		var y = fret * 15 + 8;
		var radius = settings.markerSize / 2;

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2*Math.PI);
		if(fret > 0){
			ctx.fillStyle = settings.markerColor;
			ctx.fill();
		}
		else{
			ctx.strokeStyle = settings.markerColor;
			ctx.stroke();
		}
	}

}(jQuery));
