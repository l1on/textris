##	How to run

1. This implementation is written in Nodejs. So please make sure Nodejs is installed on your system.

2. To run the program in your terminal, under the directory where the tetris.js resides, type ```node tetris```.


##	Architecture overview


First, on the algorithm side: this implementation, on its most fundamental level, views the Tetris game simply as the rotation of one set of 2D grids and the avoidance of the overlapping between two sets of 2D grids.  

Second, on the engineering side: this implementation adopts the MVC pattern. 


##	File descriptions


1. tetris.js -- entry point of the program. It spins up the BoardController and that's it.

2. controllers/boardController.js -- the equivalence of the 'main' function in C. The implementer of the rule of the game. It receives user input and then dispatches the call (user input) to the appropriate methods on the Board model. It also knows when to display the board and when to show an error to the user.

3. views/boardView.js -- its responsiblity is just to give a text style representation of the state of the board when itself is called on duty.

4. models/grids.js -- the one that underpins the whole system. The grids is a M * N 2D array with either TRUE of FALSE as the value for each element of the array. TRUE repsents a solid block. FALSE means an empty space. The core logics, which include rotation and overlapping detection, are all contained in the Grids model. The model also uses the techniche of function passing to reduce code duplication.

5. models/tetromino.js -- the Tetromino model is basically a wrapper around the Grids model. Its main purpose is to provide a set of predefined grids specifically for the game.

6. models/board.js -- the workhorse of the whole program. Its main job is to spawn a new tetromino appropirately and signals when a new tetromino cannot be spawned. Actually, even though it has lots of other methods, most of them are just delegations (to the Tetromino, which in turn delegates to the real workhorse - the Grids).