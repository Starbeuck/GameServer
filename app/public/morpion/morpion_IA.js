const Game = require('../../Game.js');
const Action = require('../../Action.js');


var nextAction =function(game){


    //var action = new Action('{"x":0, "y":0}');
    var action = playIA(game, 0);
    return action;
}

function playIA(game, depth) {
    var max = -10000,
        tmp,
        maxI,
        maxJ,
        i,
        j;

    for(i=0 ; i<3 ; i++) {
        for(j=0 ; j<3 ; j++) {
            if(game.grid[i][j] === 0) {
                game.grid[i][j] = 1;
                tmp = getMin(game, depth-1);

                if(tmp > max) {
                    max = tmp;
                    maxI = i;
                    maxJ = j;
                }

                game.grid[i][j] = 0;
            }
        }
    }

    // Ici on ne veut pas jouer mais retourner l'action associée
    //game.grid[i][j] = 1;
    return new Action('{"x":i, "y":j, "player":2}');
}

function getMax(game, depth) {
    if(depth === 0 || getWinner(game) !== 0) {
        return computePossibilities(game);
    }

    var max = -10000,
        i,
        j,
        tmp;

    for(i=0 ; i<3 ; i++) {
        for(j=0 ; j<3 ; j++) {
            if(game.grid[i][j] === 0)
            {
                game.grid[i][j] = 2;
                tmp = getMin(game, depth-1);

                if(tmp > max)
                {
                    max = tmp;
                }
                game.grid[i][j] = 0;
            }
        }
    }

    return max;
}

function getMin(game, depth) {
    if(depth === 0 || getWinner(game) !== 0) {
        return computePossibilities(game);
    }

    var min = 10000,
        i,
        j,
        tmp;

    for(i=0 ; i<3 ; i++) {
        for(j=0 ; j<3 ; j++) {
            if(game.grid[i][j] === 0)
            {
                game.grid[i][j] = 1;
                tmp = getMax(game, depth-1);

                if(tmp < min)
                {
                    min = tmp;
                }
                game.grid[i][j] = 0;
            }
        }
    }

    return min;
}

//Compte le nombre de séries de n pions alignés de chacun des joueurs
function nb_series(game, series_j1, series_j2, n) {
    var count1,
        count2,
        i,
        j;

    series_j1 = 0;
    series_j2 = 0;

    count1 = 0;
    count2 = 0;

    //Diagonale descendante
    for(i=0;i<3;i++) {
        if(game.grid[i][i] === 1) {
            count1++;
            count2 = 0;

            if(count1 === n) {
                series_j1++;
            }
        } else if(game.grid[i][i] === 2) {
            count2++;
            count1 = 0;

            if(count2 === n)
            {
                series_j2++;
            }
        }
    }

    count1 = 0;
    count2 = 0;

    //Diagonale montante
    for(i=0;i<3;i++){
        if(game.grid[i][2-i] === 1){
            count1++;
            count2 = 0;

            if(count1 === n){
                series_j1++;
            }
        } else if(game.grid[i][2-i] === 2) {
            count2++;
            count1 = 0;

            if(count2 === n) {
                series_j2++;
            }
        }
    }

    //En ligne
    for(i=0;i<3;i++) {
        count1 = 0;
        count2 = 0;

        //Horizontalement
        for(j=0;j<3;j++) {
            if(game.grid[i][j] === 1) {
                count1++;
                count2 = 0;

                if(count1 === n) {
                    series_j1++;
                }
            }
            else if(game.grid[i][j] === 2) {
                count2++;
                count1 = 0;

                if(count2 === n) {
                    series_j2++;
                }
            }
        }

        count1 = 0;
        count2 = 0;

        //Verticalement
        for(j=0;j<3;j++) {
            if(game.grid[j][i] === 1) {
                count1++;
                count2 = 0;

                if(count1 === n) {
                    series_j1++;
                }
            } else if(game.grid[j][i] === 2) {
                count2++;
                count1 = 0;

                if(count2 === n) {
                    series_j2++;
                }
            }
        }
    }
}

function computePossibilities(game) {
    var winner,
        nbPawn = 0,
        i,
        j;

    //On compte le nombre de pions présents sur le plateau
    for(i=0 ; i<3 ; i++) {
        for(j=0 ; j<3 ; j++) {
            if(game.grid[i][j] !== 0) {
                nbPawn++;
            }
        }
    }

    if( (winner = getWinner(game)) !== 0) {
        if(winner === 1) {
            return 1000 - nbPawn;
        } else if(winner === 2) {
            return -1000 + nbPawn;
        } else {
            return 0;
        }
    }

    //On compte le nombre de séries de 2 pions alignés de chacun des joueurs
    var series_j1 = 0,
        series_j2 = 0;

    nb_series(game, series_j1, series_j2, 2);

    return (series_j1 - series_j2);
}

function getWinner(game) {
    var i,
        j,
        j1,
        j2;

    nb_series(j1, j2, 3);

    if(j1) {
        return 1;
    } else if(j2) {
        return 2;
    } else {
        //Si le jeu n'est pas fini et que personne n'a gagné, on renvoie 0
        for(i=0;i<3;i++) {
            for(j=0;j<3;j++) {
                if(game.grid[i][j] === 0) {
                    return 0;
                }
            }
        }
    }

    //Si le jeu est fini et que personne n'a gagné, on renvoie 3
    return 3;
}

module.exports = nextAction;
