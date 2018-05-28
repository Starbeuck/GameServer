const Game = require('../Game.js');
const Action = require('../Action.js');

var rows = 3;
var columns = 3;

var nextAction = function(game) {
  console.log("Début IA\nVoici la grille :\n"+game.gridToString());
  var grid = convertGrid(game.grid);
  console.log("Voici la grille en ligne :\n"+convertGrid(game.grid));
  console.log("Voici les cases vides :\n"+possibleMoves(grid));
  var action = chooseAction(grid);
  console.log("Voici le choix de l'IA:\n"+action.toString());
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

var chooseAction = function(grid){
  var move= possibleMoves(grid).pop();
  var [y,x] = convertArrayToGrid(move);
  return new Action('{"x":'+x+', "y":'+y+', "currentPlayer":2}')
}

module.exports = nextAction;
