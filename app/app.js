// ----------------------------------  IMPORTS ---------------------------------
let express = require("express");
let bodyParser = require("body-parser");
let app = express();

const Game = require('./public/Game.js');
const Action = require('./public/Action.js');
const logicfunctions = require('./public/morpion/logic.js');
const morpion_play = logicfunctions.play;
const morpion_movePossible = logicfunctions.movePossible;
const morpion_won = logicfunctions.won;
const morpion_nextAction = require('./public/morpion/morpion_IA_fofo.js');

// ------------------------------ VARIABLES ------------------------------------

let allGames = [];

// ------------------------------ CONFIG SERVER --------------------------------

// get response from client
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// enable use file client
app.use(express.static('public'));
app.use('/boostrap',  express.static(__dirname + '/boostrap'));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});

// ------------------------------ TEST CLASSES ---------------------------------
// let newAction = new Action('{"x":0, "y":10}');
//
// console.log(newAction.toJson());
// console.log(newAction.toString());
//
// let newGame = new Game('morpion');
//
// console.log(newGame.toJson());
// ----------------------------- FIN TEST CLASSES ------------------------------

//------------------------------------------------------------------------------
// ----------------------------- ROUTES ----------------------------------------
//------------------------------------------------------------------------------


// ----------------------------- ROUTE / ---------------------------------------
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
  //res.sendFile(path.join(__dirname, '/public', 'test.html'));
});

// ----------------------------- ROUTE GAME ------------------------------------
app.post('/game', function(req, res) {
  // Possibilité 1 : création partie (cad un param typeGame dans le body)
  if (req.body.typeGame != undefined) {
    let typeGame = req.body.typeGame;
    console.log("TypeGame = " + typeGame);
    let newGame = new Game(typeGame);
    allGames.push(newGame);
    console.log(newGame.toJson());
    res.send(newGame);
    // Possibilité 2 : jouer dans une partie (cad 2 params game et action ds le body)
  } else if ((req.body.game != undefined) && (req.body.action != undefined)) {

    // On récupère la game dans un objet
    let game = new Game('');
    game.fromJson(req.body.game);

    // On récupète l'action dans un objet
    let action = new Action(req.body.action);

    if ((morpion_movePossible(game.grid, action)) && (game.winner == 0)) {   // Si le move est possible on joue

      // On applique la fonction de jeu sur l'action du joueur
      let humanPlayedGame = morpion_play(game, action);
      // On calcule l'action de l'IA
      let iaAction = morpion_nextAction(humanPlayedGame);
      // On applique la fonction de jeu sur l'action de l'IA
      let iaPlayedGame = morpion_play(humanPlayedGame, iaAction);

      // On vérfie si la partie n'est pas finie
      if (morpion_won(game.grid,  action.currentPlayer)) game.winner = action.currentPlayer;

      //On renvoie le nouvel état de la partie au client
      res.send(iaPlayedGame);
    } else{       // Si le move n'est pas possible on renvoie un message d'erreur
      res.send("ERROR");
    }
  }
});

// -------------------------------- ROUTE IDGAME -------------------------------

app.post('/idGame', function(req, res) {
  if (req.body.idGame != undefined) {
    let idGame = req.body.idGame;
    let thisGame;
    for (let i = 0; i < allGames.length; i++) {
      if (allGames[i].id == idGame) {
        thisGame = allGames[i];
      };
    };
    res.send(thisGame);
  }
});

// ------------------------------- LISTEN --------------------------------------
app.listen(1234, function() {
  console.log("Started on PORT 1234");
})
