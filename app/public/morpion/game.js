// -------------------------- IMPORTS ------------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

// -------------------------- GAME VARIABLES -----------------------------------

let currentGame = new Game('morpion');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let width = 600;
let height = 600;

canvas.width = width;
canvas.height = height;

let sizeGrid;
let caseSize = width / 3;
let joueurCour = 1; // joueur reel = 1 ; IA = 2

// ---------------------- INITIALISATION EVENTS --------------------------------

// Chargement de la page -> création game
$('document').ready(function() {
  // On dessine le canvas vide
  drawInitGame();
  // On envoie une requête de création de partie
  $.post("http://localhost:1234/game", {
    typeGame: 'morpion'
  }, function(data) {
    currentGame.fromJson(JSON.stringify(data));
  });
});

// Click sur une case -> envoi de l'action
canvas.addEventListener("click", function(e) {
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

// -------------------------- INIT FUNCTIONS -------------------------------------
function drawInitGame() {

  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#F0F0F0'; // set canvas' background color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // now fill the canvas
  let x,
    y;
  for (x = 0; x <= width; x += width / 3) {
    for (y = 0; y <= height; y += height / 3) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

    }
  }
  sizeGrid = 3;
}
// -------------------------- DRAW FUNCTIONS -------------------------------------
function draw(grid) {
  console.log('je dessing ', grid);

  ctx.lineWidth = "5";
  let startCircleX = width / 6;
  let startCircleY = width / 6;

  let startCrossedX = width / 20;
  let startCrossedY = width / 20;
  let endCrossedX = 170;
  let endCrossedY = 170;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === 1) {
        circle(startCircleX, startCircleY);
      }
      if (grid[i][j] === 2) {
        crossed(startCrossedX, startCrossedY, endCrossedX, endCrossedY);
      }
      startCircleX += caseSize;
      startCrossedX += caseSize;
      endCrossedX += caseSize;
    }
    startCrossedY += caseSize;
    startCircleY += caseSize;
    endCrossedY += caseSize;

    startCircleX = width / 6;
    startCrossedX = width / 20;
    endCrossedX = 170;
  }
}

function circle(xCenter, yCenter) {
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.arc(xCenter, yCenter, 70, 0, 2 * Math.PI);
  ctx.stroke();
}

function crossed(xStart, yStart, xEnd, yEnd) {
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
  ctx.moveTo(xStart, yEnd);
  ctx.lineTo(xEnd, yStart);
  ctx.stroke();
}

function getActionPlayer(event) {
  let rect = canvas.getBoundingClientRect();
  return '{"x": ' + Math.trunc((event.clientX - rect.left) / caseSize) + ',"y": ' + Math.trunc((event.clientY - rect.top) / caseSize) + ',"currentPlayer": 1}';
}