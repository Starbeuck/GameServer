const Game = require('../Game.js');
const Action = require('../Action.js');

var rows = 3;
var columns = 3;

var nextAction = function(game) {
  console.log("Début IA\nVoici la grille :\n"+game.gridToString());
  console.log("Voici la grille en ligne :\n"+convertGrid(game.grid));
  console.log("Voici les cases vides :\n"+possibleMoves(grid));
  console.log("Voici le choix de l'IA:\n"+action.toString());



  var grid = convertGrid(game.grid);
  var action = chooseAction(grid);
  return action
}

var convertGrid = function(grid){
  var newGrid = new Array();
  for(var i=0; i<rows; i++){
    for(var j=0; j<columns; j++){
      newGrid.push(grid[i][j]);
    }
  }
  return newGrid;
}

var convertGridToArray = function(i, j){
  return ((rows*j)+i);
}

var convertArrayToGrid = function(i){
  return [Math.trunc(i/rows), i%rows];
}

var possibleMoves = function(grid){
  var allPossibleMoves = new Array();
  for(var i=0; i<grid.length; i++){
    if(grid[i]==0) allPossibleMoves.push(i);
  }
  return allPossibleMoves;
}

  var scoreMoves = function(grid, allPossibleMoves){
  var allScores = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  allPossibleMoves.forEach(function(move){
    var newgrid = grid;
    newgrid[move] = 2;
    if (winning(newGrid, 2)) allScores[move] += 10;
    if (winning(newGrid, 1)) allScores[move] -= 10;

  });
  console.log('voici les scores associés aux moves : ' + allScores);

}

var winning = function(board, player){
    return (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player))
    )

var chooseAction = function(grid){
  var move= possibleMoves(grid).pop();
  var [y,x] = convertArrayToGrid(move);
  return new Action('{"x":'+x+', "y":'+y+', "currentPlayer":2}')
}

module.exports = nextAction;
