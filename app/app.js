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
app.post('/game', function (req, res) {
  // Possibilité 1 : création partie
  if (req.body.typeGame != undefined){
    var typeGame=req.body.typeGame;
    console.log("TypeGame = "+typeGame);
    var newGame = new Game(typeGame);
    allGames.push(newGame);
    res.send(newGame.toString());
  // Possibilité 2 : jouer dans une partie
}else if((req.body.game !=  undefined) && (req.body.action != undefined)){
    var game = new Game('');
    game.fromJson(req.body.game);
    var action = new Action(req.body.action);
    var humanPlayedGame = play(game, action);
    var iaAction = nextAction(humanPlayedGame);
    var iaPlayedGame = play(humanPlayedGame, iaAction);
    res.send(iaPlayedGame.toString());
  }
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
