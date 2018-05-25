var path           =         require('path');
var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

const Game = require('./Game.js');
const Action = require('./Action.js');
var allGames = [];
// TEST CLASSES
let newAction = new Action('{"x":0, "y":10}');

console.log(newAction.toJson());
console.log(newAction.toString());

let newGame = new Game('morpion');

console.log(newGame.toJson());
// FIN TEST CLASSES

// get response from client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable use file client
app.use(express.static('public'));

// init root path
app.get('/', function (req, res) {
 // res.sendFile(path.join(__dirname, '/public', 'accueil.html'));
 res.sendFile(path.join(__dirname, '/public', 'test.html'));
});

// post request
app.post('/game',function(req,res){
  var typeGame= req.body.typeGame;
  console.log("TypeGame = "+typeGame);
  var newGame = new Game(typeGame);
  allGames.push(newGame);
  res.send(newGame.toString());
});


//open port
app.listen(1234,function(){
  console.log("Started on PORT 1234");
})
