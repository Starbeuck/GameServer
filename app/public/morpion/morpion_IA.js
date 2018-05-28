const Game = require('../Game.js');
const Action = require('../Action.js');



var huPlayer = 1,
    aiPlayer = 2,
    nbCol = 3,
    nbLi = 3;

function convertBoard(grid) {
    var board = [];

    for(var v=0 ; v<nbCol ; v++) {
        for(var w=0 ; w<nbLi ; w++) {
            board[w*nbCol+v] = grid[v][w];
        }
    }
    return board;
}

var nextAction = function(game){

    var origBoard = convertBoard(game.grid);
    var action = minimax(origBoard, 2);

    return action;
}

function emptyIndexies(board){
    return  board.filter(s => s != 1 && s != 2);
}

function winning(board, player){
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

// the main minimax function
function minimax(newBoard, player){

    //available spots
    var availSpots = emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie
    //and returning a value accordingly
    if (winning(newBoard, huPlayer)){
        return {score:-10};
    }
    else if (winning(newBoard, aiPlayer)){
        return {score:10};
    }
    else if (availSpots.length === 0){
        return {score:0};
    }

    // an array to collect all the objects
    var moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++){
        //create an object for each and store the index of that spot
        var move = {};
        move.index = newBoard[availSpots[i]];

        // set the empty spot to the current player
        newBoard[availSpots[i]] = player;

        /*collect the score resulted from calling minimax
          on the opponent of the current player*/
        if (player == aiPlayer){
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }
        else{
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        // reset the spot to empty
        newBoard[availSpots[i]] = move.index;

        // push the object to the array
        moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if(player === aiPlayer){
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else{

        // else loop over the moves and choose the move with the lowest score
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    // return the chosen move (object) from the moves array
    //return moves[bestMove];

    var x = (moves[bestMove].index%nbCol),
        y = parseInt(moves[bestMove].index/nbCol);

    return new Action('{"x":'+x+', "y":'+y+', "currentPlayer":2}');
}

module.exports = nextAction;
