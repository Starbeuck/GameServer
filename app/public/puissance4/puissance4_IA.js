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

  let test = getIndex(game.grid);
  let index = minimax(game.grid, aiPlayer,depth);

  console.log(iterations);
  let y = (index[0] % columns),
    x = parseInt(index[0] / columns);

  return [new Action('{"x":' + y + ', "y":' + x + ', "currentPlayer":2}'), iterations];
}

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

  //récupération des cases vides remplissables

  //vérifie si un des joueurs à gagné ou si tie
 if (winning(reboard, huPlayer, depth)|| winning(reboard, aiPlayer, depth)) {
    return [null, score(reboard)];
  }
  let array = getIndex(reboard);
  //initialisation d'un objet pour trouver le meilleur move
  let bestScore=[null, -99999];

  //parcours des cases vides
  for (let i = 0; i < array.length; i++) {
    let newboard=copy(reboard);
    //on met l'index de la case en cours de vérif


    //on change temporairement la valeur de la case pour récursion sur les autres cases
  
    newboard[array[i]]=player;
    //appel récurssif sur les autres cases
    //console.log("je suis passé par ici");
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

//appel à cette fonction pour jour l'humain
function minimin(reboard, player, depth, alpha, beta) {
  let array = getIndex(reboard);
  //regarde si on a un gagnant
  if (winning(reboard, huPlayer, depth)||winning(reboard, aiPlayer, depth)) {
    return [null, score(reboard)];
  }

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

function copy(board){
  var newboard=[];
  newboard.length=board.length;
  for(var i=0; i<newboard.length;i++){
    newboard[i]=board[i];
  }
  return newboard;
}




 function score(board) {
    var points = 0;
    var vertical_points = 0;
    var horizontal_points = 0;
    var diagonal_points1 = 0;
    var diagonal_points2 = 0;

    // Vertical points
  
    for (var row = 0; row < lines - 3; row++) {
        // Für jede Column überprüfen
        for (var column = 0; column < columns; column++) {
            // Die Column bewerten und zu den Punkten hinzufügen
            var score = scorePosition(board,row, column, 1, 0);
  
            if (score == 100000) return 100000;
            if (score == -100000) return -100000;
            vertical_points += score;
        }            
    }

    // Horizontal points
    for (var row = 0; row <lines; row++) {
        for (var column = 0; column < columns - 3; column++) { 
            var score = scorePosition(board,row, column, 0, 1);   
           if (score == 100000) return 100000;
            if (score == -100000) return (-100000);
            horizontal_points += score;
        } 
    }

    // Diagonal points 1 (left-bottom)
  
    for (var row = 0; row < lines- 3; row++) {
        for (var column = 0; column < columns - 3; column++) {
            var score = scorePosition(board,row, column, 1, 1);  
            if (score == 100000) return 100000;
           if (score == -100000) return (-100000);
            diagonal_points1 += score;
        }            
    }

    // Diagonal points 2 (right-bottom)

    for (var row = 3; row < lines; row++) {
        for (var column = 0; column <= columns - 4; column++) {
            var score = scorePosition(board,row, column, -1, +1);
             if (score == 100000) return 100000;
            if (score == -100000) return (-100000);
            diagonal_points2 += score;
        }

    }
    points = horizontal_points + vertical_points + diagonal_points1 + diagonal_points2;
    return points;
}

function scorePosition(board, row, column, delta_y, delta_x) {

  //  console.log("c'est re re moi");
    var human_points = 0;
    var computer_points = 0;

    // Determine score through amount of available chips
    for (var i = 0; i < 4; i++) {
        if (board[(row*columns+column)] == "X") {
            human_points++; // Add for each human chip
        } else if (board[(row*columns+column)] == "I") {
            computer_points++; // Add for each computer chip
        }
        // Moving through our board
        row += delta_y;
        column += delta_x;
    }

    // Marking winning/returning score
   if (human_points == 4) {
        // Computer won (100000)
        return (-100000);
    } else if (computer_points == 4) {
       
        return (100000);
    } else {
        // Return normal points
        return computer_points;
    }
}
