var Board = require('../models/board');
var BoardView = require('../views/boardView');
var Tetromino = require('../models/tetromino');

var BoardController = function() {
	ENTER = '\r';
	CTRL_C = '\u0003';
	LEFT = 'a';
	RIGHT = 'd';
	CLOCKWISE = 's';
	COUNTER_CLOCKWISE = 'w';

	this.board = new Board(20, 20);
	this.boardView = new BoardView(this.board);

	var self = this;
	process.stdin.on('data', function (command) {
		switch(command) {
			case LEFT:
				if(!self.move(self.board.canMoveTetrominoLeft, self.board.moveTetrominoLeft)) return;
				break;
			case RIGHT:
				if(!self.move(self.board.canMoveTetrominoRight, self.board.moveTetrominoRight)) return;
				break;
			case CLOCKWISE:
				if(!self.move(self.board.canRotateTetrominoClickwise, self.board.rotateTetrominoClickwise)) return;
				break;
			case COUNTER_CLOCKWISE:
				if(!self.move(self.board.canRotateTetrominoCounterClockwise, self.board.rotateTetrominoCounterClockwise)) return;
				break;
			case ENTER:
				break;
			case CTRL_C:
				process.exit();
			default:
				return;
		}
	
		self.moveTetrominoDown();
	});
}

BoardController.prototype.moveTetrominoDown = function() {
	if (this.board.canMoveTetrominoDown()) {
		this.board.moveTetrominoDown();
	} else {
		this.board.solidifyTetromino();
		if(!this.board.injectTetromino()) {
			this.boardView.showOver();
			process.exit();
		}		
	}

	this.boardView.render();
} 

BoardController.prototype.move = function(canMove, move) {
	if(canMove.call(this.board)) {
		move.call(this.board);
	} else {
		this.boardView.showInvalidMove();
		return false;			
	}
	return true;
}

module.exports = BoardController;