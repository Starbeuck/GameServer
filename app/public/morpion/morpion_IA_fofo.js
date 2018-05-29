// ----------------------------- IMPORTS ---------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

// ---------------------------- VARIABLES --------------------------------------

let rows = 3;
let columns = 3;

module.exports = nextAction;

function nextAction(game) {

  let grid = convertGrid(game.grid);
  let action = chooseAction(grid);

  console.log("Début IA\nVoici la grille :\n" + game.gridToString());
  console.log("Voici la grille en ligne :\n" + convertGrid(game.grid));
  console.log("Voici les cases vides :\n" + possibleMoves(grid));
  console.log("Voici le choix de l'IA:\n" + action.toString());
  console.log('score moves :\n');
  let score = scoreMoves(grid, possibleMoves(grid));
  console.log(score);

  return action
}

let convertGrid = function(grid) {
  let newGrid = new Array();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      newGrid.push(grid[i][j]);
    }
  }
  return newGrid;
}

let convertGridToArray = function(i, j) {
  return ((rows * j) + i);
}

let convertArrayToGrid = function(i) {
  return [
    Math.trunc(i / rows),
    i % rows
  ];
}

let possibleMoves = function(grid) {
  let allPossibleMoves = new Array();
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] == 0)
      allPossibleMoves.push(i);
    }
  return allPossibleMoves;
}

let scoreMoves = function(grid, allPossibleMoves) {
  let allScores = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  allPossibleMoves.forEach(function(move) {
    let newgrid = grid;
    newgrid[move] = 2;
    if (winning(newgrid, 2))
      allScores[move] += 10;
    if (winning(newgrid, 1))
      allScores[move] -= 10;

    }
  );
  return allScores;

}

let winning = function(board, player) {
  return ((board[0] == player && board[1] == player && board[2] == player)
  || (board[3] == player && board[4] == player && board[5] == player)
  || (board[6] == player && board[7] == player && board[8] == player)
  || (board[0] == player && board[3] == player && board[6] == player) || (board[1] == player && board[4] == player && board[7] == player) || (board[2] == player && board[5] == player && board[8] == player) || (board[0] == player && board[4] == player && board[8] == player) || (board[2] == player && board[4] == player && board[6] == player))
}

let chooseAction = function(grid) {
  let move = possibleMoves(grid).pop();
  let [y, x] = convertArrayToGrid(move);
  return new Action('{"x":' + x + ', "y":' + y + ', "currentPlayer":2}')
}
