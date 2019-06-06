/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  // create a board
  var board = new Board({n:n});
  //var storeSolutions = [];

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasRowConflictAt(row) || board.hasColConflictAt(col))
      board.togglePiece(row, col);  
    }
  }
  

  
   solution = board.rows();
  // [0, 1, 1]
  // [1, 1, 0]
  // [1, 0, 1]

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0 ; //fixme
  var board = new Board({n:n});

  if(n < 1) {
    solutionCount++;
    return solutionCount;
  }


  var checkBoard = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row,i);
      if(!board.hasAnyRooksConflicts()) {
        checkBoard(row+1, i)
      }
      board.togglePiece(row,i);
    }
  }

  checkBoard(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});

  if (n===2 || n === 3){ // no solutions exist for a board too small
    return solutionCount;
  }

  // write a function that will look through each spot on a particular row
    var checkBoard = function(row) {
      // base case: if we have reached at the end of the board
      if (row === n) {
        solutionCount++;
        return;
      }
      // check if placing a Queen there would create a conflict
      // by iterating through board
      for (var i = 0; i < n; i++) {
        // toggle each piece
        board.togglePiece(row, i);
        // check for conflict
        if (!board.hasAnyQueensConflicts()) {
        // if it does not create a conflict, advance row
          checkBoard(row + 1, i);
        }
        // toggle that piece back to off
        board.togglePiece(row, i);
      }
    }
  
  checkBoard(0); // start a row 0

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
