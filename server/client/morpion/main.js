const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var width =600;
var height = 600;
canvas.width=width;
canvas.height=height;

var joueurCour = 1;


var buttonCirc = document.getElementById('butCirc');
var buttonCross = document.getElementById('butCrss');

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

function round(event){

    var mousePos = getMousePos(event);
    ctx.lineWidth = "5";
    var xMouse = mousePos.x;
    var yMouse = mousePos.y;
    console.log(xMouse);
    console.log(yMouse);
    if(xMouse>=0 && xMouse<(width/3)){
        if(yMouse>=0 && yMouse<(width/3)){
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(100, 100, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(30, 30, 170, 170);
            }
            ctx.stroke();
        }
        else if(yMouse>=(width/3) && yMouse<(2*(width/3))){
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(100, 300, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(30, 230, 170, 370);
            }
            ctx.stroke();
        }
        else{
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(100, 500, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(30,430, 170, 570);
            }
            ctx.stroke();
        }
    }
    else if(xMouse>=(width/3) && xMouse<(2*(width/3))){
        if(yMouse>=0 && yMouse<(width/3)) {
            ctx.beginPath();
            if (joueurCour == 1) {
                ctx.arc(300, 100, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(230, 30, 370, 170);
            }
            ctx.stroke();
        }
        else if(yMouse>=(width/3) && yMouse<(2*(width/3))){
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(300, 300, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(230, 230, 370, 370);
            }
            ctx.stroke();
        }
        else{
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(300, 500, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(230, 430, 370, 570);
            }
            ctx.stroke();
        }
    }
    else{
        if(yMouse>=0 && yMouse<(width/3)){
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(500, 100, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(430, 30, 570, 170);
            }
            ctx.stroke();
        }
        else if(yMouse>=(width/3) && yMouse<(2*(width/3))){
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(500, 300, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(430, 230, 570, 370)
            }
            ctx.stroke();
        }
        else{
            ctx.beginPath();
            if(joueurCour == 1) {
                ctx.arc(500, 500, 70, 0, 2 * Math.PI);
            }
            else{
                crossed(430, 430, 570, 570);
            }
            ctx.stroke();
        }
    }
    joueurCour = 3 - joueurCour;
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

canvas.addEventListener("click", round);
// Code temporaire pour tester le DnD
//new DnD(canvas);

/////

// Code temporaire pour tester l'affiche de la vue
//var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
//rec.paint(ctx);
//var line = new Line(10, 20, 50, 100, 5, '#00CCC0')
