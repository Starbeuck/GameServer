const randomstring = require("randomstring");

class Game {
  constructor (gameType) {
    this.id = randomstring.generate(5);
    this.gameType = gameType;
    this.gameFinished = false;
    switch (gameType) {
      case 'morpion':
        this.grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        break;
      case 'puissance4':
        //// TODO
        break;
      default:
        this.gris = [];
        break;
    }
  }
  toString(){
      let string = 'Game n°'+ this.id + ' de '+ this.gameType +' : \n' + this.grid;
      if (this.gameFinished) string+= '\nFinie !';
      return(string);
  }
  toJson(){
    return {
        'id' : this.id,
        'gameType' : this.gameType,
        'grid' : this.grid,
        'gameFinished' : this.gameFinished
    };
  }
};