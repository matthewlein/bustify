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

    function Bustify( img, options ) {
    
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
        this.holder = document.createElement( 'div' );
    
        this.init();
    }


    Bustify.prototype.randomNumber = function( low, high ) {
        return Math.floor( Math.random() * ( 1 + high - low ) ) + low;
    };
    
    Bustify.prototype.init = function() {
        this.bindEvents();
        this.makeSquares();
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
        for ( var y = 0; y < this.rows; y++ ) {
        
            for ( var x = 0; x < this.columns; x++ ) {
            
                // create a link
                var newLink = document.createElement( 'span' );
                // and style it based on the block size and img
                newLink.style.width = this.blockWidth + 'px';
                newLink.style.height = this.blockHeight + 'px';
                newLink.style.display = 'block';
                newLink.style.float = 'left';
                newLink.style.position = 'relative';
                newLink.style.cursor = 'pointer';
                newLink.style.WebkitTransition = 'all 500ms ease-out';
                newLink.style.background = 'url(' + this.img.src + ') no-repeat';
                newLink.style.backgroundPosition = -( x * this.blockWidth ) + 'px ' + -( y * this.blockHeight ) + 'px';
                
                // store reference to obj instance
                newLink.buster = this;
                
                // add the newLink
                //TODO: look at documentfragment approach
                this.holder.appendChild( newLink );
            
            }
        }
    
        // swap the img for the div
        this.img.parentNode.replaceChild( this.holder, this.img );

    };

    Bustify.prototype.bindEvents = function(){
        
        var that = this;
        
        that.holder.addEventListener('webkitTransitionEnd', function(event) {
            
            that.onTransitionEnd.call( event.target );
        
        }, false);
        
        that.holder.addEventListener('mouseover', function(event) {
        
            // if target is a span, explode it
            if ( event.target.tagName === "SPAN" ) {
                that.explode.call( event.target );
            }
        
        }, false);

    
        // click the holder to make everything explode
        that.holder.addEventListener('click', function() {
        
            // get all the links
            var theLinks = that.holder.childNodes;
            
            for (var i = theLinks.length - 1; i >= 0; i--){
                that.explode.call( theLinks[i] );
            }
        
        }, false);
        
    };
    
    
    Bustify.prototype.explode = function() {
    
        var randomTx = this.buster.randomNumber( -this.buster.imgW * this.buster.intensity, this.buster.imgW * this.buster.intensity ),
            randomTy = this.buster.randomNumber( -this.buster.imgW * this.buster.intensity, this.buster.imgW * this.buster.intensity ),
            randomTz = this.buster.randomNumber( -this.buster.imgW * this.buster.intensity, this.buster.imgW * this.buster.intensity ),
            randomRx = this.buster.randomNumber( -360,360 ),
            randomRy = this.buster.randomNumber( -360,360 ),
            randomRz = this.buster.randomNumber( -360,360 ),
            randomRa = this.buster.randomNumber( 0,180 );
            
        // TODO: Use Modernizer
        this.style.WebkitTransform = 'translate3d(' + randomTx + 'px, ' + randomTy + 'px, ' + randomTz + 'px)' + 'rotate3d(' + randomRx + ','+ randomRy + ',' + randomRz + ',' + randomRa + 'deg)';
    
    };
    
    Bustify.prototype.onTransitionEnd = function() {

        var that = this;
        // TODO USE MODERNIZER
        setTimeout(function() {
            that.style.WebkitTransform = 'translate3d(0,0,0)';
        }, 200);
    
    };

})();
