/* Copyright (c) Kris Paulsen, 2015
 *
 *
 */
;(function($){
	$.fn.ukeChord = function(options){

		this.each(function(){
			var defaults = {
				name: $(this).data('name'),
				chord: $(this).data('chord'),
				markerColor: "yellow",
				markerSize: 16,
				htmlMarkers: false
			};
			var settings = $.extend( {}, defaults, options );

			this.chordName = document.createElement("div");
			$(this.chordName).addClass("ukeChord-name").text(settings.name);
			$(this).append(this.chordName);

			this.canvas = document.createElement('canvas');
			$.fn.ukeChord.drawFretBoard(this.canvas);
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
				style = "<style id='ukeChord-style'>.ukeChord-marker{position: absolute;width: "+ settings.markerSize +"px;height: "+ settings.markerSize +"px;border-radius: "+ radius +"px;background-color: "+ settings.markerColor +";}.ukeChord-marker.fret0{top: "+ (topOffset + 17 - radius) +"px;background-color: transparent;border: 1px solid "+ settings.markerColor +";}.ukeChord-marker.fret1{top: "+ (30 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret2{top: "+ (60 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret3{top: "+ (90 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret4{top: "+ (120 + topOffset + 17 - radius) +"px;}.ukeChord-marker.fret5{top: "+ (150 + topOffset + 17 - radius) +"px;}.ukeChord-marker.string0{left: "+ (12 - radius) +"px;}.ukeChord-marker.string1{left: "+ (25 + 12 - radius) +"px;}.ukeChord-marker.string2{left: "+ (50 + 12 - radius) +"px;}.ukeChord-marker.string3{left: "+ (75 + 12 - radius) +"px;}</style>";
				if($('#ukeChord-style').length === 0){
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
	 * drawFretBoard draws the background fretboard graphic onto the given canvas.
	 * 
	 * @param {Element} canvas The canvas onto which to draw.
	 */
	$.fn.ukeChord.drawFretBoard = function(canvas){

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

		$(canvas).attr("width", 100);
		$(canvas).attr("height", 181);
		$(canvas).css("background-color", "rosybrown");

		var ctx = canvas.getContext("2d");

		//fret bars
		ctx.strokeStyle="silver";
		drawLine(ctx, 0, 60, 100, 60, 2);
		drawLine(ctx, 0, 90, 100, 90, 2);
		drawLine(ctx, 0, 120, 100, 120, 2);
		drawLine(ctx, 0, 150, 100, 150, 2);
		drawLine(ctx, 0, 180, 100, 180, 2);
		//string shadows
		ctx.strokeStyle="rgba(0,0,0,0.2)";
		drawLine(ctx, 16, 0, 16, 181, 2);
		drawLine(ctx, 41, 0, 41, 181, 4);
		drawLine(ctx, 66.5, 0, 66.5, 181, 3);
		drawLine(ctx, 91.5, 0, 91.5, 181, 1);
		//nut
		drawLine(ctx, 0, 32, 100, 32, 5, "rgba(0,0,0,0.2)");
		drawLine(ctx, 0, 30.5, 100, 30.5, 5, "ivory");
		drawLine(ctx, 13, 28, 13, 33, 1, "rgba(0,0,0,0.4)");
		drawLine(ctx, 40, 28, 40, 33, 1, "rgba(0,0,0,0.4)");
		drawLine(ctx, 64, 28, 64, 33, 1, "rgba(0,0,0,0.4)");
		drawLine(ctx, 88, 28, 88, 33, 1, "rgba(0,0,0,0.4)");
		//strings
		ctx.strokeStyle="white";
		drawLine(ctx, 12, 0, 12, 181, 2);
		drawLine(ctx, 37, 0, 37, 181, 4);
		drawLine(ctx, 62.5, 0, 62.5, 181, 3);
		drawLine(ctx, 87.5, 0, 87.5, 181, 1);

		//return canvas;
	};

	$.fn.ukeChord.placeMarker = function(canvas, string, fret, settings){
		var ctx = canvas.getContext("2d");

		var x = string * 25 + 12.5;
		var y = fret * 30 + 17;
		var radius = settings.markerSize / 2;

		ctx.strokeStyle = settings.markerColor;
		ctx.fillStyle = settings.markerColor;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2*Math.PI);
		if(fret > 0){
			ctx.fill();
		}
		else{
			ctx.stroke();
		}
	}

}(jQuery));