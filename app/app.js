// ----------------------------------  IMPORTS ---------------------------------
"use strict";
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const path = require('path');

const Game = require('./public/Game.js');
const Action = require('./public/Action.js');

const logicfunctionsmorpion = require('./public/morpion/logic.js');
const morpion_play = logicfunctionsmorpion.play;
const morpion_movePossible = logicfunctionsmorpion.movePossible;
const morpion_movesLeft = logicfunctionsmorpion.gridFreeSpotLeft;
const morpion_won = logicfunctionsmorpion.won;
const morpion_nextAction = require('./public/morpion/morpion_IA.js');

const logicfunctionspuissance4 = require('./public/puissance4/logic.js');
const puissance4_play = logicfunctionspuissance4.play;
const puissance4_won = logicfunctionspuissance4.winning;
const puissance4_movePossible = logicfunctionspuissance4.movePossible;
const puissance4_movesLeft = logicfunctionspuissance4.gridFreeSpotLeft;
const puissance4_nextAction = require('./public/puissance4/puissance4_IA.js');

// ------------------------------ CONFIG SERVER --------------------------------

// get response from client
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// enable use file client
app.use(express.static('public'));


// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Pass to next layer of middleware
  next();
});

app.use(express.static('public'));

// ------------------------------------------------------------------------------
// ----------------------------- ROUTES ----------------------------------------
// ------------------------------------------------------------------------------

// ----------------------------- ROUTE / ---------------------------------------
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
  //res.sendFile(path.join(__dirname, '/public', 'test.html'));
});

// ----------------------------- ROUTE GAME ------------------------------------
app.post('/game', function(req, res) {
  // Possibilit� 1 : cr�ation partie (cad un param typeGame dans le body)
  if (req.body.typeGame != undefined) {

    let newGame = new Game(req.body.typeGame);

    if ((req.body.typeGame == 'puissance4') && (req.body.depth != undefined)) newGame.depth = req.body.depth;

    res.send(newGame);
    // Possibilit� 2 : jouer dans une partie (cad 2 params game et action ds le body)
  } else if ((req.body.game != undefined) && (req.body.action != undefined)) {

    // On r�cup�re la game dans un objet
    let game = new Game('');
    game.fromJson(req.body.game);

    // On r�cup�te l'action dans un objet
    let action = new Action(req.body.action);

    let play;
    let nextAction;
    let movePossible;
    let won;
    let movesLeft;

    switch (game.gameType) {
      case 'morpion':
        play = morpion_play;
        nextAction = morpion_nextAction;
        movePossible = morpion_movePossible;
        won = morpion_won;
        movesLeft = morpion_movesLeft;
        break;
      case 'puissance4':
        play = puissance4_play;
        nextAction = puissance4_nextAction;
        movePossible = puissance4_movePossible;
        won = puissance4_won;
        movesLeft = puissance4_movesLeft;
        break;
      default:
        break;
    }

    // Traitement cas de fin lorsqu'il n'y a plus qu'une case de libre (impossible pour lIA de jouer)
    if ((movePossible(game.grid, action)) && (game.winner == 0)) { // Si le move est possible on joue

      // On applique la fonction de jeu sur l'action du joueur
      let humanPlayedGame = play(game, action);

    if (won(humanPlayedGame.grid, 1)){
          humanPlayedGame.winner = 1;

        res.send(humanPlayedGame);}

      // Si il ne reste plus de move possible, on ne fait pas jouer l'ia
      if (movesLeft(humanPlayedGame.grid) === 0){
        if (won(humanPlayedGame.grid, 1)){
          humanPlayedGame.winner = 1;
        }
        if(humanPlayedGame.winner === 0){
          humanPlayedGame.winner = 3;
        }
        res.send(humanPlayedGame);
      }
      else{
        // On calcule l'action de l'IA
        if(humanPlayedGame.gameType === "puissance4"){
          let iaAction = nextAction(humanPlayedGame, game.depth);
          // On applique la fonction de jeu sur l'action de l'IA
          let iaPlayedGame = play(humanPlayedGame, iaAction[0]);

          // On vérfie si la partie n'est pas finie
          if (won(iaPlayedGame.grid, 2))   iaPlayedGame.winner = 2;

          let sendobject=[iaPlayedGame,iaAction[1]];
          //On renvoie le nouvel état de la partie au client
          res.send(sendobject);
      }
      else{
          let iaAction = nextAction(humanPlayedGame, game.depth);
          // On applique la fonction de jeu sur l'action de l'IA
          let iaPlayedGame = play(humanPlayedGame, iaAction);

          // On vérfie si la partie n'est pas finie
          if (won(iaPlayedGame.grid, 2))   iaPlayedGame.winner = 2;

          if(movesLeft === 0 && iaPlayedGame.winner === 0){
            iaPlayedGame.winner = 3;
          }
          //On renvoie le nouvel état de la partie au client
          res.send(iaPlayedGame);
      }
      }
    } else if ((!movePossible(game.grid, action)) && movesLeft(game.grid) === 0){
      // Si le move n'est pas possible on renvoie un message d'erreur
      game.winner = 3;
      res.send(game);
    }
  }
});

// ------------------------------- LISTEN --------------------------------------
app.listen(1234, function() {
  console.log("Started on PORT 1234");
})
