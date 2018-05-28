const randomstring = require("randomstring");

module.exports = class Game {
  constructor(gameType) {
    this.id = randomstring.generate(5);
    this.gameType = gameType;
    this.gameFinished = false;
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
    if (this.gameFinished)
      string += '\nFinie !';
    return string;
  }
<<<<<<< HEAD
  toJson() {
    return {"id": this.id, "gameType": this.gameType, "grid": this.grid, "gameFinished": this.gameFinished};
=======
  toJson(){
    return {
        "id" : this.id,
        "gameType" : this.gameType,
        "grid" : this.grid,
        "gameFinished" : this.gameFinished,
        "winner" : this.winner
    };
>>>>>>> 071c309a3a665e893ecfec60fb6a8ee32799e5c9
  }
  fromJson(json) {
    var parsed = JSON.parse(json);
<<<<<<< HEAD
    if (parsed.id != undefined)
      this.id = parsed.id;
    if (parsed.gameType != undefined)
      this.gameType = parsed.gameType;
    if (parsed.gameFinished != undefined)
      this.gameFinished = parsed.gameFinished;
    if (parsed.grid != undefined)
      this.grid = parsed.grid;
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
=======
    if (parsed.id != undefined) this.id = parsed.id;
    if (parsed.gameType != undefined) this.gameType = parsed.gameType;
    if (parsed.gameFinished != undefined) this.gameFinished = parsed.gameFinished;
    if (parsed.grid != undefined) this.grid = parsed.grid;
    if (parsed.winner != undefined) this.winner = parsed.winner;
>>>>>>> 071c309a3a665e893ecfec60fb6a8ee32799e5c9
  }
};
