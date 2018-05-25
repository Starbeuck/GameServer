const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var width =600;
var height = 600;
canvas.width=width;
canvas.height=height;

var grille;
var sizeGrid;
var caseSize = width/3;
var joueurCour = 2;
var joueJoueur1 = false;
var alignement = 3;


ctx.fillStyle = '#F0F0F0'; // set canvas' background color
ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas

function initGrid(sizeGrid){
    grille = new Array(sizeGrid);
    for (var i=0; i<grille.length; i++){
        grille[i] = new Array(sizeGrid);
    }

    for (var i=0; i<grille.length; i++){
        for (var j=0; j<grille.length; j++){
            grille[i][j] = 0;
        }
    }
}

function getMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

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
initGrid(sizeGrid);

function play(event) {

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

    //draw();
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

function posePion(xMouse, yMouse){

    ctx.lineWidth = "5";
    console.log("x : " + xMouse);
    console.log("y : " + yMouse);

    var colonne = Math.trunc(xMouse/caseSize);
    var ligne = Math.trunc(yMouse/caseSize);

    if (grille[ligne][colonne] === 0){
        grille[ligne][colonne] = joueurCour;
        if(joueurCour === 1){
            joueJoueur1 = true;
        }
        else{
            joueJoueur1 = false;
        }
    }

}

function draw(){
    var startCircleX = width/6;
    var startCircleY = width/6;

    var startCrossedX = width/20;
    var startCrossedY = width/20;
    var endCrossedX = 170;
    var endCrossedY = 170;

    for(var i=0; i<grille.length; i++){
        for (var j=0; j<grille.length; j++) {
            if (grille[i][j] === 1) {
                circle(startCircleX, startCircleY);
            }
            if (grille[i][j] === 2) {
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

function alignHorizon(joueur){
    var colCour = 0;
    var lignCour = 0;
    var compteur = 0;
    var trouve = false;
    while (lignCour<sizeGrid && !trouve){
        while(colCour<sizeGrid-1 && !trouve){
            if(grille[lignCour][colCour] === joueur &&  grille[lignCour][colCour+1] === joueur){
                compteur++;
            }
            if(compteur === alignement-1){
                trouve = true;
            }
            colCour++;
        }
        colCour = 0;
        compteur = 0;
        lignCour++;
    }
    return trouve;
}

function alignVert(joueur){
    var colCour = 0;
    var lignCour = 0;
    var compteur = 0;
    var trouve = false;
    while (colCour<sizeGrid && !trouve){
        while(lignCour<sizeGrid-1 && !trouve){
            if(grille[lignCour][colCour] === joueur &&  grille[lignCour+1][colCour] === joueur){
                compteur++;
            }
            if(compteur === alignement-1){
                trouve = true;
            }
            lignCour++;

        }
        lignCour = 0;
        compteur = 0;
        colCour++;

    }
    return trouve;
}

function alignDiagDesc(joueur){
    var colCour = 0;
    var lignCour = 0;
    var compteur = 0;
    var trouve = false;
    while (colCour<sizeGrid-1 && lignCour<sizeGrid-1 && !trouve) {
        if (grille[lignCour][colCour] === joueur && grille[lignCour + 1][colCour + 1] === joueur) {
            compteur++;
            console.log("ligne : "+ lignCour + "colonne : " + colCour);
        }
        if (compteur === alignement - 1) {
            trouve = true;
        }
        lignCour++;
        colCour++;
    }
    return trouve;
}

function alignDiagMont(joueur){
    var colCour = 0;
    var lignCour = 2;
    var compteur = 0;
    var trouve = false;
    while (colCour<sizeGrid-1 && lignCour>0 && !trouve) {
        if (grille[lignCour][colCour] === joueur && grille[lignCour - 1][colCour + 1] === joueur) {
            compteur++;
        }
        if (compteur === alignement - 1) {
            trouve = true;
        }
        lignCour--;
        colCour++;
    }
    return trouve;
}

function afficheEtat(){
    console.log("joueur courant est : " + joueurCour);
    for (var i=0; i<grille.length; i++){
        for (var j=0; j<grille.length; j++){
            console.log("ligne : "+i+" colonne : "+j+ " == " + grille[i][j]);
        }
    }
    console.log("\n =============== \n\n");
}

canvas.addEventListener("click", play);
// Code temporaire pour tester le DnD
//new DnD(canvas);

/////

// Code temporaire pour tester l'affiche de la vue
//var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
//rec.paint(ctx);
//var line = new Line(10, 20, 50, 100, 5, '#00CCC0')
