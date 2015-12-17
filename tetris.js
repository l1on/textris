process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');

var BoardController = require('./controllers/boardController');

var boardController = new BoardController();