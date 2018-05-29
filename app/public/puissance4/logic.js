// -------------------------- PLAY FUNCTION ------------------------------------
let play = function(game, action) {
  posePion(action.x, action.y, action.currentPlayer, game.grid);
  return game;
}

module.exports = {
  play,
  movePossible,
  gridFreeSpotLeft,
  winning
};

function movePossible(grid, action) {
  return true;
}

function gridFreeSpotLeft(grid) {
  return 1;
}





// -------------------------- GAME VARIABLES -----------------------------------
// Nombre de lignes 6
let lines = 4;
// Nombre de colonnes 7
let columns = 4;

// -------------------------- ACTIONS FUNCTIONS --------------------------------
function posePion(xMouse, yMouse, currentPlayer, grid) {
  if (!((grid[((yMouse*columns)+xMouse)]==="X") || (grid[((yMouse*columns)+xMouse)]==="I"))) {


  	if (currentPlayer==1){
		grid[((yMouse*columns)+xMouse)] = "X";
  	}else{
		grid[((yMouse*columns)+xMouse)] = "I";
  	}

 }
}
function movePossible(grid, action) {
	return true;
}
function gridFreeSpotLeft(grid) {
	return 2;
}


// -------------------------- RULE WINNING FUNCTIONS ---------------------------

// winning combinations
function winning(reboard, player) {
  // console.log("je suis la");
  return ((reboard[0] == player && reboard[5] == player && reboard[10] == player && reboard[15] == player)
  || (reboard[12] == player && reboard[9] == player && reboard[6] == player && reboard[3] == player)
  || (reboard[0] == player && reboard[1] == player && reboard[2] == player && reboard[3] == player)
  || (reboard[4] == player && reboard[5] == player && reboard[6] == player && reboard[7] == player)
  || (reboard[8] == player && reboard[9] == player && reboard[10] == player && reboard[11] == player)
  || (reboard[12] == player && reboard[13] == player && reboard[14] == player && reboard[15] == player)
  || (reboard[0] == player && reboard[4] == player && reboard[8] == player && reboard[12] == player)
  || (reboard[1] == player && reboard[5] == player && reboard[9] == player && reboard[13] == player)
  || (reboard[2] == player && reboard[6] == player && reboard[10] == player && reboard[14] == player)
  || (reboard[3] == player && reboard[7] == player && reboard[11] == player && reboard[15] == player))

}
