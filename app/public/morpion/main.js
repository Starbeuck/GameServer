// -------------------------- GAME VARIABLES -------------------------------------

const Game = require('../../Game.js');
const Action = require('../../Action.js');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var width =600;
var height = 600;
canvas.width=width;
canvas.height=height;

var sizeGrid;
var caseSize = width/3;
var joueurCour = 2; // joueur reel = 1 ;; IA = 2
var joueJoueur1 = false;

// -------------------------- INIT FUNCTIONS -------------------------------------
function drawInitGame(){
  ctx.fillStyle = '#F0F0F0'; // set canvas' background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
  var x, y;
  for (x=0;x<=width;x+=width/3) {
      for (y=0;y<=height;y+=height/3) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();

      }
  }
  sizeGrid = 3;
  //initGrid(sizeGrid);
}


function initGrid(sizeGrid){
    grid = new Array(sizeGrid);
    for (var i=0; i<grid.length; i++){
        grid[i] = new Array(sizeGrid);
    }

    for (var i=0; i<grid.length; i++){
        for (var j=0; j<grid.length; j++){
            grid[i][j] = 0;
        }
    }
    return grid;
}

// -------------------------- ACTIONS FUNCTIONS -------------------------------------

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function posePion(xMouse, yMouse, currentPlayer, grid){

    var colonne = Math.trunc(xMouse/caseSize);
    var ligne = Math.trunc(yMouse/caseSize);

    if (grid[ligne][colonne] === 0){
        grid[ligne][colonne] = currentPlayer;
        if(currentPlayer === 1){
            joueJoueur1 = true;
        }
        else{
            joueJoueur1 = false;
        }
    }

}



// -------------------------- DRAW FUNCTIONS -------------------------------------
function draw(grid){
    ctx.lineWidth = "5";
    var startCircleX = width/6;
    var startCircleY = width/6;

    var startCrossedX = width/20;
    var startCrossedY = width/20;
    var endCrossedX = 170;
    var endCrossedY = 170;

    for(var i=0; i<grid.length; i++){
        for (var j=0; j<grid.length; j++) {
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

        startCircleX = width/6;
        startCrossedX = width/20;
        endCrossedX = 170;
    }
}

function circle(xCenter, yCenter){
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, 70, 0, 2 * Math.PI);
    ctx.stroke();
}

function crossed(xStart, yStart, xEnd, yEnd){
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(xStart,yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
    ctx.moveTo(xStart, yEnd);
    ctx.lineTo(xEnd, yStart);
    ctx.stroke();
}


// -------------------------- RULE WINNING FUNCTIONS -------------------------------------
function alignHorizon(grid, currentPlayer){
    var colCour = 0;
    var lignCour = 0;
    var counter = 0;
    var found = false;
    while (lignCour<grid.length && !found){
        while(colCour<grid.length-1 && !found){
            if(grid[lignCour][colCour] === currentPlayer &&  grid[lignCour][colCour+1] === currentPlayer){
                counter++;
            }
            if(counter === grid.length-1){
                found = true;
            }
            colCour++;
        }
        colCour = 0;
        counter = 0;
        lignCour++;
    }
    return found;
}

function alignVert(grid, currentPlayer){
    var colCour = 0;
    var lignCour = 0;
    var counter = 0;
    var found = false;
    while (colCour<grid.length && !found){
        while(lignCour<grid.length-1 && !found){
            if(grid[lignCour][colCour] === currentPlayer &&  grid[lignCour+1][colCour] === currentPlayer){
                counter++;
            }
            if(counter === grid.length-1){
                found = true;
            }
            lignCour++;

        }
        lignCour = 0;
        counter = 0;
        colCour++;

    }
    return found;
}

function alignDiagDesc(grid, currentPlayer){
    var colCour = 0;
    var lignCour = 0;
    var counter = 0;
    var found = false;
    while (colCour<grid.length-1 && lignCour<grid.length-1 && !found) {
        if (grid[lignCour][colCour] === currentPlayer && grid[lignCour + 1][colCour + 1] === currentPlayer) {
            counter++;
        }
        if (counter === grid.length-1) {
            found = true;
        }
        lignCour++;
        colCour++;
    }
    return found;
}

function alignDiagMont(grid, currentPlayer){
    var colCour = 0;
    var lignCour = 2;
    var counter = 0;
    var found = false;
    while (colCour<grid.length-1 && lignCour>0 && !found) {
        if (grid[lignCour][colCour] === currentPlayer && grid[lignCour - 1][colCour + 1] === currentPlayer) {
            counter++;
        }
        if (counter === grid.length-1) {
            found = true;
        }
        lignCour--;
        colCour++;
    }
    return trouve;
}

function won(grid, currentPlayer){
  return (alignVert(grid, currentPlayer) || alignHorizon(grid, currentPlayer) || alignDiagDesc(grid, currentPlayer) || alignDiagMont(grid, currentPlayer));
}



// -------------------------- STATE FUNCTION -------------------------------------
function afficheEtat(grid, currentPlayer){
    console.log("joueur courant est : " + currentPlayer);
    for (var i=0; i<grid.length; i++){
        for (var j=0; j<grid.length; j++){
            console.log("ligne : "+i+" colonne : "+j+ " == " + grid[i][j]);
        }
    }
    console.log("\n =============== \n\n");
}

// -------------------------- PLAY FUNCTION -------------------------------------
var play = function(game, action){
    posePion(action.x, action.y, action.currentPlayer, game.grid);
    draw(game.grid);
    return game;
}

module.exports = play;
canvas.addEventListener("click", play);


// -------------------------- EXTRA A NE PAS CONSIDERER -------------------------------------
function playbbb(event) {

    var mousePos = getMousePos(event);
    var xM = mousePos.x;
    var yM = mousePos.y;
    console.log("joueur1 a joue : " + joueJoueur1);
    if (!joueJoueur1) {
        joueurCour = 3 - joueurCour;

        posePion(xM, yM);
        document.getElementById("joueurCourant").innerHTML = "C'est au tour de joueur 2 de jouer";
    }
    else {
        joueurCour = 3 - joueurCour;

        posePion(xM, yM);
        document.getElementById("joueurCourant").innerHTML = "C'est au tour de joueur 1 de jouer";
    }

    draw();
    if(alignVert(joueurCour) || alignHorizon(joueurCour) || alignDiagDesc(joueurCour) || alignDiagMont(joueurCour))
    {
        if(joueurCour === 1) {
            window.alert("joueur 1 a gagnéééé");
        }
        else{
            window.alert("joueur 2 a gagnéééé");
        }
    }
}
// Code temporaire pour tester le DnD
//new DnD(canvas);

/////

// Code temporaire pour tester l'affiche de la vue
//var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
//rec.paint(ctx);
//var line = new Line(10, 20, 50, 100, 5, '#00CCC0')
