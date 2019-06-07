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


var findSolution = function (row, n, board, validator, callBack) {
  if (row === n) {
    return callBack();
  } 

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
        var result = findSolution(row + 1, n, board, validator, callBack);
        if (result) {
          return result; // EJECT
        }
    }
    board.togglePiece(row, i);
  }
}

window.findNRooksSolution = function(n) {
  // create a board
  let board = new Board({n:n});
  let solution = board.rows();
  if (n < 1) {
    return solution;
  }

  findSolution(0, n, board, "hasAnyRooksConflicts", function (){
    solution = board.rows().map(row => { return row.slice();
     });
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0 ; //fixme
  let board = new Board({n:n});

  if (n < 1) {
    solutionCount++;
    return solutionCount;
  }


  findSolution(0, n, board, "hasAnyRooksConflicts", function (){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // create a board
  let board = new Board({n:n});
  let solution = board.rows();
  if (n === 2 || n === 3) {
    return solution;
  }

  findSolution(0, n, board, "hasAnyQueensConflicts", function (){
    solution = board.rows().map(row =>{ return row.slice(); });
  })
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0; //fixme
  let board = new Board({n:n});

  if (n===2 || n === 3){ // no solutions exist for a board too small
    return solutionCount;
  }

  findSolution(0, n, board, "hasAnyQueensConflicts", function (){
    solutionCount++;
  })

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
