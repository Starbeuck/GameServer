'use strict';

module.exports = class Action {
  constructor (json){
    let parsed = JSON.parse(json);
    this.x = parsed.x;
    this.y = parsed.y;
    this.currentPlayer = parsed.currentPlayer; // 1 = joueur réel ; 2 = IA
  }
  toString(){
    return '(' + this.x + ', ' +this.y +')';
  }
  toJson(){
    return {
      "x" : this.x,
      "y" : this.y,
      "currentPlayer" : this.currentPlayer
    }
  }
};
