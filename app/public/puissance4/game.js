// -------------------------- IMPORTS ------------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

// -------------------------- GAME VARIABLES -----------------------------------

let currentGame = new Game('puissance4');
//création du plateau de jeu
let plateau= [];
//nuùéro du joueur qui joue
let turn= 1;

/* un entier:
   0: la partie continue
   -1: la partie est nulle
   1: joueur 1 a gagné
   2: joueur 2 a gagné
 */
let game_status= 0;
// Nombre de coups joués
let coups= 0;
// Nombre de lignes 6
let lines= 4;
// Nombre de colonnes 7
let columns=4;
const huPlayer="X";
const aiPlayer="I";
let iter = 0;
 const parent=document.querySelector('#jeu');
let board =[];
 const t = document.createElement('table');
  t.id = 'plateau';

// ---------------------- INITIALISATION EVENTS --------------------------------

// Chargement de la page -> création game
$('document').ready(function() {
  // On dessine le canvas vide
  drawInitGame();
  // On envoie une requête de création de partie
  $.post("http://localhost:1234/game", {
    typeGame: 'puissance4'
  }, function(data) {
    currentGame.fromJson(JSON.stringify(data));
  });
});



// -------------------------- INIT FUNCTIONS -------------------------------------
function initBoard(nbcol, nblin){
  var nbcase= 0;
  board.length=nbcol*nblin;
  for (var i=0; i<board.length; i++){
    board[i]=i;
  }

}

function drawInitGame() {
	//initialisation du board de l'ia
  initBoard(columns, lines);

  //création du plateau de jeu
  for (var i = lines - 1; i >= 0; i--) {
    var tr = document.createElement('tr');
    plateau[i] = [];
    for (var j = 0; j < columns; j++) {
      var td = document.createElement('td');
      td.dataset.column = j;
      tr.appendChild(td);
      plateau[i][j] = td;
    }
    t.appendChild(tr);
  }
  parent.appendChild(t);
}

 t.addEventListener('click', function(e) { 
 	
 	 $.post("http://localhost:1234/game", {
    // On envoie la game actuelle
    game: JSON.stringify(currentGame.toJson()),
    // On envoie l'action faite par le joueur
    action: JSON.stringify(new Action(getActionPlayer(e)))
  }, function(data) {
    // Quand on recoit la réponse

    // Si c'est une erreur
    if (data == "ERROR") {
      console.log('error');
    }
    else {

      // On a recu le nouvel état de la game qu'on stocke dans la variable
      currentGame.fromJson(JSON.stringify(data));
      // On dessine le nouvel état de la game
      draw(currentGame.grid);
      console.log(data);
      coups++;

      // Si la partie est finie, on  affiche le gagnant
      if(currentGame.winner != 0){
        if(currentGame.winner == 1){
          alert("joueur " + 1 + " a gagné");
        }
        else{
          alert("L'ordinateur a gagné :(");
        }
      }
    }
  });
});


function getActionPlayer(event) {
	var column = event.target.dataset.column;
	
	var row;
  	for (var i = 0; i < lines; i++) {
    	if (!plateau[i][column].className) {
      		row = i;
      		break;
    	}
  	}
  	if (row === undefined) {
    	window.alert("La colonne est pleine!");
    	return;
  	}	
 // 	console.log( "coordonnées pion "+row + " "+column);
  return '{"x": ' + column + ',"y": ' + row + ',"currentPlayer": 1}';
}

// function auxiliaire d'affichage
 function draw(board) {
 	for (var i=0; i<board.length; i++){
 		if(board[i]=="X"){
 			plateau[parseInt( index/columns)][index%columns].className = 'joueur1';
 		}else if (board[i]=="I"){
 			plateau[parseInt( index/columns)][index%columns].className = 'joueur2';
 		
 		}
 	}
}