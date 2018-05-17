const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var width =600;
var height = 600;
canvas.width=width;
canvas.height=height;

// Code temporaire pour tester le DnD
//new DnD(canvas);
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
/////

// Code temporaire pour tester l'affiche de la vue
//var rec = new Rectangle(10, 20, 50, 100, 5, '#00CCC0');
//rec.paint(ctx);
//var line = new Line(10, 20, 50, 100, 5, '#00CCC0');
//line.paint(ctx);
// tester également Dessin.
////

// Code final à utiliser pour manipuler Pencil.
//var drawing = new Drawing();
//var pencil = new Pencil(ctx, drawing, canvas);
//drawing.paint(ctx, canvas);

