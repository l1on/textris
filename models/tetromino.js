var Grids = require('../models/grids');

var Tetromino = function (shape) {
    var predefinedShapes = ['horizontal-bar', 'L', 'reverse-L', 'reverse-h', 'square'];

    if (shape == 'random') {
        shape = predefinedShapes[this._getRandomIntInclusive(0, predefinedShapes.length - 1)];
    }

	switch(shape) {
		case 'horizontal-bar':
			this.grids = new Grids({
                content_array: [
                    [true, true, true, true]
                ]
            });
    		break;

    	case 'L':
    		this.grids = new Grids({
                content_array: [
            		[true, false],
            		[true, false], 
            		[true, true]
      		    ]
            });
      		break;	

      	case 'reverse-L':
    		this.grids = new Grids({
                content_array: [
            		[false, true],
            		[false, true], 
            		[true, true]
      		    ]
            });
      		break;	 

    	case 'reverse-h':
    		this.grids = new Grids({
                content_array: [
            		[false, true],
            		[true, true], 
            		[true, false]
      		    ]
            });
      		break;	

      	case 'square':
    		this.grids = new Grids({
                content_array: [
            		[true, true],
            		[true, true],
      		    ]
            });
      		break; 

        default:
            this.grids = new Grids({content_array: shape});     	
	};
};

Tetromino.prototype.mergeTo = function(otherGrids, row, col) {
    this.grids.mergeTo(otherGrids, row, col);
};

Tetromino.prototype.canBePlacedOn = function(otherGrids, row, col) {
    return this.grids.canBePlacedOn(otherGrids, row, col);
};

Tetromino.prototype.getWidth = function() {
    return this.grids.getWidth();
};

Tetromino.prototype.getContent = function() {
    return this.grids.getContent();
};

Tetromino.prototype.rotateClockwise = function() {
    this.grids.rotateClockwise();
};

Tetromino.prototype.rotateCounterClockwise = function() {
    this.grids.rotateCounterClockwise();
};

Tetromino.prototype._getRandomIntInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = Tetromino;