// -------------------------- IMPORTS ------------------------------------------

const Game = require('../Game.js');
const Action = require('../Action.js');

module.exports = nextAction;

// ------------------------ VARIABLES GLOBALES ---------------------------------

let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let huPlayer = "P";
let aiPlayer = "C";
let iter = 0;
let nbCol = 3;
let nbLi = 3;

function convertBoard(grid) {

    for(let v=0 ; v<nbCol ; v++) {
        for(let w=0 ; w<nbLi ; w++) {
            if(grid[v][w] === 1) {
                board[w*nbCol+v] = huPlayer;
            }
            if(grid[v][w] === 2) {
                board[w*nbCol+v] = aiPlayer;
            }
        }
    }
}

function nextAction(game, depth){

    convertBoard(game.grid);
    let index = minimax(board, aiPlayer).index;
    console.log("index : "+index);

    let y = (index%nbCol),
        x = parseInt(index/nbCol);

    console.log("x : "+x);
    console.log("y : "+y);

    return new Action('{"x":'+x+', "y":'+y+', "currentPlayer":2}');
}

function minimax(reboard, player) {
    iter++;
    let array = avail(reboard);
    if (winning(reboard, huPlayer)) {
        return {
            score: -10
        };
    } else if (winning(reboard, aiPlayer)) {
        return {
            score: 10
        };
    } else if (array.length === 0) {
        return {
            score: 0
        };
    }

    let moves = [];
    for (let i = 0; i < array.length; i++) {
        let move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;

        if (player === aiPlayer) {
            let g = minimax(reboard, huPlayer);
            move.score = g.score;
        } else {
            let g = minimax(reboard, aiPlayer);
            move.score = g.score;
        }
        reboard[array[i]] = move.index;
        moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

//available spots
function avail(reboard) {
    return reboard.filter(s => s !== huPlayer && s !== aiPlayer);
}

// winning combinations
function winning(board, player) {
    if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
    ) {
        return true;
    } else {
        return false;
    }
}
