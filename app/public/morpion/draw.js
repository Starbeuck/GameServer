// -------------------------- GAME VARIABLES -------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

let currentGame = new Game('morpion');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var width = 600;
var height = 600;

canvas.width = width;
canvas.height = height;

var sizeGrid;
var caseSize = width / 3;
var joueurCour = 1; // joueur reel = 1 ;; IA = 2
// var joueJoueur1 = false;

$('document').ready(function() {
  drawInitGame();
  $.post("http://localhost:1234/game", {
    typeGame: 'morpion'
  }, function(data) {
    currentGame.fromJson(JSON.stringify(data));
  });
});

canvas.addEventListener("click", function(e) {
  console.log(getActionPlayer(e));
  $.post("http://localhost:1234/game", {
    game: JSON.stringify(currentGame.toJson()),
    action: JSON.stringify(new Action(getActionPlayer(e)))
  }, function(data) {
    if (data == "ERROR") {
      console.log('error');
    }
    else {
      currentGame.fromJson(JSON.stringify(data));
      draw(currentGame.grid);
      if(currentGame.winner != 0){
        alert("joueur " + currentGame.winner + " a gagne");
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
  var x,
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
  var startCircleX = width / 6;
  var startCircleY = width / 6;

  var startCrossedX = width / 20;
  var startCrossedY = width / 20;
  var endCrossedX = 170;
  var endCrossedY = 170;

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
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
  var rect = canvas.getBoundingClientRect();
  return '{"x": ' + Math.trunc((event.clientX - rect.left) / caseSize) + ',"y": ' + Math.trunc((event.clientY - rect.top) / caseSize) + ',"currentPlayer": 1}';
}
