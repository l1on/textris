var Grids = function(options) {
	var width, height;

	if (options.content_array) {
		width = options.content_array[0].length;
		height = options.content_array.length;
	} else {
		width = options.width;
		height = options.height;
	}

	this.content = [];	
	
	for(var i = 0; i < height; i++) {
		var row = [];	
		
		for (var j = 0; j < width; j++) {
			var element;
			
			if(options.content_array) {
				element = options.content_array[i][j];
			} else {
				element = false;		
			}
			row.push(element);
		}
		
		this.content.push(row);
	}
};

Grids.prototype.getContent = function() {
	return this.content;
};

Grids.prototype.getHeight = function() {
	return this.content.length;
};

Grids.prototype.getWidth = function() {
	return this.content[0].length;
};

Grids.prototype.forEach = function(callback) {
    for(var i = 0; i < this.getHeight(); i++) {
        for(var j = 0; j < this.getWidth(); j++) {
            if (callback.call(this, i, j, this.getContent()[i][j]) === false) return false;
        }
    }
    return true;
};

Grids.prototype.mergeTo = function(otherGrids, row, col) {
	this.forEach(function(i, j, grid) {
		otherGrids.getContent()[row + i][col + j] = grid || otherGrids.getContent()[row + i][col + j];
	});
};

Grids.prototype.canBePlacedOn = function(otherGrids, row, col) {
	return this.forEach(function(i, j, grid) {
		if (otherGrids.getContent()[row + i] === undefined || otherGrids.getContent()[row + i][col + j] === undefined || (otherGrids.getContent()[row + i][col + j] && grid)) {
			return false;
		}		
	});
};

Grids.prototype.rotateClockwise = function() {
	this._rotate(function(i, j) {
		return this.getContent()[this.getHeight() - j - 1][i];
	});
};

Grids.prototype.rotateCounterClockwise = function() {
	this._rotate(function(i, j) {
		return this.getContent()[j][this.getWidth() - i - 1];
	});
};

Grids.prototype._rotate = function(callback) {
	var rotated = [];

	for(var i = 0; i < this.getWidth(); i++) {
		rotated[i] = [];
		
		for(var j = 0; j < this.getHeight(); j++) {
			rotated[i][j] = callback.call(this, i, j);
		}
	}

	this.content = rotated;	
}

module.exports = Grids;