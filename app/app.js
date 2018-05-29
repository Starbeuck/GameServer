var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const Game = require('./public/Game.js');
const Action = require('./public/Action.js');
const logicfunctions = require('./public/morpion/logic.js');
const morpion_play = logicfunctions.play;
const morpion_movePossible = logicfunctions.movePossible;
const morpion_movesLeft = logicfunctions.gridFreeSpotLeft;
const morpion_won = logicfunctions.won;
const morpion_nextAction = require('./public/morpion/morpion_IA.js');

var allGames = [];

// get response from client
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// enable use file client
app.use(express.static('public'));

// -------------------------------------------- TEST CLASSES ---------------------------------------------
// let newAction = new Action('{"x":0, "y":10}');
//
// console.log(newAction.toJson());
// console.log(newAction.toString());
//
// let newGame = new Game('morpion');
//
// console.log(newGame.toJson());
// -------------------------------------------- FIN TEST CLASSES ------------------------------------------

// init root path
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public', 'accueil.html'));
  //res.sendFile(path.join(__dirname, '/public', 'test.html'));
});

// ----------------------------------- ROUTE GAME -----------------------------------

app.post('/game', function(req, res) {
  // Possibilité 1 : création partie
  if (req.body.typeGame != undefined) {
    var typeGame = req.body.typeGame;
    console.log("TypeGame = " + typeGame);
    var newGame = new Game(typeGame);
    allGames.push(newGame);
    console.log(newGame.toJson());
    res.send(newGame);
    // Possibilité 2 : jouer dans une partie
  } else if ((req.body.game != undefined) && (req.body.action != undefined)) {
    var game = new Game('');
    game.fromJson(req.body.game);
    var action = new Action(req.body.action);

    // Traitement cas de fin lorsqu'il n'y a plus qu'une case de libre (impossible pour lIA de jouer)

    if ((morpion_movePossible(game.grid, action)) && (game.winner === 0) && (morpion_movesLeft(game.grid) === 1)) {
        var humanPlayedGame = morpion_play(game, action);
        if(morpion_won(game.grid, action.currentPlayer)){
            game.winner = action.currentPlayer;
        }
        res.send(humanPlayedGame);
    } else

    if ((morpion_movePossible(game.grid, action)) && (game.winner == 0)) {
      var humanPlayedGame = morpion_play(game, action);

      var iaAction = morpion_nextAction(humanPlayedGame);
      //var iaAction = new Action('{"x":1, "y":1, "currentPlayer":2}')
      var iaPlayedGame = morpion_play(humanPlayedGame, iaAction);
      if(morpion_won(game.grid, action.currentPlayer)){
        game.winner = action.currentPlayer;
      }
      res.send(iaPlayedGame);
    }
    else{
      res.send("ERROR");
    }
  }
});

// ----------------------------------- ROUTE IDGAME -----------------------------------

app.post('/idGame', function(req, res) {
  if (req.body.idGame != undefined) {
    var idGame = req.body.idGame;
    var thisGame;
    for (let i = 0; i < allGames.length; i++) {
      if (allGames[i].id == idGame) {
        thisGame = allGames[i];
      };
    };
    res.send(thisGame);
  }
});

//open port
app.listen(1234, function() {
  console.log("Started on PORT 1234");
})
