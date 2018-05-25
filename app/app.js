var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

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
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// enable use file client
app.use(express.static('public'));

// init root path
app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, '/public', 'accueil.html'));
  res.sendFile(path.join(__dirname, '/public', 'test.html'));
});

// post request
<<<<<<< HEAD
app.post('/game',function(req,res){
  var typeGame= req.body.typeGame;
  console.log("TypeGame = "+typeGame);
=======
app.post('/game', function (req, res) {
  var typeGame = req.body.typeGame;
  console.log("TypeGame = " + typeGame);
>>>>>>> e1337a31da66d07c9868befbaab5cd9f2534242e
  var newGame = new Game(typeGame);
  allGames.push(newGame);
  res.send(newGame.id);
});

app.post('/idGame', function (req, res) {
  var idGame = req.body.idGame;
  var thisGame;
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].id == idGame) {
      thisGame = allGames[i];
    };
  };
  res.send(thisGame);
});

//open port
app.listen(1234, function () {
  console.log("Started on PORT 1234");
})
