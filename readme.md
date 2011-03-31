#Bustify
Bustify is a JavaScript that busts any image into a series of boxes. Right now only Webkit browsers is supported. Hover to bust 1 box at a time, click to explode them all

##How to Use

Bustify takes a single object with options:

	document.getElementById('solar').bustify({
	    width : 50,
	    height : 50,
	    intensity : 1
	})

`width` and `height` set the size of the blocks. Note that due to rounding issues, the resulting div may be larger than the original image. I put in negative margins to counteract that, but some weird things may result.

`intensity` is a multiplier number that controls how far the blocks fly, and is based on the image width. 1 is equal to the image width.