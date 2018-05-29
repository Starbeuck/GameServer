'use strict';
// -------------------------- IMPORTS ------------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

module.exports = nextAction;

// ------------------------ VARIABLES GLOBALES ---------------------------------
var lines = 4;
// Nombre de colonnes 7
var columns = 4;
var huPlayer = "X";
var aiPlayer = "I";

function nextAction(game, depth) {
  var test = getIndex(game.grid);
  console.log("cases vides" + test);
  var index = minimax(game.grid, aiPlayer,depth).index;
  console.log("index " + index);
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
  bestScore.score = -99999;

  //parcours des cases vides
  for (var i = 0; i < array.length; i++) {
    var move = {};
    //on met l'index de la case en cours de vérif
    move.index = reboard[array[i]];
    //on change temporairement la valeur de la case pour récursion sur les autres cases
    reboard[array[i]] = player;
    //appel récurssif sur les autres cases
    var g = minimin(reboard, huPlayer, depth-1, alpha, beta);
    move.score = g.score;

    //si la case a un meilleur score alors on garde son score et son indice
    if (bestScore.index == null || g.score > bestScore.score) {
      bestScore.index = move.index;
      bestScore.score = g.score;
      alpha = g.score;
    }
    reboard[array[i]] = move.index;

    //pour réduire l'arbre de proba
    if (alpha >= beta)
      return g;

    }
  return bestScore;
}

//appel à cette fonction pour jour l'humain
function minimin(reboard, player, depth, alpha, beta) {
  //iter++;
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
    var g = minimax(reboard, aiPlayer, depth-1, alpha, beta);
    move.score = g.score;

    if (bestScore.index == null || g.score < bestScore.score) {
      bestScore.index = move.index;
      bestScore.score = g.score;
      beta = g.score;
    }
    reboard[array[i]] = move.index;
    if (alpha >= beta)
      return g;
    }
  return bestScore;
}

// winning combinations
function winning(reboard, player, depth) {
// console.log("je suis la");
if (
  (reboard[0]==player && reboard[5]==player && reboard[10]==player && reboard[15]==player )||
  (reboard[12]==player && reboard[9]==player && reboard [6]==player && reboard[3]==player)||
  (reboard[0]==player && reboard[1]==player && reboard[2]==player && reboard[3]==player)||
  (reboard[4]==player && reboard[5]==player && reboard[6]==player && reboard[7]==player)||
  (reboard[8]==player && reboard[9]==player && reboard[10]==player && reboard[11]==player)||
  (reboard[12]==player && reboard[13]==player && reboard[14]==player && reboard[15]==player)||
  (reboard[0]==player && reboard[4]==player && reboard[8]==player && reboard[12]==player )||
  (reboard[1]==player && reboard[5]==player && reboard[9]==player && reboard[13]==player)||
  (reboard[2]==player && reboard[6]==player && reboard[10]==player && reboard[14]==player)||
  (reboard[3]==player && reboard[7]==player && reboard[11]==player && reboard[15]==player)||
  depth==0//encore des lignes
  ) {
  return true;
} else {
  return false;
}
}
