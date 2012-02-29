// matthewlein.com/experiments/this.html
//
// Developed by Matthew Lein
//
// REQUIRES MODERNIZER
//
// Copyright 2011

var bustify = (function(){

    HTMLImageElement.prototype.bustify = function( options ) {
        new Bustify( this, options );
    };

    function Bustify(img, options) {
    
        this.bust = this;
        this.img = img;
        this.imgSrc = img.src;
        this.imgW = img.width;
        this.imgH = img.height;
    
        this.opts = options;
        this.blockWidth = this.opts.width || 50;
        this.blockHeight = this.opts.height || 50;
        this.intensity = this.opts.intensity || 1;
        this.columns = Math.ceil( img.width / this.blockWidth );
        this.rows = Math.ceil( img.height / this.blockHeight );
        this.holder = document.createElement('div');
    
        this.makeSquares();
    }


    Bustify.prototype.randomNumber = function(low, high) {
        return Math.floor( Math.random() * (1 + high - low) ) + low;
    };

    Bustify.prototype.makeSquares = function() {

        this.holder.style.width = this.blockWidth * this.columns + 'px';
        this.holder.style.height = this.blockHeight * this.rows + 'px';
        // add negative margin equal to the difference in img size and holder size
        // can't use overflow:hidden or it hides the fun
        this.holder.style.marginRight = ( this.imgW - ( this.blockWidth * this.columns ) ) + 'px';
        this.holder.style.marginBottom = ( this.imgH - ( this.blockHeight * this.rows ) ) + 'px';
    
        // adding perspective is what makes Z translation work
        // TODO: Use Modernizer here
        this.holder.style.WebkitPerspective = '300px';
        
        // make the blocks
        for (var y = 0; y < this.rows; y++) {
        
            for (var x = 0; x < this.columns; x++) {
            
                // create a link
                var newLink = document.createElement('a');
                // and style it based on the block size and img
                newLink.style.width = this.blockWidth + 'px';
                newLink.style.height = this.blockHeight + 'px';
                newLink.style.display = 'block';
                newLink.style.float = 'left';
                newLink.style.position = 'relative';
                newLink.style.cursor = 'pointer';
                newLink.style.WebkitTransition = 'all 500ms ease-out';
                newLink.style.background = 'url(' + this.img.src + ') no-repeat';
                newLink.style.backgroundPosition = -(x * this.blockWidth) + 'px' + ' ' + -(y * this.blockHeight) + 'px';
            
                // add the newLink
                //TODO: look at documentfragment approach
                this.holder.appendChild(newLink);
            
                // add event listeners for hover to explode
                // TODO: use delegation
                newLink.addEventListener('mouseover', onMouseOver, false);
            
            
                // when the transition ends, pause a moment, then go back
                // TODO: use modernizer
                newLink.addEventListener('WebkitTransitionEnd', onTransitionEnd, false);
            
            }
        }
    
        // swap the img for the div
        img.parentNode.replaceChild(holder, img);

    };

    Bustify.prototype.bindEvents = function(){
        
        
        var onMouseOver = function() {
            explode(this);
        };
    
        var onTransitionEnd = function() {
        
            var that = bust;
        
            setTimeout(function() {
                that.style.WebkitTransform = 'translate3d(0,0,0)';
            }, 200);
        
        };
        
        holder.addEventListener('mouseover', function(event) {
        
            // if target is a span, explode it
            if ( event.target ) {
                event.target.explode();
            }
        
        }, false);

    
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
    
    
    Bustify.prototype.explode = function(thing) {
    
        var randomTx = bust.randomNumber(-imgW * intensity, imgW * intensity),
            randomTy = bust.randomNumber(-imgW * intensity, imgW * intensity),
            randomTz = bust.randomNumber(-imgW * intensity, imgW * intensity),
            randomRx = bust.randomNumber(-360,360),
            randomRy = bust.randomNumber(-360,360),
            randomRz = bust.randomNumber(-360,360),
            randomRa = bust.randomNumber(0,180);
            
        // TODO: Use Modernizer
        thing.style.WebkitTransform = 'translate3d(' + randomTx + 'px, ' + randomTy + 'px, ' + randomTz + 'px)' + 'rotate3d(' + randomRx + ','+ randomRy + ',' + randomRz + ',' + randomRa + 'deg)';
    
    };

})()
