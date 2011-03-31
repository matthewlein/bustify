// matthewlein.com/experiments/bustify.html
//
// Developed by Matthew Lein
//
// Copyright 2011

var bustify = {};

HTMLImageElement.prototype.bustify = function( options ) {
	bustify.makeSquares( this, options );
};

bustify.randomNumber = function(low, high) {
	return Math.floor( Math.random() * (1 + high - low) ) + low;
};

bustify.makeSquares = function(imageToReplace, options) {
	
	var image = imageToReplace,
		imgSrc = image.src,
		imgW = image.width,
		imgH = image.height,
		opts = options,	
		blockWidth = opts.width || 50,
		blockHeight = opts.height || 50,
		intensity = opts.intensity || 1,
		columns = Math.ceil( image.width / blockWidth ),
		rows = Math.ceil( image.height / blockHeight ),
		holder = document.createElement('div');
	
	// swap the image for the div
	image.parentNode.replaceChild(holder, image);
	holder.style.width = blockWidth * columns + 'px';
	holder.style.height = blockHeight * rows + 'px';
	// adding perspective is what makes Z translation work
	holder.style.WebkitPerspective = '300';
	// add negative margin equal to the difference in image size and holder size
	// can't use overflow:hidden
	holder.style.marginRight = ( imgW - ( blockWidth * columns ) ) + 'px';
	holder.style.marginBottom = ( imgH - ( blockHeight * rows ) ) + 'px';
	
	var explode = function(thing) {
		
		var randomTx = bustify.randomNumber(-imgW * intensity, imgW * intensity),
			randomTy = bustify.randomNumber(-imgW * intensity, imgW * intensity),
			randomTz = bustify.randomNumber(-imgW * intensity, imgW * intensity),
			randomRx = bustify.randomNumber(-360,360),
			randomRy = bustify.randomNumber(-360,360),
			randomRz = bustify.randomNumber(-360,360),
			randomRa = bustify.randomNumber(0,180);

		thing.style.WebkitTransform = 'translate3d(' + randomTx + 'px, ' + randomTy + 'px, ' + randomTz + 'px)' + 'rotate3d(' + randomRx + ','+ randomRy + ',' + randomRz + ',' + randomRa + 'deg)';
		
	};
	
	var onMouseOver = function() {
		explode(this);
	};
	
	var onTransitionEnd = function() {
		
		var that = this;
		
		setTimeout(function() {
			that.style.WebkitTransform = 'translate3d(0,0,0)';
		}, 200);
		
	};
	
	// make the blocks
	for (var y = 0; y < rows; y++) {
		
		for (var x = 0; x < columns; x++) {
			
			// create a link
			var newLink = document.createElement('a');
			// and style it based on the block size and image
			newLink.style.width = blockWidth + 'px';
			newLink.style.height = blockHeight + 'px';
			newLink.style.background = 'url(' + image.src + ') no-repeat';
			newLink.style.display = 'block';
			newLink.style.float = 'left';
			newLink.style.position = 'relative';
			newLink.style.cursor = 'pointer';
			newLink.style.WebkitTransition = 'all 500ms ease-out';
			newLink.style.backgroundPosition = -(x * blockWidth) + 'px' + ' ' + -(y * blockHeight) + 'px';
			
			// add the newLink
			holder.appendChild(newLink);
			
			// add event listeners for hover to explode
			newLink.addEventListener('mouseover', onMouseOver, false);
			
			
			// when the transition ends, pause a moment, then go back
			newLink.addEventListener('WebkitTransitionEnd', onTransitionEnd, false);
			
		}
	}
	
	// click the holder to make everything explode
	holder.addEventListener('click', function() {
		
		// get all the links
		var theLinks = this.childNodes;
		
		// make them explode
		for (var i = 0; i < theLinks.length; i++) {
			explode(theLinks[i]);
		}
		
	}, false);

};
