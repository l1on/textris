var Grids = require('../models/grids');

var BoardView = function(board) {
	this.board = board;
	this.render();
}

BoardView.prototype.render = function() {
	var boardGridsCopy = this._getBoardGridsCopy();

	this._overlayActiveTetrominoOnTopOf(boardGridsCopy);

	this._clearScreen();

	this._printGridsHorizontalBoundary(boardGridsCopy);
	
	this._printGridsAndSideBoundaries(boardGridsCopy);

	this._printGridsHorizontalBoundary(boardGridsCopy);

	this._showPrompt();
} 

BoardView.prototype.showInvalidMove = function() {
	process.stdout.write('\rINVALID MOVE!');
}

BoardView.prototype.showOver = function() {
	process.stdout.write('\rGAME OVER!');
}

BoardView.prototype._getBoardGridsCopy = function() {
	return new Grids({
		content_array: this.board.getContent()
	});
}

BoardView.prototype._overlayActiveTetrominoOnTopOf = function(grids) {
	this.board.getTetromino().mergeTo(grids, this.board.getTetrominoRow(), this.board.getTetrominoCol());	
}

BoardView.prototype._clearScreen = function() {
	process.stdout.write("\033[2J\033[0;0f");
}

BoardView.prototype._printGridsAndSideBoundaries = function(grids) {
	grids.forEach(function(i, j, grid) {
		if (j === 0) {
			process.stdout.write('|');
		}
		if (grid) {
			process.stdout.write('*');
		} else {
			process.stdout.write(' ');
		}
		if ((j + 1) % grids.getWidth() === 0) {
			process.stdout.write('|\n');
		}
	});	
}

BoardView.prototype._printGridsHorizontalBoundary = function(grids) {
	process.stdout.write(' ');
	for(var i = 0; i < grids.getWidth(); i++) {
		process.stdout.write('-');
	}
	process.stdout.write('\n');
}

BoardView.prototype._showPrompt = function() {
	console.log("(NOTE: Make sure your window is high enough in order to see the board with its four sides)");
	console.log('');
	console.log("'A': Move the tetromino left");
	console.log("'D': Move the tetromino right");
	console.log("'W': Rotate the tetromino counter-clockwise");
	console.log("'S': Rotate the tetromino clockwise");
	console.log("ENTER: Let the tetromino fall by itself");
	console.log('');
	console.log("Press the above five keys to play...");
}

module.exports = BoardView;