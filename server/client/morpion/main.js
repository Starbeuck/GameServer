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

function play(event){
    var mousePos = getMousePos(event);
    var xM = mousePos.x;
    var yM = mousePos.y;
    if(!joueJoueur1){
        posePion(xM, yM);
    }
    else{
        joueurCour = 3 - joueurCour;
        posePion(xM, yM);
        joueurCour = 3 - joueurCour;
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
                ctx.stroke();
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

canvas.addEventListener("click", play);
// Code temporaire pour tester le DnD
//new DnD(canvas);

/////

// Code temporaire pour tester l'affiche de la vue
//var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
//rec.paint(ctx);
//var line = new Line(10, 20, 50, 100, 5, '#00CCC0')