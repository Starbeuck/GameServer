'use strict';

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
	let caseOccupee = ((grid[(action.y*columns+action.x)] ==="X") || (grid[(action.y*columns+action.x)] ==="I") );
  	let caseExistante = (grid[(action.y*columns+action.x)] != undefined);
  	return ((!caseOccupee) && (caseExistante));
}

function gridFreeSpotLeft(grid) {
	var nbFreeSpot = 0;
	for(var x=0; x<grid.length; x++){
		if (grid[x]!="X" && grid[x]!="I"){
			nbFreeSpot++;
		}
	}
	return nbFreeSpot;
}


// -------------------------- GAME VARIABLES -----------------------------------
// Nombre de lignes 6
let lines = 6;
// Nombre de colonnes 7
let columns = 7;

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



// -------------------------- RULE WINNING FUNCTIONS ---------------------------

// winning combinations
function winning(reboard, player, depth) {
  // console.log("je suis la");
  var joueur="";
  if(player==1){
  	joueur=="X";
  }else{
  	joueur="I";
  }
  return (winningCol(reboard,joueur) || winningLines(reboard, joueur) || winningDiagInv(reboard, joueur) || winningDiag(reboard, joueur) || depth == 0);

}

function winningCol(reboard, player){

	for (var col=0; col<columns; col++){
		for (var lin=0; lin<(lines-3); lin++){
			if(reboard[((lin*columns)+col)]==player  && reboard[(lin+1)*columns +col]==player  && reboard[(lin+2)*columns+col]==player && reboard[(lin+3)*columns+col]==player){
				return true;
			}
		}
	}
	return false;
}

function winningLines(reboard, player){
	for (var lin=0; lin<lines; lin++){
		for(var col=0; col<(columns-3); col++){
			if(reboard[lin*columns+col]==player && reboard[(lin*columns)+col+1]==player && reboard[(lin*columns)+col+2]==player && reboard[(lin*columns)+col+3]== player){
				return true;
			}
		}
	}
	return false;
}

function winningDiag(reboard, player){
	for(var col=0; col<(columns-3); col++){
		for(var lin=0; lin<(lines-3); lin++){
			if( reboard[(lin*columns)+col]==player && reboard[((lin+1)*columns)+col+1]==player && reboard[((lin+2)*columns)+col+2]==player && reboard[((lin+3)*columns)+col+3]==player){
				return true;
			}
		}
	}
	return false;
}

function winningDiagInv(reboard, player){
	for(var col=0; col<(columns-3);col++){
		for(var lin=(lines-1);lin>(lines-4);lin--){
			if(reboard[(lines*columns)+col]==player && reboard[((lines-1)*columns)+col+1]==player && reboard[((lines-2)*columns)+col+2]==player && reboard[((lines-3)*columns)+col+3]==player){
				return true;
			}
		}
	}
	return false;
}
