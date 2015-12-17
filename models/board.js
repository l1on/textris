var Grids = require('../models/grids');
var Tetromino = require('../models/tetromino');

var Board = function(width, height) {
	this.grids = new Grids({
		width: width, 
		height: height
	});

	this.injectTetromino();
};

Board.prototype.injectTetromino = function() {
	this.tetromino = new Tetromino('random');

	this.tetrominoRow = 0;
	this.tetrominoCol = this._getRandomIntInclusive(0, this.getWidth() - 1);

	this._makeTetrominoInsideRightBoundary();

	return this.canPlaceTetromino();
};

Board.prototype.moveTetrominoDown = function() {
	this.tetrominoRow++;
};

Board.prototype.moveTetrominoLeft = function() {
	this.tetrominoCol--;
};

Board.prototype.moveTetrominoRight = function() {
	this.tetrominoCol++;
};

Board.prototype.rotateTetrominoClickwise = function() {
	this.getTetromino().rotateClockwise();
};

Board.prototype.rotateTetrominoCounterClockwise = function() {
	this.getTetromino().rotateCounterClockwise();
};

Board.prototype.canRotateTetrominoClickwise = function() {
	return this._canRotateTetromino(function(tetromino) {
		tetromino.rotateClockwise();
	});
};

Board.prototype.canRotateTetrominoCounterClockwise = function() {
	return this._canRotateTetromino(function(tetromino) {
		tetromino.rotateCounterClockwise();
	});
};

Board.prototype.canMoveTetrominoDown = function() {
	return this.getTetromino().canBePlacedOn(this.grids, this.getTetrominoRow() + 1, this.getTetrominoCol()); 
};

Board.prototype.canMoveTetrominoRight = function() {
	return this.getTetromino().canBePlacedOn(this.grids, this.getTetrominoRow(), this.getTetrominoCol() + 1);
};

Board.prototype.canMoveTetrominoLeft = function() {
	return this.getTetromino().canBePlacedOn(this.grids, this.getTetrominoRow(), this.getTetrominoCol() - 1);
};

Board.prototype.canPlaceTetromino = function() {
	return this.getTetromino().canBePlacedOn(this.grids, this.getTetrominoRow(), this.getTetrominoCol());
};

Board.prototype.solidifyTetromino = function() {
	this.getTetromino().mergeTo(this.grids, this.getTetrominoRow(), this.getTetrominoCol());
};

Board.prototype.getHeight = function() {
	return this.grids.getHeight();
};

Board.prototype.getWidth = function() {
	return this.grids.getWidth();
};

Board.prototype.getContent = function() {
	return this.grids.getContent();
};

Board.prototype.getTetromino = function() {
	return this.tetromino;
};

Board.prototype.getTetrominoRow = function() {
	return this.tetrominoRow;
};

Board.prototype.getTetrominoCol = function() {
	return this.tetrominoCol;
};

Board.prototype._makeTetrominoInsideRightBoundary = function() {
	var delta = this.getTetrominoCol() + this.getTetromino().getWidth() - this.getWidth();
	if (delta > 0) {
		this.tetrominoCol -= delta;
	}
};

Board.prototype._canRotateTetromino = function(rotate) {
	var tetrominoCopy = new Tetromino(this.getTetromino().getContent());

	rotate(tetrominoCopy);

	return tetrominoCopy.canBePlacedOn(this.grids, this.getTetrominoRow(), this.getTetrominoCol());
};

Board.prototype._getRandomIntInclusive = function(min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = Board;