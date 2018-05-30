// -------------------------- IMPORTS ------------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

module.exports = nextAction;

// ------------------------ VARIABLES GLOBALES ---------------------------------
lines = 4;
// Nombre de colonnes 7
columns = 4;
var iterations;
huPlayer = "X";
aiPlayer = "I";
var prof=4; 

function nextAction(game, depth) {
  //console.log("profondeur"+depth);
  iterations =0;

  var test = getIndex(game.grid);
  console.log("cases vides" + test);
  //console.log("grille"+game.grid);
  var index = minimax(game.grid, aiPlayer,depth).index;
  console.log("index " + index);
  console.log(iterations);
  let y = (index % columns),
    x = parseInt(index / columns);

  return new Action('{"x":' + y + ', "y":' + x + ', "currentPlayer":2}');
}

function getIndex(reboard) {
  var tablibre = [];
  var col = 0;

  //parcours les colonnes et regarde la première case vide en partant du bas
  for (var col = 0; col < columns; col++) {
    for (var i = 0; i < lines; i++) {
      if (!((reboard[((i * columns) + col)] === "X") || (reboard[((i * columns) + col)] === "I"))) {
        tablibre.push((i * columns) + col);
        break;
      }
    }
  }
  return tablibre;
}

function minimax(reboard, player, depth, alpha, beta) {
  //iter++;
  //récupération des cases vides remplissables
  let array = getIndex(reboard);
 // console.log("j'arrive icii");
 // console.log(huPlayer);
  //console.log("coucou" + winning(reboard, huPlayer,depth));
  //console.log(winning(reboard, aiPlayer, depth));
  //vérifie si un des joueurs à gagné ou si tie
  if (winning(reboard, huPlayer,depth)) {
    return {score: -10};
  } else if (winning(reboard, aiPlayer, depth)) {
    return {score: 10};
  } else if (array.length === 0) {
    return {score: 0};
  }

  //initialisation d'un objet pour trouver le meilleur move
  var bestScore = {};
  bestScore.index = null;
  bestScore.score = (-99999);

  //parcours des cases vides
  for (var i = 0; i < array.length; i++) {
    var move = {};
    //on met l'index de la case en cours de vérif
    move.index = reboard[array[i]];
    //on change temporairement la valeur de la case pour récursion sur les autres cases
    reboard[array[i]] = player;
    //appel récurssif sur les autres cases
    //console.log("je suis passé par ici");
    var g = minimin(reboard, huPlayer, (depth -1), alpha, beta);
    move.score = g.score;
    iterations++;
    //si la case a un meilleur score alors on garde son score et son indice
    if (bestScore.index == null || g.score > bestScore.score) {
      bestScore.index = move.index;
      bestScore.score = g.score;
      alpha = g.score;
    }
    reboard[array[i]] = move.index;

    //pour réduire l'arbre de proba
    if (alpha >= beta) return bestScore;

    }
  return bestScore;
}

//appel à cette fonction pour jour l'humain
function minimin(reboard, player, depth, alpha, beta) {
  //iter++;
 // console.log("je suis repassés par la");
  let array = getIndex(reboard);
  if (winning(reboard, huPlayer, depth)) {
    return {score: -10};
  } else if (winning(reboard, aiPlayer, depth)) {
    return {score: 10};
  } else if (array.length === 0) {
    return {score: 0};
  }

  var bestScore = {};
  bestScore.index = null;
  bestScore.score = 99999;

  for (var i = 0; i < array.length; i++) {

    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;
    var g = minimax(reboard, aiPlayer,depth , alpha, beta);
    move.score = g.score;
    iterations++;

    if (bestScore.index == null || g.score < bestScore.score) {
      bestScore.index = move.index;
      bestScore.score = g.score;
      beta = g.score;
    }
    reboard[array[i]] = move.index;
    if (alpha >= beta) return bestScore;
    }
  return bestScore;
}

// winning combinations
function winning(reboard, player, depth) {
  // console.log("je suis la");
 var joueur ="";
  if(player =="X" ){
  joueur="X";
  }else{
  joueur="I";
  }
return (winningCol(reboard,joueur) || winningLines(reboard, joueur) || winningDiagInv(reboard, joueur) || winningDiag(reboard, joueur) || depth == 0);

}

function winningCol(reboard, player){
//console.log("je suis passé par le winning col à l'entrée");
  for (var col=0; col<columns; col++){
    for (var lin=0; lin<(lines-3); lin++){
    //  console.log("je suis passé par la boucle du winningCol");
      if(reboard[(lin*columns)+col]==player  && reboard[(lin+1)*columns +col]==player  && reboard[(lin+2)*columns+col]==player && reboard[(lin+3)*columns+col]==player){
        return true; 
      }
    }
  }
  return false;
}

function winningLines(reboard, player){
  for (var lin=0; lin<lines; lin++){
    for(var col=0; col<(columns-3); col++){
      if(reboard[lin*columns+col]==player && reboard[(lin*columns)+col+1]==player && reboard[(lin*columns)+col+2]==player && reboard[(lin*columns)+col+3]==player){
     //  console.log("coucou je suis dans les lignes et c'est un oui");
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
      if(reboard[(lin*columns)+col]==player && reboard[((lin-1)*columns)+col+1]==player && reboard[((lin-2)*columns)+col+2]==player && reboard[((lin-3)*columns)+col+3]==player){
        return true;
      }
    }
  }
  return false; 
}