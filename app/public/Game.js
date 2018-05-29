const randomstring = require("randomstring");

module.exports = class Game {
    constructor(gameType) {
        this.id = randomstring.generate(5);
        this.gameType = gameType;
        this.winner = 0;
        switch (gameType) {
            case 'morpion':
                this.grid = [
                    [
                        0, 0, 0
                    ],
                    [
                        0, 0, 0
                    ],
                    [
                        0, 0, 0
                    ]
                ];
                break;
            case 'puissance4':
                this.grid = [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    14,
                    14,
                    15
                ];
                break;
            default:
                this.grid = [];
                break;
        }
    }

    toString() {
        let string = 'Game : ' + this.id + ' de ' + this.gameType + ' : \n' + this.grid;
        return string;
    }

    toJson() {
        return {
            "id": this.id,
            "gameType": this.gameType,
            "grid": this.grid,
            "winner": this.winner
        };
    }

    fromJson(json) {
        var parsed = JSON.parse(json);
        if (parsed.id != undefined) this.id = parsed.id;
        if (parsed.gameType != undefined) this.gameType = parsed.gameType;
        if (parsed.grid != undefined) this.grid = parsed.grid;
        if (parsed.winner != undefined) this.winner = parsed.winner;
    }

    gridToString() {
        let boardString = '- - - - - - - -\n';

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                boardString += ' | ' + this.grid[x][y];
            }
            boardString += ' |\n- - - - - - - -\n';
        }

        console.log(boardString);
    }
};