const randomstring = require("randomstring");

module.exports = class Game {
  constructor (gameType) {
    this.id = randomstring.generate(5);
    this.gameType = gameType;
    this.gameFinished = false;
    switch (gameType) {
      case 'morpion':
        this.grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        break;
      case 'puissance4':
        this.grid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 14, 15];
        break;
      default:
        this.gris = [];
        break;
    }
  }
  toString(){
      let string = 'Game : '+ this.id + ' de '+ this.gameType +' : \n' + this.grid;
      if (this.gameFinished) string+= '\nFinie !';
      return(string);
  }
  toJson(){
    return {
        "id" : this.id,
        "gameType" : this.gameType,
        "grid" : this.grid,
        "gameFinished" : this.gameFinished
    };
  }
};