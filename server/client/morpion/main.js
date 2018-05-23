const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var width =600;
var height = 600;
canvas.width=width;
canvas.height=height;

var joueurCour = 1;
var joueJoueur1 = false;

var case1 = false;
var case2 = false;
var case3 = false;
var case4 = false;
var case5 = false;
var case6 = false;
var case7 = false;
var case8 = false;
var case9 = false;

var case1J;
var case2J;
var case3J;
var case4J;
var case5J;
var case6J;
var case7J;
var case8J;
var case9J;

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
function getMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function play(event) {
    var mousePos = getMousePos(event);
    var xM = mousePos.x;
    var yM = mousePos.y;
    if (!joueJoueur1) {
        posePion(xM, yM);
    }
    else {
        joueurCour = 3 - joueurCour;
        posePion(xM, yM);
        joueurCour = 3 - joueurCour;
    }
    if(alignVert(joueurCour) || alignHorizon(joueurCour) || alignDiag(joueurCour))
    {
        window.alert(joueurCour + " a gagnéééé");
    }

}

function posePion(xMouse, yMouse){

    ctx.lineWidth = "5";


    if(xMouse>=0 && xMouse<(width/3)){
        if(yMouse>=0 && yMouse<(width/3)){
            if(case1 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(100, 100, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(30, 30, 170, 170);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case1J = joueurCour;
                case1 = true;
            }
        }
        else if(yMouse>=(width/3) && yMouse<(2*(width/3))){
            if(case2 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(100, 300, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(30, 230, 170, 370);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case2J = joueurCour;
                case2 = true;
            }
        }
        else{
            if(case3 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(100, 500, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(30, 430, 170, 570);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case3J = joueurCour;
                case3 = true;
            }
        }
    }
    else if(xMouse>=(width/3) && xMouse<(2*(width/3))){
        if(yMouse>=0 && yMouse<(width/3)) {
            if(case4 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(300, 100, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(230, 30, 370, 170);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case4J= joueurCour;
                case4 = true;
            }
        }
        else if(yMouse>=(width/3) && yMouse<(2*(width/3))) {
            if (case5 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(300, 300, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(230, 230, 370, 370);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case5J = joueurCour;
                case5 = true;
            }
        }
        else{
            if(case6 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(300, 500, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(230, 430, 370, 570);
                    joueJoueur1 = false;
                }
                ctx.stroke()
                case6J = joueurCour;
                case6 = true;
            }
        }
    }
    else {
        if (yMouse >= 0 && yMouse < (width / 3)) {
            if (case7 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(500, 100, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(430, 30, 570, 170);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case7J = joueurCour;
                case7 = true;
            }
        }
        else if (yMouse >= (width / 3) && yMouse < (2 * (width / 3))) {
            if (case8 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(500, 300, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(430, 230, 570, 370);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case8J = joueurCour;
                case8 = true;
            }
        }
        else {
            if (case9 == false) {
                ctx.beginPath();
                if (joueurCour == 1) {
                    ctx.arc(500, 500, 70, 0, 2 * Math.PI);
                    joueJoueur1 = true;
                }
                else {
                    crossed(430, 430, 570, 570);
                    joueJoueur1 = false;
                }
                ctx.stroke();
                case9J = joueurCour;
                case9 = true;
            }
        }
    }
}

function crossed(xStart, yStart, xEnd, yEnd){
  ctx.beginPath();
  ctx.moveTo(xStart,yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
  ctx.moveTo(xStart, yEnd);
  ctx.lineTo(xEnd, yStart);
  ctx.stroke();
}

function alignVert(joueur){
    if(case1 && case2 && case3 && case1J == joueur && case2J == joueur && case3J == joueur){
        return true;
    }
    else if(case4 && case5 && case6 && case4J == joueur && case5J == joueur && case6J == joueur){
        return true;
    }
    else if(case7 && case8 && case9 && case7J == joueur && case8J == joueur && case9J == joueur){
        return true;
    }
    else{
        return false;
    }
}

function alignHorizon(joueur){
    if(case1 && case4 && case7 && case1J == joueur && case4J == joueur && case7J == joueur){
        return true;
    }
    else if(case2 && case5 && case8 && case2J == joueur && case5J == joueur && case8J == joueur){
        return true;
    }
    else if(case3 && case6 && case9 && case3J == joueur && case6J == joueur && case9J == joueur){
        return true;
    }
    else{
        return false;
    }
}

function alignDiag(joueur){
    if(case1 && case5 && case9 && case1J == joueur && case5J == joueur && case9J == joueur){
        return true;
    }
    else if(case3 && case5 && case7 && case3J == joueur && case5J == joueur && case7J == joueur){
        return true;
    }
    else{
        return false;
    }
}

canvas.addEventListener("click", play);
// Code temporaire pour tester le DnD
//new DnD(canvas);

/////

// Code temporaire pour tester l'affiche de la vue
//var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
//rec.paint(ctx);
//var line = new Line(10, 20, 50, 100, 5, '#00CCC0')
