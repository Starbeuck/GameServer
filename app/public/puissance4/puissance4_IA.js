"use strict"
// -------------------------- IMPORTS ------------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

module.exports = nextAction;

// ------------------------ letIABLES GLOBALES ---------------------------------
let lines = 6;
// Nombre de colonnes 7
let columns = 7;
let iterations;
let huPlayer = "X";
let aiPlayer = "I";


function nextAction(game, depth) {
  iterations =0;

  let index = minimax(game.grid, aiPlayer,depth);

  let y = (index[0] % columns),
    x = parseInt(index[0] / columns);

  return [new Action('{"x":' + y + ', "y":' + x + ', "currentPlayer":2}'),iterations];
}

//retourne un table contenant les indice des cases jouables
function getIndex(reboard) {
  let tablibre = [];
  let col = 0;
  //parcours les colonnes et regarde la première case vide en partant du bas
  for (let col = 0; col < columns; col++) {
    for (let i = 0; i < lines; i++) {
      if (!((reboard[((i * columns) + col)] === "X") || (reboard[((i * columns) + col)] === "I"))) {
        tablibre.push((i * columns) + col);
        break;
      }
    }
  }
  return tablibre;
}

function minimax(reboard, player, depth, alpha, beta) {

  //vérifie si un des joueurs à gagné ou si tie
 if (winning(reboard, huPlayer, depth)|| winning(reboard, aiPlayer, depth)) {
    return [null, score(reboard)];
  }
  //récupération des cases vides remplissables
  let array = getIndex(reboard);

  //initialisation d'un objet pour trouver le meilleur move
  let bestScore=[null, -99999];

  //parcours des cases vides
  for (let i = 0; i < array.length; i++) {
    let newboard=copy(reboard);

    //on change la valeur de la case pour récursion sur les autres cases
    newboard[array[i]]=player;

    //appel récurssif sur les autres cases
    let g = minimin(newboard, huPlayer, (depth -1), alpha, beta);
  
    iterations++;
    //si la case a un meilleur score alors on garde son score et son indice
    if (bestScore[0]== null || g[1] > bestScore[1]) {
      bestScore[0] = array[i];
      bestScore[1] = g[1];
      alpha = g[1];
    }
    //pour réduire l'arbre de proba
    if (alpha >= beta) return bestScore;
  }

  return bestScore;
}

//appel à cette fonction pour jouer l'humain
function minimin(reboard, player, depth, alpha, beta) {

  //regarde si on a un gagnant
  if (winning(reboard, huPlayer, depth)||winning(reboard, aiPlayer, depth)) {
    return [null, score(reboard)];
  }

  //récupération des cases vides remplissables
  let array = getIndex(reboard);

  let leastScore=[null,99999];
  //parcours des cases jouables
  for (let i = 0; i < array.length; i++) {

    let newboard=copy(reboard);
    let valcase = reboard[array[i]];

    newboard[array[i]]=player;
    let g = minimax(newboard, aiPlayer,(depth -1), alpha, beta);

    iterations++;

    if (leastScore[0] == null || g[1] < leastScore[1]) {
      leastScore[0] = array[i];
      leastScore[1] = g[1];
      beta = g[1];
    }
    if (alpha >= beta) return leastScore;
  }
  return leastScore;
}

// winning combinaisons
function winning(reboard, player, depth) {
 let joueur ="";
  if(player =="X" ){
    joueur="X";
  }else{
    joueur="I";
  }
return (winningCol(reboard,joueur) || winningLines(reboard, joueur) || winningDiagInv(reboard, joueur) || winningDiag(reboard, joueur) || depth == 0);

}

//regarde la combinaisons gagnantes des colonnes
function winningCol(reboard, player){
  for (let col=0; col<columns; col++){
    for (let lin=0; lin<(lines-3); lin++){

      if(reboard[(lin*columns)+col]==player  && reboard[(lin+1)*columns +col]==player  && reboard[(lin+2)*columns+col]==player && reboard[(lin+3)*columns+col]==player){
        return true;
      }
    }
  }
  return false;
}

//regarde si combinaisons gagnantes lignes 
function winningLines(reboard, player){
  for (let lin=0; lin<lines; lin++){
    for(let col=0; col<(columns-3); col++){
      if(reboard[lin*columns+col]==player && reboard[(lin*columns)+col+1]==player && reboard[(lin*columns)+col+2]==player && reboard[(lin*columns)+col+3]==player){
        return true;
      }
    }
  }
  return false;
}

//regarde si combinaisons gagnantes diagonales
function winningDiag(reboard, player){
  for(let col=0; col<(columns-3); col++){
    for(let lin=0; lin<(lines-3); lin++){
      if( reboard[(lin*columns)+col]==player && reboard[((lin+1)*columns)+col+1]==player && reboard[((lin+2)*columns)+col+2]==player && reboard[((lin+3)*columns)+col+3]==player){
        return true;
      }
    }
  }
  return false;
}

//regarde si combinaisons gagnantes inversées
function winningDiagInv(reboard, player){
  for(let col=0; col<(columns-3);col++){
    for(let lin=(lines-1);lin>(lines-4);lin--){
      if(reboard[(lin*columns)+col]==player && reboard[((lin-1)*columns)+col+1]==player && reboard[((lin-2)*columns)+col+2]==player && reboard[((lin-3)*columns)+col+3]==player){
        return true;
      }
    }
  }
  return false;
}

// recopie le tableau pour ne pas modifier le tableau initial
function copy(board){
  var newboard=[];
  newboard.length=board.length;
  for(var i=0; i<newboard.length;i++){
    newboard[i]=board[i];
  }
  return newboard;
}

 //compte le score du joueur actuel 
function score(board) {
  let points = 0, colpoints = 0,  linepoints = 0, diagpoints = 0, diaginvpoints = 0;

  // pour les colonnes
   for (let row = 0; row < lines - 3; row++) {
    for (let column = 0; column < columns; column++) {
      let score = scorePosition(board,row, column, 1, 0);
      if (score == 100) return 100;
      if (score == -100) return -100;
      colpoints += score;
    }            
  }

    // Horizontal
    for (let row = 0; row <lines; row++) {
      for (let column = 0; column < columns - 3; column++) { 
        let score = scorePosition(board,row, column, 0, 1);   
        if (score == 100) return 100;
        if (score == -100) return (-100);
        linepoints += score;
        } 
    }

    // Diagonales
    for (let row = 0; row < lines- 3; row++) {
        for (let column = 0; column < columns - 3; column++) {
          let score = scorePosition(board,row, column, 1, 1);  
          if (score == 100) return 100;
          if (score == -100) return (-100);
          diagpoints += score;
        }            
    }

    // calcul des diag inversées
    for (let row = 3; row < lines; row++) {
        for (let column = 0; column <= columns - 4; column++) {
          let score = scorePosition(board,row, column, -1, +1);
          if (score == 100) return 100;
          if (score == -100) return (-100);
          diaginvpoints += score;
        }
    }
    points = colpoints + linepoints + diagpoints + diaginvpoints;
    return points;
}

//calcul le nombre de pions alignés par le joueur par ligne col ou diag
function scorePosition(board, row, column, delta_y, delta_x) {
  var huPoints = 0;
  var IAPoints = 0;
    //calcul du score  pour chaque ligne ou colonne ou diagonale
  for (var i = 0; i < 4; i++) {
    if (board[(row*columns+column)] == "X") {
      huPoints++; 
    } else if (board[(row*columns+column)] == "I") {
      IAPoints++; 
    }
  //déplacement dans la ligne/col/diag
    row += delta_y;
    column += delta_x;
  }

    //regarde le score final
  if (huPoints== 4) {
    return (-100);
  } else if (IAPoints == 4) {   
    return (100);
  } else {
    return IAPoints;
  }
}
